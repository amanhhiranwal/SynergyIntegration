import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Bootstrap's stylesheet is render-blocking and this site uses a thin slice of
 * it — the grid, a handful of flex/spacing utilities and the navbar.
 * Lighthouse measured ~28 KB of its ~30 KB gzipped payload as unused.
 *
 * This deliberately purges ONLY Bootstrap's own stylesheet, never the app's.
 * The components compose their class names dynamically in dozens of places
 * (`cam-image-wrapper-${tab.animation}`, `contact-section-${variant}`,
 * `ksd-signal-frame-${i + 1}`, …), and those literals never appear in the
 * source for a static extractor to find. Bootstrap's classes, by contrast,
 * are always written out in full in the JSX, so they extract reliably.
 */
function purgeBootstrapCss() {
  const BOOTSTRAP_CSS = /node_modules[\\/]bootstrap[\\/]dist[\\/]css[\\/]/;

  return {
    name: "purge-bootstrap-css",
    apply: "build",
    enforce: "pre",

    async transform(code, id) {
      if (!BOOTSTRAP_CSS.test(id)) return null;

      const { PurgeCSS } = await import("purgecss");

      const [result] = await new PurgeCSS().purge({
        content: ["./index.html", "./src/**/*.{js,jsx}"],
        css: [{ raw: code }],

        // Bootstrap selectors contain / and : (e.g. col-md-6, w-50).
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],

        // Toggled from JS rather than written as literal class attributes.
        safelist: {
          standard: ["show", "collapse", "collapsing", "fade", "html", "body"],
          greedy: [/^swiper/, /^animate__/],
        },
      });

      return { code: result.css, map: null };
    },
  };
}

/**
 * Emits the vendor stylesheets ahead of the application's own.
 *
 * main.jsx imports Bootstrap first and index.css last, so the app's rules are
 * meant to win any tie against Bootstrap's — that is how the dev server
 * behaves. Splitting Bootstrap into its own chunk breaks that: Vite emits
 * vendor chunk CSS after the entry's, which silently flips every
 * equal-specificity collision between them. Bare element selectors are where
 * this bites (`body`, `h2`, `p`); class-based rules outrank Bootstrap either
 * way. It showed up as Bootstrap's `system-ui` replacing the app's
 * `-apple-system` stack in production builds only.
 *
 * Reordering the <link> tags restores the source import order while keeping
 * the chunks separate, so the stylesheets still download in parallel.
 */
function orderVendorCssFirst() {
  const STYLESHEET = /<link[^>]+rel="stylesheet"[^>]*href="\/([^"]+\.css)"[^>]*>/g;

  return {
    name: "order-vendor-css-first",
    apply: "build",

    transformIndexHtml: {
      order: "post",
      handler(html) {
        const tags = [...html.matchAll(STYLESHEET)];
        if (tags.length < 2) return html;

        const isVendor = (file) => file.includes("/vendor-");
        const vendor = tags.filter(([, f]) => isVendor(f));
        const app = tags.filter(([, f]) => !isVendor(f));

        // Already in the right order — leave the document untouched.
        if (!vendor.length || !app.length) return html;
        if (tags.every(([, f], i) => isVendor(f) === i < vendor.length)) {
          return html;
        }

        let out = html;
        for (const [tag] of tags) out = out.replace(tag, "");

        const ordered = [...vendor, ...app].map(([tag]) => tag).join("\n    ");

        return out.replace("</head>", `${ordered}\n  </head>`);
      },
    },
  };
}

/**
 * The homepage hero is the Largest Contentful Paint element, but it lives
 * inside a lazily-rendered carousel, so the browser cannot discover it until
 * React has mounted — roughly 2.5s into the load on a throttled connection.
 *
 * File names are content-hashed at build time, so the preload cannot be
 * hardcoded in index.html. This plugin resolves the hashed names out of the
 * bundle and injects a matching <link rel="preload">.
 *
 * The preload mirrors the element's own srcset/sizes via imagesrcset and
 * imagesizes. If it pointed at a single file instead, the preload scanner and
 * the rendered <img> could settle on different variants and download both.
 *
 * @param {object}   options
 * @param {string}   options.sizes    must equal the <img> `sizes` attribute
 * @param {Array<{width: number, match: RegExp}>} options.variants
 */
function preloadHeroImage({ sizes, variants }) {
  return {
    name: "preload-hero-image",
    apply: "build",

    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const files = Object.keys(ctx.bundle ?? {});

        const resolved = variants.map(({ width, match }) => ({
          width,
          file: files.find((file) => match.test(file)),
        }));

        const missing = resolved.filter(({ file }) => !file);
        if (missing.length) {
          this.warn(
            `hero preload skipped; no bundled asset for width(s): ${missing
              .map(({ width }) => width)
              .join(", ")}`,
          );
          return html;
        }

        const widest = resolved.reduce((a, b) => (a.width > b.width ? a : b));

        return {
          html,
          tags: [
            {
              tag: "link",
              attrs: {
                rel: "preload",
                as: "image",
                href: `/${widest.file}`,
                imagesrcset: resolved
                  .map(({ width, file }) => `/${file} ${width}w`)
                  .join(", "),
                imagesizes: sizes,
                fetchpriority: "high",
              },
              injectTo: "head",
            },
          ],
        };
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    purgeBootstrapCss(),
    orderVendorCssFirst(),
    // Must stay in sync with the first slide of ProductSlider.jsx.
    preloadHeroImage({
      sizes: "100vw",
      variants: [
        { width: 640, match: /assets\/hero1-640-[\w-]+\.webp$/ },
        { width: 960, match: /assets\/hero1-960-[\w-]+\.webp$/ },
        { width: 1280, match: /assets\/hero1-1280-[\w-]+\.webp$/ },
        { width: 1920, match: /assets\/hero1-(?!640-|960-|1280-)[\w-]+\.webp$/ },
      ],
    }),
  ],

  build: {
    // Assets below this size are inlined as data URIs, which costs bytes in
    // the JS/CSS but saves a request. 4 KB is the point where that trade
    // stops paying off for this site's icon set.
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        /**
         * Without this, every third-party library lands in the single entry
         * chunk, so any change to application code invalidates the whole
         * download. Splitting the rarely-changing vendors into their own
         * chunks lets browsers keep them cached across deploys, and lets the
         * carousel/animation code load in parallel with the app shell.
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // Only the libraries the app shell itself needs are pinned to a
          // named chunk. Everything else is deliberately left to the default
          // algorithm so that route-only dependencies (motion, axios) stay
          // inside the lazy route chunk that uses them instead of being
          // hoisted onto the initial load.
          if (
            /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(
              id,
            )
          )
            return "vendor-react";

          // Bootstrap is now stylesheet-only, but keeping it in its own chunk
          // still pays: two smaller stylesheets download in parallel. The
          // cascade order this would otherwise invert is repaired by
          // orderVendorCssFirst() below.
          if (/[\\/]node_modules[\\/]bootstrap[\\/]/.test(id))
            return "vendor-bootstrap";

          if (/[\\/]node_modules[\\/]swiper[\\/]/.test(id))
            return "vendor-swiper";
        },
      },
    },
  },
});

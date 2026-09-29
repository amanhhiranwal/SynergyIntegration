import { useState, useEffect, useRef, useCallback } from "react";
import "./BuiltToPerform.css";
import image1 from "../../Assets/buildtomove/Image01.webp";
import image2 from "../../Assets/buildtomove/Image02.webp";
import image3 from "../../Assets/buildtomove/Image03.webp";

// Every feature image in this set shares the same intrinsic size.
const FEATURE_IMAGE_WIDTH = 920;
const FEATURE_IMAGE_HEIGHT = 531;

const INTERVAL = 4000;

const features = [
  {
    title: "4K UHD Display",
    desc: "Clear visuals and vibrant detail for better visibility and engagement",
    image: image1,
  },
  {
    title: "Anti-Glare Screen",
    desc: "Reduced reflections for uninterrupted visibility",
    image: image2,
  },
  {
    title: "Built-in Camera & Mic",
    desc: "Clear video and voice without external devices",
    image: image3,
  },
];

export default function BuiltToPerform() {
  const [activeFeature, setActiveFeature] = useState(0);
  const timerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const activeSlotRef = useRef("A");
  const slotARef = useRef(null);
  const slotBRef = useRef(null);

  const switchTo = async (index) => {
    if (isAnimatingRef.current) return;

    // Preload image before animating to avoid blank frame
    await new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve; // don't block if image fails
      img.src = features[index].image;
    });

    isAnimatingRef.current = true;

    const incoming = features[index].image;
    const activeSlot = activeSlotRef.current;

    const outEl = activeSlot === "A" ? slotARef.current : slotBRef.current;
    const inEl = activeSlot === "A" ? slotBRef.current : slotARef.current;

    if (!outEl || !inEl) {
      isAnimatingRef.current = false;
      return;
    }

    const isBottomUp = index !== 0;

    inEl.querySelector("img").src = incoming;
    inEl.style.transition = "none";
    inEl.style.clipPath = isBottomUp
      ? "inset(100% 0 0 0)"
      : "inset(0 0 100% 0)";
    inEl.style.zIndex = "2";
    outEl.style.zIndex = "1";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        inEl.style.transition =
          "clip-path 1600ms cubic-bezier(0.76, 0, 0.24, 1)";
        inEl.style.clipPath = "inset(0% 0 0% 0)";
      });
    });

    setTimeout(() => {
      outEl.style.transition = "none";
      outEl.style.clipPath = isBottomUp
        ? "inset(100% 0 0 0)"
        : "inset(0 0 100% 0)";
      activeSlotRef.current = activeSlot === "A" ? "B" : "A";
      isAnimatingRef.current = false;
    }, 1650);
  };

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setActiveFeature((prev) => {
        const next = (prev + 1) % features.length;

        switchTo(next);

        return next;
      });
    }, INTERVAL);
  }, []);

  useEffect(() => {
    // Promote slots to their own GPU layers immediately on mount
    if (slotARef.current) {
      slotARef.current.style.clipPath = "inset(0% 0 0 0)";

      slotARef.current.style.zIndex = "1";
      slotARef.current.style.willChange = "clip-path";
    }

    if (slotBRef.current) {
      slotBRef.current.style.clipPath = "inset(100% 0 0 0)";

      slotBRef.current.style.zIndex = "2";
      slotBRef.current.style.willChange = "clip-path";
    }
    const timeout = setTimeout(startTimer, 400);

    return () => {
      clearTimeout(timeout);
      clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleFeatureClick = (fi) => {
    if (fi === activeFeature || isAnimatingRef.current) return;

    clearInterval(timerRef.current);
    setActiveFeature(fi);
    switchTo(fi);
    startTimer();
  };

  useEffect(() => {
    features.forEach((feature) => {
      const img = new Image();
      img.src = feature.image;
    });
  }, []);
  return (
    <section className="btp-section">
      <div className="container-fluid px-0">
        <div className="row g-0 align-items-stretch">
          <div
            className="col-xl-4 col-lg-5
 col-md-5 btp-content-col"
          >
            {" "}
            <div className="btp-static-header">
              <h2 className="btp-headline">Built to Perform</h2>
              <div className="btp-feature-desc-wrapper"></div>
              <p className="btp-subtext">
                Designed for smooth multitasking and fast, consistent
                performance.
              </p>
            </div>
            <div className="btp-feature-list">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`btp-feature-item${
                    activeFeature === i ? " active" : ""
                  }`}
                  onClick={() => handleFeatureClick(i)}
                >
                  <div style={{ width: "100%" }}>
                    <div className="btp-feature-title">{f.title}</div>
                    <div className="btp-feature-desc-wrapper">
                      <p className="btp-feature-desc">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-xl-8 col-lg-7 col-md-7 btp-images-col">
            {" "}
            <div className="btp-monitor-wrapper">
              <div className="btp-screen-container">
                <div ref={slotARef} className="btp-slot">
                  <img
                    height={FEATURE_IMAGE_HEIGHT}
                    width={FEATURE_IMAGE_WIDTH}
                    src={features[0].image}
                    alt="feature A"
                    className="btp-screen-img"
                    loading="lazy"
                  />
                </div>
                <div ref={slotBRef} className="btp-slot">
                  <img
                    src=""
                    alt="feature B"
                    className="btp-screen-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
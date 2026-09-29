
import { useEffect, useRef, useState } from "react";

const imageModules = import.meta.glob(
  "../../Assets/client2/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}",
  {
    eager: true,
    import: "default",
  },
);

const images = Object.values(imageModules);

export default function ClientCarousel() {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(0);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const n = images.length;

  /* ============================================================
     RESPONSIVE VALUES
     ============================================================ */

  let cardWidth = 100;
  let cardHeight = 70;
  let gap = 50;

  // Tablet
  if (screenWidth <= 1023) {
    cardWidth = 90;
    cardHeight = 60;
    gap = 35;
  }

  // Mobile
  if (screenWidth <= 768) {
    cardWidth = 80;
    cardHeight = 55;
    gap = 25;
  }

  // Small mobile
  if (screenWidth <= 480) {
    cardWidth = 70;
    cardHeight = 48;
    gap = 20;
  }

  const speed = 1;

  const STEP = cardWidth + gap;
  const totalWidth = n * STEP;

  // Double the images so it loops seamlessly
  const doubled = n > 0 ? [...images, ...images] : [];

  /* ============================================================
     HANDLE SCREEN RESIZE
     ============================================================ */

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ============================================================
     CAROUSEL ANIMATION
     ============================================================ */

  useEffect(() => {
    if (n === 0) return;

    const track = trackRef.current;

    // Reset position when screen size changes
    posRef.current = 0;

    function animate() {
      posRef.current -= speed;

      // Reset after one complete set
      if (Math.abs(posRef.current) >= totalWidth) {
        posRef.current = 0;
      }

      track.style.transform = `translateX(${posRef.current}px)`;

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [n, totalWidth, speed]);

  if (n === 0) {
    return <p style={{ color: "red" }}>No images found!</p>;
  }

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: `${gap}px`,
          willChange: "transform",
          width: "max-content",
          alignItems: "center",
        }}
      >
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`client-${i}`}
            draggable={false}
            width={cardWidth}
            height={cardHeight}
            style={{
              flexShrink: 0,
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              objectFit: "contain",
            }}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}


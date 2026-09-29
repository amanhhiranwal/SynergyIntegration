import { useEffect, useRef, useState, useCallback } from "react";
import "./FlexibleByDesign.css";
import image1 from "../../Assets/FlexibleByDesign/image1.webp";
import image2 from "../../Assets/FlexibleByDesign/image2.webp";
import image3 from "../../Assets/FlexibleByDesign/image3.webp";

const INTERVAL = 5000;

const features = [
  {
    title: "Right Angle Seamless Splicing",
    desc: "Perfect corner integration for L-shaped installations.",
    image: image1,
  },
  {
    title: "Concave & Convex Curving",
    desc: "Supports inward and outward curved configurations.",
    image: image2,
  },
  {
    title: "Flexible LED Modules",
    desc: "Enables creative shapes & dynamic visual installations.",
    image: image3,
  },
];

const FlexibleByDesign = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const timerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const slotARef = useRef(null);
  const slotBRef = useRef(null);
  const activeSlotRef = useRef("A");

  const switchTo = (index) => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const incoming = features[index].image;
    const activeSlot = activeSlotRef.current;
    const outEl = activeSlot === "A" ? slotARef.current : slotBRef.current;
    const inEl = activeSlot === "A" ? slotBRef.current : slotARef.current;

    if (!outEl || !inEl) return;

    const isBottomUp = index !== 0;

    /* UPDATE IMAGE */

    inEl.querySelector("img").src = incoming;

    /* RESET */

    inEl.style.transition = "none";

    inEl.style.clipPath = isBottomUp
      ? "inset(100% 0 0 0)"
      : "inset(0 0 100% 0)";

    inEl.style.zIndex = "3";

    outEl.style.zIndex = "2";

    /* FORCE PAINT */

    inEl.getBoundingClientRect();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        inEl.style.transition =
          "clip-path 2200ms cubic-bezier(0.76, 0, 0.24, 1)";

        inEl.style.clipPath = "inset(0% 0 0% 0)";
      });
    });

    setTimeout(() => {
      outEl.style.transition = "none";

      outEl.style.clipPath = "inset(0% 0 0% 0)";

      activeSlotRef.current = activeSlot === "A" ? "B" : "A";

      isAnimatingRef.current = false;
    }, 2250);
  };
  /* =========================================
     TIMER
  ========================================= */

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
    if (slotARef.current) {
      slotARef.current.style.clipPath = "inset(0% 0 0% 0)";
      slotARef.current.style.zIndex = "2";
    }

    if (slotBRef.current) {
      slotBRef.current.style.clipPath = "inset(100% 0 0 0)";
      slotBRef.current.style.zIndex = "1";
    }

    startTimer();

    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleFeatureClick = (index) => {
    if (index === activeFeature || isAnimatingRef.current) return;

    clearInterval(timerRef.current);

    setActiveFeature(index);

    switchTo(index);

    startTimer();
  };

  return (
    <section className="fbd-section">
      <div className="fbd-wrapper">
        {/* LEFT IMAGE */}
        <div className="fbd-left-container">
          <div className="fbd-image-wrapper">
            <div ref={slotARef} className="fbd-image-slot">
              <img
                src={features[0].image}
                alt="feature"
                className="fbd-image"
                loading="eager"
                decoding="async"
              />
            </div>

            <div ref={slotBRef} className="fbd-image-slot">
              <img
                src={features[1].image}
                alt="feature"
                className="fbd-image"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="fbd-right-container">
          <h2 className="fbd-heading">Flexible by Design</h2>

          <p className="fbd-subtext">
            Engineered for precision, collaboration, and real-time communication
          </p>

          <div className="fbd-feature-list">
            {features.map((feature, index) => {
              const isActive = activeFeature === index;

              return (
                <div
                  key={index}
                  className={`fbd-feature-item ${
                    isActive ? "active" : "inactive"
                  }`}
                  onClick={() => handleFeatureClick(index)}
                >
                  {/* LEFT BAR */}
                  <div className="fbd-bar">
                    {isActive && (
                      <div
                        key={activeFeature}
                        className="fbd-bar-fill"
                        style={{
                          animationDuration: `${INTERVAL}ms`,
                        }}
                      />
                    )}
                  </div>

                  <div className="fbd-feature-content">
                    <h3 className="fbd-feature-title">{feature.title}</h3>

                    <p className="fbd-feature-desc">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlexibleByDesign;
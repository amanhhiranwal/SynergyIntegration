import { useEffect, useRef, useState, useCallback } from "react";
import "./BuiltForClarity.css";
import image1 from "../../Assets/BuildForClarity/image2.webp";
import image2 from "../../Assets/BuildForClarity/image3.webp";
import image3 from "../../Assets/BuildForClarity/image1.webp";

const INTERVAL = 5000;

const features = [
  {
    title: "Automatic Brightness Adjustment",
    desc: "Adapts brightness and tone for every environment.",
    image: image1,
  },
  {
    title: "Adjustable Color Temperature",
    desc: "Warm-to-cool tones for precise visual ambiance.",
    image: image2,
  },
  {
    title: "7680Hz Ultra Refresh Rate",
    desc: "Smoother visuals with reduced flicker and motion blur.",
    image: image3,
  },
];

const BuiltForClarity = () => {
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
    inEl.querySelector("img").src = incoming;

    inEl.style.transition = "none";

    inEl.style.clipPath = isBottomUp
      ? "inset(100% 0 0 0)"
      : "inset(0 0 100% 0)";

    inEl.style.zIndex = "3";

    outEl.style.zIndex = "2";

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
    <section className="clarity-section">
      <div className="clarity-wrapper">
        <div className="clarity-left-container">
          <h2 className="clarity-heading">Built for Clarity</h2>

          <p className="clarity-subtext">
            Designed for smooth multitasking and fast, consistent performance.
          </p>

          <div className="clarity-feature-list">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`clarity-feature-item ${
                  activeFeature === index ? "active" : "inactive"
                }`}
                onClick={() => handleFeatureClick(index)}
              >
                <div className="clarity-bar">
                  {activeFeature === index && (
                    <div
                      key={activeFeature}
                      className="clarity-bar-fill"
                      style={{
                        animationDuration: `${INTERVAL}ms`,
                      }}
                    />
                  )}
                </div>

                <div className="clarity-feature-content">
                  <h3 className="clarity-feature-title">{feature.title}</h3>

                  <p className="clarity-feature-desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="clarity-right-container">
          <div className="clarity-image-wrapper">
            <div ref={slotARef} className="bfc-image-slot">
              <img
                src={features[0].image}
                alt="feature"
                className="clarity-image"
                loading="eager"
                decoding="async"
              />
            </div>

            <div ref={slotBRef} className="bfc-image-slot">
              <img
                src={features[1].image}
                alt="feature"
                className="clarity-image"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltForClarity;
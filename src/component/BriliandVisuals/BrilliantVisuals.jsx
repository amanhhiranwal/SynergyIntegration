import { useState, useRef, useEffect } from "react";
import "./BrilliantVisuals.css";
import {
  SIGNAGE_FEATURES,
  IMAGE_INTERVAL,
  DEVICE_FRAME,
  FEATURE_LAYOUTS,
} from "./data.js";
import MobileNav from "../MobileNav/MobileNav.jsx";


export default function BrilliantVisuals() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prevImageIndex, setPrevImageIndex] = useState(null);

  const timeoutsRef = useRef([]);

  const clearSequence = () => {
    timeoutsRef.current.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });

    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (isPaused) {
      clearSequence();
      return;
    }

    const feature = SIGNAGE_FEATURES[activeIndex];
    const images = feature.images || [];
    const imageCount = Math.max(images.length, 1);

    for (let i = 1; i < imageCount; i++) {
      const timeoutId = setTimeout(() => {
        setImageIndex((previousIndex) => {
          setPrevImageIndex(previousIndex);
          return i;
        });
      }, i * IMAGE_INTERVAL);

      timeoutsRef.current.push(timeoutId);
    }

    const nextFeatureTimeout = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % SIGNAGE_FEATURES.length;
      setImageIndex(0);
      setPrevImageIndex(null);
      setActiveIndex(nextIndex);
    }, imageCount * IMAGE_INTERVAL);

    timeoutsRef.current.push(nextFeatureTimeout);

    return () => {
      clearSequence();
    };
  }, [activeIndex, isPaused]);

  const handleSelect = (index) => {
    if (index === activeIndex) {
      return;
    }

    clearSequence();
    setImageIndex(0);
    setPrevImageIndex(null);
    setActiveIndex(index);
    setIsPaused(false);
  };

  const layout = FEATURE_LAYOUTS[activeIndex];

  return (
    <section className="bv-section" data-active-index={activeIndex}>
      {/* ================= LEFT ================= */}

      <div className="bv-left">
        <div
          className="bv-left-stage"
          style={{
            "--bv-dx": layout.device.x,
            "--bv-dy": layout.device.y,
            "--bv-dscale": layout.device.scale,
          }}
        >
          <div className="bv-device">
            {SIGNAGE_FEATURES.map((feature, featureIndex) => {
              const isActiveTab = featureIndex === activeIndex;

              const animationClass =
                feature.imageAnimation === "reveal" ? "reveal" : "fade";

              return (
                <div
                  key={feature.id}
                  className={`bv-tab-image-stack${
                    isActiveTab ? " active" : ""
                  }`}
                >
                  {feature.images.map((src, imageIndexForFeature) => {
                    const isActiveImage =
                      isActiveTab && imageIndexForFeature === imageIndex;

                    const isRealTransition = prevImageIndex !== null;

                    const isPreviousImage =
                      isActiveTab &&
                      isRealTransition &&
                      imageIndexForFeature === prevImageIndex;

                    let stateClass = "";

                    if (isActiveImage) {
                      stateClass =
                        animationClass === "reveal" && !isRealTransition
                          ? " initial"
                          : " active";
                    }

                    if (isPreviousImage) {
                      stateClass += " previous";
                    }

                    return (
                      <img
                        key={imageIndexForFeature}
                        src={src}
                        alt={feature.title}
                        className={`bv-device-image ${animationClass}${stateClass}`}
                      />
                    );
                  })}

                  {feature.shine && isActiveTab && (
                    <div
                      key={`${feature.id}-shine-${activeIndex}-${imageIndex}`}
                      className="bv-screen-shine"
                    />
                  )}
                </div>
              );
            })}

            <img src={DEVICE_FRAME} alt="" className="bv-device-frame" />

            <div className="bv-device-popup-layer">
              {SIGNAGE_FEATURES.map((feature, featureIndex) =>
                feature.popup ? (
                  <div
                    key={feature.id}
                    className={`bv-device-popup${
                      featureIndex === activeIndex ? " active" : ""
                    }`}
                  >
                    <img
                      src={feature.popup.image}
                      alt=""
                      className="bv-device-popup-image"
                    />
                  </div>
                ) : null,
              )}
            </div>
          </div>

          {/* ================= HEADING ================= */}

          <div
            className="bv-heading-stack"
            aria-live="polite"
            style={{
              "--bv-hx": layout.heading.x,
              "--bv-hy": layout.heading.y,
            }}
          >
            {SIGNAGE_FEATURES.map((feature, featureIndex) => (
              <h2
                key={feature.id}
                className={`bv-heading${
                  featureIndex === activeIndex
                    ? " active"
                    : featureIndex < activeIndex
                      ? " exit-up"
                      : " exit-down"
                }`}
              >
                {feature.heading[0]}
                <br />
                {feature.heading[1]}
              </h2>
            ))}
          </div>
        </div>
      </div>

     <MobileNav
  items={SIGNAGE_FEATURES.map((f) => ({
    id: f.id,
    icon: f.icon,
    title: f.title,
    desc: f.description,
  }))}
  activeIndex={activeIndex}
  onChange={handleSelect}
  onFocus={() => setIsPaused(true)}
  onBlur={() => setIsPaused(false)}
  ariaLabel="Signage features"
  className="bv-mobile-nav"
/>

      {/* ================= RIGHT ================= */}

      <div className="bv-right">
        <h3 className="bv-title">Signage</h3>

        <p className="bv-subtitle">
          Clear and elegant signage solutions for every indoor and outdoor
          space.
        </p>

        <div
          className="bv-accordion"
          role="tablist"
          aria-label="Signage features"
        >
          {SIGNAGE_FEATURES.map((feature, featureIndex) => {
            const isActive = featureIndex === activeIndex;

            return (
              <button
                key={feature.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-expanded={isActive}
                className={`bv-accordion-item${isActive ? " active" : ""}`}
                onClick={() => handleSelect(featureIndex)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
              >
                <span className="bv-accordion-header">
                  <span className="bv-icon">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className={feature.iconClass}
                    />
                  </span>

                  <span className="bv-accordion-title">{feature.title}</span>
                </span>

                <div className="bv-accordion-body-wrapper">
                  <div className="bv-accordion-body">
                    <p>{feature.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
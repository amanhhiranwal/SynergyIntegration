import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import "./SmartDisplay.css";
import { SMART_FEATURES, TEXT_LAYOUT } from "./data.js";
import MobileNav from "../MobileNav/MobileNav.jsx"; 

export default function SmartDisplay() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const timeoutsRef = useRef([]);
  const activeIndexRef = useRef(activeIndex);

  const currentImageRef = useRef(null);
const [outgoingImage, setOutgoingImage] = useState(null);
const outgoingTimeoutRef = useRef(null);

const sectionRef = useRef(null);
const [isInView, setIsInView] = useState(false);

useEffect(() => {
  const node = sectionRef.current;
  if (!node) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // fire once, then stop watching
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(node);
  return () => observer.disconnect();
}, []);

// snapshot whatever was on screen right before the tab switches,
// then fade it out to reveal the new tab's image underneath
useEffect(() => {
  if (currentImageRef.current) {
    if (outgoingTimeoutRef.current) clearTimeout(outgoingTimeoutRef.current);
    setOutgoingImage(currentImageRef.current);
    outgoingTimeoutRef.current = setTimeout(() => {
      setOutgoingImage(null);
    }, 550);
  }
  return () => {
    if (outgoingTimeoutRef.current) clearTimeout(outgoingTimeoutRef.current);
  };
}, [activeIndex]);

// keep the ref in sync with whichever image is currently visible
useEffect(() => {
  const feat = SMART_FEATURES[activeIndex];
  currentImageRef.current = feat?.images?.[imageIndex] ?? null;
}, [activeIndex, imageIndex]);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [textState, setTextState] = useState("visible"); // "visible" | "hiding" | "hidden"
  const textTimeoutsRef = useRef([]);
  const isFirstRender = useRef(true);


  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    textTimeoutsRef.current.forEach(clearTimeout);
    textTimeoutsRef.current = [];

    setTextState("hiding");

    textTimeoutsRef.current.push(
      setTimeout(() => {
        setDisplayedIndex(activeIndex);
        setTextState("hidden");
      }, 280),
    );

    textTimeoutsRef.current.push(
      setTimeout(() => {
        setTextState("visible");
      }, 320),
    );

    return () => textTimeoutsRef.current.forEach(clearTimeout);
  }, [activeIndex]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const clearSequence = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const runSequence = useCallback(() => {
    clearSequence();

    const feature = SMART_FEATURES[activeIndexRef.current];
    const images = feature?.images || [];

    setImageIndex(0);

    const imageCount = Math.max(images.length, 1);
    const duration = feature?.duration ?? 5000;

    for (let i = 1; i < imageCount; i++) {
      timeoutsRef.current.push(
        setTimeout(() => {
          setImageIndex(i);
        }, i * duration),
      );
    }

    timeoutsRef.current.push(
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % SMART_FEATURES.length);
      }, duration),
    );
  }, [clearSequence]);

  useEffect(() => {
    if (isPaused || !isInView) return;
    const id = setTimeout(() => {
      runSequence();
    }, 0);
    return () => {
      clearTimeout(id);
      clearSequence();
    };
  }, [activeIndex, isPaused, isInView,  runSequence, clearSequence]);

  const handleSelect = (index) => {
    if (index === activeIndexRef.current) return;
    clearSequence();
    setIsPaused(false);
    activeIndexRef.current = index;
    setImageIndex(0);
    setActiveIndex(index);
  };

  const feature = SMART_FEATURES[activeIndex];

  return (
    <div className="smd-section" ref={sectionRef}>
        <div className="smd-mobile-header">
    <h3 className="smd-title">Smart Display</h3>
    <p className="smd-subtitle">
      Dynamic versatility meets seamless integration.
    </p>
  </div>
      <div className="smd-left">
        <div className="smd-device-viewport">
          <div
            className={`smd-right-text${
              textState === "visible"
                ? " visible"
                : textState === "hiding"
                  ? " hiding"
                  : ""
            }`}
            style={TEXT_LAYOUT[displayedIndex]}
          >
            <h3>
              {SMART_FEATURES[displayedIndex].heading
                .split("\n")
                .map((line, i, arr) => (
                  <Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </Fragment>
                ))}
            </h3>
          </div>

          <div
            className={`smd-device${
              feature.deviceOverall ? ` ${feature.deviceOverall}` : ""
            }`}
            style={{
              "--smd-device-top": TEXT_LAYOUT[activeIndex]?.deviceTop || "20%",
            }}
          >
            {feature.signalArcs && (
              <div className="smd-signal-wrap" key={`signal-${activeIndex}`}>
                {feature.signalArcs.map((src, i) => (
                  <img
                    key={`r-${i}`}
                    src={src}
                    alt=""
                    className={`smd-signal smd-signal-right smd-signal-frame-${i + 1}`}
                  />
                ))}
              </div>
            )}
            <div
              className={`smd-device-upper${feature.deviceAnim ? ` ${feature.deviceAnim}` : ""}`}
            >
              <div className="smd-device-screen" key={`screen-${activeIndex}`}>
                {feature.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={feature.title}
                    className={`smd-device-image${
                      idx === imageIndex ? " active" : ""
                    }`}
                  />
                ))}
              </div>
              {outgoingImage && (
  <div className="smd-image-crossfade" key={outgoingImage}>
    <img src={outgoingImage} alt="" />
  </div>
)}

              <img src={feature.frame} alt="" className="smd-device-frame" />
            </div>

            <img
              src={feature.bottomFrame}
              alt=""
              className="smd-device-bottom-frame"
            />
          </div>
        </div>
      </div>

      <div className="smd-right">
        <h3 className="smd-title">Smart Display</h3>
        <p className="smd-subtitle">
          Dynamic versatility meets seamless integration.
        </p>

        <div
          className="smd-accordion"
          role="tablist"
          aria-label="Smart display features"
        >
          {SMART_FEATURES.map((f, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-expanded={active}
                className={`smd-accordion-item${active ? " active" : ""}`}
                onClick={() => handleSelect(index)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
              >
                <span className="smd-accordion-header">
                  <span className="smd-icon">
                    <img src={f.icon} alt={f.title} />
                  </span>
                  <span className="smd-accordion-title"> {f.title} </span>
                </span>
                <div className="smd-accordion-body-wrapper">
                  <div className="smd-accordion-body">
                    <p>{f.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <MobileNav
  items={SMART_FEATURES}
  activeIndex={activeIndex}
  onChange={handleSelect}
  onFocus={() => setIsPaused(true)}
  onBlur={() => setIsPaused(false)}
  ariaLabel="Smart display features"
/>
      </div>
    </div>
  );
}
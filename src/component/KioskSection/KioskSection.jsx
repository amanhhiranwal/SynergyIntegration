import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { KIOSK_FEATURES, TEXT_LAYOUT, ANIM_FINAL_TRANSFORM } from "./data.js";
import "./Style.css";

// 1. Import the reusable mobile navigation component
import MobileFeatureNav from "../MobileNav/MobileNav.jsx";

const TOUCH_SEQUENCE = [
  { top: "15%", left: "25%" },
  { top: "30%", left: "55%" },
  { top: "25%", left: "35%" },
  { top: "10%", left: "70%" },
];

const TAP_DURATION = 900;
const TAP_GAP = 150;

/*
  deviceKey controls when the device div is remounted.
  - Forward nav:  increment forwardKey → remount → CSS keyframe fires
  - Backward nav: keep key stable      → no remount → transition drives it
*/

const KioskSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const timeoutsRef = useRef([]);
  const activeIndexRef = useRef(activeIndex);

  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [textState, setTextState] = useState("visible");
  const textTimeoutsRef = useRef([]);
  const isFirstRender = useRef(true);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  /* ── Device key: only bump on forward nav so CSS anim re-fires ── */
  const [deviceKey, setDeviceKey] = useState(0);

  /* ── Backward-transition inline style ── */
  /*
    null   → let CSS class + animation run normally
    object → override with inline style (suppresses keyframe via animationName:none)
  */
  const [deviceStyle, setDeviceStyle] = useState(null);
  const backwardRafRef = useRef(null);
  const backwardTimerRef = useRef(null);

  /* ── Touch point state ── */
  const [touchPoints, setTouchPoints] = useState([]);
  const touchTimersRef = useRef([]);
  const touchIdCounter = useRef(0);

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
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const clearTouchSequence = useCallback(() => {
    touchTimersRef.current.forEach(clearTimeout);
    touchTimersRef.current = [];
    setTouchPoints([]);
  }, []);

  const runTouchSequence = useCallback(() => {
    touchTimersRef.current.forEach(clearTimeout);
    touchTimersRef.current = [];

    const scheduleLoop = () => {
      TOUCH_SEQUENCE.forEach((pos, i) => {
        const appearAt = i * (TAP_DURATION + TAP_GAP);
        const t = setTimeout(() => {
          if (activeIndexRef.current !== 0) return;
          const id = ++touchIdCounter.current;
          setTouchPoints((prev) => [
            ...prev,
            { id, top: pos.top, left: pos.left },
          ]);
          const removeT = setTimeout(() => {
            setTouchPoints((prev) => prev.filter((p) => p.id !== id));
          }, TAP_DURATION + 80);
          touchTimersRef.current.push(removeT);
        }, appearAt);
        touchTimersRef.current.push(t);
      });

      const loopAt = TOUCH_SEQUENCE.length * (TAP_DURATION + TAP_GAP) + TAP_GAP;
      const loopT = setTimeout(() => {
        if (activeIndexRef.current === 0) scheduleLoop();
      }, loopAt);
      touchTimersRef.current.push(loopT);
    };

    scheduleLoop();
  }, []);

  useEffect(() => {
    if (activeIndex === 0 && !isPaused && isInView) {
      const startT = setTimeout(runTouchSequence, 950);
      return () => {
        clearTimeout(startT);
        clearTouchSequence();
      };
    }
    const clearT = setTimeout(clearTouchSequence, 0);
    return () => clearTimeout(clearT);
  }, [activeIndex, isPaused, runTouchSequence, isInView, clearTouchSequence]);

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
    const feature = KIOSK_FEATURES[activeIndexRef.current];
    const images = feature?.images || [];
    setImageIndex(0);
    const imageCount = Math.max(images.length, 1);
    const duration = feature?.duration ?? 5000;

    for (let i = 1; i < imageCount; i++) {
      timeoutsRef.current.push(setTimeout(() => setImageIndex(i), i * duration));
    }

    timeoutsRef.current.push(
      setTimeout(() => {
        /* Autoplay always goes forward */
        const next = (activeIndexRef.current + 1) % KIOSK_FEATURES.length;

        /* Forward: bump key so CSS entrance animation fires */
        setDeviceStyle(null);
        setDeviceKey((k) => k + 1);
        activeIndexRef.current = next;
        setImageIndex(0);
        setActiveIndex(next);
      }, imageCount * duration),
    );
  }, [clearSequence]);

  useEffect(() => {
    if (isPaused || !isInView) return;
    const id = setTimeout(runSequence, 0);
    return () => {
      clearTimeout(id);
      clearSequence();
    };
  }, [activeIndex, isPaused, isInView, runSequence, clearSequence]);

  /* ── Manual tab selection ── */
  const handleSelect = (index) => {
    if (index === activeIndexRef.current) return;

    const prev = activeIndexRef.current;

    /*
      Backward = user clicked a tab whose index is less than the current
      one.
    */
    const isBackward = index < prev;

    clearSequence();

    /* Cancel any in-progress backward animation */
    if (backwardRafRef.current) cancelAnimationFrame(backwardRafRef.current);
    if (backwardTimerRef.current) clearTimeout(backwardTimerRef.current);

    if (isBackward) {
      const fromTransform =
        ANIM_FINAL_TRANSFORM[KIOSK_FEATURES[prev].animation] ?? "none";
      const toTransform =
        ANIM_FINAL_TRANSFORM[KIOSK_FEATURES[index].animation] ?? "none";

      /*
        Step 1 — snap to the current tab's final position with no transition
      */
      setDeviceStyle({
        transform: fromTransform,
        opacity: 1,
        transition: "none",
        animationName: "none",
      });

      /* Update tab content immediately */
      activeIndexRef.current = index;
      setImageIndex(0);
      setActiveIndex(index);
      setIsPaused(false);

      /*
        Step 2 — apply the "to" transform with a transition
      */
      backwardRafRef.current = requestAnimationFrame(() => {
        backwardRafRef.current = requestAnimationFrame(() => {
          setDeviceStyle({
            transform: toTransform,
            opacity: 1,
            transition:
              "transform 0.75s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            animationName: "none",
          });

          /*
            Step 3 — lock the style at the final transform
          */
          backwardTimerRef.current = setTimeout(() => {
            setDeviceStyle({
              transform: toTransform,
              opacity: 1,
              animationName: "none",
              transition: "none",
            });
          }, 800);
        });
      });
    } else {
      /* Forward transition */
      setDeviceStyle(null);
      setDeviceKey((k) => k + 1);
      setIsPaused(false);
      activeIndexRef.current = index;
      setImageIndex(0);
      setActiveIndex(index);
    }
  };

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      if (backwardRafRef.current) cancelAnimationFrame(backwardRafRef.current);
      if (backwardTimerRef.current) clearTimeout(backwardTimerRef.current);
    };
  }, []);

  const currentFeature = KIOSK_FEATURES[activeIndex];

  return (
    <div className="ksd-section" ref={sectionRef}>
      <div className="ksd-left">
        <h3 className="ksd-title">Kiosk</h3>
        <p className="ksd-subtitle">
          Streamline transactions while maintaining premium brand experience.
        </p>

        <div className="ksd-accordion" role="tablist" aria-label="Kiosk features">
          {KIOSK_FEATURES.map((f, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-expanded={active}
                className={`ksd-accordion-item${active ? " active" : ""}`}
                onClick={() => handleSelect(index)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
              >
                <span className="ksd-accordion-header">
                  <span className="ksd-icon">
                    <img src={f.icon} alt={f.title} />
                  </span>
                  <span className="ksd-accordion-title">{f.title}</span>
                </span>
                <div className="ksd-accordion-body-wrapper">
                  <div className="ksd-accordion-body">
                    <p>{f.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="ksd-right">
        <div className="ksd-device-viewport">
          {currentFeature.signalArcs && (
            <div
              className="ksd-signal-wrap"
              key={`signal-${activeIndex}`}
              aria-hidden="true"
            >
              {currentFeature.signalArcs.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className={`ksd-signal ksd-signal-frame-${i + 1}`}
                />
              ))}
            </div>
          )}

          <div
            key={deviceKey}
            className={`ksd-device anim-${currentFeature.animation}`}
            style={deviceStyle ?? undefined}
          >
            <div className="ksd-device-screen" key={activeIndex}>
              {currentFeature.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={currentFeature.title}
                  className={`ksd-device-image${idx === imageIndex ? " active" : ""}`}
                />
              ))}
            </div>

            <div className="ksd-moving-circle">
              {currentFeature.hasMultiTouch && (
                <div className="ksd-touch-layer" aria-hidden="true">
                  {touchPoints.map((point) => (
                    <span
                      key={point.id}
                      className="ksd-touch-point"
                      style={{ top: point.top, left: point.left }}
                    >
                      <span className="ring" />
                      <span className="ring2" />
                      <span className="core" />
                    </span>
                  ))}
                </div>
              )}
            </div>

            <img src={currentFeature.frame} alt="" className="ksd-device-frame" />

            {currentFeature.hasPopup && (
              <img src={currentFeature.popUp} alt="" className="ksd-device-popup" />
            )}
          </div>

       <div
  data-text-index={displayedIndex}
  style={TEXT_LAYOUT[displayedIndex]}
  className={`ksd-right-text${
    textState === "visible"
      ? " visible"
      : textState === "hiding"
        ? " hiding"
        : ""
  }`}
>
            <h3>
              {KIOSK_FEATURES[displayedIndex].heading
                .split("\n")
                .map((line, i, arr) => (
                  <Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </Fragment>
                ))}
            </h3>
          </div>
        </div>
      </div>

      {/* 2. REUSED REFACTORED MOBILE NAV COMPONENT ── */}
      <MobileFeatureNav
        items={KIOSK_FEATURES}
        activeIndex={activeIndex}
        onChange={handleSelect}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        prefix="ksd"
      />
    </div>
  );
};

export default KioskSection;
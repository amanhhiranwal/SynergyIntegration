import { useRef, useState, useCallback, useEffect } from "react";
import "./PowerfulPresence.css";
import baseImg from "../../Assets/product-page/presence-base-img.webp";
import overlayImg from "../../Assets/product-page/presence-overlay-img.webp";
import leftArrow from "../../Assets/product-page/left-arrow.svg";
import rightArrow from "../../Assets/product-page/right-arrow.svg";

const PowerfulPresence = () => {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const animFrameRef = useRef(null);
  const positionRef = useRef(null);

  const [sliderPosition, setSliderPosition] = useState(null);
  const [limits, setLimits] = useState({
    min: 2,
    max: 98,
  });

  const getMinMax = useCallback(() => {
    if (!containerRef.current) {
      return { min: 2, max: 98 };
    }

    const width = containerRef.current.getBoundingClientRect().width;

    let padding;

    if (width >= 1400) {
      padding = 10;
    } else if (width >= 1024) {
      padding = 8;
    } else if (width >= 768) {
      padding = 4;
    } else if (width >= 480) {
      padding = 1.5;
    } else {
      padding = 0.5;
    }

    const result = {
      min: padding,
      max: 100 - padding,
    };

    setLimits(result);

    return result;
  }, []);

  const clamp = useCallback(
    (value) => {
      const { min, max } = getMinMax();
      return Math.max(min, Math.min(max, value));
    },
    [getMinMax],
  );

  const applyPosition = useCallback((pos) => {
    positionRef.current = pos;
    setSliderPosition(pos);
  }, []);

  useEffect(() => {
    const measure = () => {
      const { min } = getMinMax();

      if (positionRef.current == null) {
        applyPosition(min);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [getMinMax, applyPosition]);

  const { min, max } = limits;
  const midpoint = (min + max) / 2;

  const activeTab =
    sliderPosition === null || sliderPosition <= midpoint ? "silver" : "black";

  const showRight = sliderPosition === null || sliderPosition <= midpoint;

  const animateTo = useCallback(
    (targetPosition) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const clamped = clamp(targetPosition);
      const duration = 480;
      const startTime = performance.now();
      const startPosition = positionRef.current ?? clamped;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        applyPosition(startPosition + (clamped - startPosition) * eased);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          applyPosition(clamped);
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(animate);
    },
    [clamp, applyPosition],
  );

  const handleMove = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const raw = ((clientX - rect.left) / rect.width) * 100;
      applyPosition(clamp(raw));
    },
    [clamp, applyPosition],
  );

  const handleRelease = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const current = positionRef.current ?? 50;
    const { min, max } = getMinMax();
    const mid = (min + max) / 2;
    animateTo(current >= mid ? max : min);
  }, [animateTo, getMinMax]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };
    const onMouseUp = () => handleRelease();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [handleMove, handleRelease]);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      isDragging.current = true;
      handleMove(e.clientX);
    },
    [handleMove],
  );

  const handleTouchStart = useCallback(
    (e) => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      isDragging.current = true;
      handleMove(e.touches[0].clientX);
    },
    [handleMove],
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      handleMove(e.touches[0].clientX);
    },
    [handleMove],
  );

  const handleTouchEnd = useCallback(() => {
    handleRelease();
  }, [handleRelease]);

  const handleTabClick = useCallback(
    (tab) => {
      const { min, max } = getMinMax();
      animateTo(tab === "silver" ? min : max);
    },
    [animateTo, getMinMax],
  );

  if (sliderPosition === null) {
    return (
      <section className="powerful-presence-sec">
        <div className="container-main">
          <div className="image-container" ref={containerRef} />
        </div>
      </section>
    );
  }

  return (
    <section className="powerful-presence-sec">
      <div className="container-main">
        {/* TEXT CONTENT */}
        <div className="text-container">
          <h3>Two Finishes. One Powerful Presence.</h3>
          <p>
            Seamlessly blend into modern classrooms, training rooms, and
            corporate environments.
          </p>
        </div>

        {/* TOGGLE TABS */}
        <div className="toggle-tabs">
          <button
            className={`tab ${activeTab === "silver" ? "active" : ""}`}
            onClick={() => handleTabClick("silver")}
          >
            <span className="dot silver-dot"></span>
            Silver
          </button>
          <button
            className={`tab ${activeTab === "black" ? "active" : ""}`}
            onClick={() => handleTabClick("black")}
          >
            <span className="dot black-dot"></span>
            Black
          </button>
        </div>

        <div
          className="image-container"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="right-image-wrapper">
            <img
              src={baseImg}
              alt="Black Finish"
              draggable={false}
              loading="lazy"
            />
          </div>
          <div
            className="left-image-wrapper"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={overlayImg}
              alt="Silver Finish"
              draggable={false}
              loading="lazy"
            />
          </div>

          <div
            className="slider-divider"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="slider-bar" aria-hidden="true" />

            <div className="slider-chevron">
              <img
                src={rightArrow}
                alt=""
                className={`chevron-icon ${showRight ? "chevron-visible" : "chevron-hidden"}`}
                draggable={false}
                loading="lazy"
              />
              <img
                src={leftArrow}
                alt=""
                className={`chevron-icon ${!showRight ? "chevron-visible" : "chevron-hidden"}`}
                draggable={false}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowerfulPresence;
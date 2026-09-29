import { useState, useRef, useCallback, useEffect } from "react";
import "./intelligentWorkspace.css";

export default function IntelligentWorkspaces({ image1, image2 }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updateSlider = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(pct);
  }, []);

  const onMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onMouseMove = useCallback(
    (e) => {
      if (isDragging) updateSlider(e.clientX);
    },
    [isDragging, updateSlider],
  );
  const onMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <>
      <div className="iw-hero">
        <div
          ref={containerRef}
          className="iw-compare"
          style={{ "--pos": `${sliderPos}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={(e) => {
            setIsDragging(true);
            updateSlider(e.touches[0].clientX);
          }}
          onTouchMove={(e) => updateSlider(e.touches[0].clientX)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* Both layers are absolutely positioned at inset:0, so the
              container — not the image — determines the box. */}
          <img
            className="iw-img-right"
            src={image1}
            alt="The Smart Classroom – Reimagined"
            draggable={false}
            loading="lazy"
            decoding="async"
          />

          <img
            className="iw-img-left"
            src={image2}
            alt="Intelligent Workspaces"
            draggable={false}
            loading="lazy"
            decoding="async"
          />

          <div className="iw-divider" style={{ left: `${sliderPos}%` }} />

          <div
            className={`iw-handle ${isDragging ? "dragging" : "hint"}`}
            style={{ left: `${sliderPos}%` }}
            onMouseDown={onMouseDown}
          >
            <svg
              viewBox="0 0 28 28"
              fill="none"
              stroke="#1a2340"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="11,7 5,14 11,21" />
              <polyline points="17,7 23,14 17,21" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
import { useState, useEffect, useRef } from "react";
import { ptzTabs } from "./data";
import "./PtzCamera.css";
import MobileNav from "../MobileNav/MobileNav.jsx";

const TRANSITION_MS = 500; // must match --ptz-transition in CSS
let layerId = 0;

/* ------------------------------------------------------------------
   One tab's content. Mounts fresh on every switch, so every CSS
   animation replays and each layer owns its own zoom timers.
------------------------------------------------------------------ */
const PtzLayer = ({ tab, isInView }) => {
  const animationName = tab.animation;
  const [zoomLevel, setZoomLevel] = useState(4);
  const timersRef = useRef([]);
  

// useEffect(() => {
//   if (animationName !== "zoom" || !isInView) return;

//   setZoomLevel(4);

//   timersRef.current = [
//     setTimeout(() => setZoomLevel(8), 1800),
//     setTimeout(() => setZoomLevel(12), 3600),
//   ];

//   return () => {
//     timersRef.current.forEach(clearTimeout);
//     timersRef.current = [];
//   };
// }, [animationName, isInView]);

useEffect(() => {
  if (animationName !== "zoom" || !isInView) return;

  timersRef.current = [
    setTimeout(() => setZoomLevel(4), 0),
    setTimeout(() => setZoomLevel(8), 1800),
    setTimeout(() => setZoomLevel(12), 3600),
  ];

  return () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };
}, [animationName, isInView]);

  const isMulti = animationName === "hd" || animationName === "framing";

  return (
    <>
      <div className="ptz-icon-wrapper">
        <img src={tab.icon} alt={tab.title} className="ptz-icon" />
      </div>

      <p className="ptz-description">{tab.description}</p>

      <div className="ptz-image-wrapper">
        {/* single-image tabs only (zoom / wide) */}
        {!isMulti && (
          <img
            src={tab.image}
            alt={tab.title}
            className={`ptz-image ptz-anim-${animationName} ${
              animationName === "zoom" ? `ptz-zoom-${zoomLevel}` : ""
            }`}
          />
        )}

        {/* ===== ZOOM ===== */}
        {animationName === "zoom" && (
          <>
            <div className="ptz-reticle ptz-reticle-visible">
              <div className="ptz-reticle-hline-left" />
              <div className="ptz-reticle-hline-right" />
              <div className="ptz-reticle-vline-top" />
              <div className="ptz-reticle-vline-bottom" />
              <div className="ptz-reticle-box" />
            </div>
            <div className="ptz-zoom-label">{zoomLevel}x</div>
          </>
        )}

        {/* ===== WIDE ===== */}
        {animationName === "wide" && (
          <div className="ptz-wide-overlay">
            <div className="ptz-wide-line ptz-wide-line-left" />
            <div className="ptz-wide-line ptz-wide-line-right" />

            <svg
              className="ptz-wide-arc"
              viewBox="0 0 200 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 20 90 A 80 80 0 0 1 180 90"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <div className="ptz-wide-text">72.5 Degree</div>
          </div>
        )}

        {/* ===== HD ===== */}
        {animationName === "hd" && (
          <>
            <div className="ptz-hd-base" aria-hidden="true">
              <div className="ptz-hd-collage">
                <img src={tab.image[0]} alt="" />
                <img src={tab.image[1]} alt="" />
                <img src={tab.image[2]} alt="" />
              </div>
            </div>

            <div className="ptz-hd-clear" aria-hidden="true">
              <div className="ptz-hd-collage">
                <img src={tab.image[0]} alt="" />
                <img src={tab.image[1]} alt="" />
                <img src={tab.image[2]} alt="" />
              </div>
            </div>

            <div className="ptz-hd-overlay" aria-hidden="true">
              <div className="ptz-hd-shine" />
            </div>
          </>
        )}

        {/* ===== AUTO FRAMING ===== */}
        {animationName === "framing" && (
          <div className="ptz-frame-stage">
            <div className="ptz-frame-main">
              <img src={tab.image[0]} alt="" className="ptz-frame-img" />
              <div className="ptz-frame-box">
                <div className="ptz-frame-box-inner" />
              </div>
            </div>

            <div className="ptz-frame-side">
              <img
                src={tab.image[1]}
                alt=""
                className="ptz-frame-img ptz-frame-side-img"
              />
            </div>
          </div>
        )}
      </div>

      
    </>
  );
};

/* ------------------------------------------------------------------ */

const PtzCamera = () => {
  const [activeTab, setActiveTab] = useState(0);
    const [isInView, setIsInView] = useState(false);

  const containerRef = useRef(null);
  const [layers, setLayers] = useState([
    { id: layerId, tab: 0, entering: false },
  ]);
  const cleanupTimeout = useRef(null);
  const didMount = useRef(false);

  const currentTab = ptzTabs[activeTab];



  useEffect(() => {
  const element = containerRef.current;

  if (!element) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsInView(entry.isIntersecting);
    },
    {
      threshold: 0.2,
    }
  );

  observer.observe(element);

  return () => observer.disconnect();
}, []);
  // Auto-advance (per-tab duration, falls back to 6s)
useEffect(() => {
  if (!isInView) return;

  const t = setTimeout(() => {
    setActiveTab((prev) => (prev + 1) % ptzTabs.length);
  }, currentTab.duration ?? 5000);

  return () => clearTimeout(t);
}, [activeTab, currentTab.duration, isInView]);

  // Crossfade: push a new layer, then drop the old one
  useEffect(() => {
    // skip the very first run so tab 0 doesn't crossfade into itself
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    layerId += 1;
    const newId = layerId;

    setLayers((prev) => [...prev, { id: newId, tab: activeTab, entering: true }]);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLayers((prev) =>
          prev.map((l) => (l.id === newId ? { ...l, entering: false } : l))
        );
      });
    });

    if (cleanupTimeout.current) clearTimeout(cleanupTimeout.current);
    cleanupTimeout.current = setTimeout(() => {
      setLayers((prev) => prev.filter((l) => l.id === newId));
    }, TRANSITION_MS + 50);

    return () => clearTimeout(cleanupTimeout.current);
  }, [activeTab]);

  const handleTabClick = (index) => {
    if (index !== activeTab) setActiveTab(index);
  };

  const mobileNavItems = ptzTabs.map((tab) => ({
  id: tab.id,
  title: tab.title,
  icon: tab.icon,
  desc: tab.description,
}));

  return (
    <div
  ref={containerRef}
  className={`ptz-container ${isInView ? "ptz-in-view" : ""}`}
>
      <div className="ptz-wrapper">
        <h2 className="ptz-title">PTZ Camera</h2>

        {/* Tabs */}
        <div className="ptz-tabs">
          {ptzTabs.map((tab, index) => (
            <button
              key={tab.id}
              className={`ptz-tab ${activeTab === index ? "ptz-tab-active" : ""}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Layer stack */}
        <div className="ptz-content-stack">
          {layers.map((layer, i) => {
            const isNewest = i === layers.length - 1;
            const stateClass = layer.entering
              ? "ptz-layer-entering"
              : isNewest
              ? "ptz-layer-active"
              : "ptz-layer-exiting";

            return (
              <div
                key={layer.id}
                className={`ptz-content ptz-layer ${stateClass}`}
                style={{ zIndex: i + 1 }}
              >
                <PtzLayer tab={ptzTabs[layer.tab]}   isInView={isInView} />
              </div>
            );
          })}
        </div>

            <div className="ptz-mobile-nav">
  <MobileNav
    items={mobileNavItems}
    activeIndex={activeTab}
    onChange={handleTabClick}
    ariaLabel="PTZ Camera features"
  />
</div>

      </div>
          
    </div>
  );
};

export default PtzCamera;
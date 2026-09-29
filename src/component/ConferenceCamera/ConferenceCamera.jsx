import { useState, useRef, useEffect } from "react";
import { conferenceTabs } from "./data";
import "./ConferenceCamera.css";
import MobileNav from "../MobileNav/MobileNav";

const TRANSITION_MS = 500; // must match CSS transition duration for copy zones
let layerId = 0;

const ConferenceCamera = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [isInView, setIsInView] = useState(false);

  const containerRef = useRef(null);
  const cleanupTimeout = useRef(null);

  const [layers, setLayers] = useState([
    { id: layerId, tab: 0, entering: false },
  ]);

  const currentTab = conferenceTabs[activeTab];
  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      setActiveTab((prev) => (prev + 1) % conferenceTabs.length);
    }, currentTab.duration ?? 5000);

    return () => clearTimeout(timeout);
  }, [activeTab, currentTab.duration, isInView]);

  // Crossfade with zoom detection for Audio ↔ Connectivity
  useEffect(() => {
    const prevLayer = layers[layers.length - 1];
    const prevTab = conferenceTabs[prevLayer.tab];
    const newTab = conferenceTabs[activeTab];

    const isZoomTransition =
      (prevTab.animation === "audio-system" &&
        newTab.animation === "connectivity") ||
      (prevTab.animation === "connectivity" &&
        newTab.animation === "audio-system");

    // ✅ Tab 3 → Tab 2 needs a 3s window to match the mirrored zoom-out duration
    const isAudioToAutoFraming =
      prevTab.animation === "audio-system" &&
      newTab.animation === "auto-framing";

    layerId += 1;
    const newId = layerId;

    if (cleanupTimeout.current) clearTimeout(cleanupTimeout.current);

    // ✅ Skip the 550ms overlap for zoom transitions — old layer disappears immediately
    // ✅ Give the audio→auto-framing zoom-out the full 3s to play out (matches camAudioZoom entrance)
    const cleanupDelay = isZoomTransition
      ? 0
      : isAudioToAutoFraming
        ? 3050
        : TRANSITION_MS + 50;

    // ✅ Defer the initial push out of the effect body via rAF, so setLayers
    // isn't called synchronously during the effect — avoids the
    // "cascading renders" warning while keeping identical visual timing.
    const addLayerRaf = requestAnimationFrame(() => {
      setLayers((prev) => [
        ...prev,
        {
          id: newId,
          tab: activeTab,
          entering: true,
        },
      ]);

      requestAnimationFrame(() => {
        setLayers((prev) =>
          prev.map((l) => (l.id === newId ? { ...l, entering: false } : l)),
        );
      });
    });

    cleanupTimeout.current = setTimeout(() => {
      setLayers((prev) => prev.filter((l) => l.id === newId));
    }, cleanupDelay);

    return () => {
      cancelAnimationFrame(addLayerRaf);
      clearTimeout(cleanupTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // Detect current zoom transition based on the last two layers
  const layersCount = layers.length;
  const newLayer = layersCount > 0 ? layers[layersCount - 1] : null;
  const prevLayer = layersCount > 1 ? layers[layersCount - 2] : null;

  const isZoomTransition =
    prevLayer && newLayer
      ? (conferenceTabs[prevLayer.tab].animation === "audio-system" &&
          conferenceTabs[newLayer.tab].animation === "connectivity") ||
        (conferenceTabs[prevLayer.tab].animation === "connectivity" &&
          conferenceTabs[newLayer.tab].animation === "audio-system")
      : false;

  const zoomDirection = isZoomTransition
    ? conferenceTabs[newLayer.tab].animation === "audio-system"
      ? "in"
      : "out"
    : null;

  // ✅ Tab 2 → Tab 3 (Auto Framing exiting, Audio System entering): hard cut, no crossfade
  const isTab2ToTab3 =
    prevLayer && newLayer
      ? conferenceTabs[prevLayer.tab].animation === "auto-framing" &&
        conferenceTabs[newLayer.tab].animation === "audio-system"
      : false;

  // ✅ Tab 3 → Tab 2 (Audio System exiting, Auto Framing entering): exiting image zooms back to scale(1)
  const isTab3ToTab2 =
    prevLayer && newLayer
      ? conferenceTabs[prevLayer.tab].animation === "audio-system" &&
        conferenceTabs[newLayer.tab].animation === "auto-framing"
      : false;

  return (
    <div
      ref={containerRef}
      className={`cam-container ${isInView ? "cam-in-view" : ""}`}
    >
      {" "}
      <div className="cam-wrapper">
        <h2 className="cam-title">Video Bar</h2>

        {/* Tabs */}
        <div className="cam-tabs">
          {conferenceTabs.map((tab, index) => (
            <button
              key={tab.id}
              className={`cam-tab ${activeTab === index ? "cam-tab-active" : ""}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Content stack - layers crossfade over each other */}
        <div className="cam-content-stack">
          {layers.map((layer, i) => {
            const isNewest = i === layers.length - 1;

            // ✅ During a zoom transition, skip the opacity crossfade entirely
            const stateClass = isZoomTransition
              ? "cam-layer-active"
              : layer.entering
                ? "cam-layer-entering"
                : isNewest
                  ? "cam-layer-active"
                  : "cam-layer-exiting";

            const tab = conferenceTabs[layer.tab];

            const isEnteringZoom = isZoomTransition && layer.id === newLayer.id;
            const isExitingZoom = isZoomTransition && layer.id === prevLayer.id;

            // ✅ Apply direction class to BOTH entering and exiting layers
            const zoomClasses = isEnteringZoom
              ? `cam-layer-zoom-enter ${
                  zoomDirection === "in" ? "cam-zoom-in" : "cam-zoom-out"
                }`
              : isExitingZoom
                ? `cam-layer-zoom-exit ${
                    zoomDirection === "in" ? "cam-zoom-in" : "cam-zoom-out"
                  }`
                : "";

            // ✅ Independent fade state — same logic as the old .cam-layer opacity,
            // now applied separately to the text block and the image block.
            const fadeState = isZoomTransition
              ? "active"
              : layer.entering
                ? "entering"
                : isNewest
                  ? "active"
                  : "exiting";

            const baseFadeClass = `cam-fade${
              fadeState === "active" ? " cam-fade-active" : ""
            }`;

            const isEnteringInstant =
              isTab2ToTab3 && newLayer && layer.id === newLayer.id;
            const isExitingInstant =
              isTab2ToTab3 && prevLayer && layer.id === prevLayer.id;
            const isExitingZoomOut =
              isTab3ToTab2 && prevLayer && layer.id === prevLayer.id;

            // Tab 3 → Tab 2 entering layer (Tab 2's text + image) appears instantly,
            // no crossfade — it pops in immediately while the old Tab 3 image zooms out underneath.
            const isEnteringInstantZoomBack =
              isTab3ToTab2 && newLayer && layer.id === newLayer.id;

            // ✅ force the zooming-out layer above the instantly-appearing layer,
            // otherwise Tab 2 (which pops in immediately) visually covers the zoom.
            const stackClass = isExitingZoomOut
              ? "cam-layer-stack-top"
              : isEnteringInstantZoomBack
                ? "cam-layer-stack-back"
                : "";

            // Text uses the normal crossfade UNLESS this is the Tab3→Tab2 entering layer,
            // in which case it snaps in instantly with no fade.
            const textFadeClass = isEnteringInstantZoomBack
              ? "cam-fade cam-fade-active cam-fade-instant"
              : baseFadeClass;

            // Image uses the normal crossfade UNLESS:
            // - Tab2 → Tab3: hard-cut via cam-fade-instant (transition: none)
            // - Tab3 → Tab2 (exiting layer): zooms back to scale(1), delayed fade
            // - Tab3 → Tab2 (entering layer): snaps in instantly, no crossfade
            const imageFadeClass = isEnteringInstant
              ? "cam-fade cam-fade-active cam-fade-instant"
              : isExitingInstant
                ? "cam-fade cam-fade-instant"
                : isExitingZoomOut
                  ? `${baseFadeClass} cam-image-zooming-out`
                  : isEnteringInstantZoomBack
                    ? "cam-fade cam-fade-active cam-fade-instant"
                    : baseFadeClass;

            return (
              <div
                key={layer.id}
                className={`cam-content cam-layer ${stateClass} ${zoomClasses} ${stackClass}`}
              >
                <div className={`cam-layer-text ${textFadeClass}`}>
                  <div className="cam-icon-wrapper">
                    <img src={tab.icon} alt={tab.title} className="cam-icon" />
                  </div>

                  <p className="cam-description">{tab.description}</p>
                </div>

                <div
                  className={`cam-image-wrapper cam-image-wrapper-${tab.animation} ${imageFadeClass}`}
                >
                  <img
                    src={tab.image}
                    alt={tab.title}
                    className={`cam-image cam-image-base cam-image-base-${tab.animation}`}
                  />

                  <div
                    className={`cam-image-overlay cam-image-overlay-${tab.animation}`}
                  >
                    <img
                      src={tab.image}
                      alt={tab.title}
                      className={`cam-image cam-image-clear cam-image-clear-${tab.animation}`}
                    />
                  </div>

                  <div
                    className={`cam-slider cam-slider-${tab.animation}`}
                  ></div>

                  {tab.faces &&
                    tab.faces.map((face, i) => (
                      <div
                        key={i}
                        className={`cam-face cam-face-${tab.animation}`}
                        style={{
                          top: face.top,
                          left: face.left,
                        }}
                      >
                        <span className="cam-face-corner cam-face-corner-tl"></span>
                        <span className="cam-face-corner cam-face-corner-tr"></span>
                        <span className="cam-face-corner cam-face-corner-bl"></span>
                        <span className="cam-face-corner cam-face-corner-br"></span>
                      </div>
                    ))}
                  {tab.speakers &&
                    tab.speakers.map((sp, i) => (
                      <div
                        key={i}
                        className={`cam-speaker cam-speaker-${tab.animation} ${
                          isExitingZoomOut ? "cam-speaker-exit-fade" : ""
                        }`}
                        style={{ top: sp.top, left: sp.left }}
                      >
                        {Array.from({ length: tab.rings || 4 }).map((_, r) => (
                          <span
                            key={r}
                            className={`cam-ring cam-ring-${r + 1}`}
                            style={{ animationDelay: `${1.2 + r * 0.45}s` }}
                          ></span>
                        ))}
                      </div>
                    ))}

                  {tab.device && (
                    <img
                      src={tab.device}
                      alt="device"
                      className={`cam-device cam-device-${tab.animation}`}
                    />
                  )}

                  {tab.ports && (
                    <div className={`cam-ports cam-ports-${tab.animation}`}>
                      {tab.ports.map((port, i) => (
                        <div
                          key={i}
                          className="cam-port"
                          style={{ animationDelay: `${1.6 + i * 0.6}s` }}
                        >
                          <img
                            src={port.icon}
                            alt={port.label}
                            className="cam-port-icon"
                          />
                          <span className="cam-port-label">{port.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab.label && (
                    <div className={`cam-label cam-label-${tab.animation}`}>
                      {tab.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="cam-nav-bar">
          <MobileNav
            items={conferenceTabs.map((t) => ({ ...t, desc: t.description }))}
            activeIndex={activeTab}
            onChange={setActiveTab}
            ariaLabel="Conference Camera features"
            className="cam-mobile-nav"
          />
        </div>
      </div>
    </div>
  );
};

export default ConferenceCamera;

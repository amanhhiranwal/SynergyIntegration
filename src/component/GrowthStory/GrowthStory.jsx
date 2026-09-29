import { useEffect, useRef, useState } from "react";
import "./GrowthStory.css";
import { growthStoryData } from "./data.js";

import worldMap from "../../Assets/AboutUs/world-map.webp";

const GrowthStory = () => {
  const containerRef = useRef(null);

  // -1 means no milestone is visible initially
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  // Tracks the highest index revealed so far so scroll-up never unreveals
  const maxActiveIndexRef = useRef(-1);

  // Handle responsive layout check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Reset the reveal state only when the section is completely out of
  // the viewport (scrolled past it entirely, or not reached yet).
  // While it's in the viewport (even partially), the forward-only
  // scroll logic below is left alone — no mid-scroll unreveal.
  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          maxActiveIndexRef.current = -1;
          setActiveIndex(-1);
        }
      },
      { threshold: 0 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  // Track scroll position of the wrapper container
  useEffect(() => {
    if (isMobile) {
     
      return;
    }

    const handleScroll = () => {
      const container = containerRef.current;

      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Total scroll distance available inside the sticky track
      const scrollableHeight = rect.height - viewportHeight;

      if (scrollableHeight <= 0) {
        setActiveIndex(-1);
        return;
      }

      // Progress starts at 0 when the sticky section reaches the viewport top
      const scrolled = -rect.top / scrollableHeight;
      const progress = Math.max(0, Math.min(1, scrolled));

      const totalItems = growthStoryData.length;

      /*
       * At progress 0, no year is visible.
       * As soon as scrolling begins, 2021 appears.
       * The remaining milestones reveal one by one.
       */
      const activeCount = progress <= 0 ? 0 : Math.ceil(progress * totalItems);

      const currentActive = Math.min(totalItems, Math.max(0, activeCount));

      const computedIndex = currentActive - 1;

      // Only move forward: scrolling up while still in view should
      // never unreveal items already shown (unreveal only happens via
      // the IntersectionObserver above, when the section leaves view)
      if (computedIndex > maxActiveIndexRef.current) {
        maxActiveIndexRef.current = computedIndex;
        setActiveIndex(computedIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Calculate initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="growth-story-wrapper">
      <section className="growth-story">
        <div
          className="growth-story__map"
          style={{ backgroundImage: `url(${worldMap})` }}
          aria-hidden="true"
        />

        <header className="growth-story__header">
          <h2>Growth Story</h2>

          <p>
            We believe technology should make a difference—creating intelligent
            solutions with thoughtful design and dependable performance.
            <br /> <br />
            Our purpose is simple: build technology people can believe in and
            rely on.
          </p>
        </header>

        <div
          className="growth-story__timeline"
          role="list"
          aria-label="Company growth timeline"
        >
          {growthStoryData.map((item, index) => {
            const effectiveActiveIndex = isMobile
              ? growthStoryData.length - 1
              : activeIndex;
            const isVisible = index <= effectiveActiveIndex;

            return (
              <div
                key={item.year}
                className={`growth-story__item ${
                  isVisible ? "growth-story__item--visible" : ""
                }`}
                role="listitem"
                style={{
                  "--lift": `${item.lift}px`,
                }}
              >
                <time className="growth-story__year" dateTime={item.year}>
                  {item.year}
                </time>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default GrowthStory;

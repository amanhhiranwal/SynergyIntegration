import "./MobileNav.css";

const ChevronLeft = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/**
 * Reusable mobile feature navigation.
 *
 * Behaviour intentionally matches the mobile navigation
 * used in AdvDisplayMode.
 *
 * Layout:
 *
 *       ← previous | ACTIVE CARD | next →
 */
export default function MobileNav({
  items = [],
  activeIndex = 0,
  onChange,
  onFocus,
  onBlur,
  ariaLabel = "Features",
  className = "",
}) {
  const totalItems = items.length;

  if (!totalItems) {
    return null;
  }

  /*
   * Keep activeIndex safe in case the supplied index
   * temporarily falls outside the items array.
   */
  const safeActiveIndex =
    activeIndex >= 0 && activeIndex < totalItems ? activeIndex : 0;

  /*
   * This is the SAME circular positioning logic used
   * by AdvDisplayMode.
   */
  const getDiff = (index) => {
    let diff = index - safeActiveIndex;

    if (diff > totalItems / 2) {
      diff -= totalItems;
    }

    if (diff < -totalItems / 2) {
      diff += totalItems;
    }

    return diff;
  };

  const currentItem = items[safeActiveIndex];

  return (
    <nav
      className={["mfn-nav", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
    >
      {/* ================================================================
          SPACER

          Only the active item determines the natural height.

          This matches AdvDisplayMode's:
          .adv-mob-spacer
          ================================================================ */}
      <div className="mfn-spacer" aria-hidden="true">
        {currentItem && (
          <div className="mfn-card mfn-card-spacer">
            <div className="mfn-card-content mfn-card-content-spacer">
              <div className="mfn-card-content-inner">
                <div className="mfn-card-header">
                  {currentItem.icon && (
                    <img
                      src={currentItem.icon}
                      alt=""
                      className="mfn-card-icon"
                    />
                  )}
                  <h3 className="mfn-card-title">{currentItem.title}</h3>
                </div>

                {currentItem.desc && (
                  <p className="mfn-card-desc">
                    {currentItem.desc}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================================================================
          NAVIGATION CARDS
          ================================================================ */}
      {items.map((item, index) => {
        const diff = getDiff(index);

        let positionClass = "mfn-card-hidden-right";

        /*
         * EXACT same positioning rules as AdvDisplayMode.
         */
        if (diff === 0) {
          positionClass = "mfn-card-active";
        } else if (diff === -1) {
          positionClass = "mfn-card-prev";
        } else if (diff === 1) {
          positionClass = "mfn-card-next";
        } else if (diff < -1) {
          positionClass = "mfn-card-hidden-left";
        }

        const canClick = diff === -1 || diff === 1;
        const isActive = diff === 0;

        return (
          <div
            key={item.id ?? index}
            className={`mfn-card mfn-card-anim ${positionClass}`}
            onClick={() => {
              if (canClick) {
                onChange?.(index);
              }
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            role={
              canClick
                ? "button"
                : isActive
                ? "group"
                : undefined
            }
            tabIndex={canClick ? 0 : -1}
            onKeyDown={(e) => {
              if (!canClick) return;

              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onChange?.(index);
              }
            }}
            aria-label={
              canClick
                ? `Show ${item.title}`
                : isActive
                ? item.title
                : undefined
            }
            aria-hidden={!isActive && !canClick}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Previous card arrow */}
            <span
              className="mfn-arrow mfn-arrow-prev"
              aria-hidden="true"
            >
              <ChevronLeft />
            </span>

            {/* Card content */}
            <div className="mfn-card-content">
              <div className="mfn-card-content-inner">
                <div className="mfn-card-header">
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt=""
                      className="mfn-card-icon"
                    />
                  )}
                  <h3 className="mfn-card-title">{item.title}</h3>
                </div>

                {item.desc && (
                  <p className="mfn-card-desc">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>

            {/* Next card arrow */}
            <span
              className="mfn-arrow mfn-arrow-next"
              aria-hidden="true"
            >
              <ChevronRight />
            </span>
          </div>
        );
      })}
    </nav>
  );
}
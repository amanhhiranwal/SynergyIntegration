import { useState, useRef, useEffect } from "react";
import "./SupportPage.css";
import Banner from "../../Assets/Support/banner.webp";
import icon1 from "../../Assets/Support/sms-icon.webp";
import icon3 from "../../Assets/Support/icon-1.webp";
// import logo1 from "../../Assets/testimonial/Google apps_01(2) 1.webp";
// import logo2 from "../../Assets/testimonial/Mask group 2.webp";
// import logo3 from "../../Assets/testimonial/Mask group.webp";
// import logo4 from "../../Assets/testimonial/image 17.webp";
// import logo5 from "../../Assets/testimonial/image 18.webp";
// import logo6 from "../../Assets/testimonial/image 43.webp";
// import logo7 from "../../Assets/testimonial/image 19.webp";
import raiseQuery from "../../Assets/Support/raise-query-icon.webp";
import callIcon from "../../Assets/Support/call-icon.webp";
import downloadIcon from "../../Assets/Support/download-icon.webp";
import "../ActiveLEDPage/ActiceLed.css";
import PreviousTicketsModal from "../../component/Support/PreviousTicketsModal";
import FAQSearch from "../../component/FAQSearch/FAQSearch";
import {
  levenshtein,
  tokenize,
  highlight,
} from "../../component/FAQSearch/searchUtils";
import { useSearchParams } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import TrustedClients from "../../component/TrustedClients/TrustedClients";

const features_sna = [
  {
    image: icon1,
    title: "Contact Support",
    desc: "Get help directly through email support",
    href: "mailto: support@qonevo.in",
  },
  {
    image: raiseQuery,
    title: "Submit a Request",
    desc: "Share your issue with our team for technical assistance and troubleshooting",
    href: null,
  },
  {
    image: callIcon,
    title: "Call Support",
    desc: "Speak with a support executive for urgent assistance",
    href: "tel:+9118001205900",
  },
];

const features = [
  { image: icon1, desc: "Get Technical Help" },
  { image: raiseQuery, desc: "Raise an Inquiry" },
  { image: icon3, desc: "Virtual Assistant" },
  { image: downloadIcon, desc: "Downloads & Manuals" },
];

const faqSections = [
  {
    id: "setup-installation",
    title: "Setup & Installation",
    items: [
      {
        question: "How do I set up my Interactive Flat Panel?",
        answer: "Step-by-step guide for installation and initial configuration",
      },
      {
        question: "What are the mounting requirements for IFP?",
        answer: "Understand wall mount compatibility, height, and placement",
      },
      {
        question: "How do I connect external devices?",
        answer: "Set up laptops, OPS, cameras, speakers, and USB devices",
      },
      {
        question: "The display is not turning on after setup",
        answer: "Troubleshoot power connection and startup issues",
      },
    ],
  },
  {
    id: "touch-interaction",
    title: "Touch & Interaction",
    items: [
      {
        question: "Touch response is not working properly",
        answer: "Steps to recalibrate touch and restore responsiveness",
      },
      {
        question: "Stylus writing feels delayed",
        answer: "Improve writing precision and latency performance",
      },
      {
        question: "Multi-touch gestures are not responding",
        answer: "Troubleshoot interaction settings and compatibility",
      },
    ],
  },
  {
    id: "software-firmware",
    title: "Software & Firmware",
    items: [
      {
        question: "How do I update firmware?",
        answer: "Step-by-step firmware installation guide",
      },
      {
        question: "Gravity AI tools are not loading",
        answer: "Fix AI feature sync and update issues",
      },
      {
        question: "System performance feels slow",
        answer: "Optimize settings and check storage usage",
      },
    ],
  },
  {
    id: "connectivity-casting",
    title: "Connectivity & Casting",
    items: [
      {
        question: "Unable to cast screen wirelessly",
        answer: "Fix device detection and casting issues",
      },
      {
        question: "Laptop is not connecting to the panel",
        answer: "Check ports, permissions, and cable setup",
      },
      {
        question: "OPS connection not detected",
        answer: "Troubleshoot OPS recognition and compatibility",
      },
    ],
  },
  {
    id: "audio-camera",
    title: "Audio & Camera",
    items: [
      {
        question: "Microphone is not picking up voice clearly",
        answer: "Improve audio pickup and troubleshoot mic settings",
      },
      {
        question: "Camera is not working during meetings",
        answer: "Fix camera detection and video configuration issues",
      },
      {
        question: "Why is the audio output not working?",
        answer: "Troubleshoot speaker settings and sound output problems",
      },
    ],
  },
];

function scoreItem(item, section, queryTokens, rawQuery) {
  const qText = item.question.toLowerCase();
  const aText = item.answer.toLowerCase();
  const tText = section.title.toLowerCase();
  const raw = rawQuery.toLowerCase();

  let score = 0;
  const matchedTerms = new Set();

  if (qText.includes(raw)) {
    score += 20;
    queryTokens.forEach((t) => matchedTerms.add(t));
  }
  if (aText.includes(raw)) {
    score += 10;
    queryTokens.forEach((t) => matchedTerms.add(t));
  }
  if (tText.includes(raw)) {
    score += 8;
    queryTokens.forEach((t) => matchedTerms.add(t));
  }

  for (const token of queryTokens) {
    if (qText.includes(token)) {
      score += 5;
      matchedTerms.add(token);
      continue;
    }
    if (aText.includes(token)) {
      score += 2;
      matchedTerms.add(token);
      continue;
    }
    if (tText.includes(token)) {
      score += 3;
      matchedTerms.add(token);
      continue;
    }
    if (token.length >= 5) {
      const fuzzyQ = qText.split(/\s+/).some((w) => levenshtein(token, w) <= 1);
      const fuzzyT = tText.split(/\s+/).some((w) => levenshtein(token, w) <= 1);
      const fuzzyA = aText.split(/\s+/).some((w) => levenshtein(token, w) <= 1);

      if (fuzzyQ || fuzzyT) {
        score += 2;
        matchedTerms.add(token);
      } else if (fuzzyA) {
        score += 1;
        matchedTerms.add(token);
      }
    }
  }

  return { score, matchedTerms: [...matchedTerms] };
}

// Mobile / tablet breakpoint used by the CSS media queries for this section.
const MOBILE_QUERY = "(max-width: 1023px)";
const MOBILE_MAX_PX = 1023;

const readIsMobile = () => {
  if (typeof window === "undefined") return false; // SSR-safe
  if (typeof window.matchMedia === "function") {
    return window.matchMedia(MOBILE_QUERY).matches;
  }
  return window.innerWidth <= MOBILE_MAX_PX; // fallback (jsdom / no matchMedia)
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const SupportList = () => {
  const sectionRefs = useRef({});
  const isManualScrolling = useRef(false);
  const stickyHeaderRef = useRef(null);
  const faqWrapperRef = useRef(null);
  const tabListRef = useRef(null); // mobile tab strip

  const [activeSection, setActiveSection] = useState(faqSections[0].id);
  const [openFaqs, setOpenFaqs] = useState(
    faqSections.flatMap((section) =>
      section.items.map((_, index) => `${section.id}-${index}`),
    ),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSection, setFilteredSection] = useState(faqSections);
  const [highlights, setHighlights] = useState({});
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [navTop, setNavTop] = useState(0);
  const [navBarHeight, setNavBarHeight] = useState(0);

  const [searchParams] = useSearchParams();

  // ---- MOBILE / TABLET (<= 1023px): the left sidebar becomes a tab strip ----
  const [isMobile, setIsMobile] = useState(readIsMobile);

  useEffect(() => {
    const sync = () => setIsMobile(readIsMobile());

    sync(); // keep in sync with whatever the real viewport is on mount

    if (typeof window.matchMedia !== "function") {
      window.addEventListener("resize", sync);
      return () => window.removeEventListener("resize", sync);
    }

    const mq = window.matchMedia(MOBILE_QUERY);
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }

    // legacy Safari / iOS < 14
    mq.addListener(sync);
    return () => mq.removeListener(sync);
  }, []);

  // The section shown on mobile is always a section that still exists after
  // filtering (search can drop sections).
  const mobileSections = filteredSection;
  const mobileActiveId =
    mobileSections.find((s) => s.id === activeSection)?.id ??
    mobileSections[0]?.id ??
    null;
  const visibleSections = isMobile
    ? mobileActiveId
      ? mobileSections.filter((s) => s.id === mobileActiveId)
      : []
    : filteredSection;

  const getOffset = () => {
    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar?.offsetHeight || 0;

    const stickyHeight =
      stickyHeaderRef.current?.getBoundingClientRect().height || 0;

    return navbarHeight + stickyHeight;
  };

  useEffect(() => {
    const updateNavTop = () => {
      requestAnimationFrame(() => {
        const navbar = document.querySelector(".navbar");
        setNavBarHeight(navbar?.offsetHeight || 0);
        setNavTop(getOffset());
      });
    };

    updateNavTop(); // run once on mount after browser paints

    window.addEventListener("resize", updateNavTop);
    return () => window.removeEventListener("resize", updateNavTop);
    // isMobile is a dep because the sticky header grows/shrinks with the tab row
  }, [isMobile]);

  // The header also changes height when fonts load / search results re-flow,
  // so re-measure it instead of trusting a one-off mount read.
  useEffect(() => {
    const el = stickyHeaderRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => setNavTop(getOffset()));
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // Keep the active tab centred in the strip on mobile / tablets.
  // Manual maths (not scrollIntoView) so the page never jumps vertically.
  useEffect(() => {
    if (!isMobile) return;

    const list = tabListRef.current;
    const btn = list?.querySelector('[data-tab-id="' + mobileActiveId + '"]');
    if (!list || !btn) return;

    const target = btn.offsetLeft - (list.clientWidth - btn.offsetWidth) / 2;
    const left = Math.max(0, target);

    // Element.scrollTo(options) is missing on older iOS Safari — fall back
    if (typeof list.scrollTo === "function") {
      list.scrollTo({ left, behavior: "smooth" });
    } else {
      list.scrollLeft = left;
    }
  }, [isMobile, mobileActiveId]);

  // scrollToCard: same math as before, just shared between sidebar + tabs
  const scrollToCard = (id) => {
    const el = sectionRefs.current[id];
    if (!el) return;

    const offset = getOffset();
    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      offset -
      (isMobile ? 0 : 20);

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const handleNavClick = (id) => {
    isManualScrolling.current = true;
    setActiveSection(id);

    // On mobile the tab row already carries the section, no need to move the page
    if (!isMobile) scrollToCard(id);

    setTimeout(() => {
      isManualScrolling.current = false;
    }, 900);
  };

  const openSection = (sectionId) => {
    setActiveSection(sectionId);

    setOpenFaqs(
      faqSections.flatMap((section) =>
        section.items.map((_, index) => `${section.id}-${index}`),
      ),
    );
  };

  useEffect(() => {
    const sectionId = searchParams.get("section");
    if (!sectionId) return;

    requestAnimationFrame(() => {
      openSection(sectionId);
    });

    setTimeout(() => {
      faqWrapperRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        scrollToCard(sectionId);
      }, 400);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isMobile]);

  useEffect(() => {
    const offset = getOffset();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling.current) return;
        //  if (searchTerm.trim()) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${offset}px 0px -40% 0px`,
        threshold: 0,
      },
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredSection, searchTerm, isMobile]);

  const toggleFaq = (id) => {
    setOpenFaqs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setFilteredSection(faqSections);
      setActiveSection(faqSections[0].id);

      setOpenFaqs(
        faqSections.flatMap((section) =>
          section.items.map((_, index) => `${section.id}-${index}`),
        ),
      );

      setHighlights({});
      return;
    }

    if (value.trim().length < 2) {
      setFilteredSection(faqSections);
      setHighlights({});
      return;
    }

    const queryTokens = tokenize(value);

    if (!queryTokens.length) {
      setFilteredSection(faqSections);
      setHighlights({});
      return;
    }

    const newHighlights = {};
    const matchedFaqs = [];
    let topSectionId = null;
    let topSectionScore = -1;

    const filtered = faqSections
      .map((section) => {
        const scoredItems = section.items
          .map((item, index) => {
            const { score, matchedTerms } = scoreItem(
              item,
              section,
              queryTokens,
              value.trim(),
            );

            if (score > 0) {
              const key = `${section.id}-${index}`;
              matchedFaqs.push(key);
              newHighlights[key] = {
                q: highlight(item.question, matchedTerms),
                a: highlight(item.answer, matchedTerms),
              };
            }

            return { ...item, score, originalIndex: index };
          })
          .filter((item) => item.score > 0)
          .sort((a, b) => b.score - a.score);

        if (!scoredItems.length) return null;

        const sectionScore = scoredItems.reduce(
          (sum, item) => sum + item.score,
          0,
        );

        if (sectionScore > topSectionScore) {
          topSectionScore = sectionScore;
          topSectionId = section.id;
        }

        return { ...section, items: scoredItems };
      })
      .filter(Boolean);

    setFilteredSection(filtered);
    setHighlights(newHighlights);
    setOpenFaqs(matchedFaqs);
    // never blank the selection — on mobile this keeps a tab active
    setActiveSection((prev) => topSectionId ?? prev ?? faqSections[0].id);

    // On mobile the tab row already shows the result, no scrolling needed.
    if (topSectionId && !isMobile) {
      requestAnimationFrame(() => {
        scrollToCard(topSectionId);
      });
    }
  };

  return (
    <PageLayout className="support-main-container">
      <div className="support-banner">
        <img src={Banner} alt="" fetchPriority="high" />
      </div>

      <div className="sw-delay">
        <div className="sw-delay-text">
          <h3>Support without delays</h3>
          <p>
            Get instant access to product assistance, downloads, warranty
            services, troubleshooting, and expert support, all in one place.
          </p>
        </div>

        <div className="features-container">
          {features.map((item, index) => (
            <div className="features-item" key={index}>
              <div className="features-icon">
                <img loading="lazy" src={item.image} alt={item.desc} />
              </div>
              <div className="features-text-sp">
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="support-link-container">
          <p>
            Need to check the previous case?{" "}
            <span>
              <button
                type="button"
                className="check-case-link"
                onClick={() => setShowTicketModal(true)}
              >
                Check your case
              </button>
            </span>
          </p>
        </div>

        {showTicketModal && (
          <PreviousTicketsModal onClose={() => setShowTicketModal(false)} />
        )}
      </div>

      <div
        className={`faq-section-wrapper${isMobile ? " is-mobile" : ""}`}
        id="support-item-sec"
        ref={faqWrapperRef}
        // feeds the mobile sticky offsets; 67px (the old hardcoded value)
        // stays as the CSS fallback until this is measured
        style={
          navBarHeight
            ? { "--support-nav-bar-height": `${navBarHeight}px` }
            : undefined
        }
      >
        {/* sticky header — height measured dynamically via stickyHeaderRef */}
        <div className="search-prod-by-name-ls" ref={stickyHeaderRef}>
          <div className="search-text">
            <div className="sw-delay-text">
              <h3>Interactive Flat Panel</h3>
              <p>
                Access manuals, downloads, setup guides, and troubleshooting.
              </p>
            </div>
          </div>
          <FAQSearch value={searchTerm} onChange={handleSearchChange} />

          {/* Sidebar -> horizontal tabs on mobile / tablet (<=1023px).
              Hidden on desktop by CSS, so nothing changes above 1023px. */}
          {mobileSections.length > 0 && (
            <div className="faq-mobile-tabs">
              <div
                className="faq-tab-row"
                ref={tabListRef}
                role="tablist"
                aria-label="Support topics"
              >
                {mobileSections.map((section) => (
                  <button
                    type="button"
                    key={section.id}
                    data-tab-id={section.id}
                    role="tab"
                    aria-selected={mobileActiveId === section.id}
                    className={`faq-tab ${
                      mobileActiveId === section.id ? "active" : ""
                    }`}
                    onClick={() => handleNavClick(section.id)}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="faq-section">
          {/* Left Sidebar — top set dynamically, no hardcoded px */}
          <div
            className="left-navigation-content"
            style={{ top: `${navTop}px` }}
          >
            {faqSections.map((section) => (
              <button
                key={section.id}
                className={`support-nav-item ${
                  activeSection === section.id ? "active" : ""
                }`}
                onClick={() => handleNavClick(section.id)}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Right FAQ Content */}
          <div className="right-navigation-content">
            {visibleSections.length > 0 ? (
              visibleSections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="faq-card"
                  ref={(el) => {
                    // cleanup on unmount so the observer never points at a dead node
                    sectionRefs.current[section.id] = el;
                  }}
                  style={{ scrollMarginTop: `${isMobile ? 0 : navTop}px` }} // dynamic, no hardcoded px
                >
                  {/* <h2>{section.title}</h2> */}

                  {section.items.map((faq, index) => {
                    const originalIndex = faq.originalIndex ?? index;
                    const key = `${section.id}-${originalIndex}`;
                    const isOpen = openFaqs.includes(key);
                    const hl = highlights[key];

                    return (
                      <div
                        className={`faq-item ${isOpen ? "open" : ""}`}
                        key={key}
                      >
                        <div
                          className="faq-question"
                          onClick={() => toggleFaq(key)}
                        >
                          <h3
                            dangerouslySetInnerHTML={{
                              __html: hl ? hl.q : faq.question,
                            }}
                          />
                          {isOpen && (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: hl ? hl.a : faq.answer,
                              }}
                            />
                          )}
                        </div>
                        <span onClick={() => toggleFaq(key)}>
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))
            ) : (
              <p className="no-data">No data present</p>
            )}
          </div>
        </div>
      </div>

      <div className="still-need-assistance-sec sw-delay">
        <div className="sw-delay-text">
          <h3>Still Need Assistance?</h3>
          <p>
            Couldn't find the answer you were looking for? Our support team is
            here to help.
          </p>
        </div>
        <div className=" features-container-sna">
          {features_sna.map((item, index) => (
            <div className=" features-item features-item-sna" key={index}>
              <div className="features-icon features-icon-sna">
                {item.href ? (
                  <a href={item.href}>
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </a>
                ) : (
                  <img src={item.image} alt={item.title} loading="lazy" />
                )}
              </div>
              <div className="features-text features-text-sna">
                <p className="sna-title">{item.title}</p>
                <p className="sna-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TrustedClients />
    </PageLayout>
  );
};

export default SupportList;

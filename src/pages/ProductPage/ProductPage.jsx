import { useState, useEffect, useCallback } from "react";
import "./ProductPage.css";
import banner from "../../Assets/product-page/product-banner.webp";
import swipeIcon from "../../Assets/product-page/swipe-icon.svg";
import touchImg from "../../Assets/product-page/touch-img.webp";
import pointerIcon from "../../Assets/product-page/pointer-icon.svg";
import microphoneIcon from "../../Assets/product-page/microphone.svg";
import performanceBgImg from "../../Assets/product-page/performance-bg-img.webp";
import speedIcon from "../../Assets/product-page/smart-classroom/speed.webp";
import gravityTextImg from "../../Assets/product-page/product-pg-gravity/gravity-text-img.webp";
import gravityBgImg from "../../Assets/product-page/gravity-bg-img.webp";
import gravityImg from "../../Assets/product-page/product-pg-gravity/Image1.webp";
import gravityImg2 from "../../Assets/product-page/product-pg-gravity/Image-1.webp";
import gravityImg3 from "../../Assets/product-page/product-pg-gravity/Image.webp";
import gravityImg4 from "../../Assets/product-page/product-pg-gravity/image-2.webp";
import PageLayout from "../../layouts/PageLayout.jsx";
import ScImage from "../../Assets/product-page/smart-classroom/Image01.webp";
import PowerfulPresence from "../../component/PowerfulPresence/PowerfulPresence";
import Specifications from "../../component/Specifications/Specifications";

const slides = [
  {
    title: "Research Assistant",
    desc: "Find information and sources for a research project.",
    img: gravityImg2,
  },
  {
    title: "Chat With Documents",
    desc: "Upload documents and ask questions about their content.",
    img: gravityImg3,
  },
  {
    title: "Create Shapes",
    desc: "Convert drawings into accurate shapes for better teaching.",
    img: gravityImg,
  },
  {
    title: "Rubric Builder",
    desc: "Create a tailored rubric for your class.",
    img: gravityImg4,
  },
  {
    title: "Feature Five",
    desc: "Description of the fifth feature goes here.",
    img: gravityImg,
  },
];

const CARD_WIDTH = 164;

const ProductPage = () => {
  const duplicatedSlides = [...slides, ...slides];

  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  /* AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (index >= slides.length) {
      setTransition(false);
      setIndex(0);
    } else if (index < 0) {
      setTransition(false);
      setIndex(slides.length - 1);
    }
  }, [index]);

  /* RE-ENABLE TRANSITION */
  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
    }
  }, [transition]);

  return (
    <PageLayout>
      {/* HERO SECTION */}
      <section className="hero-sec">
        <div className="hero-img-container">
          <div className="overlay-text">
            <h2>The Smart Classroom. Reimagined.</h2>
            <p>Qonevo Interactive Flat Panel | Limitless Interactive</p>
          </div>
          <img
            src={banner}
            alt="Qonevo Interactive Flat Panel"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="feature-sec">
        <div className="top-container">
          <div className="accuracy-sec">
            <div className="icon">
              <img src={swipeIcon} alt="Swipe" loading="lazy" />
            </div>
            <div className="text">
              <h3>High Touch Point Accuracy</h3>
              <p>
                Multiple users can interact simultaneously without lag, making
                group collaboration smooth and natural
              </p>
            </div>
          </div>

          <div className="touch-sec">
            <img src={touchImg} alt="Touch" loading="lazy" />
          </div>
        </div>

        <div className="bottom-container">
          <div className="sensitivity-sec">
            <div className="icon">
              <img src={pointerIcon} alt="Pointer" loading="lazy" />
            </div>
            <div className="text">
              <h3>Advanced Pressure Sensitivity</h3>
              <p>
                Write, draw, and annotate with precision that feels just like
                pen on paper.
              </p>
            </div>
          </div>

          <div className="microphone-sec">
            <div className="icon">
              <img src={microphoneIcon} alt="Microphone" loading="lazy" />
            </div>
            <div className="text">
              <h3>Integrated Microphone Array</h3>
              <p>Capture clear audio during virtual sessions and meetings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PERFORMANCE SECTION */}
      <section className="performance-gravity-sec">
        <div className="performance-text">
          <h2>Powered by a High-Performance Chipset</h2>
          <p>
            At the core of every Qonevo display is a powerful chipset designed
            to handle intensive tasks with ease.
          </p>

          {/* ✅ Fixed: ul instead of div for list items */}
          <ul className="performance-list">
            <li>
              <span className="blue-line"></span>
              <span>Faster processing for smooth operations</span>
            </li>
            <li>
              <span className="blue-line"></span>
              <span>Efficient multitasking without slowdowns</span>
            </li>
            <li>
              <span className="blue-line"></span>
              <span>Optimized performance for interactive applications</span>
            </li>
          </ul>
        </div>

        <div className="bd-img-container">
          <img
            src={performanceBgImg}
            alt="Performance"
            className="bg-img"
            loading="lazy"
          />
        </div>
      </section>

      {/* GRAVITY SECTION */}
      <section className="gravity-sec">
        <div className="gravity-sub-sec">
          <div className="gravity-text">
            <h2>Gravity AI Integration</h2>
            <p>
              Enhance user interaction with intelligent features that make
              writing, navigation, and content handling more intuitive and
              efficient.
            </p>
          </div>

          <div className="gravity-slider-wrap">
            <button className="gravity-arrow" onClick={prev}>
              ‹
            </button>

            <div className="gravity-slider-viewport">
              <div
                className="gravity-slider-track"
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: `translateX(-${index * CARD_WIDTH}px)`,
                  transition: transition ? "transform 0.5s ease" : "none",
                }}
              >
                {duplicatedSlides.map((slide, i) => (
                  <div className="gravity-card-1" key={i}>
                    <div className="gravity-card-img">
                      <img src={slide.img} alt={slide.title} loading="lazy" />
                    </div>
                    <div className="text-content-gravity">
                      <p className="gravity-card-title-slide">{slide.title}</p>
                      <p className="gravity-card-desc-slide">{slide.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="slider-fade-right"></div>
            </div>

            <button className="gravity-arrow" onClick={next}>
              ›
            </button>
          </div>
        </div>

        <div className="gravity-sub-img">
          <div className="back-img">
            <img src={gravityBgImg} alt="" loading="lazy" />
            <div className="front-img">
              <img src={gravityTextImg} alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* SMART CLASSROOM SECTION */}
      <section className="smart-classroom-sec">
        <div className="smart-c-text">
          <h2>The Smart Classroom. Reimagined.</h2>
          <p>Qonevo Interactive Flat Panel</p>
        </div>

        <div className="inner-container">
          <div className="card-container">
            <div className="card-item">
              <div className="card-logo">
                <img src={speedIcon} alt="Speed" loading="lazy" />
              </div>
              <div className="text-container-sc">
                <h3 className="card-heading">Fast Processing</h3>
                <p className="card-desc">
                  Smooth multitasking, faster application loading, and lag-free
                  operation across use cases.
                </p>
              </div>
            </div>

            <div className="card-item">
              <div className="card-logo">
                <img src={speedIcon} alt="Speed" />
              </div>
              <div className="text-container-sc">
                <h3 className="card-heading">Easy Connectivity</h3>
                <p className="card-desc">
                  Multiple ports and wireless capabilities ensure easy
                  integration with laptops, cameras, and other devices.
                </p>
              </div>
            </div>

            <div className="card-item">
              <div className="card-logo">
                <img src={speedIcon} alt="Speed" />
              </div>
              <div className="text-container-sc">
                <h3 className="card-heading">Achievements</h3>
                <p className="card-desc">
                  Our design team helps clients achieve their marketing and
                  business goals through user-friendly design.
                </p>
              </div>
            </div>
          </div>

          <div className="bottom-container-sc">
            <div className="left-container">
              <div className="card-item">
                <div className="card-logo">
                  <img src={speedIcon} alt="Speed" />
                </div>
                <div className="text-container-sc">
                  <h3 className="card-heading">Easy Connectivity</h3>
                  <p className="card-desc">
                    Multiple ports and wireless capabilities ensure easy
                    integration with laptops, cameras, and other devices.
                  </p>
                </div>
              </div>
            </div>

            <div className="right-container">
              <img src={ScImage} alt="Smart Class" />
            </div>
          </div>
        </div>
      </section>

      <PowerfulPresence />
      <Specifications />
    </PageLayout>
  );
};

export default ProductPage;
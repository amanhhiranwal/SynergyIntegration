import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "animate.css";
import "./ProductSlider.css";
import banner1 from "../../Assets/ProductSliderImage/hero1.webp";
import banner1w640 from "../../Assets/ProductSliderImage/hero1-640.webp";
import banner1w960 from "../../Assets/ProductSliderImage/hero1-960.webp";
import banner1w1280 from "../../Assets/ProductSliderImage/hero1-1280.webp";
import banner2 from "../../Assets/ProductSliderImage/hero2.png";
import banner2w640 from "../../Assets/ProductSliderImage/hero2-640.webp";
import banner2w960 from "../../Assets/ProductSliderImage/hero2-960.webp";
import banner2w1280 from "../../Assets/ProductSliderImage/hero2-1280.webp";
import banner3 from "../../Assets/ProductSliderImage/hero3.webp";
import banner3w640 from "../../Assets/ProductSliderImage/hero3-640.webp";
import banner3w960 from "../../Assets/ProductSliderImage/hero3-960.webp";
import banner3w1280 from "../../Assets/ProductSliderImage/hero3-1280.webp";
import banner4 from "../../Assets/ProductSliderImage/hero4.webp";
import banner4w640 from "../../Assets/ProductSliderImage/hero4-640.webp";
import banner4w960 from "../../Assets/ProductSliderImage/hero4-960.webp";
import banner4w1280 from "../../Assets/ProductSliderImage/hero4-1280.webp";

/** Formats width-keyed variants as a srcset descriptor list. */
const toSrcSet = (variants) =>
  Object.entries(variants)
    .map(([width, url]) => `${url} ${width}w`)
    .join(", ");

const SLIDE_SIZES = "100vw";

const slides = [
 
  {
    title: "Transform Your Space",
    subtitle: "Displays that inspire creativity in any environment.",
    image_url: banner3,
    srcSet: toSrcSet({
      640: banner3w640,
      960: banner3w960,
      1280: banner3w1280,
      1920: banner3,
    }),
    width: 1920,
    height: 861,
  },
  {
    title: "Reliability You Trust",
    subtitle: "Engineered for flawless performance, day after day.",
    image_url: banner4,
    srcSet: toSrcSet({
      640: banner4w640,
      960: banner4w960,
      1280: banner4w1280,
      1920: banner4,
    }),
    width: 1920,
    height: 861,
  },
   {
    title: "Seamless Class Collaboration",
    subtitle: "Wireless casting, flawless touch",
    image_url: banner1,
    srcSet: toSrcSet({
      640: banner1w640,
      960: banner1w960,
      1280: banner1w1280,
      1920: banner1,
    }),
    width: 1920,
    height: 861,
  },
  {
    title: "Beyond The Screen",
    subtitle:
      "Engineering intelligence that responds, adapts, and anticipates your every need.",
    image_url: banner2,
    srcSet: toSrcSet({
      640: banner2w640,
      960: banner2w960,
      1280: banner2w1280,
      1536: banner2,
    }),
    width: 1536,
    height: 768,
  },
];

const slideData = [...slides, ...slides];

export default function ProductSlider() {
  const swiperRef = useRef(null);

  const resetAllText = () => {
    document.querySelectorAll(".slide-text-content").forEach((el) => {
      el.style.opacity = "0";
      el.classList.remove("animate__fadeInUp");
    });
  };

  const animateText = (index) => {
    const activeSlide = document.querySelectorAll(".swiper-slide")[index];

    if (!activeSlide) return;

    const textContent = activeSlide.querySelector(".slide-text-content");

    if (textContent) {
      textContent.style.opacity = "1";
      textContent.classList.add("animate__animated", "animate__fadeInUp");
    }
  };

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current.swiper;

    animateText(swiper.activeIndex);

    swiper.on("slideChangeTransitionStart", () => {
      resetAllText();
    });

    swiper.on("slideChangeTransitionEnd", () => {
      animateText(swiper.activeIndex);
    });

    return () => {
      swiper.off("slideChangeTransitionStart");
      swiper.off("slideChangeTransitionEnd");
    };
  }, []);

  return (
    <div className="product-slider-wrapper mt-3">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Scrollbar]}
        loop={true}
        autoplay={{ delay: 3900, disableOnInteraction: false }}
        centeredSlides={true}
        slidesPerView={1.3}
        spaceBetween={30}
        navigation={false}
        breakpoints={{
          0: {
            slidesPerView: 1.1,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          1025: {
            slidesPerView: 1.3,
            spaceBetween: 30,
          },
        }}
        className="myProductSlider"
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.image_url}
              srcSet={slide.srcSet}
              sizes={SLIDE_SIZES}
              alt={slide.title}
              height={slide.height}
              width={slide.width}
              className="slide-image"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding={index === 0 ? "sync" : "async"}
            />

            <div className="slide-overlay">
              <div className="slide-text-content">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
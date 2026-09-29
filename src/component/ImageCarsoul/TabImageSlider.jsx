import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../pages/HomePage/HomePage.css";
import videoTab from "../../Assets/video/video1.mp4";

const TabImageSlide = () => {
  const swiperRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "AI-Driven Intelligence",
    "True-to-Life Visuals",
    "Effortless Connectivity",
    "Built to Endure",
    "Touch That Feels Natural",
  ];

  const slides = [
    {
      title: "AI-Driven Intelligence",
      text: "Learns, adapts, and enhances - from smart recognition to intuitive collaboration.",
      video: videoTab,
    },
    {
      title: "True-to-Life Visuals",
      text: "4K clarity, adaptive brightness, and color calibration that feels alive.",
      video: videoTab,
    },
    {
      title: "Effortless Connectivity",
      text: "Seamless casting, multi-device sharing, and cloud-ready integration.",
      video: videoTab,
    },
    {
      title: "Built to Endure",
      text: "Rugged, weatherproof engineering — from classrooms to city streets.",
      video: videoTab,
    },
    {
      title: "Touch That Feels Natural",
      text: "Ultra-responsive and precise, every gesture just… works.",
      video: videoTab,
    },
  ];

  return (
    <div className="features-slider-wrapper text-center py-5">
      <div className="section-headings py-5">
        <h2>Smarter. Every Step Of The Way.</h2>
        <p className="subtitle">
          Qonevo panels redefine what intelligent interaction feels like.
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs-nav py-3">
        <div className="navs-wrapper d-flex justify-content-center flex-wrap gap-3">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-link ${activeTab === index ? "active" : ""}`}
              onClick={() => {
                setActiveTab(index);
                swiperRef.current.slideTo(index);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={1.5}
        centeredSlides={true}
        loop={false}
        spaceBetween={20}
        speed={600}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        className="myFeatureSlider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="myFeatureSlider-swiper-slide">
            <div className="panel-content">
              <div className="text-content">
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </div>

              <div className="image-content">
                <video className="info-video" autoPlay muted loop playsInline>
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="col-12 text-center pt-2 mt-5">
        <button type="button" className="btn btn-submit">
          Learn more about AI features
        </button>
      </div>
    </div>
  );
};

export default TabImageSlide;
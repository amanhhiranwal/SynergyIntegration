import { useState, useEffect } from "react";
import axios from "axios";
import "./ActiceLed.css";

import Banner from "../../Assets/ActiveLED/Banner.webp";
// import logo1 from "../../Assets/testimonial/Google apps_01(2) 1.webp";
// import logo2 from "../../Assets/testimonial/Mask group 2.webp";
// import logo3 from "../../Assets/testimonial/Mask group.webp";
// import logo4 from "../../Assets/testimonial/image 17.webp";
// import logo5 from "../../Assets/testimonial/image 18.webp";
// import logo6 from "../../Assets/testimonial/image 43.webp";
// import logo7 from "../../Assets/testimonial/image 19.webp";
import leftBanner from "../../Assets/ActiveLED/left-banner.webp";
import rightBanner from "../../Assets/ActiveLED/right-banner.webp";

import icon1 from "../../Assets/ActiveLED/icon-1.webp";
import icon2 from "../../Assets/ActiveLED/icon-2.webp";
import icon3 from "../../Assets/ActiveLED/icon-3.webp";
import icon4 from "../../Assets/ActiveLED/icon-4.webp";
import icon5 from "../../Assets/ActiveLED/icon-5.webp";

import IntelligentWorkspaces from "../../component/sliderImage/IntelligentWorkspaces.jsx";
import performanceBanner from "../../Assets/ActiveLED/performance-banner.webp";
import BuiltForClarity from "../../component/BuiltForClarity/BuiltForClarity.jsx";
import FlexibleByDesign from "../../component/FlexibleByDesign/FlexibleByDesign.jsx";
import PageLayout from "../../layouts/PageLayout.jsx";
// import ProductCard from "../../component/ProductCard/ProductCard.jsx";
import DetailModal from "../IFP/DetailModal.jsx";
// import { useNavigate } from "react-router-dom";
import TrustedClients from "../../component/TrustedClients/TrustedClients.jsx";
import ProductCarousel from "../../component/ProductCarousel/ProductCarousel.jsx";

const features = [
  { image: icon1, desc: "160° Viewing Angle" },
  { image: icon2, desc: "7680Hz Refresh Rate" },
  { image: icon3, desc: "Ultra High Brightness" },
  { image: icon4, desc: "HDR & Deep Contrast" },
  { image: icon5, desc: "Pixel-Level Calibration" },
];

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.qonevo.co.in";

const ActiveLed = () => {
  // const sizeFilters = ["Indoor", "Outdoor"];

  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [activeSize, setActiveSize] = useState("Outdoor");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeLedFilters = [
    {
      label: "Outdoor",
      value: "OUTDOOR_LED",
    },
    {
      label: "Indoor",
      value: "INDOOR_LED",
    },
  ];

  useEffect(() => {
    let ignore = false;

    const toArray = (res) =>
      Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
        ? res.data.data
        : [];

    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch both types once; the carousel filters client-side
        const [outdoorRes, indoorRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/v1/products?type=OUTDOOR_LED&limit=4`),
          axios.get(`${BASE_URL}/api/v1/products?type=INDOOR_LED&limit=4`),
        ]);

        if (ignore) return;

        setProducts([...toArray(outdoorRes), ...toArray(indoorRes)]);
      } catch (error) {
        console.error("Error fetching products:", error);
        if (!ignore) setProducts([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, []);

  // const navigate = useNavigate();

  // function redirectFunction() {
  //   navigate("/listing-page-Led");
  // }

  return (
    <PageLayout
      className="main-led-container"
      showContact={true}
      contactVariant="home"
    >
      <section className="led-banner">
        <div className="led-text-content">
          <h1>Active LED Displays</h1>
          <p>
            Engineered for brilliance. Built for scale. Designed to dominate
            every environment—from high-impact outdoor facades to precision
            indoor visuals.
          </p>
        </div>

        <div className="led-img-content">
          <img fetchPriority="high" src={Banner} alt="" />
        </div>
      </section>

      {/* <section className="scale-section-led">
        <h2 className="section-title">Built for Every Environment</h2>
        <p className="section-sub">
          Precision-built indoor and outdoor solutions.
        </p>
        <div className="size-filters">
          {sizeFilters.map((s) => (
            <button
              key={s}
              className={`size-btn${activeSize === s ? " active" : ""} sizeButton`}
              onClick={() => setActiveSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <ProductCard products={products} variant="grid-4" />
        <div className="view-all-wrap">
          <button onClick={redirectFunction} className="btn-view-all">
            View All
          </button>
        </div>
      </section> */}

      <ProductCarousel
        products={products}
        loading={loading}
        title="Built for Every Environment"
        subtitle="Precision-built indoor and outdoor solutions."
        variant="grid-4"
        viewAllPath="/listing-page"
        setSelectedProduct={setSelectedProduct}
        viewAllLink="/listing-page-Led"
        prodFilters={activeLedFilters}
        filterBy="product_type"
      />

      <DetailModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <section className="indoor-outdoor">
        <IntelligentWorkspaces image1={rightBanner} image2={leftBanner} />
      </section>

      <section className="led-performance-sec">
        <div className="led-performance-content">
          <div className="led-text-content-pf">
            <h3>Performance that shows</h3>
            <p>Enhance user interaction with intelligent features</p>
          </div>

          <div className="image-container-pf">
            <img
              loading="lazy"
              src={performanceBanner}
              alt="LED display performance showcase"
            />
          </div>

          <div className="features-container">
            {features.map((item, index) => (
              <div className="features-item" key={index}>
                <div className="features-icon">
                  <img loading="lazy" src={item.image} alt={item.desc} />
                </div>

                <div className="features-text">
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reusable Product Carousel */}

      <section className="build-for-clarity">
        <BuiltForClarity />
      </section>
      <br />
      <br />
      <section className="flexible-by-design">
        <FlexibleByDesign />
      </section>

      <section className="certification-sec scale-section">
        <TrustedClients />
      </section>
    </PageLayout>
  );
};

export default ActiveLed;
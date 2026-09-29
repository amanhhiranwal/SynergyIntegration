import { useEffect, useState } from "react";
import axios from "axios";

import ConferenceCamera from "../../component/ConferenceCamera/ConferenceCamera";
import PerfectlyCaptured from "../../component/PerfectlyCaptured/PerfectlyCaptured";
import PtzCamera from "../../component/PtzCamera/PtzCamera";
import TrustedClients from "../../component/TrustedClients/TrustedClients";
import ProductCarousel from "../../component/ProductCarousel/ProductCarousel";
import DetailModal from "../IFP/DetailModal"; // adjust path if needed

import HeroImage from "../../Assets/Camera/Banner Image.webp";
import MobileHeroImage from "../../Assets/Camera/Mobile-hero-image.webp"
import PageLayout from "../../layouts/PageLayout";

import "./Camera.css";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.qonevo.co.in";

const CameraPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

const cameraFilters = [
   {
    label: "PTZ Cameras",
    value: "PTZ Camera",
  },
  {
    label: "Video Bar",
    value: "Conference camera",
  },
 
];

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        const productsRes = await axios.get(
          `${BASE_URL}/api/v1/products?type=camera`
        );

        if (ignore) return;

        setProducts(productsRes.data || []);
      } catch (error) {
        console.error("CameraPage — loadData error:", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <PageLayout className="cam-main-section" showContact={true}
  contactVariant="home" >
      {/* Hero */}
      <div className="cam-hero-section">
         <picture>
                  {/* Serves MobileBanner on tablets and mobile (<= 1024px) */}
                  <source media="(max-width: 1023px)" srcSet={MobileHeroImage} />
                  {/* Default fallback for laptops/desktops */}
                 
        <img src={HeroImage} alt="Camera" />
                </picture>



        <div className="cam-hero-overlay">
          <h1 className="cam-hero-title">
Video Conferencing Reimagined          </h1>

          <p className="cam-hero-subtitle">
            Capture every detail with precision and clarity
          </p>
        </div>
      </div>
       {/* Camera Features */}
      <PerfectlyCaptured />

      {/* Reusable Product Carousel */}
      <ProductCarousel
        products={products}
        loading={loading}
        title="Built for Every View"
        subtitle="Multiple Models. One Experience."
        variant="grid-4"
        viewAllPath="/listing-page"
        setSelectedProduct={setSelectedProduct}
        viewAllLink = "/camera/listing-page"    
          prodFilters={cameraFilters}
      />

      {/* Product Detail */}
      <DetailModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      
      <ConferenceCamera />
      <PtzCamera />
      <TrustedClients />
    </PageLayout>
  );
};

export default CameraPage;
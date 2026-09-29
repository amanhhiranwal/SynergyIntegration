import { useEffect, useState } from "react";
import "./IFP Page.css";

// ── Assets ────────────────────────────────────────────────────────────────────
import ifpImage from "../../Assets/ifp/IFP.webp";
import leftImg from "../../Assets/ifp/Property 1=Image01 (1).webp";
import rightImg from "../../Assets/ifp/Property 1=Image02 (1).webp";


// ── Components ────────────────────────────────────────────────────────────────
import IntelligentWorkspaces from "../../component/sliderImage/IntelligentWorkspaces";
import GravityAI from "../../component/GravityAI/GravityAI";
import BuiltToPerform from "../../component/Builttoperform/Builttoperform";
import MadeForCreation from "../../component/MadeForCreation/MadeForCreation";
import DetailModal from "./DetailModal";
import PageLayout from "../../layouts/PageLayout";

import axios from "axios";
import ProductCarousel from "../../component/ProductCarousel/ProductCarousel";
import TrustedClients from "../../component/TrustedClients/TrustedClients";

// ── Constants ─────────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_BASE_URL;
// const LOOKAHEAD = 2; 

// const getItemsPerPage = () => {
//   if (window.innerWidth < 768) return 1;
//   if (window.innerWidth < 1200) return 2;
//   return 4;
// };

// ── Static fallback data (used while API is commented out) ────────────────────

// ── Pure helper ───────────────────────────────────────────────────────────────
// Appends `count` new pages to `existingPages`, starting at logical page index
// `fromPage`. Items are drawn from `allItems` with wrap-around (% length).
// const generatePages = (existingPages, allItems, fromPage, count) => {
//   const n = allItems.length;
//   const newPages = [...existingPages];

//   for (let p = fromPage; p < fromPage + count; p++) {
//     const page = [];
//     for (let i = 0; i < ITEMS_PER_PAGE; i++) {
//       const globalIndex = p * ITEMS_PER_PAGE + i;
//       page.push(allItems[globalIndex % n]);
//     }
//     newPages.push(page);
//   }

//   return newPages;
// };

// ── Module-level constant (after helper so ITEMS_PER_PAGE is defined) ─────────
// const ITEMS_PER_PAGE = getItemsPerPage();

// =============================================================================
// IFPPage Component
// =============================================================================
const IFPPage = () => {
  // ── State ──────────────────────────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);



  // ── Data fetch ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        const productsRes = await axios.get(
          `${BASE_URL}/api/v1/products?type=ifp`,
        );

        if (ignore) return;

        const allData = productsRes.data || [];

        setProducts(allData);

        // if (allData.length > 0) {
        //   // setPages(generatePages([], allData, 0, LOOKAHEAD + 1));
        //   // setCurrentPage(0);
        // }
      } catch (error) {
        console.error("IFPPage — loadData error:", error);
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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <PageLayout
      className="ifp-page"
      showContact={true}
      contactVariant="home"
    >
      <div className="section">
        
      </div>


      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-curve" />

        <div className="hero-content w-100 d-flex flex-column align-items-center">
          <h1 className="hero-title text-white text-center">
            The Smart Classroom. Reimagined.
          </h1>

          <p className="hero-sub d-flex align-items-center justify-content-center gap-3 text-center mb-4">
            <span>Qonevo Interactive Flat Panel</span>
            <span className="hero-sub-divider" />
            <span>Limitless Interactive</span>
          </p>

          <div className="hero-monitor-wrap mx-auto">
            <img
              height={605}
              width={978}
              src={ifpImage}
              alt="Qonevo Interactive Flat Panel"
              className="hero-ifp-image img-fluid d-block"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* ── Product Carousel ──────────────────────────────────────────────── */}
     <ProductCarousel
  products={products}
  loading={loading}
  title="Scale Without Limits"
  subtitle="Multiple sizes. Same powerful experience."
  variant="grid-4"
  viewAllPath="/listing-page"
  setSelectedProduct={setSelectedProduct}
    viewAllLink = "/listing-page"


/>

      {/* ── Detail Modal ──────────────────────────────────────────────────── */}
      <DetailModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* ── Feature Sections ──────────────────────────────────────────────── */}
      <IntelligentWorkspaces image1={rightImg} image2={leftImg} />
      <GravityAI />
      {/* <ScrollCanvas /> */}
      <BuiltToPerform />
      <MadeForCreation />

      {/* ── Trust / Certification Logos ───────────────────────────────────── */}

      <TrustedClients/>
    </PageLayout>
  );
};

export default IFPPage;
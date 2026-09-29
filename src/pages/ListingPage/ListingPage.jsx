import { useEffect, useState, useRef } from "react";
import banner from "../../Assets/ListingPage/banner.webp";
import "./ListingPage.css";
import axios from "axios";
import ProductCard from "../../component/ProductCard/ProductCard.jsx";
import PageLayout from "../../layouts/PageLayout.jsx";
import FilterSideBar from "../../component/FilterSideBar/FilterSideBar.jsx";
import MobileHeroImage from "../../Assets/ListingPage/mobile-banner.png";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.qonevo.co.in";
const ITEMS_PER_LOAD = 4;

const ListingPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const layoutRef = useRef(null);
  const rightRef = useRef(null);
  const loadMoreRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const [filterOptions, setFilterOptions] = useState({
    sizes: [],
    processors: [],
    processorSpeeds: [],
    storages: [],
    smartFeatures: [],
  });

  const [filters, setFilters] = useState({
    size: [],
    chipset: [],
    storage: [],
    smart_features: [],
    processor_speed: [],
    processor: [],
  });

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    setVisibleCount(ITEMS_PER_LOAD);
  };

  const getSpecValue = (product, category, key) => {
    return product.specifications
      ?.find((section) => section.category === category)
      ?.items?.find((item) => item.spec_key === key)?.spec_value;
  };

  const products = allProducts.filter((p) => {
    
    const sizeValue = getSpecValue(p, "Display", "Size");

    const processorValue = getSpecValue(p, "Processor", "Processor");

    const processorSpeedValue = getSpecValue(p, "Processor", "Processor Speed");

    const edlaValue = getSpecValue(p, "Processor", "EDLA");

    const nfcValue = getSpecValue(p, "Processor", "NFC");

    const sizeOk = !filters.size.length || filters.size.includes(sizeValue);

    const processorOk =
      !filters.processor.length ||
      filters.processor.some(
        (f) =>
          f.toLowerCase().replace(/\s+/g, "") ===
          processorValue?.toLowerCase().replace(/\s+/g, ""),
      );
      

    const processorSpeedOk =
      !filters.processor_speed.length ||
      filters.processor_speed.includes(processorSpeedValue);

    const smartFeaturesOk =
      !filters.smart_features.length ||
      filters.smart_features.some((feature) => {
        if (feature === "EDLA") {
          return edlaValue?.toLowerCase() === "yes";
        }

        if (feature === "NFC") {
          return nfcValue?.toLowerCase() === "yes";
        }

        return false;
      });
      const searchOk =
  !searchTerm.trim() ||
  p.name?.toLowerCase().includes(searchTerm.trim().toLowerCase());

return sizeOk && processorOk && processorSpeedOk && smartFeaturesOk && searchOk;

    // return sizeOk && processorOk && processorSpeedOk && smartFeaturesOk;
  });

  const visibleProducts = products.slice(0, visibleCount);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/products?type=ifp`,
        );

        const data = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.data)
          ? response.data.data
          : [];

        setAllProducts(data);
        setVisibleCount(ITEMS_PER_LOAD);
      } catch (error) {
        console.log("Products API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getFilters = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/ifp/filters`);

        setFilterOptions(
          response.data || {
            sizes: [],
            processors: [],
            processorSpeeds: [],
            storages: [],
            smartFeatures: [],
          },
        );
      } catch (error) {
        console.log("Filters API Error:", error);
      }
    };

    getFilters();
  }, []);

  useEffect(() => {
    const el = loadMoreRef.current;

    if (!el) return;

    if (visibleCount >= products.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, products.length),
          );
        }
      },
      {
        rootMargin: "0px 0px 300px 0px",
        threshold: 0,
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [visibleCount, products.length]);

  return (
    <PageLayout className="listing-container">
      <div className="listing-container">
        <div className="listing-banner">
           <picture>
                    <source media="(max-width: 1023px)" srcSet={MobileHeroImage} />
 <img
     
            src={banner}
            alt="Listing Page"
            fetchPriority="high"
          />                  </picture>
         

          <div className="listing-banner-text">
            <h1>The Smart Classroom. Reimagined.</h1>

            <p>Qonevo Interactive Flat Panel | Limitless Interactive</p>
          </div>
        </div>

        <div className="listing-content">
          <div className="listing-layout" ref={layoutRef}>
            <div className="listing-sidebar">
              <FilterSideBar
                onFilterChange={handleFilterChange}
                 onSearchChange={setSearchTerm}
                filterOptions={filterOptions}
              />
            </div>

            <div ref={rightRef} className="right-listing-content">
              {loading ? (
                <div className="products-loader">
                  <div className="loader"></div>
                </div>
              ) : products.length === 0 ? (
                <p className="no-data">No Data Found...</p>
              ) : (
                <>
                  <ProductCard products={visibleProducts} variant="grid-3" />

                  {visibleProducts.length < products.length && (
                    <div ref={loadMoreRef} className="load-more-trigger">
                      <div className="loader"></div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ListingPage;
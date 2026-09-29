import { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";

import "./CameraListing.css";

import PageLayout from "../../layouts/PageLayout.jsx";
import ProductCard from "../../component/ProductCard/ProductCard.jsx";
import FilterSideBar from "../../component/FilterSideBar/FilterSideBar.jsx";

import banner from "../../Assets/Camera/Listing Banner.webp";
import MobileHeroImage from "../../Assets/Camera/mobile-banner.png"

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.qonevo.co.in";

const ITEMS_PER_LOAD = 4;

const CameraListing = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMoreRef = useRef(null);

  const [visibleCount, setVisibleCount] =
    useState(ITEMS_PER_LOAD);

  /*
   * ---------------------------------------
   * SELECTED FILTERS
   * ---------------------------------------
   */

  const [filters, setFilters] = useState({
    camera_type: [],
    resolution: [],
    zoom: [],
  });

  /*
   * ---------------------------------------
   * GET SPECIFICATION VALUE
   * ---------------------------------------
   */

  const getSpecValue = (product, category, key) => {
    return product?.specifications
      ?.find(
        (section) => section.category === category
      )
      ?.items?.find(
        (item) => item.spec_key === key
      )?.spec_value;
  };

  /*
   * ---------------------------------------
   * FILTER CHANGE
   * ---------------------------------------
   */

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    setVisibleCount(ITEMS_PER_LOAD);
  };

  /*
   * ---------------------------------------
   * FILTER PRODUCTS
   * ---------------------------------------
   */

  const products = allProducts.filter((product) => {
    /*
     * Camera Type
     * specifications -> Camera -> Camera Type
     */
    const cameraType = getSpecValue(
      product,
      "Camera",
      "Camera Type"
    );

    /*
     * Resolution
     * parent-level product field
     */
    const resolution = product?.resolution;

    /*
     * Zoom
     * specifications -> Camera -> Digital Zoom
     */
    const zoom = getSpecValue(
      product,
      "Camera",
      "Digital Zoom"
    );

    /*
     * Camera Type filter
     */

    const cameraTypeOk =
      !filters.camera_type.length ||
      filters.camera_type.some(
        (value) =>
          value?.toLowerCase().replace(/\s+/g, "") ===
          cameraType?.toLowerCase().replace(/\s+/g, "")
      );

    /*
     * Resolution filter
     */

    const resolutionOk =
      !filters.resolution.length ||
      filters.resolution.includes(resolution);

    /*
     * Zoom filter
     */

    const zoomOk =
      !filters.zoom.length ||
      filters.zoom.includes(zoom);

    return (
      cameraTypeOk &&
      resolutionOk &&
      zoomOk
    );
  });

  /*
   * ---------------------------------------
   * VISIBLE PRODUCTS
   * ---------------------------------------
   */

  const visibleProducts = products.slice(
    0,
    visibleCount
  );

  /*
   * ---------------------------------------
   * GET CAMERA PRODUCTS
   * ---------------------------------------
   */

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${BASE_URL}/api/v1/products?type=camera`
        );

        const productsData = Array.isArray(response.data)
          ? response.data
          : [];

        setAllProducts(productsData);
        setVisibleCount(ITEMS_PER_LOAD);

      } catch (error) {
        console.error(
          "Camera Products API Error:",
          error
        );

        setAllProducts([]);

      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  /*
   * ---------------------------------------
   * GENERATE CAMERA FILTER OPTIONS
   * ---------------------------------------
   */

  const filterOptions = useMemo(() => {
    if (!allProducts.length) {
      return {
        cameraTypes: [],
        resolutions: [],
        zooms: [],
      };
    }

    const cameraTypes = new Set();
    const resolutions = new Set();
    const zooms = new Set();

    allProducts.forEach((product) => {
      /*
       * Camera Type
       * specifications -> Camera -> Camera Type
       */

      const cameraType = getSpecValue(
        product,
        "Camera",
        "Camera Type"
      );

      if (cameraType) {
        cameraTypes.add(cameraType);
      }

      /*
       * Resolution
       * parent-level
       */

      if (product?.resolution) {
        resolutions.add(product.resolution);
      }

      /*
       * Zoom
       * specifications -> Camera -> Digital Zoom
       */

      const zoom = getSpecValue(
        product,
        "Camera",
        "Digital Zoom"
      );

      if (zoom) {
        zooms.add(zoom);
      }
    });

    return {
      cameraTypes: [...cameraTypes],
      resolutions: [...resolutions],
      zooms: [...zooms],
    };
  }, [allProducts]);

  /*
   * ---------------------------------------
   * INFINITE SCROLL
   * ---------------------------------------
   */

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    if (visibleCount >= products.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(
              prev + ITEMS_PER_LOAD,
              products.length
            )
          );
        }
      },
      {
        rootMargin: "0px 0px 300px 0px",
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [visibleCount, products.length]);

  /*
   * ---------------------------------------
   * RENDER
   * ---------------------------------------
   */

  return (
    <PageLayout className="camera-listing-container">

      <div className="camera-listing-container">

        {/* BANNER */}

        <div className="camera-listing-banner">
             {/* Responsive Picture Element */}
                  <picture>
                    <source media="(max-width: 1023px)" srcSet={MobileHeroImage} />
  <img
            src={banner}
            alt="Camera Listing"
            fetchPriority="high"
          />                  </picture>

        

          <div className="camera-listing-banner-text">

            <h1>
              Find Your
              Perfect View
            </h1>

            <p>
              Qonevo Camera | Intelligent Video Solutions
            </p>

          </div>

        </div>

        {/* CONTENT */}

        <div className="camera-listing-content">

          <div className="camera-listing-layout">

            {/* SIDEBAR */}

            <div className="camera-listing-sidebar">

              <FilterSideBar
                onFilterChange={handleFilterChange}
                filterOptions={filterOptions}
                type="camera"
              />

            </div>

            {/* PRODUCTS */}

            <div className="camera-right-listing-content">

              {loading ? (

                <div className="products-loader">
                  <div className="loader"></div>
                </div>

              ) : products.length === 0 ? (

                <p className="no-data">
                  No Data Found...
                </p>

              ) : (

                <>
                  <ProductCard
                    products={visibleProducts}
                    variant="grid-3"
                  />

                  {visibleProducts.length < products.length && (

                    <div
                      ref={loadMoreRef}
                      className="load-more-trigger"
                    >
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

export default CameraListing;
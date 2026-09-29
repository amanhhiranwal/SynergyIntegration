import { useMemo, useState } from "react";
import "./ProductCarousel.css";
import ProductCard from "../ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";

const LOOKAHEAD = 2;

// const getItemsPerPage = () => {
//   if (window.innerWidth < 768) return 1;
//   if (window.innerWidth < 1200) return 2;
//   return 4;
// };
const getItemsPerPage = () => {
  if (window.innerWidth <= 1024) return 2;
  return 4;
};
const generatePages = (allItems, startPage, count) => {
  if (!allItems.length) return [];

  const itemsPerPage = getItemsPerPage();
  const total = allItems.length;

  return Array.from({ length: count }, (_, pageOffset) => {
    const pageIndex = startPage + pageOffset;

    return Array.from(
      { length: itemsPerPage },
      (_, itemIndex) => {
        const globalIndex =
          pageIndex * itemsPerPage + itemIndex;

        // Closed loop
        return allItems[globalIndex % total];
      }
    );
  });
};

const ProductCarousel = ({
  products = [],
  loading,
  setSelectedProduct,
  viewAllLink,
  title = "Scale Without Limits",
  subtitle = "Multiple sizes. Same powerful core. Choose your perfect fit.",
  prodFilters = [],
  // spec_key to match filters against, or "product_type" to use the
  // top-level product_type field. Default keeps camera behaviour.
  filterBy = "camera type",
}) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);

  const [activeFilter, setActiveFilter] = useState(
    prodFilters[0]?.value || ""
  );

  // --------------------------------------------------
  // FILTER PRODUCTS
  // --------------------------------------------------

  const filteredProducts = useMemo(() => {
    if (
      activeFilter === "" ||
      activeFilter === "all"
    ) {
      return products;
    }

    const filterValue = activeFilter
      .trim()
      .toLowerCase();

    const filterKey = filterBy.trim().toLowerCase();

    return products.filter((product) => {
      let productValue;

      if (filterKey === "product_type") {
        // Top-level field (e.g. INDOOR_LED / OUTDOOR_LED)
        productValue = product.product_type
          ?.trim()
          .toLowerCase();
      } else {
        // Spec-based field (e.g. "Camera Type")
        productValue = product.specifications
          ?.flatMap(
            (specification) =>
              specification.items || []
          )
          ?.find(
            (item) =>
              item.spec_key
                ?.trim()
                .toLowerCase() === filterKey
          )
          ?.spec_value
          ?.trim()
          .toLowerCase();
      }

      return productValue === filterValue;
    });
  }, [products, activeFilter, filterBy]);

  // --------------------------------------------------
  // GENERATE VISIBLE PAGES
  // --------------------------------------------------

  const pages = useMemo(() => {
    if (!filteredProducts.length) {
      return [];
    }

    return generatePages(
      filteredProducts,
      0,
      currentPage + LOOKAHEAD + 1
    );
  }, [filteredProducts, currentPage]);

  // --------------------------------------------------
  // NEXT
  // --------------------------------------------------

  const nextProducts = () => {
    if (!filteredProducts.length) return;

    setCurrentPage((prev) => prev + 1);
  };

  // --------------------------------------------------
  // PREVIOUS
  // --------------------------------------------------

  const prevProducts = () => {
    setCurrentPage((prev) =>
      Math.max(0, prev - 1)
    );
  };

  // --------------------------------------------------
  // FILTER CHANGE
  // --------------------------------------------------

  const handleFilterChange = (value) => {
    setActiveFilter(value);
    setCurrentPage(0);
  };

  return (
    <section className="scale-section">
      {/* TITLE */}
      <h2 className="section-title">
        {title}
      </h2>

      {/* SUBTITLE */}
      <p className="section-sub">
        {subtitle}
      </p>

      {loading ? (
        <div className="products-loader">
          <div className="loader" />
        </div>
      ) : products.length === 0 ? (
        <p className="no-data">
          No Data Found...
        </p>
      ) : (
        <>
          {/* FILTERS */}
          {prodFilters.length > 0 && (
            <div className="size-filters">
              {prodFilters.map((filter) => (
                <button
                  key={filter.value}
                  className={`size-btn ${
                    activeFilter === filter.value
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleFilterChange(
                      filter.value
                    )
                  }
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}

          {/* NO FILTERED PRODUCTS */}
          {filteredProducts.length === 0 ? (
            <p className="no-data">
              No Data Found...
            </p>
          ) : (
            <>
              {/* CAROUSEL */}
              <div className="products-slider-ifp">
                {/* PREVIOUS */}
                <button
                  className="slider-arrow-ifp left"
                  onClick={prevProducts}
                  disabled={currentPage === 0}
                >
                  &#10094;
                </button>

                {/* WINDOW */}
                <div className="products-window-ifp">
                  <div
                    className="products-track-ifp"
                    style={{
                      transform: `translateX(-${
                        currentPage * 100
                      }%)`,
                      transition:
                        "transform 0.4s ease",
                    }}
                  >
                    {pages.map((page, index) => (
                      <div
                        className="page-ifp"
                        key={`${activeFilter}-${index}`}
                      >
                        <ProductCard
                          products={page}
                          variant="grid-4"
                          setSelectedProduct={
                            setSelectedProduct
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* NEXT */}
                <button
                  className="slider-arrow-ifp right"
                  onClick={nextProducts}
                >
                  &#10095;
                </button>
              </div>

              {/* VIEW ALL */}
              <div className="view-all-wrap">
                <button
                  className="btn-view-all"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(viewAllLink);
                  }}
                >
                  View All
                </button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default ProductCarousel;
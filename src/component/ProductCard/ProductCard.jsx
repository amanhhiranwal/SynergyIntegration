import { useState, memo } from "react";
import "./ProductCard.css";
import DetailModal from "../../pages/IFP/DetailModal";

const ProductCard = memo(
  ({ products = [], variant = "default", setSelectedProduct: externalSetSelected }) => {
    const [internalSelectedProduct, setInternalSelectedProduct] = useState(null);

    const productList = Array.isArray(products) ? products : [];

    const handleSelect = (p) => {
      if (externalSetSelected) {
        externalSetSelected(p);
      } else {
        setInternalSelectedProduct(p);
      }
    };

    return (
      <section>
        <div className={`product-grid ${variant}`}>
          {productList.map((p) => {
            const hoverImage = p?.images?.[1]?.image_url;
            const hasHoverImage = Boolean(hoverImage);

            return (
              <div className="product-card_ifp" key={p?.id ?? p?.name}>
                <div
                  className={`abstract-art ${hasHoverImage ? "has-hover" : ""}`}
                >

                  {/* {[p?.size, p?.chipset, p?.storage, p?.resolution]
                    .filter(Boolean)
                    .join(" | ") || "Default : 4K UHD | 400 nits | 200W * 2"} */}
                  <img
                    className="img-default"
                    src={p?.thumbnail}
                    alt={p?.name || "Product Image"}
                    loading="lazy"
                    decoding="async"
                  />

                </div>

                <div className="product-info">
                  <div className="product-name">{p?.name}</div>

                  <div className="product-spec mb-4">
                    {p?.subheading?.trim()
                      ? "Qonevo Interactive Flat Panels"
                      : ""}
                  </div>

                  <div
                    className="product-spec mt-4 mb-4"
                    style={{ color: "#aaa" }}
                  >
                    {/* {[p?.size, p?.chipset, p?.storage, p?.resolution]
                      .filter(Boolean)
                      .join(" | ") || "Default : 4K UHD | 400 nits | 200W * 2"} */}
                  </div>

                  <button
                    className="btn-view"
                    onClick={() => handleSelect(p)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {!externalSetSelected && (
          <DetailModal
            isOpen={!!internalSelectedProduct}
            product={internalSelectedProduct}
            onClose={() => setInternalSelectedProduct(null)}
          />
        )}
      </section>
    );
  }
);

export default ProductCard;
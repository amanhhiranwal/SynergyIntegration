import { useState } from "react";
import { createPortal } from "react-dom";
import QonevoBrochure from "../../Assets/QonevoBrochure.pdf";
import "./DetailModal.css";

const DetailModal = ({ isOpen, product, onClose }) => {
  const images = (product?.images ?? [])
    .slice(0, 3)
    .map((img) => img.image_url);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeImage = images[selectedIndex] ?? images[0] ?? null;

  if (!isOpen || !product) return null;

  const specificationData = product.specifications.map((group) => ({
    title: group.category,
    rows: group.items.map((item) => ({
      label: item.spec_key,
      value: item.spec_value,
    })),
  }));

  const deadZone = specificationData[0]?.rows?.[0];
  const deadZones = specificationData[0]?.rows?.[1];

  function handleDownload() {
    const link = document.createElement("a");
    link.href = QonevoBrochure;
    link.download = "Qonevo-Brochure.pdf"; // name of downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return createPortal(
    <div
      className="modal-overlay"
      onClick={() => {
        setSelectedIndex(0);
        onClose();
      }}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => {
            setSelectedIndex(0);
            onClose();
          }}
        >
          ×
        </button>

        {/* LEFT SIDE */}
        <div className="left-gallery">
          {/* MAIN IMAGE */}
          <div className="preview-image">
            <img src={activeImage} alt="Product" loading="lazy" />
          </div>

          {/* THUMBNAILS */}
          <div className="thumbnails">
            {images.map((img, index) => (
              <div
                key={index}
                className={`thumb ${selectedIndex === index ? "active" : ""}`}
                onClick={() => setSelectedIndex(index)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-content">
          <h2>
            {product?.name
              ? `${product.name} ${product.size ?? ""}`
              : "Qonevo IFP 65 – Core – 8/128 (CVTE | 9679)"}
          </h2>

          <p className="subtitle">
            {
              product.subheading !== ""
                ? "Standard performance for everyday teaching and presentations"
                : ""
              // ||
              // `Standard performance for everyday teaching and presentations`
            }
          </p>

          {/* FEATURE ROW */}
          <div className="feature-row">
            <div className="feature-box">
              <h3 className="colorMe">{deadZone?.label}</h3>
              <p>{deadZone?.value}</p>
            </div>

            <div className="feature-box">
              <h3 className="colorMe">{deadZones?.label}</h3>
              <p>{deadZones?.value}</p>
            </div>
          </div>

          <div className="parent-container">
            {/* SPECIFICATIONS */}
            {specificationData.map((group, index) => (
              <div className="spec-group" key={index}>
                <div className="spec-label">{group.title}</div>

                <div className="spec-table">
                  {group.rows.map((row, rowIndex) => (
                    <div className="spec-row" key={rowIndex}>
                      <span>{row.label}</span>

                      <span>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="buttons-product-cta">
            <button
              className="get-quote-btn"
              disabled={true}
              style={{
                opacity: 0.5,
                cursor: "not-allowed",
              }}
            >
              Get Quote
            </button>
            <button onClick={handleDownload} className="get-quote-btn">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default DetailModal;
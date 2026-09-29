import React, { useState } from "react";
import "./Specifications.css";
import smallImg from "../../Assets/product-page/specifications/small-screen.webp";
import medImg from "../../Assets/product-page/specifications/med-screen.webp";
import largeImg from "../../Assets/product-page/specifications/large-screen.webp";
import xLargeImg from "../../Assets/product-page/specifications/x-large-screen.webp";
import xxLargeImg from "../../Assets/product-page/specifications/xx-large-screen.webp";

const SIZES = [
  { label: '65"', img: smallImg },
  { label: '75"', img: medImg },
  { label: '86"', img: xLargeImg },
  { label: '98"', img: xxLargeImg },
  { label: '110"', img: largeImg },
];

const SPEC_GROUPS = [
  {
    rows: [
      {
        label: "Technology",
        values: [
          "CVTE/Lango/KTCE",
          "CVTE/Lango/KTCE",
          "CVTE/Lango/KTCE",
          "CVTE/Lango/KTCE",
          "CVTE/Lango/KTCE",
        ],
      },
      {
        label: "Chipset",
        values: [
          "9679/V100/311D2/3576",
          "9679/V100/311D2/3576",
          "9679/V100/311D2/3576",
          "9679/V100/311D2/3576",
          "9679/V100/311D2/3576",
        ],
      },
      {
        label: "Color",
        values: [
          "Silver/Black",
          "Silver/Black",
          "Silver/Black",
          "Silver/Black",
          "Silver/Black",
        ],
      },
    ],
  },
  {
    rows: [
      {
        label: "Screen Scale",
        values: ["16:9", "16:9", "16:9", "16:9", "16:9"],
      },
      {
        label: "Refresh Rate",
        values: ["60 Hz", "60 Hz", "60 Hz", "60 Hz", "60 Hz"],
      },
    ],
  },
  {
    rows: [
      {
        label: "Touch Type",
        values: [
          "Infrared Touch",
          "Infrared Touch",
          "Infrared Touch",
          "Infrared Touch",
          "Infrared Touch",
        ],
      },
      {
        label: "Touch Count",
        values: [
          "20 points",
          "20 points",
          "20 points",
          "20 points",
          "20 points",
        ],
      },
      {
        label: "Identifiable Object",
        values: [
          "Finger or Stylus",
          "Finger or Stylus",
          "Finger or Stylus",
          "Finger or Stylus",
          "Finger or Stylus",
        ],
      },
    ],
  },
  {
    rows: [
      {
        label: "Speakers",
        values: [
          "20 watt x2/optional subwoofer",
          "20 watt x2/optional subwoofer",
          "20 watt x2/optional subwoofer",
          "20 watt x2/optional subwoofer",
          "20 watt x2/optional subwoofer",
        ],
      },
    ],
  },
  {
    rows: [
      {
        label: "Microphone",
        values: [
          "8 Array microphone with 10 m pickup range",
          "8 Array microphone with 10 m pickup range",
          "8 Array microphone with 10 m pickup range",
          "8 Array microphone with 10 m pickup range",
          "8 Array microphone with 10 m pickup range",
        ],
      },
    ],
  },
  {
    rows: [
      {
        label: "Camera",
        values: [
          "48 megapixels AI, 120° wide angle",
          "48 megapixels AI, 120° wide angle",
          "48 megapixels AI, 120° wide angle",
          "48 megapixels AI, 120° wide angle",
          "48 megapixels AI, 120° wide angle",
        ],
      },
    ],
  },
];

const Specifications = () => {
  const [activeSize, setActiveSize] = useState(null);

  return (
    <section className="specs-sec">
      {/* ── HEADER ── */}
      <div className="specs-header">
        <div className="specs-col-label">Specifications</div>

        {SIZES.map((size, i) => (
          <button
            key={i}
            className={`specs-col-size ${activeSize === i ? "is-active" : ""}`}
            onClick={() => setActiveSize(activeSize === i ? null : i)}
          >
            {/* The label is rendered in the span below, so repeating it here
                would make a screen reader announce the size twice. */}
            <img
              src={size.img}
              alt=""
              className="specs-thumb"
              loading="lazy"
            />
            <span className="specs-size-label">{size.label}</span>
          </button>
        ))}
      </div>

      <div className="specs-groups">
        {SPEC_GROUPS.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && <div className="specs-group-spacer" />}

            <div className="specs-card">
              {group.rows.map((row, ri) => (
                <div key={ri} className="specs-row">
                  {/* Label */}
                  <div className="specs-col-label specs-label-cell">
                    {row.label}
                  </div>

                  {/* Values */}
                  {row.values.map((val, vi) => (
                    <div
                      key={vi}
                      className={`specs-col-value ${activeSize === vi ? "is-active" : ""}`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Specifications;

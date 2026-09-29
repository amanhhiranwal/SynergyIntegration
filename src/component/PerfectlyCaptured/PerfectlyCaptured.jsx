import SmallImg1 from "../../Assets/Camera/Capture1.webp";
import SmallImg2 from "../../Assets/Camera/Capture2.webp";
import "./PerfectlyCaptured.css";

const Items = [
  {
    id: "Kiosk",
    heading: "Video Bar",
    desc: "Built for effortless collaboration",
    image: SmallImg1,
    button: true,
  },
  {
    id: "beacon-of-engagement",
    heading: "PTZ Camera",
    desc: "Precision in every frame",
    image: SmallImg2,
    button: true,
  },
];

function ItemsCard({ item }) {
  return (
    <article className={`cap-card`}>
      <img
        className="cap-card-image"
        src={item.image}
        alt={item.heading}
        loading="lazy"
      />

      <div className="cap-content">
        <h3>{item.heading}</h3>
        <p>{item.desc}</p>
        {item.button && (
          <button type="button" className="cap-btn-hover">
            View Details
          </button>
        )}
      </div>
    </article>
  );
}
const PerfectlyCaptured = () => {
  const [firstCard, secondCard] = Items;

  return (
    <section
      className="exp-cap-sec"
      aria-labelledby="experiences-that-engage-title"
    >
      <div className="cap-heading-container">
        <h2 id="experiences-that-engage-title">
          Every Meeting, Perfectly Captured
        </h2>
        <p>Professional imaging solutions for modern workspaces</p>
      </div>

      <div className="cap-main-container">
        <div className="cap-row-1">
          <ItemsCard item={firstCard} />
          <ItemsCard item={secondCard} />
        </div>
      </div>
    </section>
  );
};

export default PerfectlyCaptured;
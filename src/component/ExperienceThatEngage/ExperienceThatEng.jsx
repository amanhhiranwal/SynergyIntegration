import "./ExperienceThatEng.css";
import LargeImg from "../../Assets/BrilliantVisuals/ExperienceImg1.webp";
import SmallImg1 from "../../Assets/BrilliantVisuals/ExperienceImg2.webp";
import SmallImg2 from "../../Assets/BrilliantVisuals/ExperienceImg3.webp";
import MobileImg3 from "../../Assets/BrilliantVisuals/mobile-exp-3.webp";
import MobileImg2 from "../../Assets/BrilliantVisuals/mobile-exp-2.png"
import MobileImg1 from "../../Assets/BrilliantVisuals/mobile-exp-1.png"

const experienceItems = [
  {
    id: "wall-of-attention",
    heading: "Wall of attention",
    desc: "Made for larger stories",
    image: SmallImg1,
    mobileImage:MobileImg1
  },
  {
    id: "beacon-of-engagement",
    heading: "Beacon of engagement",
    desc: "Always within sight",
    image: SmallImg2,
    mobileImage:MobileImg2,

  },
  {
    id: "stand-out-naturally",
    heading: "Stand Out Naturally",
    desc: "Built for attention",
    image: LargeImg,
    mobileImage: MobileImg3,
  },
];

function ExperienceCard({ item, isLarge = false }) {
  return (
    <article className={`eng-card${isLarge ? " eng-card-large" : ""}`}>
      {/* 2. Using <picture> to automatically swap at 900px */}
      <picture className="eng-card-picture">
        {item.mobileImage && (
          <source className="mobile-image-exp" media="(max-width: 1023px)" srcSet={item.mobileImage} />
        )}
        <img
          className="eng-card-image"
          src={item.image}
          alt={item.heading}
          loading="lazy"
        />
      </picture>

      <div className="eng-content">
        <h3>{item.heading}</h3>
        <p>{item.desc}</p>
        <button type="button" className="eng-btn-hover">
          View Details
        </button>
      </div>
    </article>
  );
}

export default function ExperienceThatEng() {
  const [firstCard, secondCard, largeCard] = experienceItems;

  return (
    <section
      className="exp-eng-sec"
      aria-labelledby="experiences-that-engage-title"
    >
      <div className="eng-heading-container">
        <h2 id="experiences-that-engage-title">Experiences That Engage</h2>
        <p>Limitless Impact</p>
      </div>

      <div className="eng-main-container">
        <div className="eng-row-1">
          <ExperienceCard item={firstCard} />
          <ExperienceCard item={secondCard} />
        </div>

        {/* 3. No need to duplicate the card */}
        <div className="eng-row-2">
          <ExperienceCard item={largeCard} isLarge />
        </div>
      </div>
    </section>
  );
}
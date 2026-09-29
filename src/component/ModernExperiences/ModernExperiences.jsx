import "./ModernExperiences.css";
import SmallImg1 from "../../Assets/KioskDisplay/ModernExperiences/sm-img-1.webp";
import SmallImg2 from "../../Assets/KioskDisplay/ModernExperiences/Frame 48774.webp";
import MobileImg1 from "../../Assets/KioskDisplay/ModernExperiences/mobileImg1.png"
import MobileImg2 from "../../Assets/KioskDisplay/ModernExperiences/mobileImg2.png"

const experienceItems = [
  {
    id: "Kiosk",
    heading: "Kiosk",
    desc: "Interaction Made Simple",
    image: SmallImg1,
    button: true,
        mobileImage:MobileImg1,

  },
  {
    id: "beacon-of-engagement",
    heading: "Smart Display",
    desc: "Make Every Impression Count",
    image: SmallImg2,
    mobileImage:MobileImg2,
    button: true,
  },
];

function ExperienceCard({ item,isLarge = false }) {
  return (
    // <article className={`eng-card`}>
    //   <img
    //     className="eng-card-image"
    //     src={item.image}
    //     alt={item.heading}
    //     loading="lazy"
    //   />

    //   <div className="eng-content">
    //     <h3>{item.heading}</h3>
    //     <p>{item.desc}</p>
    //     {item.button && (
    //       <button type="button" className="eng-btn-hover">
    //         View Details
    //       </button>
    //     )}
    //   </div>
    // </article>
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

export default function ModernExperiences() {
  const [firstCard, secondCard] = experienceItems;

  return (
    <section
      className="exp-eng-sec"
      aria-labelledby="experiences-that-engage-title"
    >
      <div className="eng-heading-container">
        <h2 id="experiences-that-engage-title">Built for Modern Experiences</h2>
        <p>Visuals and Effortless interaction</p>
      </div>

      <div className="eng-main-container">
        <div className="eng-row-1">
          <ExperienceCard item={firstCard} />
          <ExperienceCard item={secondCard} />
        </div>
      </div>
    </section>
  );
}
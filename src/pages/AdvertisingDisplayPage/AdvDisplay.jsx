import PageLayout from "../../layouts/PageLayout";
import "./AdvDisplay.css";
import AdvDisplayMode from "../../component/AdvDisplayMode/AdvDisplayMode";
import BrilliantVisuals from "../../component/BriliandVisuals/BrilliantVisuals";
import HeroImage from "../../Assets/BrilliantVisuals/Hero Image.webp";
import MobileBanner from "../../Assets/BrilliantVisuals/mobile-banner.webp";
import ExperienceThatEng from "../../component/ExperienceThatEngage/ExperienceThatEng";
import TrustedClients from "../../component/TrustedClients/TrustedClients";

export default function AdvDisplay() {
  return (
    <PageLayout
      className={"adv-main-page"}
      showContact={true}
      contactVariant="home"
    >
      <div className="bv-hero-section">
        {/* Responsive Picture Element */}
        <picture>
          {/* Serves MobileBanner on tablets and mobile (<= 1024px) */}
          <source media="(max-width: 1023px)" srcSet={MobileBanner} />
          {/* Default fallback for laptops/desktops */}
          <img src={HeroImage} alt="Advertising Display & Signage" />
        </picture>

        <div className="bv-hero-overlay">
          <h1 className="bv-hero-title">Advertising Display & Signage</h1>
          <p className="bv-hero-subtitle">Premium visuals for every space.</p>
        </div>
      </div>

      <ExperienceThatEng />
      <AdvDisplayMode />
      <BrilliantVisuals />
      <TrustedClients />
    </PageLayout>
  );
}
import "./KioskDisplay.css";
import HeroImage from "../../Assets/KioskDisplay/Hero.webp";
import MobileHeroImage from "../../Assets/KioskDisplay/mobile-kiosk-banner.webp";
import PageLayout from "../../layouts/PageLayout";
import ModernExperiences from "../../component/ModernExperiences/ModernExperiences";
import KioskSection from "../../component/KioskSection/KioskSection";
import SmartDisplay from "../../component/SmartDisplaySection/SmartDisplay";
import TrustedClients from "../../component/TrustedClients/TrustedClients";

const KioskDisplay = () => {
  return (
    <PageLayout className="ksd-main-section" showContact={true} contactVariant="home">
      <div className="ksd-hero-section">
        {/* Responsive Picture Element */}
        <picture>
          <source media="(max-width: 1023px)" srcSet={MobileHeroImage} />
          <img src={HeroImage} alt="Kiosk Smart Display" />
        </picture>
        
        <div className="ksd-hero-overlay">
          <h1 className="ksd-hero-title">Kiosk & Smart Display</h1>
          <p className="ksd-hero-subtitle">
            Engineered for smarter collaboration and effortless interaction
          </p>
        </div>
      </div>
      <ModernExperiences />
      <KioskSection />
      <SmartDisplay />
      <TrustedClients />
    </PageLayout>
  );
};

export default KioskDisplay;
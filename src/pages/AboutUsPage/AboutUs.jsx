import PageLayout from "../../layouts/PageLayout";
import HeroImage from "../../Assets/AboutUs/Hero Image.webp";
import MobileBannerImage from "../../Assets/AboutUs/hero-mobile.png"
import "./AboutUs.css";
import WhatDrivesUs from "../../component/WhatDrivesUs/WhatDrivesUs";
import TrustedClients from "../../component/TrustedClients/TrustedClients";
import GrowthStory from "../../component/GrowthStory/GrowthStory";
import MeetOurTeam from "../../component/MeetOurTeam/MeetOurTeam";

const AboutUs = () => {
  return (
    <PageLayout className="abt-main-section" showContact={true}
  contactVariant="home" >
      {/* Hero */}
      <div className="abt-hero-section">

        <picture>
          <source  media="(max-width: 1023px)" srcSet={MobileBannerImage}/>
             <img src={HeroImage} alt="About Us" />
        </picture>

     

        <div className="abt-hero-overlay">
          <h1 className="abt-hero-title">About Us</h1>

          <p className="abt-hero-subtitle">
            A Vision That Drives Everything We Do.
          </p>
        </div>
      </div>

      <WhatDrivesUs />
      <MeetOurTeam />
      <GrowthStory/>
      <TrustedClients />
    </PageLayout>
  );
};

export default AboutUs;

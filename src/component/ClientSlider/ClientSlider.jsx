import { useEffect } from "react";
import Swiper from "swiper";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "./ClientSlider.css";
import techmint from "../../Assets/client/techmint.webp";
import smartschool from "../../Assets/client/smartschool.webp";
import smartclass from "../../Assets/client/smartclass.webp";
import andmark from "../../Assets/client/andmark.webp";
import study from "../../Assets/client/study.webp";

const clientLogos = [
  { id: 1, image_url: techmint },
  { id: 2, image_url: smartschool },
  { id: 3, image_url: smartclass },
  { id: 4, image_url: andmark },
  { id: 5, image_url: study },
  { id: 6, image_url: techmint },
  { id: 7, image_url: smartschool },
  { id: 8, image_url: smartclass },
  { id: 9, image_url: andmark },
  { id: 10, image_url: study },
];

export default function ClientSlider() {
  useEffect(() => {
    const clientSwiper = new Swiper(".clients-swiper", {
      modules: [Autoplay, FreeMode],
      slidesPerView: 5,
      spaceBetween: 30,
      loop: true,
      speed: 5000,
      freeMode: true,
      freeModeMomentum: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
    });

    const collabSwiper = new Swiper(".collab-swiper", {
      modules: [Autoplay, FreeMode],
      slidesPerView: 5,
      spaceBetween: 30,
      loop: true,
      speed: 5000,
      freeMode: true,
      freeModeMomentum: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,
      },
    });

    return () => {
      clientSwiper.destroy(true, true);
      collabSwiper.destroy(true, true);
    };
  }, []);

  return (
    <div className="partner-section container text-center">
      <div className="section-headings py-5">
        <h2>Powering The Best In Business.</h2>
        <p className="subtitle">Trusted by innovators</p>
      </div>

      {/* Row 1 */}
      <div className="partner-row" style={{ borderTopLeftRadius: "24px" }}>
        <span className="partner-label">Clients:</span>
        <div className="swiper clients-swiper">
          <div className="swiper-wrapper">
            {clientLogos.map((logo) => (
              <div key={logo.id} className="swiper-slide contact-swiper">
                <img src={logo.image_url} alt="client" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="partner-row" style={{ borderBottomLeftRadius: "24px" }}>
        <span className="partner-label">Collaboration with</span>
        <div className="swiper collab-swiper">
          <div className="swiper-wrapper">
            {clientLogos.map((logo) => (
              <div key={`c-${logo.id}`} className="swiper-slide contact-swiper">
                <img src={logo.image_url} alt="client" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
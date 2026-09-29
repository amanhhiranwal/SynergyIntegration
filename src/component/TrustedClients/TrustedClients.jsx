import logo1 from "../../Assets/testimonial/Google apps_01(2) 1.webp";
import logo2 from "../../Assets/testimonial/Mask group 2.webp";
import logo3 from "../../Assets/testimonial/Mask group.webp";
import logo4 from "../../Assets/testimonial/image 17.webp";
import logo5 from "../../Assets/testimonial/image 18.webp";
import logo6 from "../../Assets/testimonial/image 43.webp";
import logo7 from "../../Assets/testimonial/image 19.webp";
import "./TrustedClients.css";

// Display order is intentional (logo7 sits before logo6). Intrinsic sizes are
// declared so each badge reserves its box before the image loads.
const certifications = [
  { src: logo1, width: 95, height: 63 },
  { src: logo2, width: 114, height: 63 },
  { src: logo3, width: 119, height: 29 },
  { src: logo4, width: 109, height: 50 },
  { src: logo5, width: 102, height: 68 },
  { src: logo7, width: 177, height: 52 },
  { src: logo6, width: 79, height: 75 },
];

export default function TrustedClients() {
  return (
    <section className="trusted-section">
      <h2 className="section-title">Trusted. Recognized. Certified.</h2>
      <p className="section-sub">
        Aligned with national standards and innovation-driven initiatives
      </p>

      <div className="d-flex align-items-center justify-content-center flex-wrap gap-5 t-sec-cards">
        {certifications.map(({ src, width, height }, i) => (
          <img
            height={height}
            width={width}
            key={i}
            src={src}
            className="cert-img"
            alt="cert"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </section>
  );
}
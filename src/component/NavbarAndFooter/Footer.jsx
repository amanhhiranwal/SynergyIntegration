import "./Navbar&Footer.css";
import ScrollLink from "../ScrollToTop/ScrollLink";
import SocialIcon from "./SocialIcon";

const Footer = () => {
  return (
    <footer className="footer borde r-top">
      <div className="footer-section py-5">
        <div className="footer-grid">
          <div className="company-info">
            <h2 className="fw-bold mb-1  text-uppercase">
              {/* Synergy global Private Limited */}
              Synergy Integration Trading L.L.C 
            </h2>
            {/* <p className="mb-3">
              (Formerly Known as Qonevo Technologies Pvt Ltd.)
            </p> */}
            {/* <p className="mb-2">
             
                            <span className="fw-bold">Trade Licence No. :</span> 1637563 

            </p> */}

            <div className="mb-3">
              <span className="fw-bold d-block">Address:</span>
              <p className="mb-2">
                {/* B66, B Block, Sector 65, Noida, Uttar Pradesh, 201309 */}
                Office 1804-C / 69, Business Bay, Dubai, United Arab Emirates 
              </p>
            </div>

            <div>
              <span className="fw-bold d-block">Contact Numbers:</span>
              <p className="mb-3">+971 56 929 5235, +971 54 719 5983</p>
            </div>
          </div>

          <div className="ft-column-group">
            <div className="footer-column">
            <h2 className="fw-bold mb-3 text-uppercase">Quick Links</h2>
            <ul className="list-unstyled">
              <li>
                <ScrollLink
                  to="/"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  Home
                </ScrollLink>
              </li>

              <li>
                <ScrollLink
                  to="/about-us"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  About
                </ScrollLink>
              </li>

              {/* <li>
                <ScrollLink
                  to="/"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  Career
                </ScrollLink>
              </li> */}

              <li>
                <ScrollLink
                  to="/support"
                  className="text-dark text-decoration-none d-block"
                >
                  Support
                </ScrollLink>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2 className="fw-bold mb-3 text-uppercase">Products</h2>
            <ul className="list-unstyled">
              <li>
                <ScrollLink
                  to="/IFP"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  Interactive Flat Panel
                </ScrollLink>
              </li>

              <li>
                <ScrollLink
                  to="/active-led"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  Active Led Display
                </ScrollLink>
              </li>

              <li>
                <ScrollLink
                  to="/advertising-display"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  Advertising Display & Signage
                </ScrollLink>
              </li>

              <li>
                <ScrollLink
                  to="/kiosk-display"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  Kiosk & Smart Display
                </ScrollLink>
              </li>

              {/* <li>
                <ScrollLink
                  to="/kiosk-display"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  Kiosk
                </ScrollLink>
              </li> */}

              <li>
                <ScrollLink
                  to="/camera"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  Video Conferencing Solutions
                </ScrollLink>
              </li>

              {/* <li>
                <ScrollLink
                  to="/product"
                  className="text-dark text-decoration-none d-block"
                >
                  Accessories
                </ScrollLink>
              </li> */}
            </ul>
          </div>
          </div>

          {/* <div className="footer-column">
            <h2 className="fw-bold mb-3 text-uppercase">Other Links</h2>
            <ul className="list-unstyled">
              <li>
                <ScrollLink
                  to="/"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  Solutions
                </ScrollLink>
              </li>

              <li>
                <ScrollLink
                  to="/"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  Services
                </ScrollLink>
              </li>

              <li>
                <ScrollLink
                  to="/"
                  className="text-dark text-decoration-none d-block"
                >
                  Government Business
                </ScrollLink>
              </li>
            </ul>
          </div> */}

          <div className="footer-column">
            <h2 className="fw-bold mb-3 text-uppercase">Policies</h2>
            <ul className="list-unstyled">
              {/* <li>
                <ScrollLink
                  to="/"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  Terms of Service
                </ScrollLink>
              </li> */}

              <li>
                <ScrollLink
                  to="/privacy-policy"
                  className="text-dark text-decoration-none d-block mb-2"
                >
                  Privacy Policy
                </ScrollLink>
              </li>
{/* 
              <li>
                <ScrollLink
                  to="/"
                  className="text-dark text-decoration-none d-block"
                >
                  Policy Security
                </ScrollLink>
              </li> */}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom border-top py-3">
        <div className=" d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
          <div className="mb-2 mb-md-0">
            <span className="fw-bold me-2 footer-socials-heading">
              Socials:
            </span>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/qonevo-technologies-private-limited/?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-6 me-3"
              aria-label="Qonevo LinkedIn"
            >
              <SocialIcon name="linkedin" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/qonevo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-6 me-3"
              aria-label="Qonevo Instagram"
            >
              <SocialIcon name="instagram" />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61592653766628"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fs-6 me-3"
              aria-label="Qonevo Facebook"
            >
              <SocialIcon name="facebook" />
            </a>
          </div>

          <div>
            <span className="fw-semibold footer-email">Sales E-mail:</span>
            <a
              href="mailto:business@synergyintegration.ae"
              className="text-dark text-decoration-none footer-email"
            >
              {" "}
              {/* business@qonevo.in */}
              business@synergyintegration.ae
            </a>
            <span className="fw-semibold ms-4 footer-email">
              Support E-mail:
            </span>
            <a
              href="mailto:support@synergyintegration.ae"
              className="text-dark text-decoration-none footer-email"
            >
              {" "}
            
              support@synergyintegration.ae 
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
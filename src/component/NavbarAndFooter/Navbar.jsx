import { useEffect, useRef, useState } from "react";
import "./Nav.css";
import logo from "../../Assets/logo.webp";
// Ensure these imports match your file structure
import img1 from "../../Assets/DisplayNav/image1.webp";
import img2 from "../../Assets/DisplayNav/image2'.webp";
import img3 from "../../Assets/DisplayNav/image3.webp";
import img4 from "../../Assets/DisplayNav/image5.webp";
import videoConfrencing from "../../Assets/DisplayNav/VideoConfrencingSolutions.webp";
import pdfImg from "../../Assets/pdf.webp";
import "../NavBarAnimation/NavBarAnimation.css";
import ScrollLink from "../ScrollToTop/ScrollLink";

export default function MegaMenuNavbar() {
  const [openMenu, setOpenMenu] = useState(null);
  // Drives the Bootstrap `.collapse`/`.show` classes directly. Bootstrap's
  // own collapse plugin used to do this, which meant shipping its whole
  // ~79 KB JS bundle on every page for this single toggle; the stylesheet
  // that actually hides and shows the panel is still Bootstrap's.
  const [isNavOpen, setIsNavOpen] = useState(false);
  const showTimeoutRef = useRef(null);
  const timeOutRef = useRef(null);

  const handleMouseEnter = (menu) => {
    if (window.innerWidth > 991) {
      clearTimeout(timeOutRef.current);
      clearTimeout(showTimeoutRef.current);
      setOpenMenu(menu);
      showTimeoutRef.current = setTimeout(() => {}, 20);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 991) {
      timeOutRef.current = setTimeout(() => {
        setOpenMenu(null);
      }, 400);
    }
  };

  const handleMobileToggle = (menu) => {
    if (window.innerWidth <= 991) {
      setOpenMenu((prev) => (prev === menu ? null : menu));
    }
  };

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth <= 991) {
      setOpenMenu("display");
    } else {
      setOpenMenu(null);
    }
  };

  // Set initial state
  handleResize();

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  useEffect(() => {
    const navbar = document.querySelector(".navbar.fixed-top");
    if (navbar) {
      const height = navbar.offsetHeight;
      document.body.style.paddingTop = `${height}px`;
    }
  }, []);

  const technicalItems = [
    { img: pdfImg, text: "75 inch - Qonevo Neo Series", pdf: "/IFP.pdf" },
    { img: pdfImg, text: "Qonevo Brochure", pdf: "/QonevoBrochure.pdf" },
  ];

  const displayItems = [
    { img: img1, text: "Interactive Flat Panel", link: "/IFP" },
    { img: img4, text: "Active LED Display", link: "/active-led" },
    { img: img2, text: "Advertising Display & Signage", link: "/advertising-display" },
    { img: img3, text: "Kiosk & Smart Display", link: "/kiosk-display" },
    { img: videoConfrencing, text: "Video Conferencing Solutions", link: "/camera" },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container nav-container">
          
          {/* Mobile Header Layout: Toggler Left, Logo Center */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavOpen((open) => !open)}
            aria-controls="navbarContent"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            {/* Custom Hamburger Icon to match design */}
            <svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <ScrollLink to="/" className="navbar-brand">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </ScrollLink>

          {/* Empty div to balance flexbox on mobile */}
          <div className="mobile-spacer d-lg-none"></div>

          <div
            className={`collapse navbar-collapse${isNavOpen ? " show" : ""}`}
            id="navbarContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              
              {/* DISPLAY / PRODUCTS ITEM */}
              <li
                className={`nav-item ${openMenu === "display" ? "mobile-active" : ""}`}
                onMouseEnter={() => handleMouseEnter("display")}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="nav-link-wrapper" 
                  onClick={() => handleMobileToggle("display")}
                >
                  <button type="button" className="nav-link btn btn-link nav-btn">
                    Products
                  </button>
                  {/* Dropdown Arrow for Mobile */}
                  <svg className={`mobile-dropdown-icon ${openMenu === "display" ? "rotate" : ""}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>

                {/* --- MOBILE ACCORDION MENU (Visible only on mobile) --- */}
                <div className={`mobile-mega-menu ${openMenu === "display" ? "open" : ""}`}>
                  <div className="mobile-product-grid">
                    {displayItems.map((item, i) => (
                      <ScrollLink to={item.link || "/"} className="mobile-product-card" key={i}>
                        <div className="img-wrapper">
                           <img src={item.img} alt="" />
                        </div>
                        <p>{item.text}</p>
                      </ScrollLink>
                    ))}
                  </div>
                </div>
                {/* ---------------------------------------------------- */}
              </li>

              {/* ABOUT ITEM */}
              <li className="nav-item">
                <div className="nav-link-wrapper">
                  <ScrollLink to="/about-us" className="nav-link btn btn-link nav-btn">
                    About
                  </ScrollLink>
                </div>
              </li>

              {/* SUPPORT ITEM */}
              <li className="nav-item">
                <div className="nav-link-wrapper">
                  <ScrollLink to="/support" className="nav-link btn btn-link nav-btn">
                    Support
                  </ScrollLink>
                </div>
              </li>
              

              {/* CAREER ITEM */}
               {/* <li className="nav-item">
                <div className="nav-link-wrapper border-0">
                  <ScrollLink to="/career" scrollToId="career-section" className="nav-link btn btn-link nav-btn">
                    Career
                  </ScrollLink>
                </div>
              </li> */}

                 {/* CONTACT ITEM */}
              <li className="nav-item">
                <div className="nav-link-wrapper border-0">
                  <ScrollLink to="/" scrollToId="contact-section" className="nav-link btn btn-link nav-btn">
                    Contact Us
                  </ScrollLink>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* --- DESKTOP MEGA MENUS (Hidden on mobile via CSS class 'desktop-mega') --- */}
      <div
        className={`mega-menu-content desktop-mega ${openMenu === "technical" ? "show" : ""}`}
        onMouseEnter={() => handleMouseEnter("technical")}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container megamenu py-5 sm:py-10">
          <h5 className="mb-4">Technical Specification</h5>
          <div className="row g-3">
            {technicalItems.map((item, i) => (
              <div key={i} className="col-md-2 col-6 menu-card-head">
                <a href={item.pdf || "/"} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
                  <div className="menu-card text-center p-1">
                    <img src={item.img} className="img-fluid mb-2" alt="" />
                    <p className="mb-0">{item.text}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`mega-overlay desktop-mega ${openMenu === "display" ? "show" : ""}`}>
        <div
          className={`mega-menu-content ${openMenu === "display" ? "show" : ""}`}
          onMouseEnter={() => handleMouseEnter("display")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container-fluid megamenu py-5">
            <div className="row g-3">
              {displayItems.map((item, i) => (
                  <div key={i} className="w-auto flex-start col-sm-1">
                    <div className="menu-card-head p-2">
                      <ScrollLink to={item.link || "/"} className="menu-card text-center p-1 text-decoration-none">
                        <img src={item.img} alt="" className="img-fluid mb-2 menu-image" />
                        <p className="mb-2 text-dark mt-auto">{item.text}</p>
                      </ScrollLink>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------------------ */}
    </>
  );
}
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToId = sessionStorage.getItem("scrollToId");

    if (scrollToId) {
      sessionStorage.removeItem("scrollToId");

      const timer = setTimeout(() => {
        const element = document.getElementById(scrollToId);

        if (element) {
          const navbar = document.querySelector(".navbar.fixed-top");
          const navbarHeight = navbar?.offsetHeight || 0;

          const elementPosition =
            element.getBoundingClientRect().top +
            window.scrollY;

          window.scrollTo({
            top: elementPosition - navbarHeight,
            left: 0,
            behavior: "smooth",
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
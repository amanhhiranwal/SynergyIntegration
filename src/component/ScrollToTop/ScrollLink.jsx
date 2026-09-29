import { Link } from "react-router-dom";

const ScrollLink = ({
  to,
  children,
  className,
  scrollToId,
  onClick,
  ...props
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }

    if (scrollToId) {
      const element = document.getElementById(scrollToId);

      if (element) {
        e.preventDefault();
        const navbar = document.querySelector(".navbar.fixed-top");
        const navbarHeight = navbar?.offsetHeight || 0;

        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementPosition - navbarHeight,
          left: 0,
          behavior: "smooth",
        });
        return;
      }

      sessionStorage.setItem("scrollToId", scrollToId);
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  };

  return (
    <Link
      to={to}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ScrollLink;
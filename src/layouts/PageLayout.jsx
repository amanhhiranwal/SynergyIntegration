import Navbar from "../component/NavbarAndFooter/Navbar";
import Footer from "../component/NavbarAndFooter/Footer";
import ContactSection from "../component/contact/ContactSection";

const PageLayout = ({
  children,
  className = "",
  showContact = false,
  contactVariant = "page",
}) => {
  return (
    <>
      <Navbar />

      <main className={`page-main ${className}`}>
        {children}

        {showContact && (
          <ContactSection variant={contactVariant} />
        )}

        <Footer />
      </main>
    </>
  );
};

export default PageLayout;
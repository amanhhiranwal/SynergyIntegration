import "./HomePage1.css";
import ProductSlider from "../../component/ImageCarsoul/ProductSlider";
import ifp from "../../Assets/ifp1.png";
import adsdisplay from "../../Assets/ad-display1.png";
import kiosk from "../../Assets/kiosk1.png";
import activeled from "../../Assets/active-led1.png";
import pcops from "../../Assets/pc-ops1.png";
import adson from "../../Assets/add-ons1.png";
import ClientCarousel from "../../component/ClientCarsoul/ClientCarsoul";
import PageLayout from "../../layouts/PageLayout";

import ScrollLink from "../../component/ScrollToTop/ScrollLink";

const HomePage1 = () => {
  return (
    <>
      <PageLayout
        className="main-home-page-sec"
        showContact={true}
        contactVariant="home"
      >
        <ProductSlider />

        <section>
          {/* {{-- Interactive Flat Panel --}} */}
          <section className="info-section">
            <div className="container-fluid text-center mobile-product-card-home">
              <div className="section-headings">
                {/* <h1 className='meta'>Qonevo Technologies</h1>
      <h2 className="section-title">Interactive Flat Panel</h2> */}

                {/* <h1 className="meta">
        Interactive Flat Panel Solutions by Qonevo
      </h1> */}

                <h2 className="section-title">Interactive Flat Panel</h2>

                <p className="section-subtitle">
                  Smarter. Sharper. Seamlessly connected.
                </p>

                <ScrollLink to="/IFP" className="btn-discover">
                  Discover
                </ScrollLink>
              </div>

              <div className="info-sec-image-container">
                <img
                  src={ifp}
                  alt="Qonevo interactive flat panel display"
                  className="info-section-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </section>
          {/* Display & Signage section  */}
          <section className="dual-product-section">
            <div className="container-fluid">
              <div className="row g-4">
                <div className="col-md-6 mobile-product-card-home">
                  {" "}
                  {/* ← p-3 removed */}
                  <div className="product-card text-center">
                    <div className="section-headings product-card-head">
                      <h2 className="section-title">
                        Advertising Display &amp; Signage
                      </h2>
                      <p className="section-subtitle">
                        Stand tall. Stay visible.
                      </p>
                      <ScrollLink
                        to="/advertising-display"
                        className="btn-discover"
                      >
                        Discover
                      </ScrollLink>
                    </div>
                    <div className="dual-sec-image-container">
                      <img
                        src={adsdisplay}
                        alt="Qonevo advertising display and digital signage"
                        className="info-section-image"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mobile-product-card-home">
                  {" "}
                  {/* ← p-3 removed */}
                  <div className="product-card text-center">
                    <div className="section-headings product-card-head">
                      <h2 className="section-title">
                        Kiosk &amp; Smart Display
                      </h2>
                      <p className="section-subtitle">
                        Smarter self-service, reimagined.
                      </p>
                      <ScrollLink to="/kiosk-display" className="btn-discover">
                        Discover
                      </ScrollLink>
                    </div>
                    <div className="dual-sec-image-container">
                      <img
                        src={kiosk}
                        alt="Qonevo kiosk and smart display"
                        className="info-section-image"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* {{-- Active LED --}} */}
          <section className="info-section">
            <div className="container-fluid text-center mobile-product-card-home">
              <div className="section-headings">
                <h2 className="section-title">Active LED Display</h2>
                <p className="section-subtitle">
                  Brilliance that breaks through daylight.
                </p>
                <ScrollLink to="/active-led" className="btn-discover">
                  Discover
                </ScrollLink>
              </div>
              <div className="info-sec-image-container">
                <img
                  src={activeled}
                  alt="Qonevo active LED display"
                  className="info-section-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </section>
          {/* All-In-One PC & OPS and Accessories & Add-ons */}
          <section className="dual-product-section">
            <div className="container-fluid">
              <div className="row g-4">
                {/* <!-- Left Card --> */}
                <div className="col-md-6 mobile-product-card-home position-relative ">
                  <div className="product-card text-center">
                    <div className="section-headings product-card-head">
                      <h2 className="section-title">All-In-One PC & OPS</h2>
                      <p className="section-subtitle">
                        Power that drives every display.
                      </p>
                      <ScrollLink to="/" className="btn-discover">
                        Discover
                      </ScrollLink>
                    </div>
                    <div className="dual-sec-image-container">
                      <img
                        src={pcops}
                        alt="Qonevo all-in-one PC and OPS solution"
                        className="info-section-image"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  {/* <!-- LEFT Vertical Marker --> */}
                  <div className="dual-marker dual-marker-left vertical">
                    <div className="dual-marker-line"></div>
                    <div className="dual-marker-label">OPS</div>
                  </div>
                  {/* <!-- LEFT Horizontal Marker --> */}
                  <div className="dual-marker dual-marker-left horizontal">
                    <div className="dual-marker-line"></div>
                    <div className="dual-marker-label">All in-One PC</div>
                  </div>
                </div>

                {/* <!-- Right Card --> */}
                <div className="col-md-6 position-relative mobile-product-card-home ">
                  <div className="product-card text-center bg-transparent border border-gray-400">
                    <div className="section-headings product-card-head">
                      <h2 className="section-title">Accessories & Add-ons</h2>
                      <p className="section-subtitle">
                        Smart pens, stands, cameras - made for perfection.
                      </p>
                      <ScrollLink to="/ScrollLink" className="btn-discover">
                        Discover
                      </ScrollLink>
                    </div>
                    <div className="dual-sec-image-container">
                      <img
                        src={adson}
                        alt="Qonevo display accessories and add-ons"
                        className="info-section-image"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  {/* <!-- RIGHT Vertical Marker --> */}
                  <div className="dual-marker dual-marker-right vertical">
                    <div className="dual-marker-line"></div>
                    <div className="dual-marker-label">Smart Pen</div>
                  </div>
                  {/* <!-- RIGHT Horizontal Marker --> */}
                  <div className="dual-marker dual-marker-right horizontal">
                    <div className="dual-marker-line"></div>
                    <div className="dual-marker-label">Mobile Stand</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className="client-carousel mb-8">
          <h2 className="montserrat text-center mt-8 clients-heading">
            Clients who believe in us
          </h2>

          <p className="montserrat text-center mb-4 clients-subtitle">
            We're proud to have worked with companies that share our passion for
            great products.
          </p>
          <ClientCarousel />
        </section>
        {/* smarter portion */}
        {/* 
<TabImageSlide/> */}
        {/* <ClientSlider/> */}
      </PageLayout>
    </>
  );
};

export default HomePage1;

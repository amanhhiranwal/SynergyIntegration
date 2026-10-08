// import "./HomePage.css";
import ProductSlider from "../../component/ImageCarsoul/ProductSlider";
import ifp from "../../Assets/ProductSliderImage/ifp.webp";
import adsdisplay from "../../Assets/M8.png";
import kiosk from "../../Assets/M9.png";
import activeled from "../../Assets/active-led.webp";
import pcops from "../../Assets/pc-ops.webp";
import adson from "../../Assets/ProductSliderImage/add-ons.webp";
import ClientCarousel from "../../component/ClientCarsoul/ClientCarsoul";
import PageLayout from "../../layouts/PageLayout";

import ScrollLink from "../../component/ScrollToTop/ScrollLink";

const HomePage = () => {
  return (
    <>
      <PageLayout className="" showContact={true} contactVariant="home">
        <ProductSlider />
        {/* {{-- Interactive Flat Panel --}} */}
        <section className="info-section">
          <div className="container-fluid text-center p-2 mobile-product-card">
            <div className="section-headings">
              {/* <h1  className='meta'>Qonevo Technologies</h1>
            <h2 className="section-title">Interactive Flat Panel</h2> */}
              {/* <h1 className="meta">
                Interactive Flat Panel Solutions by Qonevo
              </h1> */}

              <h2 className="section-title">Interactive Flat Panels</h2>

              <p className="section-subtitle">
                Smarter. Sharper. Seamlessly connected.
              </p>
              <ScrollLink to="/IFP" className="btn-discover">
                Discover
              </ScrollLink>
            </div>
            <img
              height={834}
              width={1920}
              src={ifp}
              alt="Qonevo interactive flat panel display"
              className="info-section-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>
        {/* Display & Signage section  */}
        <section className="dual-product-section py-2">
          <div className="container-fluid">
            <div className="row g-4">
              <div className="col-md-6 p-3 mobile-product-card-home">
                <div className="product-card text-center">
                  <div className="section-headings  product-card-head">
                    <h2 className="section-title">
                      Advertising Display & Signage
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
                  {/* <div className="section-headings py-5 product-card-head">
                        <h2 className="section-title">Advertising Display & Signage</h2>
                        <p className="section-subtitle">
                            Stand tall. Stay visible.
                        </p>
                        <a href="/" className="btn-discover">Discover</a>
                    </div> */}
                  <img
                    src={adsdisplay}
                    height={1131}
                    width={1280}
                    alt="Qonevo advertising display and digital signage"
                    className="info-section-image"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* <div className="marker display-marker-left">
                        <span className="marker-line"></span>
                        <span className="marker-label">A-Type</span>
                    </div>

                    <div className="marker display-marker-top">
                        <span className="marker-line"></span>
                        <span className="marker-label">Wall Mounted</span>
                    </div>

                    <div className="marker display-marker-right">
                        <span className="marker-label">Floor Stand</span>
                        <span className="marker-line"></span>
                    </div> */}
                </div>
              </div>

              <div className="col-md-6 p-3 mobile-product-card-home">
                <div className="product-card text-center">
                  <div className="section-headings product-card-head">
                    <h2 className="section-title">Kiosk & Smart Display</h2>
                    <p className="section-subtitle">
                      Smarter self-service, reimagined.
                    </p>
                    <ScrollLink to="/kiosk-display" className="btn-discover">
                      Discover
                    </ScrollLink>
                  </div>
                  <img
                    src={kiosk}
                    height={1131}
                    width={1280}
                    alt="Qonevo kiosk and smart display"
                    className="info-section-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* <div className="dual-marker dual-marker-right vertical">
                    <div className="dual-marker-line"></div>
                    <div className="dual-marker-label">Mobile Stand</div>
                </div>
               
                <div className="dual-marker dual-marker-right horizontal">
                    <div className="dual-marker-line"></div>
                    <div className="dual-marker-label">Smart Pen</div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        {/* {{-- Active LED --}} */}
        <section className="info-section">
          <div className="container-fluid text-center p-3 mobile-product-card-home">
            <div className="section-headings py-5">
              <h2 className="section-title">Active LED Display</h2>
              <p className="section-subtitle">
                Brilliance that breaks through daylight.
              </p>
              <ScrollLink to="/active-led" className="btn-discover">
                Discover
              </ScrollLink>
            </div>
            <img
              src={activeled}
              height={834}
              width={1920}
              alt="Qonevo active LED display"
              className="info-section-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>
        {/* All-In-One PC & OPS and Accessories & Add-ons */}
        <section className="dual-product-section py-2 position-relative">
          <div className="container-fluid">
            <div className="row g-4">
              {/* <!-- Left Card --> */}
              <div className="col-md-6 p-3 position-relative mobile-product-card-home">
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
                  <img
                    src={pcops}
                    height={604}
                    width={684}
                    alt="Qonevo all-in-one PC and OPS solution"
                    className="info-section-image"
                    loading="lazy"
                  />
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
              <div className="col-md-6 p-3 position-relative mobile-product-card-home">
                <div className="product-card text-center">
                  <div className="section-headings product-card-head">
                    <h2 className="section-title">Accessories & Add-ons</h2>
                    <p className="section-subtitle">
                      Smart pens, stands, cameras - made for perfection.
                    </p>
                    <ScrollLink to="/ScrollLink" className="btn-discover">
                      Discover
                     </ScrollLink>
                  </div>
                  <img
                    src={adson}
                    height={604}
                    width={684}
                    alt="Qonevo display accessories and add-ons"
                    className="info-section-image"
                    loading="lazy"
                  />
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
        <section className="client-carousel mb-8">
          <h2 className="montserrat text-center mt-8">
            Clients who believe in us
          </h2>
          <p className="montserrat text-center mb-4">
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

export default HomePage;
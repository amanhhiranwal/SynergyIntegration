import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop/ScrollToTop";

/**
 * The landing route is imported statically on purpose. Lazily loading the
 * route a visitor has already asked for just adds a round trip: the browser
 * has to fetch and run the entry chunk before it even learns the homepage
 * chunk exists. As a static import it sits in the initial module graph, so
 * Vite emits modulepreload links and it downloads alongside React.
 */
// import HomePage from "./pages/HomePage/HomePage";
import CareerDetail from "./component/Career/CareerDetail/CareerDetail";
import HomePage1 from "./pages/HomePage/HomePage1";

/**
 * Every other route is code-split. Six of them used to be static imports,
 * which pulled their whole page trees — and the `motion` library with them —
 * into the entry chunk that the landing page must execute before painting.
 */
const IFPPage = lazy(() => import("./pages/IFP/IFPPage"));
const ProductPage = lazy(() => import("./pages/ProductPage/ProductPage"));
const ActiveLed = lazy(() => import("./pages/ActiveLEDPage/ActiveLed"));
const SupportPage = lazy(() => import("./pages/SupportPage/SupportPage"));
const SupportList = lazy(() => import("./pages/SupportPage/SupportList"));
const ListingPage = lazy(() => import("./pages/ListingPage/ListingPage"));
const ListLed = lazy(() => import("./pages/ListLEDs/ListLed"));
const AdvDisplay = lazy(
  () => import("./pages/AdvertisingDisplayPage/AdvDisplay"),
);
const CameraPage = lazy(() => import("./pages/CameraPage/CameraPage"));
const CameraListing = lazy(
  () => import("./Assets/CameraListing/CameraListing"),
);
const KioskDisplay = lazy(
  () => import("./pages/Kiosk&SmartDisplayPage/KioskDisplay"),
);
const AboutUs = lazy(() => import("./pages/AboutUsPage/AboutUs"));
const CareerPage = lazy(() => import("./pages/CareerPage/CareerPage"));
const PrivacyPolicy = lazy(
  () => import("./pages/PrivacyPolicyPage/PrivacyPolicy"),
);

const PageLoader = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div className="loader"></div>
  </div>
);

function App() {
  return (
    <div className="App">
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage1 />} />
          <Route path="/IFP" element={<IFPPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/active-led" element={<ActiveLed />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/support/ifp" element={<SupportList />} />
          <Route path="/listing-page" element={<ListingPage />} />
          <Route path="/listing-page-Led" element={<ListLed />} />
          <Route path="/advertising-display" element={<AdvDisplay />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/camera/listing-page" element={<CameraListing />} />
          <Route path="/kiosk-display" element={<KioskDisplay />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/career" element={<CareerPage />} />
<Route path="/career-details/:jobId" element={<CareerDetail />} />          
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

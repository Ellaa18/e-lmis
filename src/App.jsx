import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import NewsSection from "./components/NewsSection";
import VideoSection from "./components/VideoSection";
import MapSection from "./components/MapSection";
import FAQSection from "./components/FAQSection";
import CodeVerification from "./components/CodeVerification";
import MinistrySection from "./components/MinistrySection";
import Footer from "./components/Footer";
import AdminPage from "./components/AdminPage";
import ProfilePage from "./components/ProfilePage";

export default function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSlider />
                <NewsSection />
                <VideoSection />
                <MapSection />
                <FAQSection />
                <CodeVerification />
                <MinistrySection />
              </>
            }
          />

          <Route path="/admin" element={<AdminPage />} />
<Route path="/verify" element={<CodeVerification />} />
<Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

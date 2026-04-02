import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HomeSection from "@/components/sections/HomeSection";
import InsightGapSection from "@/components/sections/InsightGapSection";
import PlatformSection from "@/components/sections/PlatformSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import AboutSection from "@/components/sections/AboutSection";
// import InvestorsSection from "@/components/sections/InvestorsSection";
import CareersSection from "@/components/sections/CareersSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const navigate = useCallback((section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar activeSection={activeSection} onNavigate={navigate} />

      <main>
        {/* Home shows hero + insight gap */}
        <div className={activeSection === "home" ? "section-active" : "section-hidden"}>
          <HomeSection onNavigate={navigate} />
          <InsightGapSection />
        </div>

        <div className={activeSection === "platform" ? "section-active" : "section-hidden"}>
          <PlatformSection />
        </div>

        <div className={activeSection === "solutions" ? "section-active" : "section-hidden"}>
          <SolutionsSection />
        </div>

        <div className={activeSection === "resources" ? "section-active" : "section-hidden"}>
          <ResourcesSection />
        </div>

        <div className={activeSection === "about" ? "section-active" : "section-hidden"}>
          <AboutSection />
        </div>

        {/* <div className={activeSection === "investors" ? "section-active" : "section-hidden"}>
          <InvestorsSection />
        </div> */}

        <div className={activeSection === "careers" ? "section-active" : "section-hidden"}>
          <CareersSection />
        </div>
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
};

export default Index;

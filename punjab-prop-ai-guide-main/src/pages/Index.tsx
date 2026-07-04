import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PredictionForm from "@/components/PredictionForm";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { PropertyAdvisorChat } from "@/components/PropertyAdvisorChat";
import { PriceHeatmap } from "@/components/PriceHeatmap";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <PriceHeatmap />
    <PredictionForm />
    <AboutSection />
    <Footer />
    <PropertyAdvisorChat />
  </div>
);

export default Index;

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PredictionForm from "@/components/PredictionForm";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <PredictionForm />
    <AboutSection />
    <Footer />
  </div>
);

export default Index;

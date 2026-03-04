import heroBg from "@/assets/hero-bg.jpg";
import { Building2, TrendingUp, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Punjab cityscape"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="hero-gradient absolute inset-0" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-6 animate-fade-up">
          <TrendingUp className="w-4 h-4 text-gold" />
          <span className="text-sm font-medium text-gold">AI-Powered Predictions</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-up leading-tight" style={{ animationDelay: "0.1s" }}>
          Find the True Value of Your Property{" "}
          <span className="text-gold">Instantly</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          AI-powered property price estimation for Punjab &amp; Tricity
        </p>
        <div className="flex flex-wrap justify-center gap-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          {[
            { icon: Building2, label: "11+ Cities" },
            { icon: TrendingUp, label: "AI Accuracy" },
            { icon: MapPin, label: "Punjab & Tricity" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-primary-foreground/70">
              <Icon className="w-5 h-5 text-gold" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

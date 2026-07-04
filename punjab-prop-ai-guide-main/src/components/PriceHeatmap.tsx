import * as React from "react";
import { Sparkles, MapPin, ArrowRight, TrendingUp, ShieldAlert, Award } from "lucide-react";

interface CityData {
  name: string;
  avgPrice: number;
  range: string;
  status: "Premium" | "High Growth" | "Stable" | "Budget Friendly";
  ratingColor: string;
  ratingBg: string;
  x: number; // SVG coordinate
  y: number; // SVG coordinate
  color: string;
}

const CITIES_DATA: CityData[] = [
  {
    name: "Chandigarh",
    avgPrice: 11500,
    range: "₹65L - ₹1.8Cr+",
    status: "Premium",
    ratingColor: "text-amber-500",
    ratingBg: "bg-amber-500/10",
    x: 420,
    y: 200,
    color: "from-amber-500 to-amber-600"
  },
  {
    name: "Mohali",
    avgPrice: 6800,
    range: "₹45L - ₹1.2Cr",
    status: "High Growth",
    ratingColor: "text-amber-400",
    ratingBg: "bg-amber-400/10",
    x: 390,
    y: 220,
    color: "from-orange-500 to-orange-600"
  },
  {
    name: "Ludhiana",
    avgPrice: 5200,
    range: "₹35L - ₹90L",
    status: "Stable",
    ratingColor: "text-emerald-400",
    ratingBg: "bg-emerald-400/10",
    x: 260,
    y: 210,
    color: "from-yellow-500 to-yellow-600"
  },
  {
    name: "Zirakpur",
    avgPrice: 4100,
    range: "₹30L - ₹75L",
    status: "High Growth",
    ratingColor: "text-amber-400",
    ratingBg: "bg-amber-400/10",
    x: 430,
    y: 250,
    color: "from-yellow-400 to-yellow-500"
  },
  {
    name: "Amritsar",
    avgPrice: 4200,
    range: "₹28L - ₹70L",
    status: "Stable",
    ratingColor: "text-emerald-400",
    ratingBg: "bg-emerald-400/10",
    x: 100,
    y: 110,
    color: "from-yellow-400 to-yellow-500"
  },
  {
    name: "Jalandhar",
    avgPrice: 3800,
    range: "₹25L - ₹65L",
    status: "Stable",
    ratingColor: "text-emerald-400",
    ratingBg: "bg-emerald-400/10",
    x: 200,
    y: 150,
    color: "from-teal-400 to-teal-500"
  },
  {
    name: "Patiala",
    avgPrice: 3400,
    range: "₹22L - ₹60L",
    status: "Budget Friendly",
    ratingColor: "text-emerald-500",
    ratingBg: "bg-emerald-500/10",
    x: 320,
    y: 300,
    color: "from-emerald-400 to-emerald-500"
  },
  {
    name: "Kharar",
    avgPrice: 3100,
    range: "₹18L - ₹50L",
    status: "Budget Friendly",
    ratingColor: "text-emerald-500",
    ratingBg: "bg-emerald-500/10",
    x: 360,
    y: 190,
    color: "from-emerald-400 to-emerald-500"
  }
];

export function PriceHeatmap() {
  const [selectedCity, setSelectedCity] = React.useState<CityData>(CITIES_DATA[1]); // Mohali default

  const handleSelectCity = (cityName: string) => {
    // Dispatch a custom window event
    const event = new CustomEvent("select-city-heatmap", { detail: cityName });
    window.dispatchEvent(event);
    
    // Smooth scroll to the Prediction Form
    const predictSection = document.getElementById("predict");
    if (predictSection) {
      predictSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="heatmap" className="section-padding bg-background border-b border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-4">
            <TrendingUp className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-gold">Market Visualizer</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Tricity & Punjab <span className="text-gold">Price Heatmap</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Hover or click on key cities to see average valuations, price trends, and auto-load them into the prediction form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-card rounded-2xl border p-6 md:p-8 shadow-xl">
          {/* Interactive SVG Map */}
          <div className="lg:col-span-2 relative border border-border/50 rounded-xl bg-secondary/15 p-4 flex items-center justify-center min-h-[350px] overflow-x-auto">
            <svg
              viewBox="0 0 550 400"
              className="w-full max-w-[500px] h-auto drop-shadow-lg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Map Outline & Connectivity Lines */}
              <path
                d="M100 110 L200 150 L260 210 L390 220 L420 200"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M260 210 L320 300 L390 220"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M360 190 L390 220 L430 250"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* City Nodes */}
              {CITIES_DATA.map((city) => {
                const isSelected = selectedCity.name === city.name;
                return (
                  <g
                    key={city.name}
                    className="cursor-pointer group"
                    onClick={() => setSelectedCity(city)}
                  >
                    {/* Ripple animation on selected node */}
                    {isSelected && (
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r="18"
                        className="fill-gold/15 stroke-gold animate-ping"
                        style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                      />
                    )}
                    {/* Node base */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={isSelected ? "11" : "8"}
                      className={`stroke-background stroke-[2px] transition-all duration-300 fill-current bg-gradient-to-r ${city.color} ${
                        isSelected ? "scale-125" : "hover:scale-125"
                      }`}
                      style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                    />
                    {/* City Label */}
                    <text
                      x={city.x}
                      y={city.y - 14}
                      textAnchor="middle"
                      className={`text-[10px] font-bold fill-foreground drop-shadow-md select-none transition-all ${
                        isSelected ? "fill-gold text-xs" : "group-hover:fill-gold"
                      }`}
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-4 left-4 flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Premium</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> Mid-Tier</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Budget</span>
            </div>
          </div>

          {/* Details Card */}
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center shadow-md">
                  <MapPin className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground leading-none">
                    {selectedCity.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">Punjab Region Insights</span>
                </div>
              </div>

              <div className="border-t border-b py-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Price / Sq Ft</span>
                  <span className="text-lg font-bold text-gold">
                    ₹ {selectedCity.avgPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Typical 2BHK Range</span>
                  <span className="text-sm font-semibold text-foreground">
                    {selectedCity.range}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Investment Rating</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${selectedCity.ratingBg} ${selectedCity.ratingColor}`}>
                    {selectedCity.status}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/25 border flex gap-3 text-xs text-muted-foreground leading-relaxed">
                {selectedCity.name === "Chandigarh" && (
                  <p>Chandigarh is the capital and represents high demand, highly regulated setups, and stable premium pricing. Excellent safety and quality of life.</p>
                )}
                {selectedCity.name === "Mohali" && (
                  <p>Mohali is the fastest-growing commercial and IT hub bordering Chandigarh. Highly recommended for mid-to-long term capital growth.</p>
                )}
                {selectedCity.name === "Zirakpur" && (
                  <p>Zirakpur offers dense residential societies with good highway connectivity. Good rental yields due to population influx.</p>
                )}
                {selectedCity.name === "Kharar" && (
                  <p>Kharar has huge student housing rental demand. Highly recommended for investors looking for affordable budgets and immediate cash flow.</p>
                )}
                {selectedCity.name === "Patiala" && (
                  <p>Patiala is a quiet historical town with highly stable, budget-friendly properties. Ideal for end-use buyers.</p>
                )}
                {selectedCity.name === "Jalandhar" && (
                  <p>Jalandhar offers solid residential pockets. Good NRI investment flow and stable market values.</p>
                )}
                {selectedCity.name === "Amritsar" && (
                  <p>Amritsar is an international tourism and cultural destination. Strong demand for holiday rentals and residential growth.</p>
                )}
                {selectedCity.name === "Ludhiana" && (
                  <p>Ludhiana has Punjab's highest commercial wealth. Solid demand for upscale layouts and commercial warehousing plots.</p>
                )}
              </div>
            </div>

            <button
              onClick={() => handleSelectCity(selectedCity.name)}
              className="mt-6 w-full py-3.5 rounded-xl gold-gradient text-accent-foreground font-bold shadow-lg hover:shadow-xl hover:opacity-90 flex items-center justify-center gap-2 transition-all"
            >
              Estimate in form <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

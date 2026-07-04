import { useState, useEffect } from "react";
import { Building, Home, Maximize, Sofa, Bath, Car, Calendar, Loader2, IndianRupee, TrendingUp, BarChart3, Scale, History, Download, Calculator, Trash2 } from "lucide-react";
import { API_BASE } from "@/lib/api";
import { CompareDialog, CompareItem } from "./CompareDialog";
import { EmiCalculator } from "./EmiCalculator";
import { printValuationReport } from "@/lib/printReport";

interface HistoryItem {
  id: string;
  city: string;
  bhk: string;
  area_sqft: string;
  furnishing: string;
  bathroom: string;
  parking: string;
  property_age: string;
  predicted_price: number;
  timestamp: number;
}

const CITIES = ["Mohali", "Kharar", "Zirakpur", "Chandigarh", "Ludhiana", "Amritsar", "Patiala", "Jalandhar"];
const BHK_OPTIONS = [1, 2, 3, 4];
const FURNISHING_OPTIONS = ["furnished", "semi", "unfurnished"];
const PARKING_OPTIONS = ["Yes", "No"];

interface PredictionResult {
  predicted_price: number;
}

const getInvestmentAdvice = (price: number) => {
  if (price < 30) return { label: "Budget Friendly", color: "text-primary", bg: "bg-primary/10" };
  if (price <= 60) return { label: "Fair Market Value", color: "text-gold-foreground", bg: "bg-gold/10" };
  return { label: "Premium Property", color: "text-accent-foreground", bg: "bg-accent/20" };
};

const PredictionForm = () => {
  const [form, setForm] = useState({
    city: "",
    bhk: "",
    area_sqft: "",
    furnishing: "",
    bathroom: "",
    parking: "",
    property_age: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState("");
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const [credits, setCredits] = useState(() => {
  localStorage.setItem("credits", "3");
  return 3;
});

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ ADD THIS BLOCK
  if (!localStorage.getItem("isLoggedIn") && credits <= 0) {
    setShowLimitPopup(true);
    return;
    
  }

  setError("");
  setResult(null);
  setLoading(true);
    try {
      const payload = {
        city: form.city,
        bhk: parseInt(form.bhk),
        area_sqft: parseFloat(form.area_sqft),
        furnishing: form.furnishing,
        bathroom: parseInt(form.bathroom),
        parking: form.parking,
        property_age: parseInt(form.property_age),
      };

      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Prediction failed");
      const data = await res.json();
      setResult(data);

      // Save to History List
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        city: form.city,
        bhk: form.bhk,
        area_sqft: form.area_sqft,
        furnishing: form.furnishing,
        bathroom: form.bathroom,
        parking: form.parking,
        property_age: form.property_age,
        predicted_price: data.predicted_price,
        timestamp: Date.now()
      };
      
      setHistoryList((prev) => {
        const filtered = prev.filter(item => !(
          item.city === form.city &&
          item.bhk === form.bhk &&
          item.area_sqft === form.area_sqft &&
          item.furnishing === form.furnishing &&
          item.bathroom === form.bathroom &&
          item.parking === form.parking &&
          item.property_age === form.property_age
        ));
        const updated = [newHistoryItem, ...filtered].slice(0, 5);
        localStorage.setItem("predictionHistory", JSON.stringify(updated));
        return updated;
      });

      if (!localStorage.getItem("isLoggedIn") && credits > 0) {
        const newCredits = credits - 1;
        setCredits(newCredits);
        localStorage.setItem("credits", newCredits.toString());
      }
    } catch {
      setError("Could not connect to prediction server. Make sure the Flask API is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const predictedPrice = result?.predicted_price ?? 0;
  const pricePerSqFt = form.area_sqft ? (predictedPrice * 100000 / parseFloat(form.area_sqft)).toFixed(0) : "0";
  const advice = getInvestmentAdvice(predictedPrice);

  const [compareList, setCompareList] = useState<CompareItem[]>(() => {
    try {
      const saved = localStorage.getItem("compareList");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isEmiOpen, setIsEmiOpen] = useState(false);

  const [historyList, setHistoryList] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem("predictionHistory");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleSelectCityEvent = (event: Event) => {
      const cityName = (event as CustomEvent).detail;
      if (cityName) {
        setForm((prev) => ({ ...prev, city: cityName }));
      }
    };
    window.addEventListener("select-city-heatmap", handleSelectCityEvent);
    return () => {
      window.removeEventListener("select-city-heatmap", handleSelectCityEvent);
    };
  }, []);

  const isCurrentItem = (item: CompareItem) => {
    return (
      item.city === form.city &&
      item.bhk === parseInt(form.bhk) &&
      item.area_sqft === parseFloat(form.area_sqft) &&
      item.furnishing === form.furnishing &&
      item.bathroom === parseInt(form.bathroom) &&
      item.parking === form.parking &&
      item.property_age === parseInt(form.property_age) &&
      item.predicted_price === predictedPrice
    );
  };

  const handleAddToCompare = () => {
    if (!result) return;
    
    const exists = compareList.some((item) => isCurrentItem(item));
    if (exists) return;

    if (compareList.length >= 3) {
      alert("You can compare a maximum of 3 properties at a time. Please remove one first.");
      return;
    }

    const newItem: CompareItem = {
      id: Date.now().toString(),
      city: form.city,
      bhk: parseInt(form.bhk),
      area_sqft: parseFloat(form.area_sqft),
      furnishing: form.furnishing,
      bathroom: parseInt(form.bathroom),
      parking: form.parking,
      property_age: parseInt(form.property_age),
      predicted_price: predictedPrice,
      price_per_sqft: parseFloat(pricePerSqFt.replace(/,/g, "")),
    };

    const updatedList = [...compareList, newItem];
    setCompareList(updatedList);
    localStorage.setItem("compareList", JSON.stringify(updatedList));
  };

  const handleRemoveFromCompare = (id: string) => {
    const updatedList = compareList.filter((item) => item.id !== id);
    setCompareList(updatedList);
    localStorage.setItem("compareList", JSON.stringify(updatedList));
  };

  const handleClearAllCompare = () => {
    setCompareList([]);
    localStorage.removeItem("compareList");
  };

  return (
    <section id="predict" className="section-padding bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Property Price <span className="text-gold">Estimator</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Enter your property details and let our AI predict the market value
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-3 card-elevated p-6 md:p-10 bg-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* City */}
              <SelectField icon={<Building className="w-4 h-4" />} label="City" value={form.city} onChange={(v) => handleChange("city", v)} options={CITIES.map((c) => ({ value: c, label: c }))} placeholder="Select City" />
              {/* BHK */}
              <SelectField icon={<Home className="w-4 h-4" />} label="BHK" value={form.bhk} onChange={(v) => handleChange("bhk", v)} options={BHK_OPTIONS.map((b) => ({ value: String(b), label: `${b} BHK` }))} placeholder="Select BHK" />
              {/* Area */}
              <InputField icon={<Maximize className="w-4 h-4" />} label="Area (sq ft)" value={form.area_sqft} onChange={(v) => handleChange("area_sqft", v)} type="number" placeholder="e.g. 1200" />
              {/* Furnishing */}
              <SelectField icon={<Sofa className="w-4 h-4" />} label="Furnishing" value={form.furnishing} onChange={(v) => handleChange("furnishing", v)} options={FURNISHING_OPTIONS.map((f) => ({ value: f, label: f.charAt(0).toUpperCase() + f.slice(1) }))} placeholder="Select Type" />
              {/* Bathrooms */}
              <InputField icon={<Bath className="w-4 h-4" />} label="Bathrooms" value={form.bathroom} onChange={(v) => handleChange("bathroom", v)} type="number" placeholder="e.g. 2" />
              {/* Parking */}
              <SelectField icon={<Car className="w-4 h-4" />} label="Parking" value={form.parking} onChange={(v) => handleChange("parking", v)} options={PARKING_OPTIONS.map((p) => ({ value: p, label: p }))} placeholder="Select" />
              {/* Property Age */}
              <div className="md:col-span-2">
                <InputField icon={<Calendar className="w-4 h-4" />} label="Property Age (years)" value={form.property_age} onChange={(v) => handleChange("property_age", v)} type="number" placeholder="e.g. 5" />
              </div>
            </div>

            {!localStorage.getItem("isLoggedIn") && (
              <div className="flex justify-between items-center mb-3 p-3 rounded-lg bg-gold/10 border border-gold/30">
                <div className="text-sm">
                  <span className="text-muted-foreground">Credits:</span>{" "}
                  <span className="font-bold text-gold">{credits}</span>
                </div>

                <div className="flex items-center gap-3">
                  {credits <= 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem("credits", "3");
                        setCredits(3);
                      }}
                      className="text-xs px-2 py-1 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                    >
                      Restore Credits
                    </button>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Cost: <span className="font-semibold text-gold">1 / use</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !form.city || !form.bhk || !form.area_sqft || !form.furnishing || !form.bathroom || !form.parking || !form.property_age}
              className="w-full gold-gradient text-accent-foreground font-semibold py-4 rounded-lg text-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Predicting...
                </>
              ) : (
                "Predict Property Price"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-8 animate-scale-in">
              <div className="border border-gold/30 rounded-xl p-6 md:p-8 bg-gold/5">
                <h3 className="text-lg font-semibold text-foreground mb-6 text-center">Prediction Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ResultCard icon={<IndianRupee className="w-5 h-5 text-gold" />} label="Estimated Price" value={`₹ ${predictedPrice.toFixed(2)} Lakhs`} />
                  <ResultCard icon={<BarChart3 className="w-5 h-5 text-primary" />} label="Price per Sq Ft" value={`₹ ${pricePerSqFt}`} />
                  <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border">
                    <TrendingUp className="w-5 h-5 text-gold mb-2" />
                    <span className="text-xs text-muted-foreground mb-1">Investment Advice</span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${advice.bg} ${advice.color}`}>
                      {advice.label}
                    </span>
                  </div>
                </div>

                {/* Compare, EMI and Print Buttons */}
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <button
                    type="button"
                    onClick={handleAddToCompare}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gold/30 hover:border-gold hover:bg-gold/10 text-gold font-semibold text-xs transition-all focus:outline-none"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    {compareList.some(isCurrentItem) ? "Added to Compare" : "Compare"}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setIsEmiOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gold/30 hover:border-gold hover:bg-gold/10 text-gold font-semibold text-xs transition-all focus:outline-none"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    Calculate EMI
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      printValuationReport({
                        city: form.city,
                        bhk: parseInt(form.bhk),
                        area_sqft: parseFloat(form.area_sqft),
                        furnishing: form.furnishing,
                        bathroom: parseInt(form.bathroom),
                        parking: form.parking,
                        property_age: parseInt(form.property_age),
                        predicted_price: predictedPrice,
                        price_per_sqft: parseFloat(pricePerSqFt.replace(/,/g, ""))
                      });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gold/30 hover:border-gold hover:bg-gold/10 text-gold font-semibold text-xs transition-all focus:outline-none"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* History Panel */}
        <div className="lg:col-span-1 card-elevated p-5 bg-card">
          <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
            <History className="w-4 h-4 text-gold" /> Recent Estimates
          </h3>
          {historyList.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">No recent estimates yet.</p>
          ) : (
            <div className="space-y-3">
              {historyList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setForm({
                      city: item.city,
                      bhk: item.bhk,
                      area_sqft: item.area_sqft,
                      furnishing: item.furnishing,
                      bathroom: item.bathroom,
                      parking: item.parking,
                      property_age: item.property_age
                    });
                    setResult({ predicted_price: item.predicted_price });
                  }}
                  className="p-3 rounded-lg border bg-secondary/10 hover:border-gold hover:bg-gold/5 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-xs font-bold text-foreground group-hover:text-gold transition-colors font-medium">
                      {item.city} ({item.bhk} BHK)
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[11px] text-muted-foreground">
                    <span>{item.area_sqft} sq ft</span>
                    <strong className="text-gold">₹ {item.predicted_price.toFixed(2)}L</strong>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setHistoryList([]);
                  localStorage.removeItem("predictionHistory");
                }}
                className="w-full text-center text-[10px] text-destructive hover:underline font-semibold mt-2 block"
              >
                Clear History
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
      {showLimitPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center shadow-xl">
            <h2 className="text-lg font-bold mb-2">
              Free Limit Reached 🚫
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              You’ve used all your free credits.
              Please login or signup to continue.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold"
              >
                Login
              </button>
              <button
                onClick={() => setShowLimitPopup(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Compare Tray */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-fade-up">
          <button
            onClick={() => setIsCompareOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-gold text-accent-foreground font-bold shadow-lg shadow-gold/30 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gold-light"
          >
            <Scale className="w-5 h-5 animate-pulse" />
            <span>Compare Properties</span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent-foreground text-gold text-xs font-black">
              {compareList.length}
            </span>
          </button>
        </div>
      )}

      <EmiCalculator
        isOpen={isEmiOpen}
        onClose={() => setIsEmiOpen(false)}
        propertyPriceLakhs={predictedPrice}
      />

      <CompareDialog
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        items={compareList}
        onRemove={handleRemoveFromCompare}
        onClearAll={handleClearAllCompare}
      />
    </section>
  );
};

const SelectField = ({ icon, label, value, onChange, options, placeholder }: { icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder: string }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
      {icon} {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

const InputField = ({ icon, label, value, onChange, type, placeholder }: { icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; type: string; placeholder: string }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
      {icon} {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>
);

const ResultCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border">
    {icon}
    <span className="text-xs text-muted-foreground mt-2 mb-1">{label}</span>
    <span className="text-lg font-bold text-foreground">{value}</span>
  </div>
);

export default PredictionForm;

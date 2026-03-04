import { useState } from "react";
import { Building, Home, Maximize, Sofa, Bath, Car, Calendar, Loader2, IndianRupee, TrendingUp, BarChart3 } from "lucide-react";

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

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      const res = await fetch("http://13.60.105.183:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Prediction failed");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Could not connect to prediction server. Make sure the Flask API is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const predictedPrice = result?.predicted_price ?? 0;
  const pricePerSqFt = form.area_sqft ? (predictedPrice * 100000 / parseFloat(form.area_sqft)).toFixed(0) : "0";
  const advice = getInvestmentAdvice(predictedPrice);

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

        <div className="card-elevated p-6 md:p-10 max-w-3xl mx-auto">
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
              </div>
            </div>
          )}
        </div>
      </div>
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

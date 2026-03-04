import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Mail, Lock, User, Loader2, Eye, EyeOff, Sparkles, Shield, Zap } from "lucide-react";

const API_BASE = "http://127.0.0.1:5000";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Signup failed");
      alert("Account created successfully!");
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/[0.05] text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] focus:border-[hsl(var(--gold)/0.3)] focus:bg-white/[0.08] transition-all duration-300";
  const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[hsl(var(--gold))] transition-colors";

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(152,50%,6%)] via-[hsl(152,45%,16%)] to-[hsl(43,50%,18%)]" />

      {/* Decorative floating orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-[hsl(var(--gold)/0.08)] rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[hsl(var(--primary)/0.15)] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(var(--gold)/0.04)] rounded-full blur-3xl" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-md px-4 py-8 animate-fade-in">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-gradient shadow-lg shadow-[hsl(var(--gold)/0.3)] mb-4">
            <Building2 className="w-8 h-8 text-[hsl(var(--gold-foreground))]" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-2">Punjab Property AI</h1>
          <div className="inline-flex items-center gap-1.5 text-[hsl(var(--gold-light))] text-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Powered Property Price Prediction</span>
          </div>
        </div>

        {/* Glassmorphism Card */}
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-xl shadow-2xl shadow-black/20 p-8">
          {/* Card glow accent */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.6)] to-transparent" />

          <h2 className="font-display text-2xl font-bold text-white text-center mb-1">Create Account</h2>
          <p className="text-white/50 text-sm text-center mb-6">Join to start predicting property prices</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm text-center backdrop-blur-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/70 mb-1.5 block">Full Name</label>
              <div className="relative group">
                <User className={iconClass} />
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white/70 mb-1.5 block">Email Address</label>
              <div className="relative group">
                <Mail className={iconClass} />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white/70 mb-1.5 block">Password</label>
              <div className="relative group">
                <Lock className={iconClass} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 6 characters"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-white/10 bg-white/[0.05] text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] focus:border-[hsl(var(--gold)/0.3)] focus:bg-white/[0.08] transition-all duration-300"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white/70 mb-1.5 block">Confirm Password</label>
              <div className="relative group">
                <Lock className={iconClass} />
                <input type={showPassword ? "text" : "password"} required value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="Re-enter password" className={inputClass} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl gold-gradient text-[hsl(var(--gold-foreground))] font-bold text-sm shadow-lg shadow-[hsl(var(--gold)/0.25)] hover:shadow-xl hover:shadow-[hsl(var(--gold)/0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">ALREADY REGISTERED?</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <Link
            to="/login"
            className="block w-full py-2.5 rounded-xl border border-white/10 text-white/70 font-medium text-sm text-center hover:bg-white/[0.05] hover:text-white hover:border-white/20 transition-all duration-300"
          >
            Sign In Instead
          </Link>
        </div>

        {/* Bottom features */}
        <div className="flex items-center justify-center gap-6 mt-8 text-white/40 text-xs">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Instant Setup</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Free to Use</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

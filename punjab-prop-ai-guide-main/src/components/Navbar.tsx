import { Building2, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Building2 className="w-6 h-6 text-gold" />
        <span className="font-display font-bold text-foreground text-lg">Punjab Property AI</span>
      </div>
      <div className="flex items-center gap-4 text-sm font-medium">
        <a href="#predict" className="hidden md:block text-muted-foreground hover:text-foreground transition-colors">Predict</a>
        <a href="#about" className="hidden md:block text-muted-foreground hover:text-foreground transition-colors">About</a>
        <Link to="/login" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
          <LogIn className="w-4 h-4" /> Login
        </Link>
        <Link to="/signup" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg gold-gradient text-[hsl(var(--gold-foreground))] font-semibold hover:opacity-90 transition-opacity">
          <UserPlus className="w-4 h-4" /> Sign Up
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;

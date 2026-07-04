import { useState, useEffect } from "react";
import { Building2, LogIn, UserPlus, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-gold" />
          <span className="font-display font-bold text-foreground text-lg">
            Punjab Property AI
          </span>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <a href="#predict" className="hidden md:block text-muted-foreground hover:text-foreground transition-colors">
            Predict
          </a>
          <a href="#about" className="hidden md:block text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-gold" />
              ) : (
                <Moon className="w-4 h-4 text-primary" />
              )}
            </button>
          )}

          {/* 👇 LOGIN / LOGOUT LOGIC */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                window.location.reload();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg gold-gradient text-[hsl(var(--gold-foreground))] font-semibold hover:opacity-90 transition-opacity"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg gold-gradient text-[hsl(var(--gold-foreground))] font-semibold hover:opacity-90 transition-opacity"
              >
                <UserPlus className="w-4 h-4" /> Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
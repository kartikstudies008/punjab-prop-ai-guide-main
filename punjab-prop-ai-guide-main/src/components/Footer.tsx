import { Building2 } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-10 px-4">
    <div className="max-w-5xl mx-auto text-center space-y-3">
      <div className="flex items-center justify-center gap-2">
        <Building2 className="w-5 h-5 text-gold" />
        <span className="font-display font-bold text-lg">Punjab Property Advisor AI</span>
      </div>
      <p className="text-sm text-primary-foreground/70">
        AI-powered property price estimation for Punjab &amp; Tricity
      </p>
      <p className="text-xs text-primary-foreground/50">
        Developed by a Student Developer • © {new Date().getFullYear()} All Rights Reserved
      </p>
    </div>
  </footer>
);

export default Footer;

import { Brain, Database, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Our machine learning model is trained on thousands of real property transactions across Punjab & Tricity for accurate predictions.",
  },
  {
    icon: Database,
    title: "Data-Driven",
    description: "We factor in location, area, amenities, property age, and market trends to give you the most reliable estimate.",
  },
  {
    icon: Shield,
    title: "Trusted Results",
    description: "Get unbiased, data-backed property valuations to make confident buying or selling decisions.",
  },
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-background">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        How It <span className="text-gold">Works</span>
      </h2>
      <p className="text-muted-foreground max-w-lg mx-auto mb-12">
        Our AI analyzes real market data to predict property prices with high accuracy
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="card-elevated p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
              <Icon className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;

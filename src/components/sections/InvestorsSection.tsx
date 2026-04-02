import { TrendingUp, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Market Opportunity",
    desc: "The industrial analytics market is projected to reach $35B by 2028. Causal AI represents the next frontier, and TPI is positioned as the first-mover.",
  },
  {
    icon: Shield,
    title: "Defensible Technology",
    desc: "Our causal discovery algorithms and domain-specific models create deep technical moats that are difficult to replicate.",
  },
  {
    icon: Globe,
    title: "Global Scalability",
    desc: "Our platform is industry-agnostic and scales across oil & gas, chemicals, pharmaceuticals, and advanced manufacturing.",
  },
];

const InvestorsSection = () => (
  <section className="py-20 px-6 bg-surface">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <span className="font-mono text-xs text-teal uppercase tracking-widest">Investors</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-obsidian mt-3">
          The Investment Thesis
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {features.map((f) => (
          <div key={f.title} className="bg-canvas border border-border rounded p-6 card-hover">
            <f.icon size={28} className="text-teal mb-4" />
            <h3 className="text-base font-bold text-obsidian mb-2">{f.title}</h3>
            <p className="text-sm text-slate-text leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden rounded-lg bg-teal px-8 py-16 text-center">
        {/* Decorative circle */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5" />
        <div className="relative z-10">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Partner With Us
          </h3>
          <p className="text-white/80 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            We're raising our Series A to scale our platform across global industrial markets. Join us in building the future of industrial intelligence.
          </p>
          <button className="btn-primary bg-white text-obsidian hover:bg-white/90 font-bold">
            Request Investor Deck
          </button>
          <p className="text-white/60 text-xs mt-4">Confidential materials available under NDA</p>
        </div>
      </div>
    </div>
  </section>
);

export default InvestorsSection;

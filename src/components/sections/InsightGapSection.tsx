const cards = [
  {
    label: "01",
    title: "Traditional Analytics",
    subtitle: "What happened?",
    description: "Reactive reporting based on historical patterns, lacking structural context.",
    borderColor: "border-t-slate-text",
    bg: "bg-surface",
    textColor: "text-obsidian",
  },
  {
    label: "02",
    title: "Predictive Systems",
    subtitle: "What might happen?",
    description: "Pattern matching at scale. Identifies correlations but cannot explain 'why' or simulate interventions.",
    borderColor: "border-t-slate-text",
    bg: "bg-surface",
    textColor: "text-obsidian",
  },
  {
    label: "03",
    title: "Causal Intelligence",
    subtitle: "Why did it happen and how do we control it?",
    description: "Modelling the physics of the process with scientific certainty in simulation and optimization.",
    borderColor: "border-t-teal",
    bg: "bg-obsidian",
    textColor: "text-primary-foreground",
  },
];

const InsightGapSection = () => (
  <section className="py-10 px-6 bg-canvas">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <span className="font-mono text-xs text-teal uppercase tracking-widest">The Insight Gap</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-obsidian mt-3">
        The Industrial Insight Gap
        </h2>
        <p className="text-slate-text mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
        Modern industrial organizations generate enormous volumes of operational data. Yet critical decisions are still made with limited understanding of true causal relationships.        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`${card.bg} ${card.borderColor} border-t-4 border border-border rounded p-6 card-hover`}
          >
            <span className="font-mono text-xs text-teal">{card.label}</span>
            <h3 className={`text-lg font-bold ${card.textColor} mt-2`}>{card.title}</h3>
            <p className={`text-sm italic mt-1 ${card.textColor === "text-primary-foreground" ? "text-primary-foreground/70" : "text-slate-text"}`}>
              {card.subtitle}
            </p>
            <p className={`text-sm mt-4 leading-relaxed ${card.textColor === "text-primary-foreground" ? "text-primary-foreground/80" : "text-slate-text"}`}>
              {card.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center max-w-3xl mx-auto">
  <p className="text-base sm:text-lg font-medium text-obsidian italic">
    This is the Insight Gap
  </p>

  <p className="mt-4 text-slate-text text-sm leading-relaxed italic">
    Real operational control requires moving beyond prediction to understanding 
    the true causal structure of your systems.
  </p>

  <div className="mt-10">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-teal">
      Industries We Serve
    </h3>

    <p className="mt-4 text-slate-text text-sm leading-relaxed">
      Manufacturing | Foundries | Chemical Processing | Pharmaceutical Production |
      Energy & Utilities | Supply Chain Networks | Agriculture
    </p>
  </div>
</div>
      {/* <div className="text-center mb-14 ">
      <p className="text-slate-text mt-0 max-w-2xl mx-auto text-sm leading-relaxed ">
        Modern industrial organizations generate enormous volumes of operational data. Yet critical decisions are still made with limited understanding of true causal relationships.        </p>
     </div> */}
    </div>
  </section>
);

export default InsightGapSection;

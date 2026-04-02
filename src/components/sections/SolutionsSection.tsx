// const products = [
//   {
//     icon: "I",
//     title: "IAS — Insight Accelerator Suite",
//     subtitle: "Rapid diagnostic intelligence for operational teams",
//     highlight: "Transform raw process data into structured insights within hours, not months. IAS is designed for engineers who need answers now.",
//     architecture: ["Data Connectors", "Signal Processing", "Statistical Engine", "Insight Dashboard"],
//     objectives: [
//       "Reduce diagnostic time by 80%",
//       "Standardize root-cause analysis workflows",
//       "Enable self-service analytics for engineers",
//     ],
//     workflow: ["ASK", "ANALYSE", "ACT"],
//   },
//   {
//     icon: "C",
//     title: "CIP — Causal Intelligence Platform",
//     subtitle: "Deep causal reasoning for strategic optimization",
//     highlight: "Go beyond what happened and why—simulate what could happen. CIP builds structural causal models of your entire process to enable true optimization.",
//     architecture: ["Causal Discovery", "DAG Builder", "Simulation Engine", "Optimization Layer"],
//     objectives: [
//       "Model complex causal structures automatically",
//       "Run counterfactual simulations safely",
//       "Optimize across multiple objectives simultaneously",
//     ],
//     workflow: ["WHY", "SIMULATE", "OPTIMIZE"],
//   },
// ];

const products = [
  {
    icon: "I",
    title: "Insight Accelerators",
    subtitle: "Tactical Decision Discovery",
    highlight:
      "Fast, democratized intelligence for operational and business teams. Transforms 'What happened?' into clear, prescriptive guidance using rule-based NLP.",
    
    features: [
      {
        title: "Pattern-to-Prescription Engine",
        desc: "Utilizes rule-based NLP to convert detected patterns into actionable, natural language operational recommendations.",
      },
      {
        title: "Fast Causal Identification",
        desc: "Lightweight algorithms that rapidly uncover indirect drivers and hidden influences invisible to traditional dashboards.",
      },
    ],

    objectives: [
      "Rapid root-cause triage for operational teams",
      "Closing critical descriptive insight gaps for plant managers",
      "Democratizing actionable intelligence without requiring data science expertise",
    ],

    workflow: ["ASK", "ANALYZE", "ACT"],
  },

  {
    icon: "C",
    title: "Causal Intelligence",
    subtitle: "Strategic System Control",
    highlight:
      "A deep operational engine for complex environments. Constructs a Causal Digital Twin to simulate and control industrial systems.",

    features: [
      {
        title: "Structural Causal Models (SCMs)",
        desc: "Implements Judea Pearl’s Do-Calculus to formalize relationships between system variables.",
      },
      {
        title: "Counterfactual Engine",
        desc: "Simulates 'What if?' scenarios to validate interventions with scientific rigor.",
      },
    ],

    objectives: [
      "Enable safe experimentation in virtual environments",
      "Improve yield, quality, and efficiency",
      "Provide proactive systemic control via hidden leverage points",
    ],

    workflow: ["WHY", "SIMULATE", "OPTIMIZE"],
  },

  {
    icon: "F",
    title: "Field Commander",
    subtitle: "Farmer-Centric Operational Command",
    highlight:
      "An intelligent advisory platform delivering Causal AI-powered agricultural guidance directly to farmers.",

    features: [
      {
        title: "Causal Command Engine",
        desc: "Combines sensor data, geospatial intelligence, and AI for monitoring, diagnostics, and simulation.",
      },
      {
        title: "Live Guidance & Demand Engine",
        desc: "Provides alerts, pest analysis, ROI insights, precision advice, and one-tap ordering.",
      },
    ],

    objectives: [
      "Enable higher yields and lower costs",
      "Generate demand through smart nudges",
      "Build long-term farmer prosperity",
    ],

    workflow: ["DETECT", "DECIDE", "DIRECT"],
  },
];

const SolutionsSection = () => (
  <section className="py-20 px-6 bg-canvas">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <span className="font-mono text-xs text-teal uppercase tracking-widest">Solutions</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-obsidian mt-3">Our Solutions</h2>
        <p className="text-slate-text mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
        Three complementary solutions — Insight Accelerators, Causal Intelligence Platform, and Field Commander — working together with one unified mission: turning operational data into causal understanding and real-world control.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.icon} className="bg-surface border border-border rounded p-8 card-hover">
            {/* Icon + Title */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded bg-teal/10 flex items-center justify-center text-teal font-extrabold text-lg shrink-0">
                {p.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-obsidian">{p.title}</h3>
                <p className="text-sm text-slate-text italic">{p.subtitle}</p>
              </div>
            </div>

            {/* Highlight */}
            <div className="border-l-4 border-teal bg-teal/5 rounded-r p-4 mb-6">
              <p className="text-sm text-obsidian leading-relaxed">{p.highlight}</p>
            </div>
          {/* Features */}
<p className="font-plex text-xs text-slate-text uppercase tracking-wider mb-3">
  Capabilities
</p>

<div className="space-y-3 mb-6">
  {p.features.map((f) => (
    <div key={f.title}>
      <p className="text-sm font-semibold text-obsidian">{f.title}</p>
      <p className="text-sm text-slate-text leading-relaxed">{f.desc}</p>
    </div>
  ))}
</div>
            

            {/* Objectives */}
            <p className="font-plex text-xs text-slate-text uppercase tracking-wider mb-3">Objectives</p>
            <ul className="space-y-2 mb-6">
              {p.objectives.map((o) => (
                <li key={o} className="text-sm text-slate-text flex gap-2 items-start">
                  <span className="text-teal mt-0.5">•</span>
                  {o}
                </li>
              ))}
            </ul>

            {/* Workflow */}
            <div className="flex items-center gap-2">
              {p.workflow.map((w, i) => (
                <span key={w} className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold bg-obsidian text-primary-foreground px-3 py-1.5 rounded">
                    {w}
                  </span>
                  {i < p.workflow.length - 1 && <span className="text-slate-text text-xs">→</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionsSection;

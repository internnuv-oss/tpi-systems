import { Bold } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Unified Insight Layer",
    desc: "Connects disparate operational data sources -  including ERP, MES, sensor arrays, machine data, satellite imagery and more - into a single structural schema",
  },
  {
    num: "02",
    title: "Causal Identification",
    desc: "Proprietary algorithms identify structural causal relationships, detecting hidden confounders and indirect drivers invisible to standard ML.",
  },
  {
    num: "03",
    title: "Structural Causal Models (SCM)",
    desc: "Formalized models that describe the physics of the system's behaviour, forming the foundation of the Causal Twin.",
  },
  {
    num: "04",
    title: "Intervention Simulation",
    desc: "Simulate operational decisions before implementation. Answer 'What if?' with scientific and mathematical rigor.",
  },
];

const sections = [
  {
    num: "01",
    label: "Data Integration",
    title: "Unified Insight Layer",
    desc: "Connects disparate operational data sources - including ERP, MES, sensor arrays, machine data, satellite imagery and more - into a single structural schema",
  },
  {
    num: "02",
    label: "Discovery Engine",
    title: "Causal Identification",
    desc: "Proprietary algorithms identify structural causal relationships, detecting hidden confounders and indirect drivers invisible to standard ML.",
  },
  {
    num: "03",
    label: "Structural Models",
    title: "Structural Causal Models (SCM)",
    desc: "Formalized models that describe the physics of the system's behaviour, forming the foundation of the Causal Twin.",
  },
  {
    num: "04",
    label: "Counterfactual Engine",
    title: "Intervention Simulation",
    desc: "Simulate operational decisions before implementation. Answer 'What if?' with scientific and mathematical rigor.",
  },
];
const terminalLines = [
  { color: "text-teal", text: "PROMPT_INTERFACE: Simulation_v1.0" },

  { color: "text-teal", text: '> RUN query --intervention "Cooling_Rate +15%"' },

  { color: "text-primary-foreground/60", text: "... Analyzing structural causal model" },
  { color: "text-primary-foreground/60", text: "... Identified hidden confounder: [Raw_Material_Impurities]" },

  { color: "text-green-400", text: "SUCCESS: Predicted Yield Change: +4.2%" },
  { color: "text-yellow-400", text: "Confidence Interval: 98.4% (Based on Do-Calculus)" },

  { color: "text-primary-foreground/60", text: "" },

  { color: "text-teal", text: "Recommendation:" },
  { color: "text-primary-foreground/60", text: "Adjust cooling logic to compensate for upstream impurity oscillations." },
];

const PlatformSection = () => (
  <section className="py-20 px-6 bg-surface">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <span className="font-mono text-xs text-teal uppercase tracking-widest">Platform</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-obsidian mt-3">The Causal Intelligence Platform</h2>
        <p className="text-slate-text mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
        A <span className="strong">Causal Digital Twin</span> of your operational systems, enabling teams to move from reactive problem solving to scientific control.        </p>
      </div>

      {/* Grid layout for sections and terminal */}
      <div className="grid md:grid-cols-2 gap-6 mt-10 items-start">
        {/* Sections on the left */}
        <div className="space-y-6">
          {sections.map((s) => (
            <div
              key={s.num}
              className="bg-surface border border-border rounded-lg px-6 py-3 hover:shadow-md transition-all duration-200"
            >
              {/* Top label */}
              <span className="text-xs uppercase tracking-wider text-slate-text">
                {s.num} / {s.label}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-obsidian mt-2">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-text mt-2 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Terminal on the right */}
        <div className="bg-obsidian rounded-lg p-6 overflow-hidden shadow-lg border border-white/5">
          {/* Top dots */}
          <div className="flex gap-1.5 mb-4">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* Terminal content */}
          <div className="font-mono text-xs space-y-1.5 leading-relaxed whitespace-pre-wrap break-words">
            {terminalLines.map((line, i) => (
              <p key={i} className={line.color}>
                {line.text}
              </p>
            ))}
            <p className="text-teal animate-pulse">█</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PlatformSection;
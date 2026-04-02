interface HomeSectionProps {
  onNavigate: (section: string) => void;
}

const CausalDiagram = () => (
  <div className="bg-surface rounded border border-border p-6 relative">
    <p className="font-plex text-xs text-slate-text mb-6 uppercase tracking-wider">Causal Diagram Preview</p>
    <svg viewBox="0 0 320 200" className="w-full h-auto" fill="none">
      {/* Connection lines */}
      <line x1="80" y1="50" x2="170" y2="100" stroke="hsl(215,16%,75%)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="80" y1="150" x2="170" y2="100" stroke="hsl(215,16%,75%)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="190" y1="100" x2="270" y2="100" stroke="hsl(174,85%,32%)" strokeWidth="2" />
      {/* Input Pressure node */}
      <rect x="20" y="35" width="120" height="30" rx="4" fill="hsl(210,40%,96%)" stroke="hsl(214,32%,91%)" strokeWidth="1" />
      <text x="80" y="55" textAnchor="middle" className="font-plex" fontSize="11" fill="hsl(215,16%,47%)">Input Pressure</text>
      {/* Ambient Temp node */}
      <rect x="20" y="135" width="120" height="30" rx="4" fill="hsl(210,40%,96%)" stroke="hsl(214,32%,91%)" strokeWidth="1" />
      <text x="80" y="155" textAnchor="middle" className="font-plex" fontSize="11" fill="hsl(215,16%,47%)">Ambient Temp</text>
      {/* Causal Junction */}
      <circle cx="180" cy="100" r="18" fill="hsl(174,85%,32%)" />
      <text x="180" y="104" textAnchor="middle" fontSize="9" fill="white" fontWeight="600">CJ</text>
      {/* Yield Output node */}
      <rect x="230" y="85" width="80" height="30" rx="4" fill="hsl(210,40%,96%)" stroke="hsl(174,85%,32%)" strokeWidth="1.5" />
      <text x="270" y="105" textAnchor="middle" className="font-plex" fontSize="11" fill="hsl(222,47%,11%)">Yield Output</text>
    </svg>
  </div>
);

const HomeSection = ({ onNavigate }: HomeSectionProps) => (
  <section className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      {/* Left */}
      <div>
        <span className="inline-block bg-teal/10 text-teal text-xs font-semibold font-mono px-3 py-1 rounded mb-6 uppercase tracking-wider">
          Industrial Intelligence
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-obsidian leading-tight mb-6">
          Understanding the{" "}
          <span className="text-teal underline decoration-teal decoration-2 underline-offset-4">Physics</span>{" "}
          of Industry
        </h1>
        <p className="text-slate-text text-base leading-relaxed mb-8 max-w-lg">
        “TheProcessInsights” (TPI) builds Causal Intelligence systems that reveal why industrial systems behave the way they do — and how to optimize them with scientific certainty.        </p>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => onNavigate("platform")} className="btn-primary">
          Explore Platform
          </button>
          <button onClick={() => onNavigate("solutions")} className="btn-outline">
          Technical Resources
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="space-y-6">
        <CausalDiagram />
        <div className="bg-surface rounded border-l-4 border-teal p-5">
          <p className="text-sm text-slate-text italic leading-relaxed">
          "Traditional ML predicts outcomes. We model the structural interventions that control them."          </p>
          <p className="text-xs text-obsidian font-semibold mt-3 font-plex">— TPI Systems Research</p>
        </div>
      </div>
    </div>
  </section>
);

export default HomeSection;

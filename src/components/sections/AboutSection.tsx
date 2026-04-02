const stats = [
  { value: "15+", label: "Years Combined Experience" },
  { value: "50+", label: "Industrial Deployments" },
  { value: "3", label: "Global Offices" },
  { value: "$200M+", label: "Value Unlocked" },
];

const founders = [
  {
    name: "Atul Garg",
    role: "Co-Founder & CTO",
    expertise: "Causal Intelligence | Manufacturing | Supply Chain | Agriculture | Enterprise Software",
    linkedin: "linkedin.com/in/atul-garg",
  },
  {
    name: "Vikram Singhal",
    role: "Co-Founder & CEO",
    expertise: "Process Industries | Operational Physics | Chemical Manufacturing | Global Operations",
    linkedin: "linkedin.com/in/vikram-singhal",
  },
];

const AboutSection = () => (
  <section className="py-20 px-6 bg-canvas">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Left */}
        {/* Left */}
<div>
  <span className="font-mono text-xs text-teal uppercase tracking-widest">Company</span>

  <h2 className="text-3xl sm:text-4xl font-extrabold text-obsidian mt-3 mb-6">
    Bridging the Insight Gap
  </h2>

  <p className="text-sm text-slate-text leading-relaxed mb-4">
    Every organization deserves accurate, actionable intelligence. TheProcessInsights was founded on a simple belief: the "Insight Gap" between data and action is not a failure of effort, but a failure of methodology.
  </p>

  <p className="text-sm text-slate-text leading-relaxed mb-4">
    Our team consists of causal researchers, process engineers, and software architects who believe the current era of correlation-based AI is hitting a ceiling.
  </p>

  {/* <p className="text-sm text-slate-text leading-relaxed mb-4">
    We move enterprises from guessing to knowing by replacing correlation with causation. We transform operational data from a passive record into an active control system, enabling scientific decision-making instead of intuition-based firefighting.
  </p> */}

  {/* <p className="text-sm text-slate-text leading-relaxed mb-6">
    We build cutting-edge digital assistants to optimize manufacturing, delivering precision and innovation that elevate our clients to world-class status.
  </p> */}

  {/* Quote */}
  <blockquote className="border-l-4 border-teal pl-4 py-2">
    <p className="text-sm text-obsidian italic leading-relaxed">
      "We are not another analytics company. We are a causal intelligence company, bridging everyday questions with operational optimization."


      
    </p>
  </blockquote>
</div>

        {/* Right */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded p-6">
            <h3 className="text-base font-bold text-obsidian mb-3">Our Mission</h3>
            <p className="text-sm text-slate-text leading-relaxed">
            We move enterprises from guessing to knowing by replacing correlation with causation. We transform operational data from a passive record into an active control system, enabling scientific decision-making instead of intuition-based firefighting.


            
            </p>
          </div>
          <div className="bg-surface border border-border rounded p-6">
            <p className="text-sm text-slate-text leading-relaxed">
            We transform operational data from a passive record into an active control system, enabling scientific decision-making instead of intuition-based firefighting.
We build cutting-edge digital assistants to optimize manufacturing, delivering precision and innovation that elevate our clients to world-class status.



            
            </p>
          </div>
          {/* <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface border border-border rounded p-4 text-center">
                <span className="text-2xl font-extrabold text-teal">{s.value}</span>
                <p className="text-xs text-slate-text mt-1">{s.label}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Founders */}
      <div>
  <h3 className="text-xl font-bold text-obsidian mb-8">Leadership</h3>

  <div className="grid md:grid-cols-2 gap-8">
    {founders.map((f) => (
      <div key={f.name} className="flex gap-5 items-start border border-border rounded-lg p-5">
        
        {/* Avatar */}
        <div className="w-16 h-16 rounded bg-muted flex items-center justify-center shrink-0">
          <span className="font-bold text-slate-text text-lg">
            {f.name.split(" ").map(n => n[0]).join("")}
          </span>
        </div>

        {/* Content */}
        <div>
          <h4 className="text-base font-bold text-obsidian">
            {f.name}
          </h4>

          <p className="text-xs text-teal font-semibold mb-2">
            {f.role}
          </p>

          {/* Expertise */}
          <p className="text-sm text-slate-text leading-relaxed mb-3">
            {f.expertise}
          </p>

          {/* LinkedIn */}
          <p className="text-sm text-slate-text">
            <span className="text-obsidian font-medium">LinkedIn: </span>
            <a
              href={`https://${f.linkedin}`}
              target="_blank"
              className="text-teal hover:underline"
            >
              {f.linkedin}
            </a>
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  </section>
);

export default AboutSection;

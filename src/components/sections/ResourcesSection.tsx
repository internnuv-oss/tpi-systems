import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { ExternalLink, Eye, Download } from "lucide-react";

type Resource = Tables<"resources">;

const ResourcesSection = () => {
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["public-resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Resource[];
    },
  });

  const papers = resources.filter((r) => r.type === "PDF" || r.type === "Research Note");
  const caseStudies = resources.filter((r) => r.type === "Case Study");

  const PaperSkeleton = () => (
    <div className="bg-canvas border border-border rounded p-5 flex gap-4 items-start">
      <div className="w-10 h-6 bg-muted rounded animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-3 bg-muted rounded animate-pulse w-full" />
      </div>
    </div>
  );

  const CaseStudySkeleton = () => (
    <div className="bg-canvas border border-border rounded p-6 space-y-3">
      <div className="h-8 bg-muted rounded animate-pulse w-1/3" />
      <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
      <div className="h-3 bg-muted rounded animate-pulse w-full" />
    </div>
  );

  const handleCardClick = (linkedinUrl: string | null) => {
    if (linkedinUrl) window.open(linkedinUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-xs text-teal uppercase tracking-widest">Resources</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-obsidian mt-3">Knowledge Repository </h2>
          <p className="text-slate-text mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
          Scientific Foundations and anonymized implementation frameworks and case studies.        </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-14">
          {/* Papers */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <PaperSkeleton key={i} />)
            ) : papers.length === 0 ? (
              <p className="text-sm text-slate-text text-center py-8">No research papers available at this time.</p>
            ) : (
              papers.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleCardClick(p.linkedin_url)}
                  className={`bg-canvas border border-border rounded p-5 flex gap-4 items-start card-hover group ${p.linkedin_url ? "cursor-pointer" : ""}`}
                >
                  <span className="font-mono text-[10px] font-bold bg-teal/10 text-teal px-2 py-1 rounded shrink-0 uppercase">
                    {p.type}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-obsidian group-hover:text-teal transition-colors duration-200">
                        {p.title}
                      </h4>
                      {p.linkedin_url && <ExternalLink size={12} className="text-slate-text shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-text mt-1 leading-relaxed">{p.description}</p>
                    {p.file_url && (
                      <div className="flex items-center gap-4 mt-2">
                        <a
                          href={p.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-bold uppercase text-slate-text hover:text-teal transition-colors"
                        >
                          <Eye size={12} /> View PDF
                        </a>
                        <a
                          href={p.file_url}
                          download
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-bold uppercase text-slate-text hover:text-teal transition-colors"
                        >
                          <Download size={12} /> Download
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Dark research note */}
          <div className="bg-obsidian rounded p-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-teal uppercase tracking-widest">Research Lab</span>
              <h3 className="text-lg font-bold text-primary-foreground mt-3">
                Advancing Causal AI for Industry
              </h3>
              <p className="text-sm text-primary-foreground/70 mt-3 leading-relaxed">
                Our research team publishes regularly on causal inference, process modeling, and industrial AI. Access our full library of technical papers and Solutions guides.
              </p>
            </div>
            <button className="btn-teal mt-6 text-xs w-full">Access Research Library</button>
          </div>
        </div>

        {/* Case Studies */}
        <div>
          <h3 className="text-xl font-bold text-obsidian mb-6">Evidence-Based Impact & Case Research</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <CaseStudySkeleton key={i} />)
            ) : caseStudies.length === 0 ? (
              <p className="text-sm text-slate-text text-center py-8 col-span-3">No case studies available at this time.</p>
              
            ) : (
              caseStudies.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleCardClick(c.linkedin_url)}
                  className={`bg-canvas border border-border rounded p-6 card-hover ${c.linkedin_url ? "cursor-pointer" : ""}`}
                >
                  <span className="text-3xl font-extrabold text-teal">{c.highlight_metric || "—"}</span>
                  <p className="text-xs font-semibold text-obsidian mt-1 uppercase tracking-wider">{c.metric_description || c.tag_label}</p>
                  <p className="text-sm text-slate-text mt-3 leading-relaxed">{c.description}</p>
                  {c.file_url && (
                    <div className="flex items-center gap-4 mt-3">
                      <a
                        href={c.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase text-slate-text hover:text-teal transition-colors"
                      >
                        <Eye size={12} /> View PDF
                      </a>
                      <a
                        href={c.file_url}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase text-slate-text hover:text-teal transition-colors"
                      >
                        <Download size={12} /> Download
                      </a>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;

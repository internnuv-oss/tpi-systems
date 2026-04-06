import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { ExternalLink, Eye } from "lucide-react";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Resource = Tables<"resources">;

const PAPERS_PER_PAGE = 5;
const CASE_STUDIES_PER_PAGE = 6;

const ResourcesSection = () => {
  const [papersPage, setPapersPage] = useState(1);
  const [caseStudiesPage, setCaseStudiesPage] = useState(1);

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

  const papers = resources.filter((r) => 
    r.type === "PDF" || r.type === "Research Note" || r.type === "Article"
  );
  const caseStudies = resources.filter((r) => r.type === "Case Study");

  // Pagination Logic
  const totalPapersPages = Math.ceil(papers.length / PAPERS_PER_PAGE);
  const currentPapers = papers.slice((papersPage - 1) * PAPERS_PER_PAGE, papersPage * PAPERS_PER_PAGE);

  const totalCaseStudiesPages = Math.ceil(caseStudies.length / CASE_STUDIES_PER_PAGE);
  const currentCaseStudies = caseStudies.slice((caseStudiesPage - 1) * CASE_STUDIES_PER_PAGE, caseStudiesPage * CASE_STUDIES_PER_PAGE);

  const PaperSkeleton = () => (
    <div className="bg-canvas border border-border rounded p-5 flex justify-between gap-4 items-start">
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-3 bg-muted rounded animate-pulse w-full" />
      </div>
      <div className="w-12 h-6 bg-muted rounded animate-pulse shrink-0" />
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
            Scientific Foundations and anonymized implementation frameworks and case studies.        
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-14">
          {/* Papers / Articles / Notes */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <PaperSkeleton key={i} />)
            ) : papers.length === 0 ? (
              <p className="text-sm text-slate-text text-center py-8">No research papers available at this time.</p>
            ) : (
              <>
                {currentPapers.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleCardClick(p.linkedin_url)}
                    className={`bg-canvas border border-border rounded p-5 flex justify-between gap-4 items-start card-hover group ${p.linkedin_url ? "cursor-pointer" : ""}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-obsidian group-hover:text-teal transition-colors duration-200">
                          {p.title}
                        </h4>
                        {p.linkedin_url && <ExternalLink size={12} className="text-slate-text shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-text mt-1 leading-relaxed">{p.description}</p>
                      
                      {(p.file_url || p.linkedin_url) && p.type?.trim().toLowerCase() === "pdf" && (
                        <div className="flex items-center gap-4 mt-3">
                          <a
                            href={p.file_url || p.linkedin_url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-slate-text hover:text-teal transition-colors"
                          >
                            <Eye size={14} /> View PDF
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <span className="font-mono text-[10px] font-bold bg-teal/10 text-teal px-2 py-1 rounded shrink-0 uppercase whitespace-nowrap">
                      {p.type}
                    </span>
                  </div>
                ))}
                
                {/* Pagination Controls for Papers */}
                {totalPapersPages > 1 && (
                  <Pagination className="mt-8 justify-start">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => { e.preventDefault(); setPapersPage((p) => Math.max(1, p - 1)); }}
                          className={papersPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      {[...Array(totalPapersPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            isActive={papersPage === i + 1}
                            onClick={(e) => { e.preventDefault(); setPapersPage(i + 1); }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => { e.preventDefault(); setPapersPage((p) => Math.min(totalPapersPages, p + 1)); }}
                          className={papersPage === totalPapersPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
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
          
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <CaseStudySkeleton key={i} />)}
            </div>
          ) : caseStudies.length === 0 ? (
            <p className="text-sm text-slate-text text-center py-8">No case studies available at this time.</p>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                {currentCaseStudies.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleCardClick(c.linkedin_url)}
                    className={`bg-canvas border border-border rounded p-6 card-hover ${c.linkedin_url ? "cursor-pointer" : ""}`}
                  >
                    <span className="text-3xl font-extrabold text-teal">{c.highlight_metric || "—"}</span>
                    <p className="text-xs font-semibold text-obsidian mt-1 uppercase tracking-wider">{c.metric_description || c.tag_label}</p>
                    <p className="text-sm text-slate-text mt-3 leading-relaxed">{c.description}</p>
                    
                    {(c.file_url || c.linkedin_url) && c.type?.trim().toLowerCase() === "pdf" && (
                      <div className="flex items-center gap-4 mt-4">
                        <a
                          href={c.file_url || c.linkedin_url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-slate-text hover:text-teal transition-colors"
                        >
                          <Eye size={14} /> View PDF
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination Controls for Case Studies */}
              {totalCaseStudiesPages > 1 && (
                <Pagination className="mt-8 justify-start">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); setCaseStudiesPage((p) => Math.max(1, p - 1)); }}
                        className={caseStudiesPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {[...Array(totalCaseStudiesPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={caseStudiesPage === i + 1}
                          onClick={(e) => { e.preventDefault(); setCaseStudiesPage(i + 1); }}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); setCaseStudiesPage((p) => Math.min(totalCaseStudiesPages, p + 1)); }}
                        className={caseStudiesPage === totalCaseStudiesPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
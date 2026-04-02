import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface Job {
  id: string;
  title: string;
  department_tags: string;
  is_active: boolean;
  created_at: string;
  linkedin_url: string | null;
  description: string;
}

const CareersSection = () => {
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["public-jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Job[];
    },
  });

  const toggleJob = (id: string) => {
    setOpenJobId((prev) => (prev === id ? null : id));
  };

  const JobSkeleton = () => (
    <div className="bg-surface border border-border rounded p-6 space-y-3">
      <div className="h-5 bg-muted rounded animate-pulse w-2/3" />
      <div className="h-3 bg-muted rounded animate-pulse w-full" />
      <div className="h-3 bg-muted rounded animate-pulse w-4/5" />
      <div className="h-8 bg-muted rounded animate-pulse w-24 mt-2" />
    </div>
  );

  return (
    <section className="py-20 px-6 bg-canvas">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-xs text-teal uppercase tracking-widest">
            Careers
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-obsidian mt-3">
            Engineering the Future of Industrial Intelligence
          </h2>

          <p className="text-slate-text mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            We are building a world-class team of engineers and researchers tackling
            some of the hardest problems at the intersection of causal inference,
            industrial physics, and complex systems. Join us at the frontier of
            causal intelligence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Jobs Section */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <JobSkeleton key={i} />)
            ) : jobs.length === 0 ? (
              <div className="bg-surface border border-border rounded p-8 text-center">
                <p className="text-sm text-slate-text">
                  No open positions at this time.
                </p>
              </div>
            ) : (
              jobs.map((j) => {
                const isOpen = openJobId === j.id;

                return (
                  <div
                    key={j.id}
                    onClick={() => toggleJob(j.id)}
                    className="bg-surface border border-border rounded p-6 card-hover group cursor-pointer transition-all duration-300"
                  >
                    {/* Title Row */}
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-obsidian group-hover:text-teal transition-colors duration-200">
                        {j.title}
                      </h4>

                      <span className="text-lg text-slate-text">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>

                    {/* Tags */}
                    <p className="text-sm text-slate-text mt-2 leading-relaxed">
                      {j.department_tags}
                    </p>

                    {/* Accordion Content */}
                    {isOpen && (
                      <div className="mt-4 border-t border-border pt-4">
                        {j.description && (
                          <p className="text-xs text-slate-text leading-relaxed mb-4">
                            {j.description}
                          </p>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (j.linkedin_url) {
                              window.open(
                                j.linkedin_url,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }
                          }}
                          className="btn-outline text-xs px-4 py-2 hover:bg-obsidian hover:text-primary-foreground transition-all duration-200"
                        >
                          Apply Now
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Culture */}
            <div className="bg-surface border border-border rounded p-6">
              <h4 className="text-base font-bold text-obsidian mb-3">
                Our Culture
              </h4>

              <p className="text-sm text-slate-text leading-relaxed mb-3">
                We value curiosity, rigorous scientific thinking, and an obsession
                with understanding how complex industrial systems truly work.
              </p>

              <p className="text-sm text-slate-text leading-relaxed">
                We operate with the intensity and agility of a startup, combined
                with the intellectual rigor of a research lab. Mission-driven and
                impact-focused, we turn groundbreaking theory into real-world
                operational transformation.
              </p>
            </div>

            {/* Direct Application */}
            <div className="bg-obsidian rounded p-6">
              <h4 className="text-base font-bold text-primary-foreground mb-3">
                Direct Application
              </h4>

              <p className="text-sm text-primary-foreground/70 leading-relaxed mb-4">
                Don’t see a role that fits? We are always looking for exceptional
                talent in causal inference, industrial engineering, optimization,
                and related fields.
              </p>

              <p className="text-xs text-primary-foreground/50 mb-1">
                Send your resume to:
              </p>

              <p className="font-mono text-xs text-teal">
                careers@tpisystems.com
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CareersSection;
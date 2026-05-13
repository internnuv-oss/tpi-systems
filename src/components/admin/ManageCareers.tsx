import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Job {
  id: string;
  title: string;
  department_tags: string;
  is_active: boolean;
  created_at: string;
  linkedin_url: string | null;
  description: string;
}

interface JobForm {
  title: string;
  department_tags: string;
  description: string;
  linkedin_url: string;
  is_active: boolean;
}

const emptyForm: JobForm = {
  title: "",
  department_tags: "",
  description: "",
  linkedin_url: "",
  is_active: true,
};

const REQUIRED_FIELDS: (keyof JobForm)[] = ["title", "department_tags", "description"];
const ITEMS_PER_PAGE = 10;

const ManageCareers = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<JobForm>(emptyForm);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Toolbar state
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [filterDept, setFilterDept] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["admin-jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Job[];
    },
  });

  const uniqueDepts = useMemo(() => {
    const all = jobs.flatMap((j) => j.department_tags.split("/").map((s) => s.trim()).filter(Boolean));
    return [...new Set(all)];
  }, [jobs]);

  const filtered = useMemo(() => {
    let list = [...jobs];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((j) => j.title.toLowerCase().includes(q));
    }
    if (filterDept) list = list.filter((j) => j.department_tags.toLowerCase().includes(filterDept.toLowerCase()));
    list.sort((a, b) => {
      const da = new Date(a.created_at).getTime();
      const db = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });
    return list;
  }, [jobs, search, filterDept, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterDept, sortOrder]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const isFieldInvalid = (field: keyof JobForm) => {
    if (!REQUIRED_FIELDS.includes(field)) return false;
    const val = form[field];
    return touched[field] && (!val || (typeof val === "string" && val.trim() === ""));
  };

  const isFormValid = () =>
    REQUIRED_FIELDS.every((f) => {
      const val = form[f];
      return val && (typeof val !== "string" || val.trim() !== "");
    });

  const handleSubmit = () => {
    const allTouched: Record<string, boolean> = {};
    REQUIRED_FIELDS.forEach((f) => (allTouched[f] = true));
    setTouched((t) => ({ ...t, ...allTouched }));
    if (!isFormValid()) return;
    upsert.mutate();
  };

  const upsert = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        department_tags: form.department_tags,
        description: form.description,
        linkedin_url: form.linkedin_url || null,
        is_active: form.is_active,
      };
      if (editingId) {
        const { error } = await supabase.from("jobs").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("jobs").insert(payload as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["public-jobs"] });
      closeDialog();
    },
    onError: (err: any) => {
      alert("Failed to save job: " + (err?.message || "Unknown error"));
    },
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("jobs").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["public-jobs"] });
    },
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("jobs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["public-jobs"] });
    },
  });

  const openCreate = () => { setEditingId(null); setForm(emptyForm); setTouched({}); setDialogOpen(true); };
  const openEdit = (j: Job) => {
    setEditingId(j.id);
    setForm({
      title: j.title,
      department_tags: j.department_tags,
      description: j.description || "",
      linkedin_url: j.linkedin_url || "",
      is_active: j.is_active,
    });
    setTouched({});
    setDialogOpen(true);
  };
  const closeDialog = () => { setDialogOpen(false); setEditingId(null); setForm(emptyForm); setTouched({}); };
  const updateField = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));
  const markTouched = (field: string) => setTouched((t) => ({ ...t, [field]: true }));

  const fieldClass = (field: keyof JobForm) =>
    isFieldInvalid(field) ? "border-destructive focus-visible:ring-destructive" : "";

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-obsidian">Manage Careers</h1>
          <p className="text-sm text-slate-text mt-1">Add and manage job postings.</p>
        </div>
        <button onClick={openCreate} className="btn-teal w-full sm:w-auto text-xs uppercase tracking-wider flex items-center justify-center gap-2">
          <Plus size={14} /> Add New Job
        </button>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 mb-4 p-3 bg-surface border border-border rounded">
        <div className="relative w-full sm:flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title…" className="pl-9 h-9 text-sm" />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="w-full sm:w-auto rounded border border-input bg-background px-3 py-2 text-sm h-9">
          <option value="">All Departments</option>
          {uniqueDepts.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")} className="w-full sm:w-auto rounded border border-input bg-background px-3 py-2 text-sm h-9">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="bg-surface border border-border rounded overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-border" style={{ background: "hsl(210 40% 96%)" }}>
              <th className="text-left p-3 font-semibold text-obsidian">Title</th>
              <th className="text-left p-3 font-semibold text-obsidian">Tags</th>
              <th className="text-center p-3 font-semibold text-obsidian">Active</th>
              <th className="text-right p-3 font-semibold text-obsidian min-w-[150px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-border">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <td key={j} className="p-3"><div className="h-4 bg-muted rounded animate-pulse" /></td>
                  ))}
                </tr>
              ))
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-text">
                  {jobs.length === 0 ? "No job postings yet. Add your first one above." : "No results match your filters."}
                </td>
              </tr>
            ) : (
              currentItems.map((j) => (
                <tr key={j.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-obsidian">{j.title}</td>
                  <td className="p-3 text-slate-text text-xs">{j.department_tags}</td>
                  <td className="p-3 text-center">
                    <Switch checked={j.is_active} onCheckedChange={(checked) => toggleActive.mutate({ id: j.id, is_active: checked })} />
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => openEdit(j)} className="inline-flex items-center gap-1 text-xs text-slate-text hover:text-teal transition-colors"><Pencil size={13} /> Edit</button>
                    <button onClick={() => deleteMut.mutate(j.id)} className="inline-flex items-center gap-1 text-xs text-slate-text hover:text-destructive transition-colors"><Trash2 size={13} /> Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-4 justify-end">
          <PaginationContent className="flex-wrap">
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage((p) => Math.max(1, p - 1)); }} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage((p) => Math.min(totalPages, p + 1)); }} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Job" : "Add New Job"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-medium text-obsidian mb-1 block">Job Title <span className="text-destructive">*</span></label>
              <Input value={form.title} onChange={(e) => updateField("title", e.target.value)} onBlur={() => markTouched("title")} className={fieldClass("title")} />
              {isFieldInvalid("title") && <p className="text-destructive text-[11px] mt-0.5">Title is required.</p>}
            </div>
            <div>
              <label className="text-xs font-medium text-obsidian mb-1 block">Department Tags <span className="text-destructive">*</span></label>
              <Input value={form.department_tags} onChange={(e) => updateField("department_tags", e.target.value)} onBlur={() => markTouched("department_tags")} placeholder="Research / Bayesian Modeling / Remote" className={fieldClass("department_tags")} />
              {isFieldInvalid("department_tags") && <p className="text-destructive text-[11px] mt-0.5">Department tags are required.</p>}
            </div>
            <div>
              <label className="text-xs font-medium text-obsidian mb-1 block">Description <span className="text-destructive">*</span></label>
              <Textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} onBlur={() => markTouched("description")} rows={3} className={fieldClass("description")} />
              {isFieldInvalid("description") && <p className="text-destructive text-[11px] mt-0.5">Description is required.</p>}
            </div>
            <div>
  <label className="text-xs font-medium text-obsidian mb-1 block">LinkedIn URL (Optional)</label>
  <Input 
    value={form.linkedin_url} 
    onChange={(e) => updateField("linkedin_url", e.target.value)} 
    onBlur={() => markTouched("linkedin_url")} 
    placeholder="https://linkedin.com/jobs/..." 
    className={fieldClass("linkedin_url")} 
  />
</div>
            <div className="flex items-center gap-3">
              <Switch checked={form.is_active} onCheckedChange={(checked) => updateField("is_active", checked)} />
              <label className="text-sm text-obsidian">Active</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={upsert.isPending} className="bg-teal text-white hover:bg-teal/90">
              {upsert.isPending ? "Saving..." : editingId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCareers;
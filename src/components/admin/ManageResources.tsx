import { useState, useRef, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Plus, Pencil, Trash2, Upload, X, Search } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Resource = Tables<"resources">;

interface ResourceForm {
  type: string;
  title: string;
  description: string;
  tag_label: string;
  highlight_metric: string | null;
  metric_description: string | null;
  linkedin_url: string;
  file_url: string | null;
}

const emptyForm: ResourceForm = {
  type: "PDF",
  title: "",
  description: "",
  tag_label: "Scientific Foundations",
  highlight_metric: null,
  metric_description: null,
  linkedin_url: "",
  file_url: null,
};

const REQUIRED_FIELDS: (keyof ResourceForm)[] = ["title", "description", "type", "tag_label", "linkedin_url"];

const ManageResources = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ResourceForm>(emptyForm);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toolbar state
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [filterType, setFilterType] = useState("");
  const [filterTag, setFilterTag] = useState("");

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["admin-resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Resource[];
    },
  });

  // Derive unique types and tags for filter dropdowns
  const uniqueTypes = useMemo(() => [...new Set(resources.map((r) => r.type))], [resources]);
  const uniqueTags = useMemo(() => [...new Set(resources.map((r) => r.tag_label))], [resources]);

  // Filtered & sorted list
  const filtered = useMemo(() => {
    let list = [...resources];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((r) => r.title.toLowerCase().includes(q));
    }
    if (filterType) list = list.filter((r) => r.type === filterType);
    if (filterTag) list = list.filter((r) => r.tag_label === filterTag);
    list.sort((a, b) => {
      const da = new Date(a.created_at).getTime();
      const db = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });
    return list;
  }, [resources, search, filterType, filterTag, sortOrder]);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error } = await supabase.storage.from("resource-files").upload(fileName, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("resource-files").getPublicUrl(fileName);
      setForm((f) => ({ ...f, file_url: urlData.publicUrl }));
    } catch (err: any) {
      alert("Upload failed: " + (err?.message || "Unknown error"));
    } finally {
      setUploading(false);
    }
  };

  const isFieldInvalid = (field: keyof ResourceForm) => {
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
    // Mark all required as touched
    const allTouched: Record<string, boolean> = {};
    REQUIRED_FIELDS.forEach((f) => (allTouched[f] = true));
    setTouched((t) => ({ ...t, ...allTouched }));
    if (!isFormValid()) return;
    upsert.mutate();
  };

  const upsert = useMutation({
    mutationFn: async () => {
      const payload = {
        type: form.type,
        title: form.title,
        description: form.description,
        tag_label: form.tag_label,
        highlight_metric: form.highlight_metric,
        metric_description: form.metric_description,
        linkedin_url: form.linkedin_url || null,
        file_url: form.file_url,
      };
      if (editingId) {
        const { error } = await supabase.from("resources").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("resources").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] });
      queryClient.invalidateQueries({ queryKey: ["public-resources"] });
      closeDialog();
    },
    onError: (err: any) => {
      alert("Failed to save resource: " + (err?.message || "Unknown error"));
    },
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("resources").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] });
      queryClient.invalidateQueries({ queryKey: ["public-resources"] });
    },
  });

  const openCreate = () => { setEditingId(null); setForm(emptyForm); setTouched({}); setDialogOpen(true); };
  const openEdit = (r: Resource) => {
    setEditingId(r.id);
    setForm({
      type: r.type, title: r.title, description: r.description, tag_label: r.tag_label,
      highlight_metric: r.highlight_metric, metric_description: r.metric_description,
      linkedin_url: r.linkedin_url ?? "", file_url: r.file_url ?? null,
    });
    setTouched({});
    setDialogOpen(true);
  };
  const closeDialog = () => { setDialogOpen(false); setEditingId(null); setForm(emptyForm); setTouched({}); };
  const updateField = (field: string, value: string | null) => setForm((f) => ({ ...f, [field]: value }));
  const markTouched = (field: string) => setTouched((t) => ({ ...t, [field]: true }));

  const fieldClass = (field: keyof ResourceForm) =>
    isFieldInvalid(field) ? "border-destructive focus-visible:ring-destructive" : "";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-obsidian">Manage Resources</h1>
          <p className="text-sm text-slate-text mt-1">Add, edit, and manage research papers, case studies, and notes.</p>
        </div>
        <button onClick={openCreate} className="btn-teal text-xs uppercase tracking-wider flex items-center gap-2">
          <Plus size={14} /> Add New Resource
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-surface border border-border rounded">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title…"
            className="pl-9 h-9 text-sm"
          />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="rounded border border-input bg-background px-3 py-2 text-sm h-9">
          <option value="">All Types</option>
          {uniqueTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className="rounded border border-input bg-background px-3 py-2 text-sm h-9">
          <option value="">All Tags</option>
          {uniqueTags.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")} className="rounded border border-input bg-background px-3 py-2 text-sm h-9">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border" style={{ background: "hsl(210 40% 96%)" }}>
              <th className="text-left p-3 font-semibold text-obsidian">Title</th>
              <th className="text-left p-3 font-semibold text-obsidian">Type</th>
              <th className="text-left p-3 font-semibold text-obsidian">Tag</th>
              <th className="text-left p-3 font-semibold text-obsidian">Metric</th>
              <th className="text-right p-3 font-semibold text-obsidian">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-border">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="p-3"><div className="h-4 bg-muted rounded animate-pulse" /></td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-text">
                  {resources.length === 0 ? "No resources yet. Add your first one above." : "No results match your filters."}
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-obsidian max-w-[250px] truncate">{r.title}</td>
                  <td className="p-3">
                    <span className="font-mono text-[10px] font-bold bg-teal/10 text-teal px-2 py-0.5 rounded uppercase">{r.type}</span>
                  </td>
                  <td className="p-3 text-slate-text">{r.tag_label}</td>
                  <td className="p-3 text-teal font-bold">{r.highlight_metric || "—"}</td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => openEdit(r)} className="inline-flex items-center gap-1 text-xs text-slate-text hover:text-teal transition-colors"><Pencil size={13} /> Edit</button>
                    <button onClick={() => deleteMut.mutate(r.id)} className="inline-flex items-center gap-1 text-xs text-slate-text hover:text-destructive transition-colors"><Trash2 size={13} /> Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Resource" : "Add New Resource"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-obsidian mb-1 block">Type <span className="text-destructive">*</span></label>
                <select
                  value={form.type}
                  onChange={(e) => updateField("type", e.target.value)}
                  onBlur={() => markTouched("type")}
                  className={`w-full rounded border border-input bg-background px-3 py-2 text-sm ${isFieldInvalid("type") ? "border-destructive" : ""}`}
                >
                  <option>PDF</option>
                  <option>Research Note</option>
                  <option>Case Study</option>
                  <option>Article</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-obsidian mb-1 block">Tag Label <span className="text-destructive">*</span></label>
                <Input value={form.tag_label} onChange={(e) => updateField("tag_label", e.target.value)} onBlur={() => markTouched("tag_label")} className={fieldClass("tag_label")} />
                {isFieldInvalid("tag_label") && <p className="text-destructive text-[11px] mt-0.5">Tag label is required.</p>}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-obsidian mb-1 block">Title <span className="text-destructive">*</span></label>
              <Input value={form.title} onChange={(e) => updateField("title", e.target.value)} onBlur={() => markTouched("title")} className={fieldClass("title")} />
              {isFieldInvalid("title") && <p className="text-destructive text-[11px] mt-0.5">Title is required.</p>}
            </div>
            <div>
              <label className="text-xs font-medium text-obsidian mb-1 block">Description <span className="text-destructive">*</span></label>
              <Textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} onBlur={() => markTouched("description")} rows={3} className={fieldClass("description")} />
              {isFieldInvalid("description") && <p className="text-destructive text-[11px] mt-0.5">Description is required.</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-obsidian mb-1 block">Highlight Metric (optional)</label>
                <Input value={form.highlight_metric || ""} onChange={(e) => updateField("highlight_metric", e.target.value || null)} placeholder="+$2.8M" />
              </div>
              <div>
                <label className="text-xs font-medium text-obsidian mb-1 block">Metric Description (optional)</label>
                <Input value={form.metric_description || ""} onChange={(e) => updateField("metric_description", e.target.value || null)} placeholder="Annual savings" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-obsidian mb-1 block">LinkedIn URL <span className="text-destructive">*</span></label>
              <Input value={form.linkedin_url} onChange={(e) => updateField("linkedin_url", e.target.value)} onBlur={() => markTouched("linkedin_url")} placeholder="https://linkedin.com/in/..." className={fieldClass("linkedin_url")} />
              {isFieldInvalid("linkedin_url") && <p className="text-destructive text-[11px] mt-0.5">LinkedIn URL is required.</p>}
            </div>
            <div>
              <label className="text-xs font-medium text-obsidian mb-1 block">PDF / File Upload (optional)</label>
              {form.file_url ? (
                <div className="flex items-center gap-2 p-2 border border-input rounded bg-background text-sm">
                  <a href={form.file_url} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline truncate flex-1">{form.file_url.split("/").pop()}</a>
                  <button type="button" onClick={() => updateField("file_url", null)} className="text-slate-text hover:text-destructive transition-colors"><X size={14} /></button>
                </div>
              ) : (
                <div>
                  <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload(file); }} />
                  <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2">
                    <Upload size={14} /> {uploading ? "Uploading..." : "Choose File"}
                  </Button>
                </div>
              )}
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

export default ManageResources;

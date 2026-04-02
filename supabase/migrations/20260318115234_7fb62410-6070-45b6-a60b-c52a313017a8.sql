-- Create resources table
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'PDF',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tag_label TEXT NOT NULL DEFAULT 'Scientific Foundations',
  highlight_metric TEXT,
  metric_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department_tags TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Anyone can view jobs" ON public.jobs FOR SELECT USING (true);

-- Authenticated users can manage resources
CREATE POLICY "Authenticated users can insert resources" ON public.resources FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update resources" ON public.resources FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete resources" ON public.resources FOR DELETE TO authenticated USING (true);

-- Authenticated users can manage jobs
CREATE POLICY "Authenticated users can insert jobs" ON public.jobs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update jobs" ON public.jobs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete jobs" ON public.jobs FOR DELETE TO authenticated USING (true);
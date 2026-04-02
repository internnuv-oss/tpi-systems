
-- Fix UPDATE policies: add WITH CHECK clause
DROP POLICY IF EXISTS "Admins can update resources" ON public.resources;
CREATE POLICY "Admins can update resources" ON public.resources
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can update jobs" ON public.jobs;
CREATE POLICY "Admins can update jobs" ON public.jobs
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Add linkedin_url and file_url columns to resources
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS linkedin_url text;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS file_url text;

-- Create storage bucket for resource PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('resource-files', 'resource-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for resource files
CREATE POLICY "Anyone can view resource files" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'resource-files');

CREATE POLICY "Admins can upload resource files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'resource-files' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete resource files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'resource-files' AND public.has_role(auth.uid(), 'admin'::app_role));

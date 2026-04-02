ALTER TABLE public.jobs
ADD COLUMN IF NOT EXISTS linkedin_url text,
ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT '';
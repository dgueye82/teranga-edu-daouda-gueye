ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'Actif';
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS address text;
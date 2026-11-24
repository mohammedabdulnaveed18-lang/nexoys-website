CREATE TABLE public.digital_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  service text NOT NULL,
  budget text NOT NULL,
  timeline text,
  details text NOT NULL,
  status text NOT NULL DEFAULT 'new'
);
GRANT ALL ON public.digital_inquiries TO service_role;
ALTER TABLE public.digital_inquiries ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.career_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  current_job_role text NOT NULL,
  target_job_role text NOT NULL,
  experience text NOT NULL,
  service text NOT NULL,
  target_country text NOT NULL,
  details text,
  status text NOT NULL DEFAULT 'new'
);
GRANT ALL ON public.career_inquiries TO service_role;
ALTER TABLE public.career_inquiries ENABLE ROW LEVEL SECURITY;

CREATE INDEX digital_inquiries_created_at_idx ON public.digital_inquiries (created_at DESC);
CREATE INDEX career_inquiries_created_at_idx ON public.career_inquiries (created_at DESC);
ALTER TABLE public.students
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active';

CREATE OR REPLACE FUNCTION public.validate_student_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status IS NULL OR NEW.status NOT IN ('active','inactive','graduated','suspended') THEN
    RAISE EXCEPTION 'Invalid student status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.validate_student_status() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS validate_student_status_trigger ON public.students;
CREATE TRIGGER validate_student_status_trigger
BEFORE INSERT OR UPDATE ON public.students
FOR EACH ROW EXECUTE FUNCTION public.validate_student_status();
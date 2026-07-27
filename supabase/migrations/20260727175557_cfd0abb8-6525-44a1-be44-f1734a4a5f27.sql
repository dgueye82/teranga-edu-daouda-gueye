
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS monthly_fee numeric(10,2) NOT NULL DEFAULT 0;
ALTER TABLE public.student_attendance ADD COLUMN IF NOT EXISTS reason text;

CREATE TABLE IF NOT EXISTS public.student_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  month smallint NOT NULL CHECK (month BETWEEN 1 AND 12),
  year smallint NOT NULL,
  amount numeric(10,2) NOT NULL DEFAULT 0,
  payment_date date NOT NULL DEFAULT CURRENT_DATE,
  method text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_payments TO authenticated;
GRANT ALL ON public.student_payments TO service_role;

ALTER TABLE public.student_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view payments"
  ON public.student_payments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert payments"
  ON public.student_payments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update payments"
  ON public.student_payments FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete payments"
  ON public.student_payments FOR DELETE TO authenticated USING (true);

CREATE TRIGGER update_student_payments_updated_at
  BEFORE UPDATE ON public.student_payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_student_payments_student ON public.student_payments(student_id, year, month);

-- 1. Tighten overly permissive SELECT policies
DROP POLICY IF EXISTS "Anyone authenticated can view schools" ON public.schools;
CREATE POLICY "Staff can view schools" ON public.schools FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));

DROP POLICY IF EXISTS "Anyone authenticated can view staff" ON public.staff;
CREATE POLICY "Admins and teachers can view staff" ON public.staff FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));

DROP POLICY IF EXISTS "Anyone authenticated can view students" ON public.students;
CREATE POLICY "Admins and teachers can view students" ON public.students FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));

DROP POLICY IF EXISTS "Anyone authenticated can view attendance" ON public.student_attendance;
CREATE POLICY "Admins and teachers can view attendance" ON public.student_attendance FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));

DROP POLICY IF EXISTS "Anyone authenticated can view performances" ON public.student_performances;
CREATE POLICY "Admins and teachers can view performances" ON public.student_performances FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));

-- Payments: restrict to admins/teachers as well (was fully open to authenticated)
DROP POLICY IF EXISTS "Authenticated can view payments" ON public.student_payments;
DROP POLICY IF EXISTS "Authenticated can insert payments" ON public.student_payments;
DROP POLICY IF EXISTS "Authenticated can update payments" ON public.student_payments;
DROP POLICY IF EXISTS "Authenticated can delete payments" ON public.student_payments;
CREATE POLICY "Admins and teachers can manage payments" ON public.student_payments FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'teacher'::app_role));

-- 2. Remove anon (pre-login) exposure from the Data API / GraphQL schema
REVOKE ALL ON public.schools FROM anon;
REVOKE ALL ON public.staff FROM anon;
REVOKE ALL ON public.students FROM anon;
REVOKE ALL ON public.student_attendance FROM anon;
REVOKE ALL ON public.student_payments FROM anon;
REVOKE ALL ON public.student_performances FROM anon;
REVOKE ALL ON public.user_profiles FROM anon;
REVOKE ALL ON public.user_roles FROM anon;

-- Ensure authenticated/service_role retain needed access
GRANT SELECT, INSERT, UPDATE, DELETE ON public.schools, public.staff, public.students,
  public.student_attendance, public.student_payments, public.student_performances TO authenticated;
GRANT SELECT, UPDATE ON public.user_profiles TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.schools, public.staff, public.students, public.student_attendance,
  public.student_payments, public.student_performances, public.user_profiles, public.user_roles TO service_role;

-- 3. Lock down SECURITY DEFINER functions
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
-- authenticated must keep EXECUTE on has_role because RLS policies evaluate it as the caller
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
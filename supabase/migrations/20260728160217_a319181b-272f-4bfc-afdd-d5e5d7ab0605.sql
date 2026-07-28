ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'director';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'secretary';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'inspector';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'school_life';

CREATE OR REPLACE FUNCTION public.has_any_role(_user_id uuid, _roles text[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role::text = ANY(_roles)
  )
$$;

REVOKE ALL ON FUNCTION public.has_any_role(uuid, text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_any_role(uuid, text[]) TO authenticated, service_role;

-- SCHOOLS
DROP POLICY IF EXISTS "Admins can manage schools" ON public.schools;
DROP POLICY IF EXISTS "Staff can view schools" ON public.schools;
CREATE POLICY "schools_view" ON public.schools FOR SELECT TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director','secretary','teacher','inspector','school_life']));
CREATE POLICY "schools_manage" ON public.schools FOR ALL TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director']))
WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','director']));

-- STAFF
DROP POLICY IF EXISTS "Admins and teachers can view staff" ON public.staff;
DROP POLICY IF EXISTS "Admins can manage staff" ON public.staff;
CREATE POLICY "staff_view" ON public.staff FOR SELECT TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director','secretary','inspector']));
CREATE POLICY "staff_manage" ON public.staff FOR ALL TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director']))
WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','director']));

-- STUDENTS
DROP POLICY IF EXISTS "Admins and teachers can view students" ON public.students;
DROP POLICY IF EXISTS "Admins and teachers can manage students" ON public.students;
CREATE POLICY "students_view" ON public.students FOR SELECT TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director','secretary','teacher','inspector','school_life']));
CREATE POLICY "students_manage" ON public.students FOR ALL TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director','secretary']))
WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','director','secretary']));

-- PAYMENTS
DROP POLICY IF EXISTS "Admins and teachers can manage payments" ON public.student_payments;
CREATE POLICY "payments_view" ON public.student_payments FOR SELECT TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director','secretary','inspector']));
CREATE POLICY "payments_manage" ON public.student_payments FOR ALL TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director','secretary']))
WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','director','secretary']));

-- PERFORMANCES
DROP POLICY IF EXISTS "Admins and teachers can view performances" ON public.student_performances;
DROP POLICY IF EXISTS "Admins and teachers can manage performances" ON public.student_performances;
CREATE POLICY "performances_view" ON public.student_performances FOR SELECT TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director','teacher','inspector']));
CREATE POLICY "performances_manage" ON public.student_performances FOR ALL TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director','teacher']))
WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','director','teacher']));

-- ATTENDANCE
DROP POLICY IF EXISTS "Admins and teachers can view attendance" ON public.student_attendance;
DROP POLICY IF EXISTS "Admins and teachers can manage attendance" ON public.student_attendance;
CREATE POLICY "attendance_view" ON public.student_attendance FOR SELECT TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director','secretary','teacher','inspector','school_life']));
CREATE POLICY "attendance_manage" ON public.student_attendance FOR ALL TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director','teacher','school_life']))
WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','director','teacher','school_life']));
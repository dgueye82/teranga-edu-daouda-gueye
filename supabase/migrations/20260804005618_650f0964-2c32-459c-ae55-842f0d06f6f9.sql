-- 1. School attachment on profiles
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS school_id uuid REFERENCES public.schools(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS user_profiles_school_id_idx ON public.user_profiles(school_id);

-- 2. Helpers
CREATE OR REPLACE FUNCTION public.current_school_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT school_id FROM public.user_profiles WHERE id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION public.is_platform_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
$$;

CREATE OR REPLACE FUNCTION public.can_access_school(_school_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_platform_admin()
      OR (_school_id IS NOT NULL AND _school_id = public.current_school_id())
$$;

CREATE OR REPLACE FUNCTION public.can_access_student(_student_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_platform_admin()
      OR EXISTS (
        SELECT 1 FROM public.students s
        WHERE s.id = _student_id
          AND s.school_id IS NOT NULL
          AND s.school_id = public.current_school_id()
      )
$$;

REVOKE ALL ON FUNCTION public.current_school_id() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_platform_admin() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.can_access_school(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.can_access_student(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.current_school_id() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_platform_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_school(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_student(uuid) TO authenticated;

-- 3. Schools
DROP POLICY IF EXISTS schools_view ON public.schools;
DROP POLICY IF EXISTS schools_manage ON public.schools;

CREATE POLICY schools_view ON public.schools FOR SELECT TO authenticated
USING (
  has_any_role(auth.uid(), ARRAY['admin','director','secretary','teacher','inspector','school_life'])
  AND public.can_access_school(id)
);

CREATE POLICY schools_manage ON public.schools FOR ALL TO authenticated
USING (has_any_role(auth.uid(), ARRAY['admin','director']) AND public.can_access_school(id))
WITH CHECK (has_any_role(auth.uid(), ARRAY['admin','director']) AND public.can_access_school(id));

-- 4. Students
DROP POLICY IF EXISTS students_view ON public.students;
DROP POLICY IF EXISTS students_manage ON public.students;

CREATE POLICY students_view ON public.students FOR SELECT TO authenticated
USING (
  has_any_role(auth.uid(), ARRAY['admin','director','secretary','teacher','inspector','school_life'])
  AND public.can_access_school(school_id)
);

CREATE POLICY students_manage ON public.students FOR ALL TO authenticated
USING (has_any_role(auth.uid(), ARRAY['admin','director','secretary']) AND public.can_access_school(school_id))
WITH CHECK (has_any_role(auth.uid(), ARRAY['admin','director','secretary']) AND public.can_access_school(school_id));

-- 5. Staff
DROP POLICY IF EXISTS staff_view ON public.staff;
DROP POLICY IF EXISTS staff_manage ON public.staff;

CREATE POLICY staff_view ON public.staff FOR SELECT TO authenticated
USING (
  has_any_role(auth.uid(), ARRAY['admin','director','secretary','inspector'])
  AND public.can_access_school(school_id)
);

CREATE POLICY staff_manage ON public.staff FOR ALL TO authenticated
USING (has_any_role(auth.uid(), ARRAY['admin','director']) AND public.can_access_school(school_id))
WITH CHECK (has_any_role(auth.uid(), ARRAY['admin','director']) AND public.can_access_school(school_id));

-- 6. Attendance
DROP POLICY IF EXISTS attendance_view ON public.student_attendance;
DROP POLICY IF EXISTS attendance_manage ON public.student_attendance;

CREATE POLICY attendance_view ON public.student_attendance FOR SELECT TO authenticated
USING (
  has_any_role(auth.uid(), ARRAY['admin','director','secretary','teacher','inspector','school_life'])
  AND public.can_access_student(student_id)
);

CREATE POLICY attendance_manage ON public.student_attendance FOR ALL TO authenticated
USING (has_any_role(auth.uid(), ARRAY['admin','director','teacher','school_life']) AND public.can_access_student(student_id))
WITH CHECK (has_any_role(auth.uid(), ARRAY['admin','director','teacher','school_life']) AND public.can_access_student(student_id));

-- 7. Performances
DROP POLICY IF EXISTS performances_view ON public.student_performances;
DROP POLICY IF EXISTS performances_manage ON public.student_performances;

CREATE POLICY performances_view ON public.student_performances FOR SELECT TO authenticated
USING (
  has_any_role(auth.uid(), ARRAY['admin','director','teacher','inspector'])
  AND public.can_access_student(student_id)
);

CREATE POLICY performances_manage ON public.student_performances FOR ALL TO authenticated
USING (has_any_role(auth.uid(), ARRAY['admin','director','teacher']) AND public.can_access_student(student_id))
WITH CHECK (has_any_role(auth.uid(), ARRAY['admin','director','teacher']) AND public.can_access_student(student_id));

-- 8. Payments
DROP POLICY IF EXISTS payments_view ON public.student_payments;
DROP POLICY IF EXISTS payments_manage ON public.student_payments;

CREATE POLICY payments_view ON public.student_payments FOR SELECT TO authenticated
USING (
  has_any_role(auth.uid(), ARRAY['admin','director','secretary','inspector'])
  AND public.can_access_student(student_id)
);

CREATE POLICY payments_manage ON public.student_payments FOR ALL TO authenticated
USING (has_any_role(auth.uid(), ARRAY['admin','director','secretary']) AND public.can_access_student(student_id))
WITH CHECK (has_any_role(auth.uid(), ARRAY['admin','director','secretary']) AND public.can_access_student(student_id));

-- 9. Admins/directors can assign a school to profiles of their scope
DROP POLICY IF EXISTS profiles_admin_view ON public.user_profiles;
DROP POLICY IF EXISTS profiles_admin_manage ON public.user_profiles;

CREATE POLICY profiles_admin_view ON public.user_profiles FOR SELECT TO authenticated
USING (public.is_platform_admin() OR (has_any_role(auth.uid(), ARRAY['director']) AND public.can_access_school(school_id)));

CREATE POLICY profiles_admin_manage ON public.user_profiles FOR UPDATE TO authenticated
USING (public.is_platform_admin())
WITH CHECK (public.is_platform_admin());

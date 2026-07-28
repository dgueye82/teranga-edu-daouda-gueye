CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.user_profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );

  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE
      WHEN NEW.email = 'dagueye82@gmail.com' THEN 'admin'::app_role
      ELSE 'teacher'::app_role
    END
  );

  RETURN NEW;
END;
$function$;

DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "roles_manage" ON public.user_roles FOR ALL TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin','director']))
WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','director']));
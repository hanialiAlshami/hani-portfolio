-- supabase/migrations/20260613000900_fix_projects_admin_policies.sql

-- Drop existing public read policy if it needs updating
DROP POLICY IF EXISTS "Allow public read-only access for published projects" ON projects;

-- 1. Public SELECT only for published projects
CREATE POLICY "Allow public read-only access for published projects"
ON projects
FOR SELECT
USING (is_published = true);

-- 2. Admin SELECT: Active admins can read all projects
DROP POLICY IF EXISTS "Active admins can read all projects" ON projects;
CREATE POLICY "Active admins can read all projects"
ON projects
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
      AND au.is_active = true
  )
);

-- 3. Admin INSERT: Active admins can create projects
DROP POLICY IF EXISTS "Active admins can insert projects" ON projects;
CREATE POLICY "Active admins can insert projects"
ON projects
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
      AND au.is_active = true
  )
);

-- 4. Admin UPDATE: Active admins can update projects
DROP POLICY IF EXISTS "Active admins can update projects" ON projects;
CREATE POLICY "Active admins can update projects"
ON projects
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
      AND au.is_active = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
      AND au.is_active = true
  )
);

-- 5. Admin DELETE: Active admins can delete projects
DROP POLICY IF EXISTS "Active admins can delete projects" ON projects;
CREATE POLICY "Active admins can delete projects"
ON projects
FOR DELETE
USING (
  EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
      AND au.is_active = true
  )
);

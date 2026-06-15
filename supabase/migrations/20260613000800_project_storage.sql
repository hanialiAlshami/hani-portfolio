-- supabase/migrations/20260613000800_project_storage.sql

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('portfolio-projects', 'portfolio-projects', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE
SET public = true, file_size_limit = 5242880, allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];

-- RLS
CREATE POLICY "Public read access for portfolio-projects" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-projects');

CREATE POLICY "Admin insert access for portfolio-projects" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'portfolio-projects' AND
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.user_id = auth.uid()
    AND au.is_active = true
  )
);

CREATE POLICY "Admin update access for portfolio-projects" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (
  bucket_id = 'portfolio-projects' AND
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.user_id = auth.uid()
    AND au.is_active = true
  )
);

CREATE POLICY "Admin delete access for portfolio-projects" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (
  bucket_id = 'portfolio-projects' AND
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.user_id = auth.uid()
    AND au.is_active = true
  )
);

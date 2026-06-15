-- supabase/migrations/20260613000600_fix_icon_storage_policies.sql

-- Drop old incorrect policies on storage.objects for portfolio-icons bucket
DROP POLICY IF EXISTS "Public read access for portfolio-icons" ON storage.objects;
DROP POLICY IF EXISTS "Admin insert access for portfolio-icons" ON storage.objects;
DROP POLICY IF EXISTS "Admin update access for portfolio-icons" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete access for portfolio-icons" ON storage.objects;

-- Ensure bucket portfolio-icons is correctly configured
UPDATE storage.buckets
SET public = true, file_size_limit = 2097152, allowed_mime_types = ARRAY['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp']
WHERE id = 'portfolio-icons';

-- Recreate policies

-- Public SELECT for bucket portfolio-icons
CREATE POLICY "Public read access for portfolio-icons" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-icons');

-- INSERT only for authenticated active admins
CREATE POLICY "Admin insert access for portfolio-icons" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'portfolio-icons' AND
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.user_id = auth.uid()
    AND au.is_active = true
  )
);

-- UPDATE only for authenticated active admins
CREATE POLICY "Admin update access for portfolio-icons" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (
  bucket_id = 'portfolio-icons' AND
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.user_id = auth.uid()
    AND au.is_active = true
  )
);

-- DELETE only for authenticated active admins
CREATE POLICY "Admin delete access for portfolio-icons" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (
  bucket_id = 'portfolio-icons' AND
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.user_id = auth.uid()
    AND au.is_active = true
  )
);

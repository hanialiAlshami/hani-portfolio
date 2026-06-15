-- Create portfolio-icons bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-icons',
  'portfolio-icons',
  true,
  2097152, -- 2MB
  ARRAY['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  file_size_limit = 2097152,
  allowed_mime_types = ARRAY['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'];

-- Set up RLS policies on storage.objects for portfolio-icons bucket
-- Public read access
DROP POLICY IF EXISTS "Public read access for portfolio-icons" ON storage.objects;
CREATE POLICY "Public read access for portfolio-icons" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-icons');

-- Admin insert access
DROP POLICY IF EXISTS "Admin insert access for portfolio-icons" ON storage.objects;
CREATE POLICY "Admin insert access for portfolio-icons" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'portfolio-icons' AND
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE public.admin_users.id = auth.uid()
    AND public.admin_users.is_active = true
  )
);

-- Admin update access
DROP POLICY IF EXISTS "Admin update access for portfolio-icons" ON storage.objects;
CREATE POLICY "Admin update access for portfolio-icons" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (
  bucket_id = 'portfolio-icons' AND
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE public.admin_users.id = auth.uid()
    AND public.admin_users.is_active = true
  )
);

-- Admin delete access
DROP POLICY IF EXISTS "Admin delete access for portfolio-icons" ON storage.objects;
CREATE POLICY "Admin delete access for portfolio-icons" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (
  bucket_id = 'portfolio-icons' AND
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE public.admin_users.id = auth.uid()
    AND public.admin_users.is_active = true
  )
);

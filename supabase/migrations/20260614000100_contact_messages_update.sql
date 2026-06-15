-- Update contact_messages table safely
ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS subject TEXT,
  ADD COLUMN IF NOT EXISTS locale TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS admin_note TEXT,
  ADD COLUMN IF NOT EXISTS ip_address TEXT,
  ADD COLUMN IF NOT EXISTS user_agent TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Update existing column types if needed (optional, just in case)
ALTER TABLE public.contact_messages
  ALTER COLUMN name TYPE TEXT,
  ALTER COLUMN email TYPE TEXT;

-- Drop any existing conflicting policies just to be safe before recreating
DROP POLICY IF EXISTS "Allow public to insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admins to read contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admins to update contact messages" ON public.contact_messages;

-- RLS Policies
-- 1. Public users may INSERT only
CREATE POLICY "Allow public to insert contact messages" ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

-- 2. Active admins can SELECT
CREATE POLICY "Allow admins to read contact messages" ON public.contact_messages
  FOR SELECT
  USING (
    exists (
      select 1
      from public.admin_users au
      where au.user_id = auth.uid()
        and au.is_active = true
    )
  );

-- 3. Active admins can UPDATE
CREATE POLICY "Allow admins to update contact messages" ON public.contact_messages
  FOR UPDATE
  USING (
    exists (
      select 1
      from public.admin_users au
      where au.user_id = auth.uid()
        and au.is_active = true
    )
  )
  WITH CHECK (
    exists (
      select 1
      from public.admin_users au
      where au.user_id = auth.uid()
        and au.is_active = true
    )
  );

NOTIFY pgrst, 'reload schema';

-- supabase/phase4_admin_auth.sql

-- 1. Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Authenticated admins can read only their own active profile
CREATE POLICY "Admins can view own profile" 
ON admin_users 
FOR SELECT 
USING (auth.uid() = user_id AND is_active = true);

-- No public insert/update/delete.
-- Admin users MUST be manually inserted by the database owner.

/*
HOW TO SETUP AN ADMIN USER:

1. Go to your Supabase Dashboard -> Authentication -> Users.
2. Click "Add user" -> "Create new user".
3. Enter an email and a secure password.
4. Copy the new User UID.
5. Go to the SQL Editor and run:
   INSERT INTO admin_users (user_id, email, full_name) 
   VALUES ('<THE_COPIED_USER_UID>', 'your-email@example.com', 'Your Name');

Security Note: 
Do not expose your Service Role Key in the Next.js app to automate this.
Doing it manually ensures highest security for Phase 4.
*/

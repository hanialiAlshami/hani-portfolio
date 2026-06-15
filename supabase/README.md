# Supabase Database Setup

This directory contains the SQL files needed to set up your PostgreSQL database in Supabase for Phase 3.

## Important Security Rules

- **Never** expose your `SUPABASE_SERVICE_ROLE_KEY`. It gives full admin access to bypass RLS. Do not put it in your `.env.local` unless you are doing secure server-side admin operations.
- The `NEXT_PUBLIC_SUPABASE_ANON_KEY` is safe to expose to the browser.
- Row Level Security (RLS) is enabled on all tables to ensure that anonymous users can only perform `SELECT` queries on published records (`is_published = true`).

## Setup Order

To prepare your database:

1. **Run `schema.sql` first**: 
   Open the Supabase SQL Editor and execute the contents of `schema.sql`. This will create your tables, enable extensions (`pgcrypto` for UUIDs), set up foreign keys, and configure initial Row Level Security (RLS) policies.

2. **Run `seed.sql` second**: 
   After the schema is created, execute `seed.sql` in the SQL Editor. This will populate your database with professional, bilingual portfolio data so you can test your frontend.

3. **Run `phase4_admin_auth.sql` third**:
   Execute this file to create the `admin_users` table and its associated RLS policies.

4. **Create your Admin User**:
   - Go to your Supabase Dashboard -> **Authentication** -> **Users**.
   - Click "Add user" -> "Create new user".
   - Enter your email and a secure password.
   - Copy the newly generated **User UID**.
   - Go back to the SQL Editor and insert your user into the admin table:
     ```sql
     INSERT INTO admin_users (user_id, email, full_name) 
     VALUES ('YOUR_COPIED_UID', 'your-email@example.com', 'Your Name');
     ```

5. **Run `phase5_admin_content_policies.sql` (Phase 5A)**:
   This file adds safe RLS policies for admin users to manage selected content tables (`skill_categories`, `skills`, `services`).
   Alternatively, run the migration: `npx supabase db push` (or `--dry-run` to test first).

6. **Run `phase5a2_icon_storage.sql` (Phase 5A.2)**:
   This file creates the `portfolio-icons` storage bucket, configures it to be public, sets file size limits (2MB), and allows secure SVG/PNG/JPG/WebP uploads only for authorized active admins. No service role key is needed.
   Alternatively, run the migration: 
   `npx supabase db push --dry-run`
   `npx supabase db push`

## Admin Access
In Phase 4, we enabled secure admin authentication. Only users manually added to the `admin_users` table can access the `/admin/dashboard`. No service role keys are exposed in the client.

## Phase 5A Status
Admin CRUD foundation is complete for **Skills** and **Services**. Icon upload capability (Phase 5A.2) is active utilizing Supabase Storage. Projects CRUD is scheduled for Phase 5B.

## Phase 5B Status
Admin CRUD for Projects and premium case studies is implemented. A new migration `20260613000900_fix_projects_admin_policies.sql` was added to apply the correct Row Level Security (RLS) policies for the `projects` table:
- **Public access**: Public visitors can read (SELECT) only projects where `is_published = true`.
- **Admin access**: Only active admins (`admin_users.is_active = true`) can CREATE, UPDATE, DELETE, and SELECT all projects (both published and private).

## Phase 5B3 Status
Project Gallery / Screenshots management is implemented.
A new migration `20260613001000_project_gallery_images.sql` creates the `project_images` table with secure RLS policies (public read for published projects, admin write).
Gallery images are uploaded to the existing `portfolio-projects` storage bucket under the `gallery/` folder with a 5MB limit.
Site Settings and 3D avatar are deferred to Phase 5C.

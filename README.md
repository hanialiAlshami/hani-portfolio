# Hani Alshami - Premium Portfolio Project

This is a premium Next.js full-stack portfolio project built with App Router, Tailwind CSS, TypeScript, and next-intl for Arabic/English routing.

## Phase 3: Supabase Setup

We have prepared the application to integrate with Supabase (PostgreSQL). Currently, the app uses a **fallback data layer** (`src/lib/data/portfolio.ts`) which returns local seed data if Supabase is not configured yet. This ensures the app continues to build and run seamlessly.

### How to set up your Supabase project:
1. Go to [Supabase](https://supabase.com) and create a new project.
2. Go to **Project Settings -> API** to find your keys.
3. In the root of your project, create a `.env.local` file.
4. Paste the following environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_actual_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
5. `NEXT_PUBLIC_SITE_URL` is required for production to generate accurate SEO canonical URLs, the XML sitemap, and absolute Open Graph image URLs.
6. Do **not** commit `.env.local` (it is ignored in standard Next.js setups).
7. Open the Supabase SQL Editor in your dashboard.
8. Run `supabase/schema.sql` to create the tables and Row Level Security (RLS) policies.
9. Run `supabase/seed.sql` to insert the initial bilingual seed data.
10. Run `supabase/phase4_admin_auth.sql` to setup the admin users table.
11. Follow the steps in `supabase/README.md` to create your Auth user and insert them into the `admin_users` table.
12. Run `supabase/phase5_admin_content_policies.sql` to setup admin policies for content.
13. Run `supabase/phase5a2_icon_storage.sql` to create the `portfolio-icons` public storage bucket.

### Test Admin Login
After completing the Supabase setup:
1. Navigate to `http://localhost:3000/en/admin/login`
2. Sign in with the credentials you created in Supabase Authentication.
3. You will be redirected to the secure admin dashboard.

### Future Phases
- **Phase 5**: Admin CRUD for dynamic content (where we will replace seed data with actual database interactions) for Hani Alshami, Full Stack Web Developer. 
  - Phase 5A.2 (Icon Storage) has been completed.
  - Phase 5B1 (Projects CRUD) has been completed. Project image upload is deferred to Phase 5B2. Icon display bug is deferred to final polish.
  - Phase 5C (Site Settings) added with `20260613001200_site_settings.sql` migration.
    - Added `portfolio-assets` storage bucket.
    - 3D avatar settings are intentionally deferred.
    - Public pages use fallback settings if Supabase fails.
  - Phase 5D (Contact Messages) added with `20260614000100_contact_messages_update.sql` migration.
    - Public form securely saves directly to Supabase table.
    - Admin has read/update access to view messages, update status, and add notes.
    - Spam protection via honeypot implemented. Email sending deferred.
  - Phase 5E (Admin Dashboard Improvements) has been completed.
  - Phase 5F (Logo + Branding Integration) has been completed.

### Logo + Branding Integration (Phase 5F)
The project natively supports static branding assets configured globally via standard metadata layouts and the public folder structure.

**Location:** 
Place assets inside the `/public/brand/` directory.

**Required Logo Files & Formats:**
- `/brand/logo-horizontal.png` (or `.svg` for vector headers, update Header component if changed).
- `/brand/logo-icon.png` (Used in Header, Admin Layout, and fallback favicon. Highly recommend a transparent PNG or SVG).
- `/brand/favicon.png` (512x512 PNG, dynamically mapped via metadata for browser tabs).
- `/brand/social-preview.png` (1200x630 JPG/PNG, used natively for OpenGraph and Twitter card previews).

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-intl

*Note: Supabase integration will be added in Phase 3.*

## Current Phase Status
**Phase 1: Next.js Foundation + Design System Only**
The foundational structure, routing, and design tokens have been created. The UI is using a premium Black + Gold glassmorphism design.

## Commands

### Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Run Development Server
\`\`\`bash
npm run dev
\`\`\`

### Build for Production
\`\`\`bash
npm run build
\`\`\`

## Note on Deployment
This project is configured and optimized for Vercel free tier deployment.

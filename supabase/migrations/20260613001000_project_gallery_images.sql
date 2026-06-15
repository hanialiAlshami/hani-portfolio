-- supabase/migrations/20260613001000_project_gallery_images.sql

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  alt_en text,
  alt_ar text,
  caption_en text,
  caption_ar text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.project_images enable row level security;

-- 1. Public SELECT only for images of published projects
create policy "Allow public read-only access for published project images"
on public.project_images
for select
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_images.project_id
      and p.is_published = true
  )
);

-- 2. Admin SELECT: Active admins can read all project images
create policy "Active admins can read all project images"
on public.project_images
for select
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
      and au.is_active = true
  )
);

-- 3. Admin INSERT: Active admins can insert project images
create policy "Active admins can insert project images"
on public.project_images
for insert
with check (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
      and au.is_active = true
  )
);

-- 4. Admin UPDATE: Active admins can update project images
create policy "Active admins can update project images"
on public.project_images
for update
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
      and au.is_active = true
  )
)
with check (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
      and au.is_active = true
  )
);

-- 5. Admin DELETE: Active admins can delete project images
create policy "Active admins can delete project images"
on public.project_images
for delete
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
      and au.is_active = true
  )
);

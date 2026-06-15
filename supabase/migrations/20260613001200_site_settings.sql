create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),

  owner_name_en text default 'Hani Alshami',
  owner_name_ar text default 'هاني الشامي',

  job_title_en text,
  job_title_ar text,

  hero_headline_en text,
  hero_headline_ar text,

  hero_subtitle_en text,
  hero_subtitle_ar text,

  short_bio_en text,
  short_bio_ar text,

  email text,
  whatsapp text,
  phone text,
  location_en text,
  location_ar text,

  github_url text,
  linkedin_url text,
  x_url text,
  instagram_url text,
  facebook_url text,

  cv_url text,
  avatar_image_url text,

  primary_cta_en text,
  primary_cta_ar text,
  secondary_cta_en text,
  secondary_cta_ar text,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.site_settings enable row level security;

-- Policies
create policy "Public SELECT active site_settings"
  on public.site_settings for select
  using (is_active = true);

create policy "Admins SELECT all site_settings"
  on public.site_settings for select
  using (
    exists (
      select 1
      from public.admin_users au
      where au.user_id = auth.uid()
        and au.is_active = true
    )
  );

create policy "Admins INSERT site_settings"
  on public.site_settings for insert
  with check (
    exists (
      select 1
      from public.admin_users au
      where au.user_id = auth.uid()
        and au.is_active = true
    )
  );

create policy "Admins UPDATE site_settings"
  on public.site_settings for update
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

-- Trigger for updated_at
create or replace function public.handle_site_settings_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger set_site_settings_updated_at
  before update on public.site_settings
  for each row
  execute function public.handle_site_settings_updated_at();

-- Seed one default row if not exists
insert into public.site_settings (id, owner_name_en, owner_name_ar)
select gen_random_uuid(), 'Hani Alshami', 'هاني الشامي'
where not exists (select 1 from public.site_settings);

notify pgrst, 'reload schema';

-- Storage Bucket: portfolio-assets
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-assets', 
  'portfolio-assets', 
  true, 
  5242880,
  '{"image/png","image/jpeg","image/webp","image/svg+xml","application/pdf"}'
)
on conflict (id) do nothing;

create policy "Public Read portfolio-assets"
  on storage.objects for select
  using ( bucket_id = 'portfolio-assets' );

create policy "Admin Insert portfolio-assets"
  on storage.objects for insert
  with check (
    bucket_id = 'portfolio-assets' and
    exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid() and au.is_active = true
    )
  );

create policy "Admin Update portfolio-assets"
  on storage.objects for update
  using (
    bucket_id = 'portfolio-assets' and
    exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid() and au.is_active = true
    )
  );

create policy "Admin Delete portfolio-assets"
  on storage.objects for delete
  using (
    bucket_id = 'portfolio-assets' and
    exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid() and au.is_active = true
    )
  );

-- supabase/migrations/20260613001100_fix_project_images_columns.sql

alter table public.project_images
  add column if not exists alt_en text,
  add column if not exists alt_ar text,
  add column if not exists caption_en text,
  add column if not exists caption_ar text,
  add column if not exists sort_order integer not null default 0;

notify pgrst, 'reload schema';

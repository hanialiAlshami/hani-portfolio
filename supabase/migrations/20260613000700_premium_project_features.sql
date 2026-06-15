-- supabase/migrations/20260613000700_premium_project_features.sql

-- 1. Project Status
ALTER TABLE projects ADD COLUMN project_status VARCHAR(50) NOT NULL DEFAULT 'private';
ALTER TABLE projects ADD CONSTRAINT chk_project_status CHECK (project_status IN ('live', 'private', 'local_demo', 'in_progress'));

-- 2. Demo Video URL
ALTER TABLE projects ADD COLUMN demo_video_url TEXT;

-- 3. Technologies & Metadata Arrays
ALTER TABLE projects ADD COLUMN project_languages TEXT[];
ALTER TABLE projects ADD COLUMN project_frameworks TEXT[];
ALTER TABLE projects ADD COLUMN project_tools TEXT[];
ALTER TABLE projects ADD COLUMN project_platforms TEXT[];

-- 4. Gallery Images Table
CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_en TEXT,
    alt_ar TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access for project images" ON project_images FOR SELECT USING (true);

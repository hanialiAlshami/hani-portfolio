-- supabase/schema.sql

-- Enable the pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. skill_categories
CREATE TABLE skill_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ar VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. skills
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES skill_categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255),
    business_value_ar TEXT NOT NULL,
    business_value_en TEXT NOT NULL,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. services
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_ar VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    excerpt_ar TEXT NOT NULL,
    excerpt_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    icon VARCHAR(255),
    expected_result_ar TEXT NOT NULL,
    expected_result_en TEXT NOT NULL,
    related_tech JSONB,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. project_categories
CREATE TABLE project_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    summary_ar TEXT NOT NULL,
    summary_en TEXT NOT NULL,
    problem_ar TEXT NOT NULL,
    problem_en TEXT NOT NULL,
    goal_ar TEXT NOT NULL,
    goal_en TEXT NOT NULL,
    solution_ar TEXT NOT NULL,
    solution_en TEXT NOT NULL,
    role_ar VARCHAR(255) NOT NULL,
    role_en VARCHAR(255) NOT NULL,
    challenges_ar TEXT NOT NULL,
    challenges_en TEXT NOT NULL,
    results_ar TEXT NOT NULL,
    results_en TEXT NOT NULL,
    tech_stack JSONB,
    live_url VARCHAR(255),
    github_url VARCHAR(255),
    image_url VARCHAR(255),
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. resume_sections
CREATE TABLE resume_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL, -- 'experience', 'education'
    title_ar VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    organization_ar VARCHAR(255) NOT NULL,
    organization_en VARCHAR(255) NOT NULL,
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50) NOT NULL,
    is_current BOOLEAN DEFAULT false,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. contact_messages
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Indexing
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_is_published ON projects(is_published);
CREATE INDEX idx_services_is_published ON services(is_published);
CREATE INDEX idx_skills_category_id ON skills(category_id);

-- Row Level Security (RLS)
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Public (Anonymous) Read Access (Phase 3)
-- Admin write access policies will be added in Phase 4/5 when auth is implemented.
CREATE POLICY "Allow public read-only access for published skill categories" ON skill_categories FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read-only access for published skills" ON skills FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read-only access for published services" ON services FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read-only access for published project categories" ON project_categories FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read-only access for published projects" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read-only access for published resume sections" ON resume_sections FOR SELECT USING (is_published = true);

-- Contact messages should NOT be readable by public.
-- Insert policy for contact messages will be handled in Phase 6.

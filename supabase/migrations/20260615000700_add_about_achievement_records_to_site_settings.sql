-- supabase/migrations/20260615000700_add_about_achievement_records_to_site_settings.sql
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS about_achievement_1_icon TEXT,
ADD COLUMN IF NOT EXISTS about_achievement_1_text_en TEXT,
ADD COLUMN IF NOT EXISTS about_achievement_1_text_ar TEXT,
ADD COLUMN IF NOT EXISTS about_achievement_2_icon TEXT,
ADD COLUMN IF NOT EXISTS about_achievement_2_text_en TEXT,
ADD COLUMN IF NOT EXISTS about_achievement_2_text_ar TEXT,
ADD COLUMN IF NOT EXISTS about_achievement_3_icon TEXT,
ADD COLUMN IF NOT EXISTS about_achievement_3_text_en TEXT,
ADD COLUMN IF NOT EXISTS about_achievement_3_text_ar TEXT,
ADD COLUMN IF NOT EXISTS about_achievement_4_icon TEXT,
ADD COLUMN IF NOT EXISTS about_achievement_4_text_en TEXT,
ADD COLUMN IF NOT EXISTS about_achievement_4_text_ar TEXT;

UPDATE site_settings
SET
  about_achievement_1_icon = COALESCE(about_achievement_1_icon, 'Shield'),
  about_achievement_1_text_en = COALESCE(about_achievement_1_text_en, 'Practical Full-Stack Web Development Experience'),
  about_achievement_1_text_ar = COALESCE(about_achievement_1_text_ar, 'خبرة عملية في تطوير الويب المتكامل'),
  
  about_achievement_2_icon = COALESCE(about_achievement_2_icon, 'Code2'),
  about_achievement_2_text_en = COALESCE(about_achievement_2_text_en, 'Delivered projects across different markets and industries'),
  about_achievement_2_text_ar = COALESCE(about_achievement_2_text_ar, 'تنفيذ مشاريع لأسواق وقطاعات مختلفة'),
  
  about_achievement_3_icon = COALESCE(about_achievement_3_icon, 'Zap'),
  about_achievement_3_text_en = COALESCE(about_achievement_3_text_en, 'Specialized in performance-critical business systems'),
  about_achievement_3_text_ar = COALESCE(about_achievement_3_text_ar, 'متخصص في أنظمة الأعمال الحساسة من حيث الأداء'),
  
  about_achievement_4_icon = COALESCE(about_achievement_4_icon, 'Users'),
  about_achievement_4_text_en = COALESCE(about_achievement_4_text_en, 'Long-term client-focused collaboration'),
  about_achievement_4_text_ar = COALESCE(about_achievement_4_text_ar, 'تعاون طويل المدى يركز على نجاح العميل')
WHERE is_active = true;

NOTIFY pgrst, 'reload schema';

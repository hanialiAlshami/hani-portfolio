import { createClient } from '../supabase/server';
import { SiteSettings } from '@/types';

const defaultFallback: SiteSettings = {
  id: 'fallback',
  ownerName: { en: 'Hani Alshami', ar: 'هاني الشامي' },
  jobTitle: { en: 'Full Stack Web Developer', ar: 'مطور ويب Full Stack' },
  heroHeadline: { en: 'Hani Alshami', ar: 'هاني الشامي' },
  heroSubtitle: { en: 'Full Stack Web Developer', ar: 'مطور ويب Full Stack' },
  shortBio: { 
    en: "I specialize in building secure, scalable business websites, dashboards, and APIs using Laravel, PHP, and modern frontend technologies. I focus on performance, SEO, and clean architecture.",
    ar: "أتخصص في بناء مواقع الأعمال ولوحات التحكم والواجهات البرمجية الآمنة والقابلة للتطوير باستخدام Laravel و PHP وتقنيات الواجهات الأمامية الحديثة. أركز على الأداء وتحسين محركات البحث والبنية النظيفة."
  },
  email: 'contact@example.com',
  whatsapp: '+1 234 567 890',
  phone: '+1 234 567 890',
  primaryCta: { en: 'Hire Me', ar: 'وظفني' },
  secondaryCta: { en: 'View Work', ar: 'شاهد أعمالي' }
};

function textOrFallback(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function optionalText(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : undefined;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          ownerName: {
            en: textOrFallback(data.owner_name_en, defaultFallback.ownerName.en),
            ar: textOrFallback(data.owner_name_ar, defaultFallback.ownerName.ar),
          },
          jobTitle: {
            en: textOrFallback(data.job_title_en, defaultFallback.jobTitle?.en || ''),
            ar: textOrFallback(data.job_title_ar, defaultFallback.jobTitle?.ar || ''),
          },
          heroHeadline: {
            en: textOrFallback(data.hero_headline_en, defaultFallback.heroHeadline?.en || ''),
            ar: textOrFallback(data.hero_headline_ar, defaultFallback.heroHeadline?.ar || ''),
          },
          heroSubtitle: {
            en: textOrFallback(data.hero_subtitle_en, defaultFallback.heroSubtitle?.en || ''),
            ar: textOrFallback(data.hero_subtitle_ar, defaultFallback.heroSubtitle?.ar || ''),
          },
          shortBio: {
            en: textOrFallback(data.short_bio_en, defaultFallback.shortBio?.en || ''),
            ar: textOrFallback(data.short_bio_ar, defaultFallback.shortBio?.ar || ''),
          },
          email: optionalText(data.email),
          whatsapp: optionalText(data.whatsapp),
          phone: optionalText(data.phone),
          location: {
            en: optionalText(data.location_en) || '',
            ar: optionalText(data.location_ar) || '',
          },
          social: {
            github: optionalText(data.github_url),
            linkedin: optionalText(data.linkedin_url),
            x: optionalText(data.x_url),
            instagram: optionalText(data.instagram_url),
            facebook: optionalText(data.facebook_url),
          },
          cvUrl: optionalText(data.cv_url),
          avatarImageUrl: optionalText(data.avatar_image_url),
          primaryCta: {
            en: textOrFallback(data.primary_cta_en, defaultFallback.primaryCta?.en || ''),
            ar: textOrFallback(data.primary_cta_ar, defaultFallback.primaryCta?.ar || ''),
          },
          secondaryCta: {
            en: textOrFallback(data.secondary_cta_en, defaultFallback.secondaryCta?.en || ''),
            ar: textOrFallback(data.secondary_cta_ar, defaultFallback.secondaryCta?.ar || ''),
          },
          aboutEyebrow: {
            en: textOrFallback(data.about_eyebrow_en, 'The Developer'),
            ar: textOrFallback(data.about_eyebrow_ar, 'المطور'),
          },
          aboutTitle: {
            en: textOrFallback(data.about_title_en, 'About Me'),
            ar: textOrFallback(data.about_title_ar, 'نبذة عني'),
          },
          aboutSubtitle: {
            en: textOrFallback(data.about_subtitle_en, "I don't just write code — I solve business problems with precision-engineered digital solutions."),
            ar: textOrFallback(data.about_subtitle_ar, "أنا لا أكتب كوداً فحسب — بل أحل مشاكل الأعمال بحلول رقمية مُصممة بدقة."),
          },
          aboutStory: {
            en: textOrFallback(data.about_story_en, ''),
            ar: textOrFallback(data.about_story_ar, ''),
          },
          aboutFocus: {
            en: textOrFallback(data.about_focus_en, ''),
            ar: textOrFallback(data.about_focus_ar, ''),
          },
          aboutTrustTitle: {
            en: textOrFallback(data.about_trust_title_en, ''),
            ar: textOrFallback(data.about_trust_title_ar, ''),
          },
          aboutTrustDescription: {
            en: textOrFallback(data.about_trust_description_en, ''),
            ar: textOrFallback(data.about_trust_description_ar, ''),
          },
          aboutValue1Title: {
            en: textOrFallback(data.about_value_1_title_en, ''),
            ar: textOrFallback(data.about_value_1_title_ar, ''),
          },
          aboutValue1Description: {
            en: textOrFallback(data.about_value_1_description_en, ''),
            ar: textOrFallback(data.about_value_1_description_ar, ''),
          },
          aboutValue2Title: {
            en: textOrFallback(data.about_value_2_title_en, ''),
            ar: textOrFallback(data.about_value_2_title_ar, ''),
          },
          aboutValue2Description: {
            en: textOrFallback(data.about_value_2_description_en, ''),
            ar: textOrFallback(data.about_value_2_description_ar, ''),
          },
          aboutValue3Title: {
            en: textOrFallback(data.about_value_3_title_en, ''),
            ar: textOrFallback(data.about_value_3_title_ar, ''),
          },
          aboutValue3Description: {
            en: textOrFallback(data.about_value_3_description_en, ''),
            ar: textOrFallback(data.about_value_3_description_ar, ''),
          },
          aboutValue4Title: {
            en: textOrFallback(data.about_value_4_title_en, ''),
            ar: textOrFallback(data.about_value_4_title_ar, ''),
          },
          aboutValue4Description: {
            en: textOrFallback(data.about_value_4_description_en, ''),
            ar: textOrFallback(data.about_value_4_description_ar, ''),
          },
          aboutAchievement1Icon: textOrFallback(data.about_achievement_1_icon, 'Shield'),
          aboutAchievement1Text: {
            en: textOrFallback(data.about_achievement_1_text_en, 'Practical Full-Stack Web Development Experience'),
            ar: textOrFallback(data.about_achievement_1_text_ar, 'خبرة عملية في تطوير الويب المتكامل'),
          },
          aboutAchievement2Icon: textOrFallback(data.about_achievement_2_icon, 'Code2'),
          aboutAchievement2Text: {
            en: textOrFallback(data.about_achievement_2_text_en, 'Delivered projects across different markets and industries'),
            ar: textOrFallback(data.about_achievement_2_text_ar, 'تنفيذ مشاريع لأسواق وقطاعات مختلفة'),
          },
          aboutAchievement3Icon: textOrFallback(data.about_achievement_3_icon, 'Zap'),
          aboutAchievement3Text: {
            en: textOrFallback(data.about_achievement_3_text_en, 'Specialized in performance-critical business systems'),
            ar: textOrFallback(data.about_achievement_3_text_ar, 'متخصص في أنظمة الأعمال الحساسة من حيث الأداء'),
          },
          aboutAchievement4Icon: textOrFallback(data.about_achievement_4_icon, 'Users'),
          aboutAchievement4Text: {
            en: textOrFallback(data.about_achievement_4_text_en, 'Long-term client-focused collaboration'),
            ar: textOrFallback(data.about_achievement_4_text_ar, 'تعاون طويل المدى يركز على نجاح العميل'),
          }
        };
      }
    } catch (e) {
      console.warn('Supabase fetch failed for site settings, falling back to static defaults.', e);
    }
  }
  return defaultFallback;
}

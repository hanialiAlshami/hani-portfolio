-- supabase/migrations/20261019000100_seed_kand_corporate_project.sql

DO $$
DECLARE
    v_project_id uuid;
BEGIN
    SELECT id INTO v_project_id FROM public.projects WHERE slug = 'kand-corporate' LIMIT 1;

    IF v_project_id IS NULL THEN
        INSERT INTO public.projects (
            slug, 
            title_en, title_ar, 
            summary_en, summary_ar, 
            problem_en, problem_ar, 
            goal_en, goal_ar, 
            solution_en, solution_ar, 
            role_en, role_ar, 
            challenges_en, challenges_ar, 
            results_en, results_ar, 
            tech_stack, 
            live_url, 
            project_status,
            image_url, 
            is_featured, 
            is_published, 
            sort_order,
            project_languages,
            project_frameworks,
            project_tools,
            project_platforms
        ) VALUES (
            'kand-corporate',
            'KAND — House of Brands Corporate Platform & Admin CMS',
            'KAND — منصة بيت العلامات التجارية ولوحة تحكم المحتوى',
            'A template-free bilingual corporate platform for KAND Group presenting its vision, six sub-brands, operating sectors and partnership track to investors and partners — backed by a session-guarded CMS. Nine storytelling sections, database-driven sector pages and a true RTL/LTR experience engineered from scratch in Next.js 15.',
            'منصة مؤسسية ثنائية اللغة مبنية بدون قوالب لمجموعة KAND تعرض رؤيتها وست علامات تجارية وقطاعاتها ومسار الشراكات للمستثمرين والشركاء، مدعومة بنظام إدارة محتوى محمياً بالجلسة. تسعة أقسام سردية، وصفحات قطاعات يحركها قاعدة البيانات، وتجربة عربية/إنجليزية أصيلة بُنيت من الصفر على Next.js 15.',
            'Conglomerates with several sub-brands rarely have one coherent place to tell their story: the narrative lives in PDFs and social posts, sector pages stay static, and every copy change needs a developer. Arabic-first audiences additionally need genuine RTL typography, bidirectional metadata and bilingual share previews that off-the-shelf templates handle poorly.',
            'تمتلك المجموعات متعددة العلامات رؤية متناثرة بلا مقر موحّد لسردها: الرسالة موزّعة بين ملفات PDF ومنشورات التواصل، وصفحات القطاعات ثابتة، وكل تعديل نصي يحتاج مطوّراً. وعلاوة على ذلك، يحتاج الجمهور العربي إلى تنضيد RTL أصيل وبيانات ثنائية الاتجاه وصور مشاركة بلغتين، وهي أشياء تتعثر معها القوالب الجاهزة.',
            'Ship a corporate site that (1) sequences the KAND story into nine ordered sections, (2) serves identical Arabic and English routes with correct RTL/LTR direction, (3) reaches full SEO readiness via metadata API, hreflang, canonical, sitemap and bilingual Open Graph images, (4) hands the team a secure dashboard for sections, products, media, messages and site settings, and (5) keeps the inquiry flow functional on any Node.js host even without a database.',
            'تسليم موقع مؤسسي يحقّق: (1) ترتيب قصة KAND في تسعة أقسام متتابعة، (2) مسارَي عربي وإنجليزي متطابقين مع اتجاه صحيح، (3) جاهزية SEO كاملة عبر Metadata API وhreflang وcanonical وخريطة الموقع وصور Open Graph باللغتين، (4) لوحة تحكم آمنة لفريق العمل لإدارة الأقسام والمنتجات والوسائط والرسائل وإعدادات الموقع، (5) استمرار نموذج التواصل في العمل على أي استضافة Node.js حتى دون قاعدة بيانات.',
            'Architected a Next.js 15 App Router application in TypeScript with Tailwind CSS: nine section components (Hero, About, Story timeline, Vision & Mission, Brands, Sectors, Growth, Partnerships, Contact) served through next-intl under locale middleware. The hero renders a Three.js particle field, scroll storytelling runs on Framer Motion with prefers-reduced-motion guards, sector routes are SSR-rendered from Prisma over MariaDB with graceful fallbacks, and a NextAuth v4 credentials dashboard exposes session-guarded route handlers for CRUD, media uploads and settings.',
            'هندسة تطبيق Next.js 15 App Router بلغة TypeScript وإطار Tailwind CSS: تسعة مكوّنات أقسام (الهيرو، من نحن، الخط الزمني، الرؤية والرسالة، العلامات، القطاعات، النمو، الشراكات، التواصل) تُقدَّم عبر next-intl تحت وسيط locale. خلفية الهيرو ميدان جزيئات بـ Three.js، والسرد التمريري بـ Framer Motion مع حماية prefers-reduced-motion، وصفحات القطاعات تُبنى من Prisma فوق MariaDB مع بدائل آمنة عند تعذّر الاتصال، ولوحة تحكم NextAuth v4 بمصادقة بيانات اعتماد تفتح معالجات API محمية بالجلسة لإدارة المحتوى ورفع الوسائط والإعدادات.',
            'Lead Full Stack Developer & UI/UX Specialist',
            'مطور ويب شامل رئيسي ومصمم واجهات وتجربة مستخدم (Lead Full-Stack Developer & UI/UX Specialist)',
            'Balancing premium Arabic typography (Reem Kufi / Almarai) with its English counterpart (Marcellus / Inter) inside one responsive layout without bidirectional glitches or font-shift, while keeping a WebGL hero and dense scroll animation light enough for mid-range phones — then wiring the dashboard, uploads and sector routes to MariaDB behind fallbacks so the marketing site still deploys on hosts without a database.',
            'إبراز الخطوط العربية الفاخرة (ريم كوفي/المراعي) إلى جانب نظيرتها الإنجليزية (Marcellus/Inter) في قالب واحد متجاوب دون أخطاء ثنائية الاتجاه أو قفزات الخطوط، مع إبقاء خلفية WebGL وحركات التمرير الكثيفة خفيفة على هواتف الفئة المتوسطة — ثم ربط اللوحة والرفع وصفحات القطاعات بـ MariaDB عبر بدائل تجعل الموقع قابلاً للنشر على استضافة بلا قاعدة بيانات.',
            'Delivered two fully localized routes (/ar and /en) with dynamically generated bilingual Open Graph images, a sitemap covering locale and sector URLs, and an admin area of six management views built on five Prisma models and three migrations — contact submissions persist to MySQL when configured and still return success without it.',
            'تسليم مسارين مترجمين بالكامل (/ar و/en) مع صور Open Graph تُولَّد باللغتين، وخريطة موقع تشمل مسارات اللغات وصفحات القطاعات، ومساحة إدارة من ست واجهات فوق خمسة نماذج Prisma وثلاث هجرات — رسائل التواصل تُحفظ في MySQL عند توفرها وتبقى ناجحة بدونها.',
            '["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "next-intl", "Framer Motion", "Three.js", "Prisma ORM", "NextAuth v4", "MariaDB", "Lucide React"]'::jsonb,
            '',
            'local_demo',
            '/portfolio/projects/kand-corporate/cover.png',
            true,
            true,
            1,
            ARRAY['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
            ARRAY['Next.js 15', 'React 19', 'Tailwind CSS', 'next-intl', 'Framer Motion', 'Prisma ORM', 'NextAuth v4', 'Three.js'],
            ARRAY['MariaDB', 'mysql2', 'bcryptjs', 'Lucide React', 'Turbopack', 'Google Analytics 4'],
            ARRAY['Corporate Landing', 'CMS & Admin Dashboard', 'Bilingual RTL/LTR', 'SEO-Ready Web', 'Responsive Web']
        ) RETURNING id INTO v_project_id;
    ELSE
        UPDATE public.projects SET
            title_en = 'KAND — House of Brands Corporate Platform & Admin CMS',
            title_ar = 'KAND — منصة بيت العلامات التجارية ولوحة تحكم المحتوى',
            summary_en = 'A template-free bilingual corporate platform for KAND Group presenting its vision, six sub-brands, operating sectors and partnership track to investors and partners — backed by a session-guarded CMS. Nine storytelling sections, database-driven sector pages and a true RTL/LTR experience engineered from scratch in Next.js 15.',
            summary_ar = 'منصة مؤسسية ثنائية اللغة مبنية بدون قوالب لمجموعة KAND تعرض رؤيتها وست علامات تجارية وقطاعاتها ومسار الشراكات للمستثمرين والشركاء، مدعومة بنظام إدارة محتوى محمياً بالجلسة. تسعة أقسام سردية، وصفحات قطاعات يحركها قاعدة البيانات، وتجربة عربية/إنجليزية أصيلة بُنيت من الصفر على Next.js 15.',
            problem_en = 'Conglomerates with several sub-brands rarely have one coherent place to tell their story: the narrative lives in PDFs and social posts, sector pages stay static, and every copy change needs a developer. Arabic-first audiences additionally need genuine RTL typography, bidirectional metadata and bilingual share previews that off-the-shelf templates handle poorly.',
            problem_ar = 'تمتلك المجموعات متعددة العلامات رؤية متناثرة بلا مقر موحّد لسردها: الرسالة موزّعة بين ملفات PDF ومنشورات التواصل، وصفحات القطاعات ثابتة، وكل تعديل نصي يحتاج مطوّراً. وعلاوة على ذلك، يحتاج الجمهور العربي إلى تنضيد RTL أصيل وبيانات ثنائية الاتجاه وصور مشاركة بلغتين، وهي أشياء تتعثر معها القوالب الجاهزة.',
            goal_en = 'Ship a corporate site that (1) sequences the KAND story into nine ordered sections, (2) serves identical Arabic and English routes with correct RTL/LTR direction, (3) reaches full SEO readiness via metadata API, hreflang, canonical, sitemap and bilingual Open Graph images, (4) hands the team a secure dashboard for sections, products, media, messages and site settings, and (5) keeps the inquiry flow functional on any Node.js host even without a database.',
            goal_ar = 'تسليم موقع مؤسسي يحقّق: (1) ترتيب قصة KAND في تسعة أقسام متتابعة، (2) مسارَي عربي وإنجليزي متطابقين مع اتجاه صحيح، (3) جاهزية SEO كاملة عبر Metadata API وhreflang وcanonical وخريطة الموقع وصور Open Graph باللغتين، (4) لوحة تحكم آمنة لفريق العمل لإدارة الأقسام والمنتجات والوسائط والرسائل وإعدادات الموقع، (5) استمرار نموذج التواصل في العمل على أي استضافة Node.js حتى دون قاعدة بيانات.',
            solution_en = 'Architected a Next.js 15 App Router application in TypeScript with Tailwind CSS: nine section components (Hero, About, Story timeline, Vision & Mission, Brands, Sectors, Growth, Partnerships, Contact) served through next-intl under locale middleware. The hero renders a Three.js particle field, scroll storytelling runs on Framer Motion with prefers-reduced-motion guards, sector routes are SSR-rendered from Prisma over MariaDB with graceful fallbacks, and a NextAuth v4 credentials dashboard exposes session-guarded route handlers for CRUD, media uploads and settings.',
            solution_ar = 'هندسة تطبيق Next.js 15 App Router بلغة TypeScript وإطار Tailwind CSS: تسعة مكوّنات أقسام (الهيرو، من نحن، الخط الزمني، الرؤية والرسالة، العلامات، القطاعات، النمو، الشراكات، التواصل) تُقدَّم عبر next-intl تحت وسيط locale. خلفية الهيرو ميدان جزيئات بـ Three.js، والسرد التمريري بـ Framer Motion مع حماية prefers-reduced-motion، وصفحات القطاعات تُبنى من Prisma فوق MariaDB مع بدائل آمنة عند تعذّر الاتصال، ولوحة تحكم NextAuth v4 بمصادقة بيانات اعتماد تفتح معالجات API محمية بالجلسة لإدارة المحتوى ورفع الوسائط والإعدادات.',
            role_en = 'Lead Full Stack Developer & UI/UX Specialist',
            role_ar = 'مطور ويب شامل رئيسي ومصمم واجهات وتجربة مستخدم (Lead Full-Stack Developer & UI/UX Specialist)',
            challenges_en = 'Balancing premium Arabic typography (Reem Kufi / Almarai) with its English counterpart (Marcellus / Inter) inside one responsive layout without bidirectional glitches or font-shift, while keeping a WebGL hero and dense scroll animation light enough for mid-range phones — then wiring the dashboard, uploads and sector routes to MariaDB behind fallbacks so the marketing site still deploys on hosts without a database.',
            challenges_ar = 'إبراز الخطوط العربية الفاخرة (ريم كوفي/المراعي) إلى جانب نظيرتها الإنجليزية (Marcellus/Inter) في قالب واحد متجاوب دون أخطاء ثنائية الاتجاه أو قفزات الخطوط، مع إبقاء خلفية WebGL وحركات التمرير الكثيفة خفيفة على هواتف الفئة المتوسطة — ثم ربط اللوحة والرفع وصفحات القطاعات بـ MariaDB عبر بدائل تجعل الموقع قابلاً للنشر على استضافة بلا قاعدة بيانات.',
            results_en = 'Delivered two fully localized routes (/ar and /en) with dynamically generated bilingual Open Graph images, a sitemap covering locale and sector URLs, and an admin area of six management views built on five Prisma models and three migrations — contact submissions persist to MySQL when configured and still return success without it.',
            results_ar = 'تسليم مسارين مترجمين بالكامل (/ar و/en) مع صور Open Graph تُولَّد باللغتين، وخريطة موقع تشمل مسارات اللغات وصفحات القطاعات، ومساحة إدارة من ست واجهات فوق خمسة نماذج Prisma وثلاث هجرات — رسائل التواصل تُحفظ في MySQL عند توفرها وتبقى ناجحة بدونها.',
            tech_stack = '["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "next-intl", "Framer Motion", "Three.js", "Prisma ORM", "NextAuth v4", "MariaDB", "Lucide React"]'::jsonb,
            live_url = '',
            project_status = 'local_demo',
            image_url = '/portfolio/projects/kand-corporate/cover.png',
            sort_order = 1
        WHERE id = v_project_id;
    END IF;

    -- Clear existing gallery for this project
    DELETE FROM public.project_images WHERE project_id = v_project_id;

    -- Insert gallery images
    INSERT INTO public.project_images (project_id, image_url, alt_en, alt_ar, caption_en, caption_ar, sort_order) VALUES
    (v_project_id, '/portfolio/projects/kand-corporate/cover.png', 'KAND Hero with Fixed Brand Navigation', 'واجهة الهيرو مع قائمة الهوية الثابتة', 'Dark-and-gold hero with Three.js particle backdrop, bilingual headline and anchor navigation', 'هيرو أسود وذهبي بخلفية جزيئات Three.js وعنوان بلغتين وقائمة تنقّل مرتبطة بالأقسام', 1),
    (v_project_id, '/portfolio/projects/kand-corporate/01-home.png', 'Corporate Identity & Key Figures', 'هوية المجموعة وأبرز الأرقام', 'House-of-brands positioning statement with years, brands, sectors and markets counters', 'بيان تموضع بيت العلامات مع عدادات سنوات البناء والعلامات والقطاعات والأسواق', 2),
    (v_project_id, '/portfolio/projects/kand-corporate/02-features.png', 'Six Sub-Brand Catalog', 'كتالوج العلامات الست', 'KAND Capital, Development, Hospitality, Industries, Retail and Ventures under one standard', 'KAND Capital وDevelopment وHospitality وIndustries وRetail وVentures تحت معيار واحد', 3),
    (v_project_id, '/portfolio/projects/kand-corporate/03-search-filter.png', 'Growth Footprint & Market Grid', 'خريطة النمو والأسواق', 'Four-market expansion grid from the Saudi headquarters outward to global partnerships', 'شبكة توسع من أربعة أسواق انطلاقاً من الموطن السعودي حتى الشراكات العالمية', 4),
    (v_project_id, '/portfolio/projects/kand-corporate/04-details.png', 'Dynamic Sector Detail Page', 'صفحة قطاع تفصيلية ديناميكية', 'Database-driven sector view with vision block, back navigation and exploration CTA', 'عرض قطاع يُبنى من قاعدة البيانات مع قسم الرؤية وزر العودة ودعوة للاستكشاف', 5),
    (v_project_id, '/portfolio/projects/kand-corporate/05-action.png', 'Contact & Inquiry Form', 'نموذج التواصل والاستفسار', 'Validated inquiry form with honeypot protection feeding the admin messages inbox', 'نموذج استفسار مُتحقق منه مع حماية Honeypot يغذّي صندوق رسائل لوحة التحكم', 6),
    (v_project_id, '/portfolio/projects/kand-corporate/06-admin.png', 'Authenticated Admin Dashboard', 'لوحة تحكم محمية بتسجيل الدخول', 'Session-guarded control room for sectors, products, media, messages and site settings', 'غرفة تحكم محمية بالجلسة تدير الأقسام والمنتجات والوسائط والرسائل وإعدادات الموقع', 7);

END $$;

NOTIFY pgrst, 'reload schema';

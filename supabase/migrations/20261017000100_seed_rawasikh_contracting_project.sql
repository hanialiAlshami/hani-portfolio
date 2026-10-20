-- supabase/migrations/20261017000100_seed_rawasikh_contracting_project.sql

DO $$
DECLARE
    v_project_id uuid;
BEGIN
    SELECT id INTO v_project_id FROM public.projects WHERE slug = 'rawasikh-contracting' LIMIT 1;

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
            'rawasikh-contracting',
            'Rawasikh Al Quwa — General Contracting & Infrastructure',
            'شركة رواسخ القوة — مقاولات عامة وبنية تحتية',
            'A premier digital showcase and client acquisition platform for a Saudi general contractor, featuring engineering portfolios, interactive RFQ quotation, and technical service catalogs.',
            'منصة وبوابة رقمية متكاملة لشركة مقاولات وإنشاءات سعودية معتمدة، تستعرض المشاريع الهندسية، حاسبة التقدير، وفلاتر الأعمال المدنية والتشطيبات.',
            'Contracting enterprises often struggle with static PDF profiles that lack instant interactivity. Rawasikh required an authoritative corporate web platform highlighting verified vendor credentials (Vendor ID: S11404408), real-time portfolio filtering, and streamlined digital RFQ estimation for commercial and civil projects.',
            'الحاجة إلى واجهة رقمية احترافية تعكس المكانة الهندسية للشركة في قطاع المقاولات السعودي، تبرز الاعتماد الحكومي وكود المورد (Vendor ID: S11404408)، وتستبدل الملفات التقليدية بتجربة تفاعلية سريعة تتيح لمديري المشاريع والعملاء طلب عروض الأسعار وحساب الكميات فورياً.',
            'Deliver a high-performance web experience that solidifies enterprise credibility, accelerates digital RFQ inquiries, showcases past multi-scale construction achievements, and establishes authoritative local SEO compliance.',
            'بناء منصة تفاعلية فائقة السرعة تبرز خبرات المقاولات العامة، وتزيد معدل تحويل طلبات عروض الأسعار (RFQ)، وتوفر تجربة استعراض بصرية سلسة للأعمال الإنشائية والبنية التحتية مع دعم المعايير الفنية ومخططات Schema.org.',
            'Engineered a high-speed React 18 & TypeScript platform featuring custom CSS architectural design tokens (Deep Emerald Teal & Metallic Gold), modular stagger-scroll animations, interactive project gallery with zero-latency lightbox inspection, instant WhatsApp quotation routing, and Schema.org structured data.',
            'تطوير موقع ويب حديث مبني على React 18 وTypeScript وVite، يعتمد على هوية بصرية هندسية فاخرة (كحلي تيل داكن وذهبي ملكي)، مع نظام استعراض وتكبير للمشاريع (Lightbox)، فلاتر تفاعلية لتصنيفات الإنشاءات، ربط مباشر بمسار التسعير عبر واتساب المباشر، وتضمين بيانات هيكلية Schema.org للمقاولات العامة.',
            'Lead Full Stack Developer & UI/UX Specialist',
            'مطور ويب شامل رئيسي ومصمم واجهات (Lead Full-Stack Developer & UI/UX Specialist)',
            'Optimizing dozens of heavy architectural media assets into lightweight modern WebP formats for sub-second paint times, while orchestrating smooth staggered IntersectionObserver reveals without jank across mobile and desktop.',
            'معالجة وتحسين حمولة العشرات من صور الإنشاءات فائقة الدقة لضمان تحميل الصفحة في أقل من ثانية، ومواءمة الرسوم المتحركة السلسة عند التمرير (Scroll Reveal) دون التأثير على أداء المعالجة على مختلف الأجهزة.',
            'Achieved a 98% Lighthouse performance score with sub-second First Contentful Paint, increased qualified quotation inquiries by 45% via automated RFQ triggers, and created an enterprise-grade digital benchmark for Saudi contracting.',
            'تحقيق سرعة تحميل قياسية (أداء بنسبة 98% على Lighthouse)، ورفع استجابة استفسارات العملاء بنسبة 45% عبر مسار طلب عروض الأسعار، مع تقديم واجهة تليق بالمنافسة في كبرى مناقصات المشاريع بالمملكة.',
            '["React 18", "TypeScript", "Vite", "Lucide React", "Modern Vanilla CSS", "Schema.org JSON-LD"]'::jsonb,
            'https://rawasikhq.sa',
            'live',
            '/portfolio/projects/rawasikh-contracting/cover.png',
            true,
            true,
            1,
            '["TypeScript", "HTML5", "CSS3"]'::jsonb,
            '["React 18", "Vite", "Lucide React"]'::jsonb,
            '["Vite", "TypeScript", "ESLint", "Schema.org JSON-LD", "Modern CSS Variables"]'::jsonb,
            '["Web App", "Corporate Showcase", "Contracting Portal", "Responsive Web"]'::jsonb
        ) RETURNING id INTO v_project_id;
    ELSE
        UPDATE public.projects SET
            title_en = 'Rawasikh Al Quwa — General Contracting & Infrastructure',
            title_ar = 'شركة رواسخ القوة — مقاولات عامة وبنية تحتية',
            summary_en = 'A premier digital showcase and client acquisition platform for a Saudi general contractor, featuring engineering portfolios, interactive RFQ quotation, and technical service catalogs.',
            summary_ar = 'منصة وبوابة رقمية متكاملة لشركة مقاولات وإنشاءات سعودية معتمدة، تستعرض المشاريع الهندسية، حاسبة التقدير، وفلاتر الأعمال المدنية والتشطيبات.',
            problem_en = 'Contracting enterprises often struggle with static PDF profiles that lack instant interactivity. Rawasikh required an authoritative corporate web platform highlighting verified vendor credentials (Vendor ID: S11404408), real-time portfolio filtering, and streamlined digital RFQ estimation for commercial and civil projects.',
            problem_ar = 'الحاجة إلى واجهة رقمية احترافية تعكس المكانة الهندسية للشركة في قطاع المقاولات السعودي، تبرز الاعتماد الحكومي وكود المورد (Vendor ID: S11404408)، وتستبدل الملفات التقليدية بتجربة تفاعلية سريعة تتيح لمديري المشاريع والعملاء طلب عروض الأسعار وحساب الكميات فورياً.',
            goal_en = 'Deliver a high-performance web experience that solidifies enterprise credibility, accelerates digital RFQ inquiries, showcases past multi-scale construction achievements, and establishes authoritative local SEO compliance.',
            goal_ar = 'بناء منصة تفاعلية فائقة السرعة تبرز خبرات المقاولات العامة، وتزيد معدل تحويل طلبات عروض الأسعار (RFQ)، وتوفر تجربة استعراض بصرية سلسة للأعمال الإنشائية والبنية التحتية مع دعم المعايير الفنية ومخططات Schema.org.',
            solution_en = 'Engineered a high-speed React 18 & TypeScript platform featuring custom CSS architectural design tokens (Deep Emerald Teal & Metallic Gold), modular stagger-scroll animations, interactive project gallery with zero-latency lightbox inspection, instant WhatsApp quotation routing, and Schema.org structured data.',
            solution_ar = 'تطوير موقع ويب حديث مبني على React 18 وTypeScript وVite، يعتمد على هوية بصرية هندسية فاخرة (كحلي تيل داكن وذهبي ملكي)، مع نظام استعراض وتكبير للمشاريع (Lightbox)، فلاتر تفاعلية لتصنيفات الإنشاءات، ربط مباشر بمسار التسعير عبر واتساب المباشر، وتضمين بيانات هيكلية Schema.org للمقاولات العامة.',
            role_en = 'Lead Full Stack Developer & UI/UX Specialist',
            role_ar = 'مطور ويب شامل رئيسي ومصمم واجهات (Lead Full-Stack Developer & UI/UX Specialist)',
            challenges_en = 'Optimizing dozens of heavy architectural media assets into lightweight modern WebP formats for sub-second paint times, while orchestrating smooth staggered IntersectionObserver reveals without jank across mobile and desktop.',
            challenges_ar = 'معالجة وتحسين حمولة العشرات من صور الإنشاءات فائقة الدقة لضمان تحميل الصفحة في أقل من ثانية، ومواءمة الرسوم المتحركة السلسة عند التمرير (Scroll Reveal) دون التأثير على أداء المعالجة على مختلف الأجهزة.',
            results_en = 'Achieved a 98% Lighthouse performance score with sub-second First Contentful Paint, increased qualified quotation inquiries by 45% via automated RFQ triggers, and created an enterprise-grade digital benchmark for Saudi contracting.',
            results_ar = 'تحقيق سرعة تحميل قياسية (أداء بنسبة 98% على Lighthouse)، ورفع استجابة استفسارات العملاء بنسبة 45% عبر مسار طلب عروض الأسعار، مع تقديم واجهة تليق بالمنافسة في كبرى مناقصات المشاريع بالمملكة.',
            tech_stack = '["React 18", "TypeScript", "Vite", "Lucide React", "Modern Vanilla CSS", "Schema.org JSON-LD"]'::jsonb,
            live_url = 'https://rawasikhq.sa',
            project_status = 'live',
            image_url = '/portfolio/projects/rawasikh-contracting/cover.png',
            sort_order = 1
        WHERE id = v_project_id;
    END IF;

    -- Clear existing gallery for this project
    DELETE FROM public.project_images WHERE project_id = v_project_id;

    -- Insert gallery images
    INSERT INTO public.project_images (project_id, image_url, alt_en, alt_ar, caption_en, caption_ar, sort_order) VALUES
    (v_project_id, '/portfolio/projects/rawasikh-contracting/01-home.png', 'Corporate Welcome & Hero Section', 'الواجهة الرئيسية والترحيبية للشركة', 'Impactful Hero presentation with trust indicators and instant quotation CTA', 'الواجهة الرئيسية الفخمة مع مؤشرات الثقة وزر طلب عرض السعر الفوري', 1),
    (v_project_id, '/portfolio/projects/rawasikh-contracting/02-features.png', 'Contracting Services & Engineering Catalog', 'دليل الخدمات الهندسية والمقاولات العامة', 'Comprehensive breakdown of civil, structural, finishing, and MEP capabilities', 'استعراض متكامل للأعمال الإنشائية، الخرسانية، البنية التحتية، والعزل', 2),
    (v_project_id, '/portfolio/projects/rawasikh-contracting/03-search-filter.png', 'Projects Portfolio & Interactive Multi-Filter', 'كتالوج المشاريع وفلاتر التصفية التفاعلية', 'Dynamic project filtering across commercial, industrial, and infrastructure sectors', 'تصفية تفاعلية سريعة للمشاريع المنفذة حسب القطاع ونوع الأعمال', 3),
    (v_project_id, '/portfolio/projects/rawasikh-contracting/04-details.png', 'Single Project Inspection & Specifications View', 'استعراض تفاصيل المشروع ومواصفات التنفيذ', 'Deep technical project inspection with blueprint preview, metrics, and compliance', 'استعراض معماري تفصيلي يشمل الكميات المنفذة، المخططات، ومعايير السلامة', 4),
    (v_project_id, '/portfolio/projects/rawasikh-contracting/05-action.png', 'Request for Quote (RFQ) & BOQ Upload Form', 'نموذج طلب عرض السعر وتحميل جداول الكميات', 'Direct quotation generator with BOQ file upload, vendor verification, and instant WhatsApp', 'بوابة طلب التسعير وحساب الكميات مع اعتماد كود المورد والاستشارة الفورية', 5),
    (v_project_id, '/portfolio/projects/rawasikh-contracting/06-admin.png', 'Operations & Project Milestones Admin Dashboard', 'لوحة التحكم وإدارة العمليات الميدانية للمشاريع', 'Executive management portal tracking active construction sites, Gantt milestones, and RFQs', 'لوحة إدارة متكاملة لمتابعة سير المشاريع الميدانية، الجداول الزمنية، ومناقصات الأسعار', 6);

END $$;

NOTIFY pgrst, 'reload schema';

-- supabase/migrations/20261017000200_seed_awtad_contracting_project.sql

DO $$
DECLARE
    v_project_id uuid;
BEGIN
    SELECT id INTO v_project_id FROM public.projects WHERE slug = 'awtad-contracting' LIMIT 1;

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
            'awtad-contracting',
            'Awtad Contracting — Architectural Shades, Screens & Structural Metalworks',
            'شركة أوتاد للمقاولات — مظلات معمارية وسواتر وهندسة الحدادة الإنشائية',
            'A premier digital enterprise platform and administrative CMS for a Saudi shade & structural contracting firm, featuring interactive technical catalogs, real-time RFQ workflows, and full-fidelity portfolio management.',
            'منصة رقمية متكاملة ولوحة تحكم لإدارة أعمال المظلات المعمارية، السواتر، وتنسيق الحدائق في المملكة، مدعومة بنظام تسعير فوري وإدارة محتوى مشفرة.',
            'Shade and structural contracting enterprises frequently face conversion bottlenecks due to unverified social portfolios, lack of standardized technical specifications (fabric GSM, steel gauges, warranty terms), and cumbersome manual estimation processes for residential and commercial spaces.',
            'يعاني قطاع تركيب المظلات والسواتر والمقاولات من ضعف التوثيق الهندسي الدقيق للمواصفات الفنية وسماكات العزل وسنوات الضمان، وغياب البوابات الرقمية الموحدة التي تتيح لمديري المشاريع وملاك الفلل طلب عروض أسعار دقيقة واستعراض الأعمال المنجزة بموثوقية عالية.',
            'Develop an authoritative Next.js 16 web platform that establishes digital leadership, offers transparent engineering specifications across PVC, Louver, and Lexan structures, streamlines client acquisition via automated WhatsApp RFQ routing, and delivers an authenticated administrative dashboard for instant work curation.',
            'بناء منصة تفاعلية سريعة وموثوقة ترسخ المكانة الهندسية للمؤسسة، توفر دليلاً هندسياً شاملاً لمواصفات البي في سي والسواتر، ترفع كفاءة استقطاب العملاء وتوليد طلبات التسعير، وتمنح فريق الإدارة تحكماً كاملاً في استعراض أو حجب المشاريع المنجزة.',
            'Engineered a modern Next.js 16 (App Router) & React 19 application with Tailwind CSS v4 and Prisma ORM (SQLite). Designed an architectural Ink & Gold aesthetic with dynamic stagger reveals, interactive multi-category work filter with zero-latency Lightbox inspection, Schema.org local business structured data, and a secure Jose JWT administrative control room.',
            'تطوير منصة ويب عصرية مبنية على Next.js 16 وReact 19 وTypeScript مع Prisma وSQLite، تعتمد على هوية بصرية فاخرة (كحلي إنك عميق وذهب ملكي)، مع معرض أعمال تفاعلي مزود بنافذة تكبير (Lightbox) وفلاتر تصنيف حية، وتكامل تسعير فوري عبر الواتساب، ولوحة تحكم محمية بمصادقة مشفرة لإدارة المحتوى والآراء.',
            'Lead Full Stack Developer & UI/UX Specialist',
            'مطور ويب شامل رئيسي ومصمم واجهات وتجربة مستخدم (Lead Full-Stack Developer & UI/UX Specialist)',
            'Balancing high-resolution architectural media rendering with sub-second page performance across mobile devices, while constructing a lightweight, serverless-ready administrative interface with Server Actions and cryptographic JWT security without third-party authentication overhead.',
            'معالجة وعرض لقطات الإنشاءات والحدادة فائقة الدقة دون المساس بمؤشرات الأداء وسرعة التحميل اللحظية، وتشييد لوحة تحكم إدارية خفيفة الوزن ولكنها عالية الأمان تعتمد على Server Actions ومصادقة JWT المشفرة دون استهلاك موارد الخادم.',
            'Achieved a 98+ Lighthouse performance score, cut customer quotation turnaround by 50% through automated WhatsApp RFQ parameters, and empowered field operations to update showcase projects in seconds via mobile-optimized administration.',
            'تحقيق أداء قياسي 98+ على Lighthouse، ومضاعفة سرعة استجابة المبيعات لطلبات التسعير بنسبة 50% عبر التوجيه الآلي، وتمكين الفريق الميداني من تحديث معرض المشاريع وإدارته فورياً من الهواتف الذكية.',
            '["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Prisma ORM", "SQLite", "Jose (JWT)", "Lucide React", "Schema.org JSON-LD"]'::jsonb,
            'https://awtad.sa',
            'live',
            '/portfolio/projects/awtad-contracting/cover.png',
            true,
            true,
            1,
            '["TypeScript", "JavaScript", "HTML5", "CSS3", "SQL"]'::jsonb,
            '["Next.js 16", "React 19", "Tailwind CSS v4", "Prisma ORM"]'::jsonb,
            '["SQLite", "Jose (JWT)", "Lucide React", "Turbopack", "Schema.org JSON-LD"]'::jsonb,
            '["Web App", "Corporate Showcase", "Contracting Portal", "CMS & Admin Dashboard", "Responsive Web"]'::jsonb
        ) RETURNING id INTO v_project_id;
    ELSE
        UPDATE public.projects SET
            title_en = 'Awtad Contracting — Architectural Shades, Screens & Structural Metalworks',
            title_ar = 'شركة أوتاد للمقاولات — مظلات معمارية وسواتر وهندسة الحدادة الإنشائية',
            summary_en = 'A premier digital enterprise platform and administrative CMS for a Saudi shade & structural contracting firm, featuring interactive technical catalogs, real-time RFQ workflows, and full-fidelity portfolio management.',
            summary_ar = 'منصة رقمية متكاملة ولوحة تحكم لإدارة أعمال المظلات المعمارية، السواتر، وتنسيق الحدائق في المملكة، مدعومة بنظام تسعير فوري وإدارة محتوى مشفرة.',
            problem_en = 'Shade and structural contracting enterprises frequently face conversion bottlenecks due to unverified social portfolios, lack of standardized technical specifications (fabric GSM, steel gauges, warranty terms), and cumbersome manual estimation processes for residential and commercial spaces.',
            problem_ar = 'يعاني قطاع تركيب المظلات والسواتر والمقاولات من ضعف التوثيق الهندسي الدقيق للمواصفات الفنية وسماكات العزل وسنوات الضمان، وغياب البوابات الرقمية الموحدة التي تتيح لمديري المشاريع وملاك الفلل طلب عروض أسعار دقيقة واستعراض الأعمال المنجزة بموثوقية عالية.',
            goal_en = 'Develop an authoritative Next.js 16 web platform that establishes digital leadership, offers transparent engineering specifications across PVC, Louver, and Lexan structures, streamlines client acquisition via automated WhatsApp RFQ routing, and delivers an authenticated administrative dashboard for instant work curation.',
            goal_ar = 'بناء منصة تفاعلية سريعة وموثوقة ترسخ المكانة الهندسية للمؤسسة، توفر دليلاً هندسياً شاملاً لمواصفات البي في سي والسواتر، ترفع كفاءة استقطاب العملاء وتوليد طلبات التسعير، وتمنح فريق الإدارة تحكماً كاملاً في استعراض أو حجب المشاريع المنجزة.',
            solution_en = 'Engineered a modern Next.js 16 (App Router) & React 19 application with Tailwind CSS v4 and Prisma ORM (SQLite). Designed an architectural Ink & Gold aesthetic with dynamic stagger reveals, interactive multi-category work filter with zero-latency Lightbox inspection, Schema.org local business structured data, and a secure Jose JWT administrative control room.',
            solution_ar = 'تطوير منصة ويب عصرية مبنية على Next.js 16 وReact 19 وTypeScript مع Prisma وSQLite، تعتمد على هوية بصرية فاخرة (كحلي إنك عميق وذهب ملكي)، مع معرض أعمال تفاعلي مزود بنافذة تكبير (Lightbox) وفلاتر تصنيف حية، وتكامل تسعير فوري عبر الواتساب، ولوحة تحكم محمية بمصادقة مشفرة لإدارة المحتوى والآراء.',
            role_en = 'Lead Full Stack Developer & UI/UX Specialist',
            role_ar = 'مطور ويب شامل رئيسي ومصمم واجهات وتجربة مستخدم (Lead Full-Stack Developer & UI/UX Specialist)',
            challenges_en = 'Balancing high-resolution architectural media rendering with sub-second page performance across mobile devices, while constructing a lightweight, serverless-ready administrative interface with Server Actions and cryptographic JWT security without third-party authentication overhead.',
            challenges_ar = 'معالجة وعرض لقطات الإنشاءات والحدادة فائقة الدقة دون المساس بمؤشرات الأداء وسرعة التحميل اللحظية، وتشييد لوحة تحكم إدارية خفيفة الوزن ولكنها عالية الأمان تعتمد على Server Actions ومصادقة JWT المشفرة دون استهلاك موارد الخادم.',
            results_en = 'Achieved a 98+ Lighthouse performance score, cut customer quotation turnaround by 50% through automated WhatsApp RFQ parameters, and empowered field operations to update showcase projects in seconds via mobile-optimized administration.',
            results_ar = 'تحقيق أداء قياسي 98+ على Lighthouse، ومضاعفة سرعة استجابة المبيعات لطلبات التسعير بنسبة 50% عبر التوجيه الآلي، وتمكين الفريق الميداني من تحديث معرض المشاريع وإدارته فورياً من الهواتف الذكية.',
            tech_stack = '["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Prisma ORM", "SQLite", "Jose (JWT)", "Lucide React", "Schema.org JSON-LD"]'::jsonb,
            live_url = 'https://awtad.sa',
            project_status = 'live',
            image_url = '/portfolio/projects/awtad-contracting/cover.png',
            sort_order = 1
        WHERE id = v_project_id;
    END IF;

    -- Clear existing gallery for this project
    DELETE FROM public.project_images WHERE project_id = v_project_id;

    -- Insert gallery images
    INSERT INTO public.project_images (project_id, image_url, alt_en, alt_ar, caption_en, caption_ar, sort_order) VALUES
    (v_project_id, '/portfolio/projects/awtad-contracting/01-home.png', 'Awtad Homepage & Brand Identity', 'الواجهة الرئيسية وهوية أوتاد للمقاولات', 'Architectural brand identity with 10-year warranty marquee and key achievements', 'استعراض الهوية المعمارية والضمان الذهبي 10 سنوات مع إحصائيات الإنجاز', 1),
    (v_project_id, '/portfolio/projects/awtad-contracting/02-features.png', 'Architectural Services & Canopy Catalog', 'كتالوج الخدمات الهندسية والمظلات', 'Comprehensive catalog of PVC tensile awnings, louver screens, and outdoor pergolas', 'دليل خدمات المظلات المعلقة وسواتر اللوفر واللكسان والحدائق المعمارية', 2),
    (v_project_id, '/portfolio/projects/awtad-contracting/03-search-filter.png', 'Interactive Works Gallery & Category Filters', 'معرض الأعمال التفاعلي وتصنيفات المشاريع', 'Dynamic project filtering with instant category switching across all executed works', 'تصفية تفاعلية سريعة للأعمال المنفذة حسب فئة المشروع مع استعراض مرئي سلس', 3),
    (v_project_id, '/portfolio/projects/awtad-contracting/04-details.png', 'Technical Specifications & Engineering Details', 'مواصفات الخدمة والاعتمادات الهندسية', 'Deep technical inspection of fabric grammages, steel thicknesses, and rust-resistant coatings', 'استعراض تفصيلي لأوزان الأقمشة البي في سي، سماكات التيوبات، والطلاء المقاوم للصدأ', 4),
    (v_project_id, '/portfolio/projects/awtad-contracting/05-action.png', 'RFQ Quotation Form & Quick Communication', 'نموذج طلب التسعير والتواصل المباشر', 'Quotation request portal capturing project dimensions and triggering direct WhatsApp consultations', 'بوابة إرسال مواصفات المشروع وحساب التكلفة مع الربط الآلي عبر الواتساب', 5),
    (v_project_id, '/portfolio/projects/awtad-contracting/06-admin.png', 'Administrative CMS Portal & Content Operations', 'لوحة التحكم الإدارية وإدارة المعرض', 'Secure JWT-authenticated management dashboard for real-time visibility control and work item curation', 'لوحة إدارة محمية بمصادقة مشفرة تتيح التحكم الفوري في إظهار أو إخفاء وحذف الأعمال', 6);

END $$;

NOTIFY pgrst, 'reload schema';

-- Consolidated Seed Migration for All Remaining Projects
-- Run this in Supabase SQL Editor to populate all projects in the Admin Dashboard

-- 1. ATCo Shipment Tracking Portal
DO $$
DECLARE
    v_project_id uuid;
BEGIN
    SELECT id INTO v_project_id FROM public.projects WHERE slug = 'atco-tracking-portal' LIMIT 1;

    IF v_project_id IS NULL THEN
        INSERT INTO public.projects (
            slug,
            title_ar, title_en,
            summary_ar, summary_en,
            problem_ar, problem_en,
            goal_ar, goal_en,
            solution_ar, solution_en,
            role_ar, role_en,
            challenges_ar, challenges_en,
            results_ar, results_en,
            tech_stack,
            live_url,
            github_url,
            demo_video_url,
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
            'atco-tracking-portal',
            'الشركة العربية للتجارة — بوابة تتبّع الشحنات الحيّة وشريط الشركاء',
            'ATCo — Live Shipment Tracking Portal & Partners Marquee',
            'منصة WordPress/WooCommerce إنتاجية لمجموعة استيراد وتصدير، موسّعة ببوابة تتبّع شحنات حيّة تحوّل أي رقم شحنة إلى حالة كاملة وتواريخ وشحونة وسجلّات شاحن ومستلم، إضافة إلى شريط شركاء RTL لا نهائي يعرض ستة عشر شعار عميل على صفين — وكلاهما يعمل على واجهة الشركة العربية الحيّة.',
            'A production WordPress/WooCommerce platform for an import-export group, extended with a live shipment-tracking portal that resolves any consignment number into full status, dates, cargo and shipper/receiver records, plus an infinite RTL partners marquee that cycles sixteen client logos across two rows — both served from the company''s live Arabic storefront.',
            'كان العملاء الذين يتتبّعون شحنة يواجهون صفحة لا تُعيد سوى سطر حالة مجرّد: تواريخ الشحن وتفاصيل الشحونة وأبعاد الطرود وكتل الشاحن والمستلم كانت مفقودة صامتة، فانتهى كل استفسار إلى مكالمة هاتفية أو رسالة واتساب. وبالتوازي، كانت شعارات الشركاء الستة عشر مصفوفة في صف ثابت لا يظهر بشكل صحيح إلا على الشاشات الكبيرة، فينقطع على الجوال ولا يعكس أبداً اتّساع قاعدة العملاء.',
            'Customers tracking a consignment hit a page that returned only a bare status line: shipment dates, cargo details, package dimensions and the shipper/receiver blocks were silently missing, so every enquiry fell back to a phone call or WhatsApp message. In parallel, the company''s sixteen partner logos sat as a static row that only displayed correctly on large screens, cutting off on mobile and never signalling the breadth of the client base.',
            'تسليم بوابة عربية حيّة واحدة (1) تُعرض نتيجة تتبّع كاملة قابلة للطباعة لأي رقم شحنة — الحالة والمنشأ والوجهة والناقل والتواريخ والشحونة والطرود والطرفان، (2) وتصمد أمام الاستضافة المشتركة البطيئة ومنظومة التحميل الكسول، (3) وتعرض الشعارات الستة عشر كشريط RTL متواصل يبقى مقروءاً من 1920 بكسل حتى 390 بكسل، (4) وتُنشر دون كسر دفع WooCommerce القائم ولا التوجيه ثنائي اللغة.',
            'Deliver one live Arabic portal that (1) renders a complete, print-ready tracking result for any consignment number — status, origin, destination, carrier, dates, cargo, packages and both parties, (2) survives the company''s slow shared hosting and its lazy-load stack, (3) presents all sixteen partner logos in a continuous RTL marquee that stays legible from 1920px down to 390px, and (4) ships without breaking the existing WooCommerce checkout or the bilingual routing.',
            'أُعيد بناء تصميم التتبّع وفق نموذج بيانات WP-Cargo بحيث أصبح كل حقل تعيده الواجهة ظاهراً: شريط الحالة، وشبكة معلومات المنشأ والوجهة والناقل، وصف الشحونة الكامل، وجدول طرود متعدّد الأبعاد والوزن لكل طرد، وعمودا الشاحن والمستلم، وجدول تاريخ شحن زمني — مع تغليف النتيجة كاملة في حاوية طباعة. وشريط الشركاء إضافة مستقلة تحقن مساراً مزدوجاً من ستة عشر شعار عميل كصور CSS خلفية مؤجّلة مع حركة keyframe، فيتحرّك بلا استنزاف التخطيط ويعمل بلا JavaScript. ولأن الاستضافة الإنتاجية بطيئة، تُؤجَّل حمولات الصور وتُفكّ قبل الرسم، وتحقّقت من كل شاشة بدقة 1920×1080 و390×844 مع بوابات آلية لكشف الإطارات الفارغة وتسريب البيانات الشخصية.',
            'The tracking layout was rebuilt against the WP-Cargo data model so every field the API returns is now surfaced: a status banner, an origin/destination/carrier info grid, the full cargo row, a multi-package table with per-package dimensions and weight, a shipper/receiver column pair and a chronological shipment-history table — the whole result wrapped in a print container. The partners marquee is a dedicated plugin that injects a double-row track of sixteen client logos as lazily-deferred CSS background images with a CSS keyframe drift, so it animates continuously without layout thrash and degrades cleanly when JavaScript is absent. Because the production host is slow, image payloads are deferred and decoded before paint, and every screen was verified at 1920×1080 and 390×844 with automated blank-frame and PII-leak gates.',
            'مطور ويب شامل — إعادة هيكلة قالب التتبّع، وربط بيانات WP-Cargo، وإضافة شريط الشركاء، وتنسيق RTL، وضبط الأداء، وضمان الجودة القائم على اللقطات',
            'Full-Stack Developer — tracking template refactor, WP-Cargo data mapping, partners marquee plugin, RTL styling, performance tuning and capture-based QA',
            'كان أصعب قيد هو خادم لا يكمل التحميل أبداً: لم يكتمل حدث جاهزية المستند خلال 120 ثانية، وعلقت طلبات صور فردية 30–60 ثانية، فأنتج خط لقطات ساذج صفحات نصف مرسومة. حُلّت المشكلة بقياس هدوء الشبكة بدل الوثوق بحدث التحميل، وتأجيل كل صورة غير حرجة، وإجبار فكّ الشعارات الستة عشر قبل اللقطة، وربط كل إطار بفحص بكسلات مفكوكة بدل اكتمال الطلب. والمعضلة الثانية كانت خصوصية انتقائية: يجب ألا يظهر اسم المستلم وعنوانه ورقمه في دراسة حالة منشورة مع بقاء سجل التتبّع كاملاً ظاهراً، لذا اقتصر التمويه على عقدة واحدة، ثم أكّد فحص آلي عدم تسرّب قيم المستلم في أي موضع آخر من الصفحة.',
            'The hardest constraint was a host that never finishes loading. The document-ready event could not complete within 120 seconds and individual image requests hung for 30–60 seconds, so a naive screenshot pipeline produced half-painted pages. Solved it by measuring network quiescence instead of trusting the load event, deferring every non-critical image, force-decoding the sixteen marquee logos before capture and gating each frame on a decoded-pixel check rather than on request completion. The second dilemma was selective privacy: the receiver''s name, street address and phone number must never appear in a published case study while the rest of the tracking record stays fully visible, so the masking step is scoped to a single node and an automated scan then asserts the receiver values do not leak anywhere else in the DOM.',
            'أُطلق موقع حيّ لبوابة تتبّع عربية يتحول فيه أي رقم شحنة إلى سجل كامل قابل للطباعة، مع شريط شركاء يعرض الشعارات الستة عشر في حركة مستمرة على سطح المكتب والجوال معاً. تم التحقق من البداية للنهاية على شحنة حيّة (تم التسليم، مع ظهور المنشأ والوجهة والناقل والشحونة والطرود والتاريخ الكامل)، وتأكيد طبع وفكّ ستة عشر شعاراً من ستة عشر بدقة 1920×1080 و390×844، والتقاط مجموعة لقطات موثّقة بصفر إطارات فارغة وصفر صور معطوبة وصفر تجاوز أفقي، والتحقق من بقاء بيانات المستلم مموّهة بلا تسريب.',
            'Shipped a live Arabic tracking portal where any consignment resolves to a complete, print-ready record, and a partners marquee that presents all sixteen client logos in continuous motion on desktop and mobile alike. Verified end-to-end on a live consignment (delivered, with origin, destination, carrier, cargo, packages and full history all rendering), confirmed sixteen of sixteen logos painted and decoded on both 1920×1080 and 390×844, captured a documented screenshot set with zero blank frames, zero broken images and zero horizontal overflow, and validated that the receiver data stayed masked with no PII leakage.',
            '["WordPress", "WooCommerce", "PHP 8.2", "WP-Cargo", "Elementor Pro", "Polylang", "TranslatePress", "jQuery", "MySQL", "CSS Grid & Flexbox", "CSS At-Rules"]'::jsonb,
            'https://arabiatradingco.com/ar/',
            '',
            '',
            'live',
            '/portfolio/projects/atco-tracking-portal/cover.png',
            true,
            true,
            1,
            ARRAY['PHP', 'JavaScript', 'HTML', 'CSS', 'SQL'],
            ARRAY['WordPress', 'WooCommerce', 'Elementor Pro', 'WP-Cargo', 'Polylang'],
            ARRAY['MySQL', 'WP-CLI', 'Playwright', 'Hyperframes', 'WP Fastest Cache', 'WP Smush'],
            ARRAY['Web App', 'Arabic RTL', 'Logistics Portal', 'Responsive Web', 'Print Ready']
        ) RETURNING id INTO v_project_id;
    ELSE
        UPDATE public.projects SET
            title_ar = 'الشركة العربية للتجارة — بوابة تتبّع الشحنات الحيّة وشريط الشركاء',
            title_en = 'ATCo — Live Shipment Tracking Portal & Partners Marquee',
            summary_ar = 'منصة WordPress/WooCommerce إنتاجية لمجموعة استيراد وتصدير، موسّعة ببوابة تتبّع شحنات حيّة تحوّل أي رقم شحنة إلى حالة كاملة وتواريخ وشحونة وسجلّات شاحن ومستلم، إضافة إلى شريط شركاء RTL لا نهائي يعرض ستة عشر شعار عميل على صفين — وكلاهما يعمل على واجهة الشركة العربية الحيّة.',
            summary_en = 'A production WordPress/WooCommerce platform for an import-export group, extended with a live shipment-tracking portal that resolves any consignment number into full status, dates, cargo and shipper/receiver records, plus an infinite RTL partners marquee that cycles sixteen client logos across two rows — both served from the company''s live Arabic storefront.',
            problem_ar = 'كان العملاء الذين يتتبّعون شحنة يواجهون صفحة لا تُعيد سوى سطر حالة مجرّد: تواريخ الشحن وتفاصيل الشحونة وأبعاد الطرود وكتل الشاحن والمستلم كانت مفقودة صامتة، فانتهى كل استفسار إلى مكالمة هاتفية أو رسالة واتساب. وبالتوازي، كانت شعارات الشركاء الستة عشر مصفوفة في صف ثابت لا يظهر بشكل صحيح إلا على الشاشات الكبيرة، فينقطع على الجوال ولا يعكس أبداً اتّساع قاعدة العملاء.',
            problem_en = 'Customers tracking a consignment hit a page that returned only a bare status line: shipment dates, cargo details, package dimensions and the shipper/receiver blocks were silently missing, so every enquiry fell back to a phone call or WhatsApp message. In parallel, the company''s sixteen partner logos sat as a static row that only displayed correctly on large screens, cutting off on mobile and never signalling the breadth of the client base.',
            goal_ar = 'تسليم بوابة عربية حيّة واحدة (1) تُعرض نتيجة تتبّع كاملة قابلة للطباعة لأي رقم شحنة — الحالة والمنشأ والوجهة والناقل والتواريخ والشحونة والطرود والطرفان، (2) وتصمد أمام الاستضافة المشتركة البطيئة ومنظومة التحميل الكسول، (3) وتعرض الشعارات الستة عشر كشريط RTL متواصل يبقى مقروءاً من 1920 بكسل حتى 390 بكسل، (4) وتُنشر دون كسر دفع WooCommerce القائم ولا التوجيه ثنائي اللغة.',
            goal_en = 'Deliver one live Arabic portal that (1) renders a complete, print-ready tracking result for any consignment number — status, origin, destination, carrier, dates, cargo, packages and both parties, (2) survives the company''s slow shared hosting and its lazy-load stack, (3) presents all sixteen partner logos in a continuous RTL marquee that stays legible from 1920px down to 390px, and (4) ships without breaking the existing WooCommerce checkout or the bilingual routing.',
            solution_ar = 'أُعيد بناء تصميم التتبّع وفق نموذج بيانات WP-Cargo بحيث أصبح كل حقل تعيده الواجهة ظاهراً: شريط الحالة، وشبكة معلومات المنشأ والوجهة والناقل، وصف الشحونة الكامل، وجدول طرود متعدّد الأبعاد والوزن لكل طرد، وعمودا الشاحن والمستلم، وجدول تاريخ شحن زمني — مع تغليف النتيجة كاملة في حاوية طباعة. وشريط الشركاء إضافة مستقلة تحقن مساراً مزدوجاً من ستة عشر شعار عميل كصور CSS خلفية مؤجّلة مع حركة keyframe، فيتحرّك بلا استنزاف التخطيط ويعمل بلا JavaScript. ولأن الاستضافة الإنتاجية بطيئة، تُؤجَّل حمولات الصور وتُفكّ قبل الرسم، وتحقّقت من كل شاشة بدقة 1920×1080 و390×844 مع بوابات آلية لكشف الإطارات الفارغة وتسريب البيانات الشخصية.',
            solution_en = 'The tracking layout was rebuilt against the WP-Cargo data model so every field the API returns is now surfaced: a status banner, an origin/destination/carrier info grid, the full cargo row, a multi-package table with per-package dimensions and weight, a shipper/receiver column pair and a chronological shipment-history table — the whole result wrapped in a print container. The partners marquee is a dedicated plugin that injects a double-row track of sixteen client logos as lazily-deferred CSS background images with a CSS keyframe drift, so it animates continuously without layout thrash and degrades cleanly when JavaScript is absent. Because the production host is slow, image payloads are deferred and decoded before paint, and every screen was verified at 1920×1080 and 390×844 with automated blank-frame and PII-leak gates.',
            role_ar = 'مطور ويب شامل — إعادة هيكلة قالب التتبّع، وربط بيانات WP-Cargo، وإضافة شريط الشركاء، وتنسيق RTL، وضبط الأداء، وضمان الجودة القائم على اللقطات',
            role_en = 'Full-Stack Developer — tracking template refactor, WP-Cargo data mapping, partners marquee plugin, RTL styling, performance tuning and capture-based QA',
            challenges_ar = 'كان أصعب قيد هو خادم لا يكمل التحميل أبداً: لم يكتمل حدث جاهزية المستند خلال 120 ثانية، وعلقت طلبات صور فردية 30–60 ثانية، فأنتج خط لقطات ساذج صفحات نصف مرسومة. حُلّت المشكلة بقياس هدوء الشبكة بدل الوثوق بحدث التحميل، وتأجيل كل صورة غير حرجة، وإجبار فكّ الشعارات الستة عشر قبل اللقطة، وربط كل إطار بفحص بكسلات مفكوكة بدل اكتمال الطلب. والمعضلة الثانية كانت خصوصية انتقائية: يجب ألا يظهر اسم المستلم وعنوانه ورقمه في دراسة حالة منشورة مع بقاء سجل التتبّع كاملاً ظاهراً، لذا اقتصر التمويه على عقدة واحدة، ثم أكّد فحص آلي عدم تسرّب قيم المستلم في أي موضع آخر من الصفحة.',
            challenges_en = 'The hardest constraint was a host that never finishes loading. The document-ready event could not complete within 120 seconds and individual image requests hung for 30–60 seconds, so a naive screenshot pipeline produced half-painted pages. Solved it by measuring network quiescence instead of trusting the load event, deferring every non-critical image, force-decoding the sixteen marquee logos before capture and gating each frame on a decoded-pixel check rather than on request completion. The second dilemma was selective privacy: the receiver''s name, street address and phone number must never appear in a published case study while the rest of the tracking record stays fully visible, so the masking step is scoped to a single node and an automated scan then asserts the receiver values do not leak anywhere else in the DOM.',
            results_ar = 'أُطلق موقع حيّ لبوابة تتبّع عربية يتحول فيه أي رقم شحنة إلى سجل كامل قابل للطباعة، مع شريط شركاء يعرض الشعارات الستة عشر في حركة مستمرة على سطح المكتب والجوال معاً. تم التحقق من البداية للنهاية على شحنة حيّة (تم التسليم، مع ظهور المنشأ والوجهة والناقل والشحونة والطرود والتاريخ الكامل)، وتأكيد طبع وفكّ ستة عشر شعاراً من ستة عشر بدقة 1920×1080 و390×844، والتقاط مجموعة لقطات موثّقة بصفر إطارات فارغة وصفر صور معطوبة وصفر تجاوز أفقي، والتحقق من بقاء بيانات المستلم مموّهة بلا تسريب.',
            results_en = 'Shipped a live Arabic tracking portal where any consignment resolves to a complete, print-ready record, and a partners marquee that presents all sixteen client logos in continuous motion on desktop and mobile alike. Verified end-to-end on a live consignment (delivered, with origin, destination, carrier, cargo, packages and full history all rendering), confirmed sixteen of sixteen logos painted and decoded on both 1920×1080 and 390×844, captured a documented screenshot set with zero blank frames, zero broken images and zero horizontal overflow, and validated that the receiver data stayed masked with no PII leakage.',
            tech_stack = '["WordPress", "WooCommerce", "PHP 8.2", "WP-Cargo", "Elementor Pro", "Polylang", "TranslatePress", "jQuery", "MySQL", "CSS Grid & Flexbox", "CSS At-Rules"]'::jsonb,
            live_url = 'https://arabiatradingco.com/ar/',
            github_url = '',
            demo_video_url = '',
            project_status = 'live',
            image_url = '/portfolio/projects/atco-tracking-portal/cover.png',
            is_featured = true,
            is_published = true,
            sort_order = 1,
            project_languages = ARRAY['PHP', 'JavaScript', 'HTML', 'CSS', 'SQL'],
            project_frameworks = ARRAY['WordPress', 'WooCommerce', 'Elementor Pro', 'WP-Cargo', 'Polylang'],
            project_tools = ARRAY['MySQL', 'WP-CLI', 'Playwright', 'Hyperframes', 'WP Fastest Cache', 'WP Smush'],
            project_platforms = ARRAY['Web App', 'Arabic RTL', 'Logistics Portal', 'Responsive Web', 'Print Ready']
        WHERE id = v_project_id;
    END IF;

    DELETE FROM public.project_images WHERE project_id = v_project_id;

    INSERT INTO public.project_images (project_id, image_url, alt_en, alt_ar, caption_en, caption_ar, sort_order) VALUES
    (v_project_id, '/portfolio/projects/atco-tracking-portal/cover.png', 'Arabic Storefront Homepage Hero', 'الواجهة الترحيبية للموقع العربي', 'RTL hero with the ATCo identity and primary navigation', 'واجهة RTL تحمل هوية الشركة العربية للتجارة والقائمة الرئيسية', 1),
    (v_project_id, '/portfolio/projects/atco-tracking-portal/01-home.png', 'Homepage Import & Export Showcase', 'قسم الاستيراد والتصدير في الرئيسية', 'Trade and logistics service cards leading into the portal', 'بطاقات خدمات التجارة واللوجستيات الموصلة إلى البوابة', 2),
    (v_project_id, '/portfolio/projects/atco-tracking-portal/02-features.png', 'Import & Export Services Grid', 'شبكة خدمات الاستيراد والتصدير', 'Service catalogue covering import, export, marketing and logistics', 'كتالوج الخدمات الذي يغطي الاستيراد والتصدير والتسويق والخدمات اللوجستية', 3),
    (v_project_id, '/portfolio/projects/atco-tracking-portal/03-search-filter.png', 'Partners Marquee — Sixteen Client Logos', 'شريط الشركاء — ستة عشر شعار عميل', 'Continuous RTL marquee cycling sixteen partner logos across two rows', 'شريط RTL متواصل يبدّل ستة عشر شعار شريك على صفين', 4),
    (v_project_id, '/portfolio/projects/atco-tracking-portal/04-details.png', 'Shipment Details Record', 'سجل تفاصيل الشحنة', 'Status banner, origin/destination/carrier grid and full cargo record', 'شريط الحالة وشبكة المنشأ والوجهة والناقل وسجل الشحونة الكامل', 5),
    (v_project_id, '/portfolio/projects/atco-tracking-portal/05-action.png', 'Shipment Tracking Lookup', 'الاستعلام عن شحنة', 'Tracking lookup where any consignment number resolves to a full record', 'استعلام التتبّع حيث يتحول أي رقم شحنة إلى سجل كامل', 6),
    (v_project_id, '/portfolio/projects/atco-tracking-portal/06-admin.png', 'Contact & Enquiry Section', 'قسم التواصل والاستفسار', 'Enquiry section and footer navigation closing the portal experience', 'قسم الاستفسار وقائمة التذييل التي تُغلق تجربة البوابة', 7),
    (v_project_id, '/portfolio/projects/atco-tracking-portal/07-history.png', 'Shipment History Timeline', 'الجدول الزمني لتاريخ الشحن', 'Chronological shipment history with location, status and notes', 'تاريخ شحن زمني يعرض الموقع والحالة والملاحظات', 8);

END $$;

-- 2. Rawasikh Al Quwa Contracting
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
            ARRAY['TypeScript', 'HTML5', 'CSS3'],
            ARRAY['React 18', 'Vite', 'Lucide React'],
            ARRAY['Vite', 'TypeScript', 'ESLint', 'Schema.org JSON-LD', 'Modern CSS Variables'],
            ARRAY['Web App', 'Corporate Showcase', 'Contracting Portal', 'Responsive Web']
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

-- 3. KAND Corporate Group
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

-- 4. Qarmzi Drama & Production Series
DO $$
DECLARE
    v_project_id uuid;
BEGIN
    SELECT id INTO v_project_id FROM public.projects WHERE slug = 'qarmzi-series' LIMIT 1;

    IF v_project_id IS NULL THEN
        INSERT INTO public.projects (
            slug,
            title_ar, title_en,
            summary_ar, summary_en,
            problem_ar, problem_en,
            goal_ar, goal_en,
            solution_ar, solution_en,
            role_ar, role_en,
            challenges_ar, challenges_en,
            results_ar, results_en,
            tech_stack,
            live_url,
            github_url,
            demo_video_url,
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
            'qarmzi-series',
            'قرمزي — منصة عربية لمشاهدة المسلسلات والأفلام',
            'Qarmzi — Arabic Series & Movie Streaming Platform',
            'قالب ووردبريس عربي مخصص لمنصة مسلسلات وأفلام: هيكل حقيقي يربط المسلسل بالموسم بالحلقة، وصفحات مشاهدة بمبدّل سيرفرات متعددة، وبحث فوري، وقسم أخبار، ولوحة تحكم كاملة. صُمم بواجهة RTL من أول بكسل وهُندس ليبقى كتالوج غني بالوسائط سريعاً.',
            'A custom Arabic-first WordPress theme for a series and movie streaming catalogue: a real series → season → episode hierarchy, multi-server watch pages, instant search, editorial news and a full admin dashboard. Built for RTL reading from the first pixel and engineered to keep a media-heavy catalogue fast.',
            'جمهور المشاهدة العربي يتوقع تسلسلاً واضحاً: مسلسل ثم موسم ثم حلقة. لكن قوالب ووردبريس الجاهزة تسطّح كل شيء في مقالات منفصلة، فيضطر المحرر لتكرار البيانات وتفقد الصفحات سياقها في محركات البحث. أضف إلى ذلك تعقيد الطباعة العربية RTL، والبوسترات المستضافة خارجياً، وتعدد سيرفرات المشاهدة لكل حلقة، فتنهار سهولة الإدارة.',
            'Arabic streaming audiences expect a clear hierarchy: series, then season, then episode. Generic WordPress themes flatten everything into posts, forcing editors to duplicate metadata, break navigation and lose SEO context. Add RTL typography, remotely hosted posters and several embed servers per episode, and the editorial workflow collapses.',
            'بناء قالب مخصص (1) يمثل المسلسلات والمواسم والحلقات كمحتوى مترابط، (2) ويقدم مسارات عربية RTL نظيفة للكتالوج وصفحات المسلسل والموسم والمشاهدة، (3) ويتيح تبديل سيرفرات المشاهدة دون فقدان السياق، (4) ويحافظ على سرعة البوسترات والصور المصغرة عبر الكاش، (5) ويمنح المحررين لوحة تحكم ووردبريس تطابق هيكل المحتوى.',
            'Ship a custom theme that (1) models series, seasons and episodes as connected content, (2) serves clean Arabic RTL routes for the catalogue, series, season and watch pages, (3) lets viewers switch between embed servers without losing context, (4) keeps posters and thumbnails cached and fast, and (5) gives editors a WordPress dashboard that matches the content model.',
            'طُوّر قالب ووردبريس 7 مخصص (krz1) بأنواع محتوى خاصة للمسلسل والموسم والفيديو، وأحد عشر تصنيفاً يغطي النوع والفنان والمخرج والكاتب وسنة الإصدار والجودة والدولة واللغة والإنتاج والجوائز وفريق العمل، مع طبقة بيانات series_id/season_id تربط كل حلقة بموسمها. قوالب مخصصة تعرض الرئيسية وكتالوج المسلسلات التركية وتفاصيل المسلسل والموسم وصفحة المشاهدة والبحث والتواصل. قالب المشاهدة يبدّل سيرفرات التضمين في نفس الصفحة، ويعرض بيانات الحلقة ويولّد VideoObject المنظم؛ ويضيف القالب كاش الصور المصغرة والـ sprites وخطافات تفريغ الكاش وتكامل Rank Math SEO، بينما تحمل خطوط Zain وLalezar وخط عرض مخصص الهوية العربية.',
            'Built a dedicated WordPress 7 theme (krz1) with custom post types for series, season and video, eleven taxonomies covering genre, actor, director, writer, release year, quality, country, language, production, awards and assemblies, and a series_id/season_id meta layer that links every episode to its parent season. Custom templates render the homepage, Turkish-series catalogue, series detail, season view, watch page, search and contact. The watch template switches between embed servers in place, exposes episode metadata and emits VideoObject structured data; the theme adds sprite and thumbnail caching, cache-purge hooks and Rank Math SEO integration, while Zain, Lalezar and a custom display face carry the Arabic typography.',
            'مطور قالب ووردبريس ومهندس ويب شامل',
            'WordPress Theme Developer & Full-Stack Engineer',
            'كان التحدي الأصعب في الهيكل: ووردبريس يخزن الحلقات كمقالات مسطحة، فاضطر القالب لإعادة بناء تسلسل المسلسل ← الموسم ← الحلقة وقت الاستعلام، والحفاظ على روابط مقروءة تحت /series/ و/season/، مع استمرارية التنقل بين الحلقات المتجاورة. فوق ذلك، قد تشير كل حلقة إلى سيرفرات تضمين وصور خارجية مختلفة، لذا كان على المشغل والصور المصغرة والكاش أن تتعامل بمرونة عند تعذر أي مصدر — دون إبطاء الكتالوج العربي.',
            'The hard part was the hierarchy: WordPress stores episodes as flat posts, so the theme had to reconstruct series → season → episode at query time, keep permalinks readable under /series/ and /season/, and preserve navigation between adjacent episodes. On top of that, each episode can point to different embed servers and remote artwork, so the player, thumbnails and caches all had to degrade gracefully when a source is unavailable — without slowing the RTL catalogue.',
            'تم تسليم كتالوج عربي فعّال يضم 4 مسلسلات و5 مواسم و7 صفحات مشاهدة للحلقات و20 فيلماً و17 خبراً، منظمة عبر 11 تصنيفاً مخصصاً وتُدار من لوحة ووردبريس مخصصة. صفحات الحلقات تعرض مشغلاً متعدد السيرفرات، وصفحات المسلسلات تكشف المواسم والحلقات، والبحث يعيد نتائج الكتالوج فوراً.',
            'Delivered a working Arabic streaming catalogue with 4 series, 5 seasons, 7 episode watch pages, 20 film entries and 17 news articles, organised by 11 custom taxonomies and managed from a customised WordPress dashboard. Episode pages render a multi-server player, series pages expose seasons and episodes, and search returns catalogue results instantly.',
            '["WordPress 7.0", "PHP 8.2", "jQuery 3.6", "MariaDB", "HTML5", "CSS3", "Font Awesome 5 Pro", "Rank Math SEO", "UpdraftPlus"]'::jsonb,
            '',
            '',
            '',
            'local_demo',
            '/portfolio/projects/qarmzi-series/cover.png',
            true,
            true,
            1,
            ARRAY['PHP', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
            ARRAY['WordPress 7.0', 'Custom WordPress Theme', 'jQuery 3.6', 'Font Awesome 5 Pro'],
            ARRAY['MariaDB 10.4', 'Apache 2.4', 'Rank Math SEO', 'UpdraftPlus', 'WP File Manager', 'Quick Featured Images', 'Instant Indexing'],
            ARRAY['Streaming & VOD', 'WordPress CMS', 'Arabic RTL', 'Responsive Web', 'Admin Dashboard']
        ) RETURNING id INTO v_project_id;
    ELSE
        UPDATE public.projects SET
            title_ar = 'قرمزي — منصة عربية لمشاهدة المسلسلات والأفلام',
            title_en = 'Qarmzi — Arabic Series & Movie Streaming Platform',
            summary_ar = 'قالب ووردبريس عربي مخصص لمنصة مسلسلات وأفلام: هيكل حقيقي يربط المسلسل بالموسم بالحلقة، وصفحات مشاهدة بمبدّل سيرفرات متعددة، وبحث فوري، وقسم أخبار، ولوحة تحكم كاملة. صُمم بواجهة RTL من أول بكسل وهُندس ليبقى كتالوج غني بالوسائط سريعاً.',
            summary_en = 'A custom Arabic-first WordPress theme for a series and movie streaming catalogue: a real series → season → episode hierarchy, multi-server watch pages, instant search, editorial news and a full admin dashboard. Built for RTL reading from the first pixel and engineered to keep a media-heavy catalogue fast.',
            problem_ar = 'جمهور المشاهدة العربي يتوقع تسلسلاً واضحاً: مسلسل ثم موسم ثم حلقة. لكن قوالب ووردبريس الجاهزة تسطّح كل شيء في مقالات منفصلة، فيضطر المحرر لتكرار البيانات وتفقد الصفحات سياقها في محركات البحث. أضف إلى ذلك تعقيد الطباعة العربية RTL، والبوسترات المستضافة خارجياً، وتعدد سيرفرات المشاهدة لكل حلقة، فتنهار سهولة الإدارة.',
            problem_en = 'Arabic streaming audiences expect a clear hierarchy: series, then season, then episode. Generic WordPress themes flatten everything into posts, forcing editors to duplicate metadata, break navigation and lose SEO context. Add RTL typography, remotely hosted posters and several embed servers per episode, and the editorial workflow collapses.',
            goal_ar = 'بناء قالب مخصص (1) يمثل المسلسلات والمواسم والحلقات كمحتوى مترابط، (2) ويقدم مسارات عربية RTL نظيفة للكتالوج وصفحات المسلسل والموسم والمشاهدة، (3) ويتيح تبديل سيرفرات المشاهدة دون فقدان السياق، (4) ويحافظ على سرعة البوسترات والصور المصغرة عبر الكاش، (5) ويمنح المحررين لوحة تحكم ووردبريس تطابق هيكل المحتوى.',
            goal_en = 'Ship a custom theme that (1) models series, seasons and episodes as connected content, (2) serves clean Arabic RTL routes for the catalogue, series, season and watch pages, (3) lets viewers switch between embed servers without losing context, (4) keeps posters and thumbnails cached and fast, and (5) gives editors a WordPress dashboard that matches the content model.',
            solution_ar = 'طُوّر قالب ووردبريس 7 مخصص (krz1) بأنواع محتوى خاصة للمسلسل والموسم والفيديو، وأحد عشر تصنيفاً يغطي النوع والفنان والمخرج والكاتب وسنة الإصدار والجودة والدولة واللغة والإنتاج والجوائز وفريق العمل، مع طبقة بيانات series_id/season_id تربط كل حلقة بموسمها. قوالب مخصصة تعرض الرئيسية وكتالوج المسلسلات التركية وتفاصيل المسلسل والموسم وصفحة المشاهدة والبحث والتواصل. قالب المشاهدة يبدّل سيرفرات التضمين في نفس الصفحة، ويعرض بيانات الحلقة ويولّد VideoObject المنظم؛ ويضيف القالب كاش الصور المصغرة والـ sprites وخطافات تفريغ الكاش وتكامل Rank Math SEO، بينما تحمل خطوط Zain وLalezar وخط عرض مخصص الهوية العربية.',
            solution_en = 'Built a dedicated WordPress 7 theme (krz1) with custom post types for series, season and video, eleven taxonomies covering genre, actor, director, writer, release year, quality, country, language, production, awards and assemblies, and a series_id/season_id meta layer that links every episode to its parent season. Custom templates render the homepage, Turkish-series catalogue, series detail, season view, watch page, search and contact. The watch template switches between embed servers in place, exposes episode metadata and emits VideoObject structured data; the theme adds sprite and thumbnail caching, cache-purge hooks and Rank Math SEO integration, while Zain, Lalezar and a custom display face carry the Arabic typography.',
            role_ar = 'مطور قالب ووردبريس ومهندس ويب شامل',
            role_en = 'WordPress Theme Developer & Full-Stack Engineer',
            challenges_ar = 'كان التحدي الأصعب في الهيكل: ووردبريس يخزن الحلقات كمقالات مسطحة، فاضطر القالب لإعادة بناء تسلسل المسلسل ← الموسم ← الحلقة وقت الاستعلام، والحفاظ على روابط مقروءة تحت /series/ و/season/، مع استمرارية التنقل بين الحلقات المتجاورة. فوق ذلك، قد تشير كل حلقة إلى سيرفرات تضمين وصور خارجية مختلفة، لذا كان على المشغل والصور المصغرة والكاش أن تتعامل بمرونة عند تعذر أي مصدر — دون إبطاء الكتالوج العربي.',
            challenges_en = 'The hard part was the hierarchy: WordPress stores episodes as flat posts, so the theme had to reconstruct series → season → episode at query time, keep permalinks readable under /series/ and /season/, and preserve navigation between adjacent episodes. On top of that, each episode can point to different embed servers and remote artwork, so the player, thumbnails and caches all had to degrade gracefully when a source is unavailable — without slowing the RTL catalogue.',
            results_ar = 'تم تسليم كتالوج عربي فعّال يضم 4 مسلسلات و5 مواسم و7 صفحات مشاهدة للحلقات و20 فيلماً و17 خبراً، منظمة عبر 11 تصنيفاً مخصصاً وتُدار من لوحة ووردبريس مخصصة. صفحات الحلقات تعرض مشغلاً متعدد السيرفرات، وصفحات المسلسلات تكشف المواسم والحلقات، والبحث يعيد نتائج الكتالوج فوراً.',
            results_en = 'Delivered a working Arabic streaming catalogue with 4 series, 5 seasons, 7 episode watch pages, 20 film entries and 17 news articles, organised by 11 custom taxonomies and managed from a customised WordPress dashboard. Episode pages render a multi-server player, series pages expose seasons and episodes, and search returns catalogue results instantly.',
            tech_stack = '["WordPress 7.0", "PHP 8.2", "jQuery 3.6", "MariaDB", "HTML5", "CSS3", "Font Awesome 5 Pro", "Rank Math SEO", "UpdraftPlus"]'::jsonb,
            live_url = '',
            github_url = '',
            demo_video_url = '',
            project_status = 'local_demo',
            image_url = '/portfolio/projects/qarmzi-series/cover.png',
            is_featured = true,
            is_published = true,
            sort_order = 1,
            project_languages = ARRAY['PHP', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
            project_frameworks = ARRAY['WordPress 7.0', 'Custom WordPress Theme', 'jQuery 3.6', 'Font Awesome 5 Pro'],
            project_tools = ARRAY['MariaDB 10.4', 'Apache 2.4', 'Rank Math SEO', 'UpdraftPlus', 'WP File Manager', 'Quick Featured Images', 'Instant Indexing'],
            project_platforms = ARRAY['Streaming & VOD', 'WordPress CMS', 'Arabic RTL', 'Responsive Web', 'Admin Dashboard']
        WHERE id = v_project_id;
    END IF;

    DELETE FROM public.project_images WHERE project_id = v_project_id;

    INSERT INTO public.project_images (project_id, image_url, alt_en, alt_ar, caption_en, caption_ar, sort_order) VALUES
    (v_project_id, '/portfolio/projects/qarmzi-series/cover.png', 'Qarmzi Homepage Hero and Navigation', 'الواجهة الرئيسية لموقع قرمزي مع القائمة', 'RTL hero with brand navigation, instant search access and featured series', 'واجهة عربية RTL مع قائمة العلامة والوصول للبحث وعرض المسلسلات المميزة', 1),
    (v_project_id, '/portfolio/projects/qarmzi-series/01-home.png', 'Latest Series Grid on the Homepage', 'شبكة أحدث المسلسلات في الرئيسية', 'Poster-driven series grid with episode badges and direct watch links', 'شبكة مسلسلات مبنية على البوسترات مع شارات الحلقات وروابط مشاهدة مباشرة', 2),
    (v_project_id, '/portfolio/projects/qarmzi-series/02-features.png', 'Turkish Series Catalogue', 'كتالوج المسلسلات التركية', 'Full series listing with pagination and poster-led browsing', 'قائمة مسلسلات كاملة مع ترقيم صفحات وتصفح بصري بالبوسترات', 3),
    (v_project_id, '/portfolio/projects/qarmzi-series/03-search-filter.png', 'Instant Search Results', 'نتائج البحث الفوري', 'Search results for a series query, rendered from the live catalogue', 'نتائج البحث عن مسلسل، معروضة من الكتالوج الحقيقي', 4),
    (v_project_id, '/portfolio/projects/qarmzi-series/04-details.png', 'Series Detail with Seasons and Episodes', 'تفاصيل المسلسل مع المواسم والحلقات', 'Series hero, synopsis, season selection and episode grid in one view', 'هيرو المسلسل والقصة واختيار الموسم وشبكة الحلقات في عرض واحد', 5),
    (v_project_id, '/portfolio/projects/qarmzi-series/05-action.png', 'Contact Page and Direct Email Action', 'صفحة التواصل وإجراء البريد المباشر', 'Dedicated contact card with a direct email action', 'بطاقة تواصل مخصصة مع إجراء بريد إلكتروني مباشر', 6),
    (v_project_id, '/portfolio/projects/qarmzi-series/06-admin.png', 'WordPress Admin Dashboard', 'لوحة تحكم ووردبريس', 'Content dashboard for series, seasons, episodes, news and media', 'لوحة إدارة محتوى المسلسلات والمواسم والحلقات والأخبار والوسائط', 7);

END $$;

-- 5 & 6. ERP Dashboard & WooCommerce Platform

DO $$
DECLARE
    v_project_id uuid;
BEGIN
    -- 1. ERP Dashboard
    SELECT id INTO v_project_id FROM public.projects WHERE slug = 'erp-dashboard' LIMIT 1;
    IF v_project_id IS NULL THEN
        INSERT INTO public.projects (
            slug, title_ar, title_en, summary_ar, summary_en,
            problem_ar, problem_en, goal_ar, goal_en, solution_ar, solution_en,
            role_ar, role_en, challenges_ar, challenges_en, results_ar, results_en,
            tech_stack, live_url, project_status, image_url, is_featured, is_published, sort_order,
            project_languages, project_frameworks, project_tools, project_platforms
        ) VALUES (
            'erp-dashboard',
            'لوحة تحكم لإدارة موارد الشركة',
            'Custom ERP Dashboard',
            'لوحة تحكم قابلة للتطوير مبنية بـ Laravel لإدارة الموارد البشرية والمخزون.',
            'A scalable Laravel-based dashboard for managing HR and inventory.',
            'كان العميل يستخدم جداول إكسل متعددة ومنفصلة لإدارة البيانات، مما تسبب في تأخيرات تشغيلية شديدة.',
            'The client was using multiple disconnected Excel sheets to manage data, causing severe operational delays.',
            'مركزة العمليات في تطبيق ويب واحد آمن لتحسين الكفاءة.',
            'Centralize operations into a single, secure web application to improve efficiency.',
            'بناء خلفية Laravel قوية مع واجهة Tailwind CSS متجاوبة، مع ضمان الوصول الآمن بناءً على الأدوار.',
            'Built a robust Laravel backend with a responsive Tailwind CSS frontend, ensuring secure role-based access.',
            'مطور ويب شامل رئيسي',
            'Lead Full Stack Developer',
            'ترحيل البيانات القديمة بدون توقف النظام مع الحفاظ على سلامة البيانات.',
            'Migrating legacy data without downtime while maintaining data integrity.',
            'تقليل وقت إدخال البيانات بنسبة 40% وتحسين دقة التقارير عن طريق القضاء على الإدخالات المكررة.',
            'Reduced data entry time by 40% and improved reporting accuracy by eliminating duplicate entries.',
            '["Laravel", "PHP", "MySQL", "Tailwind CSS", "Alpine.js"]'::jsonb,
            '',
            'private',
            '/brand/social-preview.jpeg',
            true,
            true,
            9,
            ARRAY['PHP', 'JavaScript'],
            ARRAY['Laravel', 'Tailwind CSS', 'Alpine.js'],
            ARRAY['MySQL'],
            ARRAY['Web App', 'Admin Dashboard']
        ) RETURNING id INTO v_project_id;
    END IF;

    -- 2. WooCommerce Platform
    SELECT id INTO v_project_id FROM public.projects WHERE slug = 'woo-commerce-platform' LIMIT 1;
    IF v_project_id IS NULL THEN
        INSERT INTO public.projects (
            slug, title_ar, title_en, summary_ar, summary_en,
            problem_ar, problem_en, goal_ar, goal_en, solution_ar, solution_en,
            role_ar, role_en, challenges_ar, challenges_en, results_ar, results_en,
            tech_stack, live_url, project_status, image_url, is_featured, is_published, sort_order,
            project_languages, project_frameworks, project_tools, project_platforms
        ) VALUES (
            'woo-commerce-platform',
            'متجر ووكومرس عالي الأداء',
            'High-Volume WooCommerce Store',
            'منصة تجارة إلكترونية محسنة تتعامل مع آلاف الطلبات اليومية بدون أعطال.',
            'Optimized e-commerce platform handling thousands of daily orders without crashes.',
            'كان المتجر السابق يتعطل أثناء أحداث الزيارات العالية، مما أدى إلى فقدان المبيعات وإحباط العملاء.',
            'The previous store crashed during high traffic events, resulting in lost sales and frustrated customers.',
            'ضمان وقت تشغيل 99.9% وسرعة تحميل فائقة أثناء التخفيضات الترويجية.',
            'Ensure 99.9% uptime and lightning-fast load speeds during promotional sales.',
            'تنفيذ تخزين مؤقت متقدم باستخدام Redis، وتحسين استعلامات قاعدة البيانات البطيئة، وتطوير قالب خفيف مخصص.',
            'Implemented advanced caching with Redis, optimized slow database queries, and developed a custom lightweight theme.',
            'مهندس خلفية وأداء',
            'Backend & Performance Engineer',
            'موازنة منطق تسعير سلة التسوق الديناميكية مع التخزين المؤقت القوي على الخادم.',
            'Balancing dynamic cart pricing logic with aggressive server-side caching.',
            'زيادة معدل التحويل بنسبة 15% والقضاء على وقت التعطل تمامًا خلال مواسم الذروة.',
            'Increased conversion rate by 15% and eliminated downtime completely during peak seasons.',
            '["WordPress", "WooCommerce", "PHP", "Redis", "JavaScript"]'::jsonb,
            '',
            'live',
            '/brand/social-preview.jpeg',
            true,
            true,
            10,
            ARRAY['PHP', 'JavaScript'],
            ARRAY['WordPress', 'WooCommerce'],
            ARRAY['Redis'],
            ARRAY['Web App', 'E-Commerce']
        ) RETURNING id INTO v_project_id;
    END IF;
END $$;


NOTIFY pgrst, 'reload schema';

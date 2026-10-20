-- supabase/migrations/20261020130445_seed_atco_tracking_portal_project.sql

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

NOTIFY pgrst, 'reload schema';

-- supabase/migrations/20260615000400_seed_final_services.sql

DO $$
DECLARE
    v_id uuid;
BEGIN
    -- Disable all currently published services not in the new set (this safely preserves unrelated services but hides them)
    UPDATE public.services SET is_published = false;

    -- Service 1
    SELECT id INTO v_id FROM public.services WHERE title_en = 'Custom Web Applications' LIMIT 1;
    IF v_id IS NULL THEN
        -- try matching old name 'Custom Web Application Development'
        SELECT id INTO v_id FROM public.services WHERE title_en = 'Custom Web Application Development' LIMIT 1;
    END IF;
    
    IF v_id IS NULL THEN
        INSERT INTO public.services (title_en, title_ar, excerpt_en, excerpt_ar, description_en, description_ar, expected_result_en, expected_result_ar, icon, sort_order, is_published)
        VALUES ('Custom Web Applications', 'تطبيقات ويب مخصصة', 
                'I build custom web applications, SaaS platforms, booking systems, and internal tools tailored to real business workflows.', 
                'أبني تطبيقات ويب مخصصة، أنظمة SaaS، أنظمة حجوزات، وأدوات داخلية مصممة حسب احتياج العمل الفعلي.', 
                'I build custom web applications, SaaS platforms, booking systems, and internal tools tailored to real business workflows.', 
                'أبني تطبيقات ويب مخصصة، أنظمة SaaS، أنظمة حجوزات، وأدوات داخلية مصممة حسب احتياج العمل الفعلي.', 
                'A secure, scalable system that automates operations and saves your team hours of manual work.', 
                'نظام آمن وقابل للتوسع يساعد على أتمتة العمليات وتوفير ساعات من العمل اليدوي.', 
                'MonitorCog', 1, true);
    ELSE
        UPDATE public.services SET 
            title_en = 'Custom Web Applications', title_ar = 'تطبيقات ويب مخصصة', 
            excerpt_en = 'I build custom web applications, SaaS platforms, booking systems, and internal tools tailored to real business workflows.', 
            excerpt_ar = 'أبني تطبيقات ويب مخصصة، أنظمة SaaS، أنظمة حجوزات، وأدوات داخلية مصممة حسب احتياج العمل الفعلي.', 
            description_en = 'I build custom web applications, SaaS platforms, booking systems, and internal tools tailored to real business workflows.', 
            description_ar = 'أبني تطبيقات ويب مخصصة، أنظمة SaaS، أنظمة حجوزات، وأدوات داخلية مصممة حسب احتياج العمل الفعلي.', 
            expected_result_en = 'A secure, scalable system that automates operations and saves your team hours of manual work.', 
            expected_result_ar = 'نظام آمن وقابل للتوسع يساعد على أتمتة العمليات وتوفير ساعات من العمل اليدوي.', 
            icon = 'MonitorCog', sort_order = 1, is_published = true
        WHERE id = v_id;
    END IF;

    -- Service 2
    v_id := NULL;
    SELECT id INTO v_id FROM public.services WHERE title_en = 'E-Commerce Development & Optimization' LIMIT 1;
    IF v_id IS NULL THEN
        SELECT id INTO v_id FROM public.services WHERE title_en = 'E-Commerce Optimization' LIMIT 1;
    END IF;
    IF v_id IS NULL THEN
        INSERT INTO public.services (title_en, title_ar, excerpt_en, excerpt_ar, description_en, description_ar, expected_result_en, expected_result_ar, icon, sort_order, is_published)
        VALUES ('E-Commerce Development & Optimization', 'تطوير وتحسين المتاجر الإلكترونية', 
                'I develop and optimize e-commerce stores with product catalogs, carts, checkout flows, order management, and conversion-focused user experiences.', 
                'أطور وأحسن المتاجر الإلكترونية من خلال كتالوج منتجات، سلة شراء، مسار دفع، إدارة طلبات، وتجربة استخدام تساعد على زيادة المبيعات.', 
                'I develop and optimize e-commerce stores with product catalogs, carts, checkout flows, order management, and conversion-focused user experiences.', 
                'أطور وأحسن المتاجر الإلكترونية من خلال كتالوج منتجات، سلة شراء، مسار دفع، إدارة طلبات، وتجربة استخدام تساعد على زيادة المبيعات.', 
                'A smoother buying experience that increases conversions and reduces cart abandonment.', 
                'تجربة شراء أسهل تساعد على زيادة المبيعات وتقليل ترك السلة.', 
                'ShoppingBag', 2, true);
    ELSE
        UPDATE public.services SET 
            title_en = 'E-Commerce Development & Optimization', title_ar = 'تطوير وتحسين المتاجر الإلكترونية', 
            excerpt_en = 'I develop and optimize e-commerce stores with product catalogs, carts, checkout flows, order management, and conversion-focused user experiences.', 
            excerpt_ar = 'أطور وأحسن المتاجر الإلكترونية من خلال كتالوج منتجات، سلة شراء، مسار دفع، إدارة طلبات، وتجربة استخدام تساعد على زيادة المبيعات.', 
            description_en = 'I develop and optimize e-commerce stores with product catalogs, carts, checkout flows, order management, and conversion-focused user experiences.', 
            description_ar = 'أطور وأحسن المتاجر الإلكترونية من خلال كتالوج منتجات، سلة شراء، مسار دفع، إدارة طلبات، وتجربة استخدام تساعد على زيادة المبيعات.', 
            expected_result_en = 'A smoother buying experience that increases conversions and reduces cart abandonment.', 
            expected_result_ar = 'تجربة شراء أسهل تساعد على زيادة المبيعات وتقليل ترك السلة.', 
            icon = 'ShoppingBag', sort_order = 2, is_published = true
        WHERE id = v_id;
    END IF;

    -- Service 3
    v_id := NULL;
    SELECT id INTO v_id FROM public.services WHERE title_en = 'Admin Dashboards' LIMIT 1;
    IF v_id IS NULL THEN
        INSERT INTO public.services (title_en, title_ar, excerpt_en, excerpt_ar, description_en, description_ar, expected_result_en, expected_result_ar, icon, sort_order, is_published)
        VALUES ('Admin Dashboards', 'لوحات تحكم إدارية', 
                'I create clean admin dashboards for managing products, users, orders, reports, content, and business operations from one place.', 
                'أبني لوحات تحكم منظمة لإدارة المنتجات، المستخدمين، الطلبات، التقارير، المحتوى، والعمليات من مكان واحد.', 
                'I create clean admin dashboards for managing products, users, orders, reports, content, and business operations from one place.', 
                'أبني لوحات تحكم منظمة لإدارة المنتجات، المستخدمين، الطلبات، التقارير، المحتوى، والعمليات من مكان واحد.', 
                'Clear control over your business data, faster decisions, and easier daily management.', 
                'تحكم أوضح ببيانات العمل، قرارات أسرع، وإدارة يومية أسهل.', 
                'LayoutDashboard', 3, true);
    ELSE
        UPDATE public.services SET 
            title_en = 'Admin Dashboards', title_ar = 'لوحات تحكم إدارية', 
            excerpt_en = 'I create clean admin dashboards for managing products, users, orders, reports, content, and business operations from one place.', 
            excerpt_ar = 'أبني لوحات تحكم منظمة لإدارة المنتجات، المستخدمين، الطلبات، التقارير، المحتوى، والعمليات من مكان واحد.', 
            description_en = 'I create clean admin dashboards for managing products, users, orders, reports, content, and business operations from one place.', 
            description_ar = 'أبني لوحات تحكم منظمة لإدارة المنتجات، المستخدمين، الطلبات، التقارير، المحتوى، والعمليات من مكان واحد.', 
            expected_result_en = 'Clear control over your business data, faster decisions, and easier daily management.', 
            expected_result_ar = 'تحكم أوضح ببيانات العمل، قرارات أسرع، وإدارة يومية أسهل.', 
            icon = 'LayoutDashboard', sort_order = 3, is_published = true
        WHERE id = v_id;
    END IF;

    -- Service 4
    v_id := NULL;
    SELECT id INTO v_id FROM public.services WHERE title_en = 'API Development & Automation' LIMIT 1;
    IF v_id IS NULL THEN
        SELECT id INTO v_id FROM public.services WHERE title_en = 'API Development & Integration' LIMIT 1;
    END IF;
    IF v_id IS NULL THEN
        INSERT INTO public.services (title_en, title_ar, excerpt_en, excerpt_ar, description_en, description_ar, expected_result_en, expected_result_ar, icon, sort_order, is_published)
        VALUES ('API Development & Automation', 'تطوير واجهات API والأتمتة', 
                'I build and integrate REST APIs, payment gateways, WhatsApp services, CRMs, and third-party tools to automate business workflows.', 
                'أطور وأربط واجهات API، بوابات الدفع، خدمات واتساب، أنظمة العملاء، والأدوات الخارجية لأتمتة سير العمل.', 
                'I build and integrate REST APIs, payment gateways, WhatsApp services, CRMs, and third-party tools to automate business workflows.', 
                'أطور وأربط واجهات API، بوابات الدفع، خدمات واتساب، أنظمة العملاء، والأدوات الخارجية لأتمتة سير العمل.', 
                'Reliable automated data flow between systems, reducing manual entry and operational errors.', 
                'ربط آلي موثوق بين الأنظمة يقلل الإدخال اليدوي والأخطاء التشغيلية.', 
                'Workflow', 4, true);
    ELSE
        UPDATE public.services SET 
            title_en = 'API Development & Automation', title_ar = 'تطوير واجهات API والأتمتة', 
            excerpt_en = 'I build and integrate REST APIs, payment gateways, WhatsApp services, CRMs, and third-party tools to automate business workflows.', 
            excerpt_ar = 'أطور وأربط واجهات API، بوابات الدفع، خدمات واتساب، أنظمة العملاء، والأدوات الخارجية لأتمتة سير العمل.', 
            description_en = 'I build and integrate REST APIs, payment gateways, WhatsApp services, CRMs, and third-party tools to automate business workflows.', 
            description_ar = 'أطور وأربط واجهات API، بوابات الدفع، خدمات واتساب، أنظمة العملاء، والأدوات الخارجية لأتمتة سير العمل.', 
            expected_result_en = 'Reliable automated data flow between systems, reducing manual entry and operational errors.', 
            expected_result_ar = 'ربط آلي موثوق بين الأنظمة يقلل الإدخال اليدوي والأخطاء التشغيلية.', 
            icon = 'Workflow', sort_order = 4, is_published = true
        WHERE id = v_id;
    END IF;

    -- Service 5
    v_id := NULL;
    SELECT id INTO v_id FROM public.services WHERE title_en = 'Performance & Security Optimization' LIMIT 1;
    IF v_id IS NULL THEN
        INSERT INTO public.services (title_en, title_ar, excerpt_en, excerpt_ar, description_en, description_ar, expected_result_en, expected_result_ar, icon, sort_order, is_published)
        VALUES ('Performance & Security Optimization', 'تحسين الأداء والحماية', 
                'I improve website speed, fix technical issues, optimize code, and strengthen basic security for safer and faster web applications.', 
                'أحسن سرعة المواقع، أصلح المشاكل التقنية، أنظم الكود، وأقوي أساسيات الحماية لتطبيقات ويب أسرع وأكثر أمانًا.', 
                'I improve website speed, fix technical issues, optimize code, and strengthen basic security for safer and faster web applications.', 
                'أحسن سرعة المواقع، أصلح المشاكل التقنية، أنظم الكود، وأقوي أساسيات الحماية لتطبيقات ويب أسرع وأكثر أمانًا.', 
                'A faster, safer website that improves user trust, SEO performance, and system stability.', 
                'موقع أسرع وأكثر أمانًا يعزز ثقة المستخدم ويحسن الظهور في محركات البحث واستقرار النظام.', 
                'ShieldCheck', 5, true);
    ELSE
        UPDATE public.services SET 
            title_en = 'Performance & Security Optimization', title_ar = 'تحسين الأداء والحماية', 
            excerpt_en = 'I improve website speed, fix technical issues, optimize code, and strengthen basic security for safer and faster web applications.', 
            excerpt_ar = 'أحسن سرعة المواقع، أصلح المشاكل التقنية، أنظم الكود، وأقوي أساسيات الحماية لتطبيقات ويب أسرع وأكثر أمانًا.', 
            description_en = 'I improve website speed, fix technical issues, optimize code, and strengthen basic security for safer and faster web applications.', 
            description_ar = 'أحسن سرعة المواقع، أصلح المشاكل التقنية، أنظم الكود، وأقوي أساسيات الحماية لتطبيقات ويب أسرع وأكثر أمانًا.', 
            expected_result_en = 'A faster, safer website that improves user trust, SEO performance, and system stability.', 
            expected_result_ar = 'موقع أسرع وأكثر أمانًا يعزز ثقة المستخدم ويحسن الظهور في محركات البحث واستقرار النظام.', 
            icon = 'ShieldCheck', sort_order = 5, is_published = true
        WHERE id = v_id;
    END IF;

    -- Service 6
    v_id := NULL;
    SELECT id INTO v_id FROM public.services WHERE title_en = 'Business Websites & Landing Pages' LIMIT 1;
    IF v_id IS NULL THEN
        INSERT INTO public.services (title_en, title_ar, excerpt_en, excerpt_ar, description_en, description_ar, expected_result_en, expected_result_ar, icon, sort_order, is_published)
        VALUES ('Business Websites & Landing Pages', 'مواقع تعريفية وصفحات هبوط احترافية', 
                'I design and develop modern company websites, portfolios, and landing pages focused on trust, clarity, and lead generation.', 
                'أصمم وأطور مواقع شركات، بورتفوليوهات، وصفحات هبوط احترافية تركز على الثقة والوضوح وجذب العملاء.', 
                'I design and develop modern company websites, portfolios, and landing pages focused on trust, clarity, and lead generation.', 
                'أصمم وأطور مواقع شركات، بورتفوليوهات، وصفحات هبوط احترافية تركز على الثقة والوضوح وجذب العملاء.', 
                'A professional online presence that explains your offer clearly and turns visitors into potential clients.', 
                'حضور رقمي احترافي يشرح خدمتك بوضوح ويحوّل الزوار إلى عملاء محتملين.', 
                'Globe', 6, true);
    ELSE
        UPDATE public.services SET 
            title_en = 'Business Websites & Landing Pages', title_ar = 'مواقع تعريفية وصفحات هبوط احترافية', 
            excerpt_en = 'I design and develop modern company websites, portfolios, and landing pages focused on trust, clarity, and lead generation.', 
            excerpt_ar = 'أصمم وأطور مواقع شركات، بورتفوليوهات، وصفحات هبوط احترافية تركز على الثقة والوضوح وجذب العملاء.', 
            description_en = 'I design and develop modern company websites, portfolios, and landing pages focused on trust, clarity, and lead generation.', 
            description_ar = 'أصمم وأطور مواقع شركات، بورتفوليوهات، وصفحات هبوط احترافية تركز على الثقة والوضوح وجذب العملاء.', 
            expected_result_en = 'A professional online presence that explains your offer clearly and turns visitors into potential clients.', 
            expected_result_ar = 'حضور رقمي احترافي يشرح خدمتك بوضوح ويحوّل الزوار إلى عملاء محتملين.', 
            icon = 'Globe', sort_order = 6, is_published = true
        WHERE id = v_id;
    END IF;

END $$;

NOTIFY pgrst, 'reload schema';

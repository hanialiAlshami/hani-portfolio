-- supabase/migrations/20260615000500_seed_final_skills.sql

DO $$
DECLARE
    v_cat1_id uuid;
    v_cat2_id uuid;
    v_cat3_id uuid;
    v_cat4_id uuid;
    v_cat5_id uuid;
    v_skill_id uuid;
BEGIN
    -- 1. Unpublish all current categories and skills (soft delete)
    UPDATE public.skill_categories SET is_published = false;
    UPDATE public.skills SET is_published = false;

    -- ===========================
    -- CATEGORIES
    -- ===========================

    -- Cat 1
    SELECT id INTO v_cat1_id FROM public.skill_categories WHERE name_en = 'Frontend Development' LIMIT 1;
    IF v_cat1_id IS NULL THEN
        INSERT INTO public.skill_categories (name_en, name_ar, sort_order, is_published)
        VALUES ('Frontend Development', 'تطوير الواجهات الأمامية', 1, true) RETURNING id INTO v_cat1_id;
    ELSE
        UPDATE public.skill_categories SET name_ar = 'تطوير الواجهات الأمامية', sort_order = 1, is_published = true WHERE id = v_cat1_id;
    END IF;

    -- Cat 2
    SELECT id INTO v_cat2_id FROM public.skill_categories WHERE name_en = 'Backend Development' LIMIT 1;
    IF v_cat2_id IS NULL THEN
        INSERT INTO public.skill_categories (name_en, name_ar, sort_order, is_published)
        VALUES ('Backend Development', 'تطوير الواجهات الخلفية', 2, true) RETURNING id INTO v_cat2_id;
    ELSE
        UPDATE public.skill_categories SET name_ar = 'تطوير الواجهات الخلفية', sort_order = 2, is_published = true WHERE id = v_cat2_id;
    END IF;

    -- Cat 3
    SELECT id INTO v_cat3_id FROM public.skill_categories WHERE name_en = 'Databases & Backend Services' LIMIT 1;
    IF v_cat3_id IS NULL THEN
        -- check old name if exists
        SELECT id INTO v_cat3_id FROM public.skill_categories WHERE name_en LIKE '%Database%' LIMIT 1;
    END IF;
    IF v_cat3_id IS NULL THEN
        INSERT INTO public.skill_categories (name_en, name_ar, sort_order, is_published)
        VALUES ('Databases & Backend Services', 'قواعد البيانات وخدمات الباك اند', 3, true) RETURNING id INTO v_cat3_id;
    ELSE
        UPDATE public.skill_categories SET name_en = 'Databases & Backend Services', name_ar = 'قواعد البيانات وخدمات الباك اند', sort_order = 3, is_published = true WHERE id = v_cat3_id;
    END IF;

    -- Cat 4
    SELECT id INTO v_cat4_id FROM public.skill_categories WHERE name_en = 'CMS & Business Websites' LIMIT 1;
    IF v_cat4_id IS NULL THEN
        SELECT id INTO v_cat4_id FROM public.skill_categories WHERE name_en LIKE '%CMS%' LIMIT 1;
    END IF;
    IF v_cat4_id IS NULL THEN
        INSERT INTO public.skill_categories (name_en, name_ar, sort_order, is_published)
        VALUES ('CMS & Business Websites', 'أنظمة إدارة المحتوى ومواقع الأعمال', 4, true) RETURNING id INTO v_cat4_id;
    ELSE
        UPDATE public.skill_categories SET name_en = 'CMS & Business Websites', name_ar = 'أنظمة إدارة المحتوى ومواقع الأعمال', sort_order = 4, is_published = true WHERE id = v_cat4_id;
    END IF;

    -- Cat 5
    SELECT id INTO v_cat5_id FROM public.skill_categories WHERE name_en = 'Tools, Deployment & Quality' LIMIT 1;
    IF v_cat5_id IS NULL THEN
        SELECT id INTO v_cat5_id FROM public.skill_categories WHERE name_en LIKE '%Tools%' LIMIT 1;
    END IF;
    IF v_cat5_id IS NULL THEN
        INSERT INTO public.skill_categories (name_en, name_ar, sort_order, is_published)
        VALUES ('Tools, Deployment & Quality', 'الأدوات والنشر والجودة', 5, true) RETURNING id INTO v_cat5_id;
    ELSE
        UPDATE public.skill_categories SET name_en = 'Tools, Deployment & Quality', name_ar = 'الأدوات والنشر والجودة', sort_order = 5, is_published = true WHERE id = v_cat5_id;
    END IF;

    -- ===========================
    -- SKILLS
    -- ===========================

    -- 1. HTML5
    SELECT id INTO v_skill_id FROM public.skills WHERE name = 'HTML5' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat1_id, 'HTML5', 'FileCode2', 'Semantic page structure for clean, accessible, and SEO-friendly web interfaces.', 'بناء هيكل صفحات منظم وواضح يساعد على تحسين الوصول وتجهيز الواجهة لمحركات البحث.', 1, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat1_id, icon = 'FileCode2', business_value_en = 'Semantic page structure for clean, accessible, and SEO-friendly web interfaces.', business_value_ar = 'بناء هيكل صفحات منظم وواضح يساعد على تحسين الوصول وتجهيز الواجهة لمحركات البحث.', sort_order = 1, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 2. CSS3
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'CSS3' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat1_id, 'CSS3', 'Paintbrush', 'Modern styling, layouts, spacing systems, animations, and responsive visual structure.', 'تنسيق حديث للواجهات، تنظيم المسافات، الحركات، وبناء تصاميم متجاوبة بصريًا.', 2, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat1_id, icon = 'Paintbrush', business_value_en = 'Modern styling, layouts, spacing systems, animations, and responsive visual structure.', business_value_ar = 'تنسيق حديث للواجهات، تنظيم المسافات، الحركات، وبناء تصاميم متجاوبة بصريًا.', sort_order = 2, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 3. JavaScript
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'JavaScript' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat1_id, 'JavaScript', 'Braces', 'Interactive frontend behavior, dynamic components, browser logic, and user experience enhancements.', 'إضافة التفاعل للواجهات، بناء مكونات ديناميكية، وتحسين تجربة المستخدم داخل المتصفح.', 3, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat1_id, icon = 'Braces', business_value_en = 'Interactive frontend behavior, dynamic components, browser logic, and user experience enhancements.', business_value_ar = 'إضافة التفاعل للواجهات، بناء مكونات ديناميكية، وتحسين تجربة المستخدم داخل المتصفح.', sort_order = 3, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 4. TypeScript
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'TypeScript' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat1_id, 'TypeScript', 'Code2', 'Typed JavaScript development for safer, cleaner, and more maintainable frontend applications.', 'تطوير JavaScript بأنواع بيانات واضحة لبناء تطبيقات أكثر أمانًا وتنظيمًا وسهولة في الصيانة.', 4, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat1_id, icon = 'Code2', business_value_en = 'Typed JavaScript development for safer, cleaner, and more maintainable frontend applications.', business_value_ar = 'تطوير JavaScript بأنواع بيانات واضحة لبناء تطبيقات أكثر أمانًا وتنظيمًا وسهولة في الصيانة.', sort_order = 4, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 5. React.js
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'React.js' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat1_id, 'React.js', 'Component', 'Component-based interfaces for fast, reusable, and scalable user experiences.', 'بناء واجهات تعتمد على المكونات لإنتاج تجربة استخدام سريعة وقابلة للتوسع وإعادة الاستخدام.', 5, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat1_id, icon = 'Component', business_value_en = 'Component-based interfaces for fast, reusable, and scalable user experiences.', business_value_ar = 'بناء واجهات تعتمد على المكونات لإنتاج تجربة استخدام سريعة وقابلة للتوسع وإعادة الاستخدام.', sort_order = 5, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 6. Next.js
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'Next.js' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat1_id, 'Next.js', 'Rocket', 'Production-ready React applications with routing, SEO, performance optimization, and server rendering.', 'بناء تطبيقات React جاهزة للإنتاج مع توجيه صفحات، تحسين SEO، أداء قوي، ومعالجة من جهة الخادم.', 6, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat1_id, icon = 'Rocket', business_value_en = 'Production-ready React applications with routing, SEO, performance optimization, and server rendering.', business_value_ar = 'بناء تطبيقات React جاهزة للإنتاج مع توجيه صفحات، تحسين SEO، أداء قوي، ومعالجة من جهة الخادم.', sort_order = 6, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 7. Tailwind CSS
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'Tailwind CSS' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat1_id, 'Tailwind CSS', 'Palette', 'Utility-first styling for fast, consistent, responsive, and modern interface development.', 'تنسيق سريع ومرن للواجهات باستخدام Utility Classes لبناء تصاميم حديثة ومتجاوبة.', 7, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat1_id, icon = 'Palette', business_value_en = 'Utility-first styling for fast, consistent, responsive, and modern interface development.', business_value_ar = 'تنسيق سريع ومرن للواجهات باستخدام Utility Classes لبناء تصاميم حديثة ومتجاوبة.', sort_order = 7, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 8. Bootstrap
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'Bootstrap' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat1_id, 'Bootstrap', 'LayoutTemplate', 'Responsive layouts and ready UI components for fast business website and dashboard development.', 'بناء واجهات متجاوبة ومكونات جاهزة تساعد على تطوير مواقع الأعمال ولوحات التحكم بسرعة.', 8, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat1_id, icon = 'LayoutTemplate', business_value_en = 'Responsive layouts and ready UI components for fast business website and dashboard development.', business_value_ar = 'بناء واجهات متجاوبة ومكونات جاهزة تساعد على تطوير مواقع الأعمال ولوحات التحكم بسرعة.', sort_order = 8, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 9. PHP
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'PHP' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat2_id, 'PHP', 'Server', 'Server-side development for dynamic websites, business systems, and database-driven applications.', 'تطوير الواجهات الخلفية للمواقع الديناميكية، أنظمة الأعمال، والتطبيقات المرتبطة بقواعد البيانات.', 9, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat2_id, icon = 'Server', business_value_en = 'Server-side development for dynamic websites, business systems, and database-driven applications.', business_value_ar = 'تطوير الواجهات الخلفية للمواقع الديناميكية، أنظمة الأعمال، والتطبيقات المرتبطة بقواعد البيانات.', sort_order = 9, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 10. Laravel
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'Laravel' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat2_id, 'Laravel', 'Layers', 'Secure and scalable backend applications using Laravel architecture, routing, validation, models, and authentication.', 'بناء تطبيقات خلفية آمنة وقابلة للتوسع باستخدام Laravel من حيث المسارات، التحقق، النماذج، وتسجيل الدخول.', 10, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat2_id, icon = 'Layers', business_value_en = 'Secure and scalable backend applications using Laravel architecture, routing, validation, models, and authentication.', business_value_ar = 'بناء تطبيقات خلفية آمنة وقابلة للتوسع باستخدام Laravel من حيث المسارات، التحقق، النماذج، وتسجيل الدخول.', sort_order = 10, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 11. REST API Development
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'REST API Development' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat2_id, 'REST API Development', 'Network', 'Designing and building structured APIs for mobile apps, dashboards, external systems, and integrations.', 'تصميم وبناء واجهات API منظمة لربط التطبيقات، لوحات التحكم، والأنظمة الخارجية.', 11, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat2_id, icon = 'Network', business_value_en = 'Designing and building structured APIs for mobile apps, dashboards, external systems, and integrations.', business_value_ar = 'تصميم وبناء واجهات API منظمة لربط التطبيقات، لوحات التحكم، والأنظمة الخارجية.', sort_order = 11, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 12. Authentication & Authorization
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'Authentication & Authorization' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat2_id, 'Authentication & Authorization', 'LockKeyhole', 'Login systems, protected routes, user roles, permissions, and secure access control.', 'بناء أنظمة تسجيل دخول، حماية الصفحات، أدوار المستخدمين، الصلاحيات، والتحكم الآمن بالوصول.', 12, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat2_id, icon = 'LockKeyhole', business_value_en = 'Login systems, protected routes, user roles, permissions, and secure access control.', business_value_ar = 'بناء أنظمة تسجيل دخول، حماية الصفحات، أدوار المستخدمين، الصلاحيات، والتحكم الآمن بالوصول.', sort_order = 12, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 13. Payment Gateway Integration
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'Payment Gateway Integration' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat2_id, 'Payment Gateway Integration', 'CreditCard', 'Integrating payment flows, checkout processes, transaction states, and payment-related business logic.', 'ربط بوابات الدفع، بناء مسارات الدفع، حالات العمليات، والمنطق المرتبط بالمدفوعات.', 13, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat2_id, icon = 'CreditCard', business_value_en = 'Integrating payment flows, checkout processes, transaction states, and payment-related business logic.', business_value_ar = 'ربط بوابات الدفع، بناء مسارات الدفع، حالات العمليات، والمنطق المرتبط بالمدفوعات.', sort_order = 13, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 14. WhatsApp API Integration
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'WhatsApp API Integration' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat2_id, 'WhatsApp API Integration', 'MessageCircle', 'Connecting WhatsApp flows for customer messages, order notifications, support, and automation.', 'ربط واتساب لإرسال رسائل العملاء، إشعارات الطلبات، الدعم، وأتمتة التواصل.', 14, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat2_id, icon = 'MessageCircle', business_value_en = 'Connecting WhatsApp flows for customer messages, order notifications, support, and automation.', business_value_ar = 'ربط واتساب لإرسال رسائل العملاء، إشعارات الطلبات، الدعم، وأتمتة التواصل.', sort_order = 14, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 15. MySQL
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'MySQL' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat3_id, 'MySQL', 'Database', 'Relational database design, queries, indexing basics, and data-driven application development.', 'تصميم قواعد بيانات علائقية، كتابة الاستعلامات، أساسيات الفهرسة، وبناء تطبيقات تعتمد على البيانات.', 15, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat3_id, icon = 'Database', business_value_en = 'Relational database design, queries, indexing basics, and data-driven application development.', business_value_ar = 'تصميم قواعد بيانات علائقية، كتابة الاستعلامات، أساسيات الفهرسة، وبناء تطبيقات تعتمد على البيانات.', sort_order = 15, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 16. PostgreSQL
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'PostgreSQL' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat3_id, 'PostgreSQL', 'DatabaseZap', 'Reliable relational database systems for structured data, application backends, and scalable projects.', 'قواعد بيانات علائقية موثوقة للبيانات المنظمة، تطبيقات الباك اند، والمشاريع القابلة للتوسع.', 16, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat3_id, icon = 'DatabaseZap', business_value_en = 'Reliable relational database systems for structured data, application backends, and scalable projects.', business_value_ar = 'قواعد بيانات علائقية موثوقة للبيانات المنظمة، تطبيقات الباك اند، والمشاريع القابلة للتوسع.', sort_order = 16, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 17. Supabase
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'Supabase' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat3_id, 'Supabase', 'Boxes', 'Backend services with PostgreSQL, authentication, storage, APIs, and secure application data access.', 'خدمات باك اند تعتمد على PostgreSQL وتشمل تسجيل الدخول، التخزين، واجهات API، والوصول الآمن للبيانات.', 17, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat3_id, icon = 'Boxes', business_value_en = 'Backend services with PostgreSQL, authentication, storage, APIs, and secure application data access.', business_value_ar = 'خدمات باك اند تعتمد على PostgreSQL وتشمل تسجيل الدخول، التخزين، واجهات API، والوصول الآمن للبيانات.', sort_order = 17, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 18. WordPress
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'WordPress' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat4_id, 'WordPress', 'Globe', 'Professional business websites, portfolio sites, landing pages, and content-managed web platforms.', 'بناء مواقع أعمال احترافية، بورتفوليوهات، صفحات هبوط، ومنصات قابلة لإدارة المحتوى.', 18, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat4_id, icon = 'Globe', business_value_en = 'Professional business websites, portfolio sites, landing pages, and content-managed web platforms.', business_value_ar = 'بناء مواقع أعمال احترافية، بورتفوليوهات، صفحات هبوط، ومنصات قابلة لإدارة المحتوى.', sort_order = 18, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 19. Elementor
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'Elementor' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat4_id, 'Elementor', 'PanelsTopLeft', 'Flexible WordPress page building for modern layouts, landing pages, and client-editable sections.', 'بناء صفحات WordPress مرنة وحديثة وصفحات هبوط وأقسام يستطيع العميل تعديلها بسهولة.', 19, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat4_id, icon = 'PanelsTopLeft', business_value_en = 'Flexible WordPress page building for modern layouts, landing pages, and client-editable sections.', business_value_ar = 'بناء صفحات WordPress مرنة وحديثة وصفحات هبوط وأقسام يستطيع العميل تعديلها بسهولة.', sort_order = 19, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 20. Git & GitHub
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'Git & GitHub' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat5_id, 'Git & GitHub', 'GitBranch', 'Version control, project history, branching, collaboration, and safe code management.', 'إدارة الإصدارات، حفظ تاريخ المشروع، الفروع، التعاون، وتنظيم الكود بشكل آمن.', 20, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat5_id, icon = 'GitBranch', business_value_en = 'Version control, project history, branching, collaboration, and safe code management.', business_value_ar = 'إدارة الإصدارات، حفظ تاريخ المشروع، الفروع، التعاون، وتنظيم الكود بشكل آمن.', sort_order = 20, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 21. npm / Vite
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'npm / Vite' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat5_id, 'npm / Vite', 'Package', 'Modern frontend tooling for dependency management, fast development, and optimized builds.', 'أدوات حديثة لإدارة الحزم، تسريع التطوير، وتجهيز ملفات الإنتاج بشكل محسن.', 21, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat5_id, icon = 'Package', business_value_en = 'Modern frontend tooling for dependency management, fast development, and optimized builds.', business_value_ar = 'أدوات حديثة لإدارة الحزم، تسريع التطوير، وتجهيز ملفات الإنتاج بشكل محسن.', sort_order = 21, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 22. Postman
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'Postman' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat5_id, 'Postman', 'Send', 'API testing, request validation, endpoint debugging, and backend integration workflows.', 'اختبار واجهات API، التحقق من الطلبات، تتبع مشاكل المسارات، وتجهيز تكاملات الباك اند.', 22, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat5_id, icon = 'Send', business_value_en = 'API testing, request validation, endpoint debugging, and backend integration workflows.', business_value_ar = 'اختبار واجهات API، التحقق من الطلبات، تتبع مشاكل المسارات، وتجهيز تكاملات الباك اند.', sort_order = 22, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 23. Deployment & Hosting
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'Deployment & Hosting' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat5_id, 'Deployment & Hosting', 'CloudUpload', 'Deploying websites and applications on platforms such as Vercel, cPanel, and Hostinger.', 'نشر المواقع والتطبيقات على منصات مثل Vercel و cPanel و Hostinger وتجهيزها للعمل.', 23, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat5_id, icon = 'CloudUpload', business_value_en = 'Deploying websites and applications on platforms such as Vercel, cPanel, and Hostinger.', business_value_ar = 'نشر المواقع والتطبيقات على منصات مثل Vercel و cPanel و Hostinger وتجهيزها للعمل.', sort_order = 23, is_published = true WHERE id = v_skill_id;
    END IF;

    -- 24. Performance & Security Optimization
    v_skill_id := NULL; SELECT id INTO v_skill_id FROM public.skills WHERE name = 'Performance & Security Optimization' LIMIT 1;
    IF v_skill_id IS NULL THEN
        INSERT INTO public.skills (category_id, name, icon, business_value_en, business_value_ar, sort_order, is_published)
        VALUES (v_cat5_id, 'Performance & Security Optimization', 'ShieldCheck', 'Speed improvements, technical fixes, code cleanup, secure practices, and stability optimization.', 'تحسين السرعة، إصلاح المشاكل التقنية، تنظيم الكود، تطبيق ممارسات آمنة، وتعزيز استقرار النظام.', 24, true);
    ELSE
        UPDATE public.skills SET category_id = v_cat5_id, icon = 'ShieldCheck', business_value_en = 'Speed improvements, technical fixes, code cleanup, secure practices, and stability optimization.', business_value_ar = 'تحسين السرعة، إصلاح المشاكل التقنية، تنظيم الكود، تطبيق ممارسات آمنة، وتعزيز استقرار النظام.', sort_order = 24, is_published = true WHERE id = v_skill_id;
    END IF;

END $$;

NOTIFY pgrst, 'reload schema';

-- supabase/migrations/20261019205401_seed_lumiere_boutique_project.sql
-- Upserts the lumiere-boutique (Lumière Boutique) project and its seven gallery images.

DO $$
DECLARE
    v_project_id uuid;
BEGIN
    SELECT id INTO v_project_id FROM public.projects WHERE slug = 'lumiere-boutique' LIMIT 1;

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
            'lumiere-boutique',
            'لوميير بوتيك — واجهة متجر عربية RTL ولوحة تحكم تشغيلية',
            'Lumière Boutique — Arabic RTL Storefront & Operations Dashboard',
            'واجهة متجر عربية RTL أولاً مبنية على Laravel 12 لعلامة أغذية طبيعية فاخرة: كتالوج منتقى مع بحث فوري وتصفية حسب التصنيف وأربعة أنماط ترتيب، وسلة منسدلة، ومفضلة، وحسابات عملاء، ومسار شراء بالتحويل البنكي يلتقط الإيصال — يديرها كاملها لوحة تحكم صلاحياتية للمنتجات والتصنيفات والطلبات والإعدادات وسجل العمليات والمشرفين.',
            'A fully Arabic, RTL-first Laravel 12 storefront for a premium natural-food brand: a curated catalog with live search, category filters and four sort modes, a slide-over cart, wishlist and customer accounts, plus a bank-transfer checkout that captures the receipt — all steered from a role-based admin console for products, categories, orders, settings, activity logs and admins.',
            'تُدفَع المتاجر العربية إلى قوالب جاهزة تُقرأ بشكل سيئ في RTL، وتخفي تعديل المنتجات داخل الكود، وتحوّل كل طلب إلى محادثة يدوية. وبدون لوحة تشغيل تتشتت المخزون والإيصالات وحالة الطلب بين المحادثات والجداول، ولا يوجد سجل موثوق لمن عدّل ماذا.',
            'Arabic-first boutiques get pushed onto templates that read poorly in RTL, hide product editing inside code, and turn every order into a manual chat. Without an operations console, stock, receipts and order status end up scattered across chats and spreadsheets, and there is no reliable record of who changed what.',
            'بناء متجر عربي واحد (1) يعرض الكتالوج بواجهة RTL نظيفة، (2) ويتيح للعميل إيجاد المنتج خلال ثوانٍ عبر البحث وتصفية التصنيفات وأربعة أنماط ترتيب، (3) ويلتقط الطلب من البداية للنهاية مع إثبات التحويل البنكي، (4) ويمنح الفريق تحكماً كاملاً دون كود بالمنتجات والتصنيفات والصور وحالة الطلب، (5) ويحفظ سجلاً قابلاً للتدقيق لعمليات المشرفين.',
            'Ship one Arabic storefront that (1) presents the catalog in clean RTL, (2) lets shoppers find a product in seconds through search, category filtering and four sort modes, (3) captures an order end-to-end with bank-transfer proof, (4) gives staff zero-code control over products, categories, images and order status, and (5) keeps an auditable trail of admin actions.',
            'مبني على Laravel 12 مع Blade وTailwind CSS وAlpine.js وVite، يجمع التطبيق بين واجهة عامة (الرئيسية، الكتالوج، تفاصيل المنتج، من نحن، تواصل، السلة، الدفع، الخصوصية، الشروط، المفضلة ومنطقة حساب عبر Breeze) ولوحة تحكم محمية بوسيطَي auth وadmin مع رتبة super_admin. تغطي نماذج Eloquent المنتجات والتصنيفات وصور المنتجات والسلات والطلبات وبنود الطلب والمدفوعات والمفضلة ورسائل التواصل والإعدادات وسجل العمليات. تحمل المنتجات حقولاً مُعرّبة مع الوزن والمكونات والمسببات، وتُعرض في صفحة المنتج معاينة ثلاثية الأبعاد عبر google-model-viewer. ويسجّل الدفع إيصال التحويل البنكي ويعود عبر مسار نجاح مُوقّع، ويبثّ مسار تخزين محمي الوسائط المرفوعة أثناء تشغيل php artisan serve.',
            'Built on Laravel 12 with Blade, Tailwind CSS, Alpine.js and Vite, the app pairs a public storefront (home, catalog, product detail, about, contact, cart, checkout, privacy, terms, wishlist and a Breeze-authenticated account area) with an admin panel locked behind auth + admin middleware and a super_admin tier. Eloquent models cover products, categories, product images, carts, orders, order items, payments, wishlists, contact messages, settings and admin logs. Products carry localized columns plus weight, ingredients and allergens, and the product page renders 3D previews via google-model-viewer. Checkout records a bank-transfer receipt and returns through a signed success route, while a guarded storage route streams uploaded media over native php artisan serve.',
            'مطور ويب شامل — الهندسة، واجهة المتجر RTL، الدفع، لوحة التحكم وتصميم قاعدة البيانات',
            'Full-Stack Developer — architecture, RTL storefront, checkout, admin dashboard and database design',
            'كانت المعضلة الحقيقية في الوسائط والدفع على خادم تطوير ويندوز. صور المنتجات والإيصالات تقع خلف تخزين Laravel، لكن php artisan serve لا يخدم الملفات المربوطة اختصارياً، فظهرت إيصالات التحويل التي يرفعها العملاء معطوبة داخل لوحة التحكم. حُلّت المشكلة بمسار /storage/{path} محمي ومقيّد بالمسار يبثّ الملفات حسب نوع MIME، بينما يعتمد الإنتاج على php artisan storage:link كما هو موثق في قائمة التسليم. والتحدي الثاني كان ثنائية بيانات خلف واجهة عربية فقط: حقول المنتجات والتصنيفات المُعرّبة موجودة، لكن الواجهة أصبحت عربية RTL بعد إزالة مبدّل اللغة، فوجب إبقاء الواجهة وهيكل البيانات متوافقين دون تكرار الكتالوج.',
            'The real dilemma was media and money on a native Windows dev server. Product and receipt images sit behind Laravel storage, but symlinked files are not served by php artisan serve, so checkout receipts uploaded by customers rendered broken inside the admin panel. Solved it with an explicit, path-guarded /storage/{path} route that streams files by MIME type, while production relies on php artisan storage:link as documented in the delivery checklist. The second challenge was bilingual data behind an Arabic-only UI: localized product and category columns exist, yet the storefront ships RTL-Arabic after the language switcher was removed, so the UI and the data model had to stay in step without duplicating the catalog.',
            'تم تسليم بناء محلي عامل: كتالوج من أربعة منتجات داخل تصنيف الجرانولا، ولوحة تحكم بسبع وحدات (الرئيسية، التصنيفات، المنتجات، الطلبات، الإعدادات، سجل العمليات، المشرفون) مقيّدة بالرتبة وحالة التفعيل، ودفع يسجّل إيصالات التحويل البنكي، وتسليم الطلب عبر واتساب برقم الطلب الفعلي، وقائمة تسليم موثقة تكشف حساب المشرف الأعلى المُهيّأ. تم التحقق على سطح المكتب والجوال بدقة 1920×1080 عبر مسارات حقيقية من التصفح حتى إدارة الطلبات.',
            'Delivered a working local build: a four-product catalog inside a single granola category, a seven-module admin (dashboard, categories, products, orders, settings, activity logs and admins) gated by role and active status, a checkout that records bank-transfer receipts, a WhatsApp order hand-off carrying the live order number, and a documented delivery checklist exposing a seeded super-admin account. Verified across desktop and mobile at 1920×1080 with real captured flows from browsing to order management.',
            '["Laravel 12", "PHP 8.2", "MySQL", "Blade", "Tailwind CSS", "Alpine.js", "Vite", "Laravel Breeze", "Google Model Viewer", "Eloquent ORM"]'::jsonb,
            '',
            '',
            '',
            'local_demo',
            '/portfolio/projects/lumiere-boutique/cover.png',
            true,
            true,
            1,
            ARRAY['PHP', 'JavaScript', 'HTML', 'CSS', 'SQL'],
            ARRAY['Laravel 12', 'Tailwind CSS', 'Alpine.js', 'Laravel Breeze'],
            ARRAY['Vite', 'Composer', 'npm', 'MySQL', 'Laravel Pint', 'PHPUnit', 'XAMPP'],
            ARRAY['Web App', 'E-Commerce', 'Arabic RTL', 'Admin Dashboard', 'Responsive Web']
        ) RETURNING id INTO v_project_id;
    ELSE
        UPDATE public.projects SET
            title_ar = 'لوميير بوتيك — واجهة متجر عربية RTL ولوحة تحكم تشغيلية',
            title_en = 'Lumière Boutique — Arabic RTL Storefront & Operations Dashboard',
            summary_ar = 'واجهة متجر عربية RTL أولاً مبنية على Laravel 12 لعلامة أغذية طبيعية فاخرة: كتالوج منتقى مع بحث فوري وتصفية حسب التصنيف وأربعة أنماط ترتيب، وسلة منسدلة، ومفضلة، وحسابات عملاء، ومسار شراء بالتحويل البنكي يلتقط الإيصال — يديرها كاملها لوحة تحكم صلاحياتية للمنتجات والتصنيفات والطلبات والإعدادات وسجل العمليات والمشرفين.',
            summary_en = 'A fully Arabic, RTL-first Laravel 12 storefront for a premium natural-food brand: a curated catalog with live search, category filters and four sort modes, a slide-over cart, wishlist and customer accounts, plus a bank-transfer checkout that captures the receipt — all steered from a role-based admin console for products, categories, orders, settings, activity logs and admins.',
            problem_ar = 'تُدفَع المتاجر العربية إلى قوالب جاهزة تُقرأ بشكل سيئ في RTL، وتخفي تعديل المنتجات داخل الكود، وتحوّل كل طلب إلى محادثة يدوية. وبدون لوحة تشغيل تتشتت المخزون والإيصالات وحالة الطلب بين المحادثات والجداول، ولا يوجد سجل موثوق لمن عدّل ماذا.',
            problem_en = 'Arabic-first boutiques get pushed onto templates that read poorly in RTL, hide product editing inside code, and turn every order into a manual chat. Without an operations console, stock, receipts and order status end up scattered across chats and spreadsheets, and there is no reliable record of who changed what.',
            goal_ar = 'بناء متجر عربي واحد (1) يعرض الكتالوج بواجهة RTL نظيفة، (2) ويتيح للعميل إيجاد المنتج خلال ثوانٍ عبر البحث وتصفية التصنيفات وأربعة أنماط ترتيب، (3) ويلتقط الطلب من البداية للنهاية مع إثبات التحويل البنكي، (4) ويمنح الفريق تحكماً كاملاً دون كود بالمنتجات والتصنيفات والصور وحالة الطلب، (5) ويحفظ سجلاً قابلاً للتدقيق لعمليات المشرفين.',
            goal_en = 'Ship one Arabic storefront that (1) presents the catalog in clean RTL, (2) lets shoppers find a product in seconds through search, category filtering and four sort modes, (3) captures an order end-to-end with bank-transfer proof, (4) gives staff zero-code control over products, categories, images and order status, and (5) keeps an auditable trail of admin actions.',
            solution_ar = 'مبني على Laravel 12 مع Blade وTailwind CSS وAlpine.js وVite، يجمع التطبيق بين واجهة عامة (الرئيسية، الكتالوج، تفاصيل المنتج، من نحن، تواصل، السلة، الدفع، الخصوصية، الشروط، المفضلة ومنطقة حساب عبر Breeze) ولوحة تحكم محمية بوسيطَي auth وadmin مع رتبة super_admin. تغطي نماذج Eloquent المنتجات والتصنيفات وصور المنتجات والسلات والطلبات وبنود الطلب والمدفوعات والمفضلة ورسائل التواصل والإعدادات وسجل العمليات. تحمل المنتجات حقولاً مُعرّبة مع الوزن والمكونات والمسببات، وتُعرض في صفحة المنتج معاينة ثلاثية الأبعاد عبر google-model-viewer. ويسجّل الدفع إيصال التحويل البنكي ويعود عبر مسار نجاح مُوقّع، ويبثّ مسار تخزين محمي الوسائط المرفوعة أثناء تشغيل php artisan serve.',
            solution_en = 'Built on Laravel 12 with Blade, Tailwind CSS, Alpine.js and Vite, the app pairs a public storefront (home, catalog, product detail, about, contact, cart, checkout, privacy, terms, wishlist and a Breeze-authenticated account area) with an admin panel locked behind auth + admin middleware and a super_admin tier. Eloquent models cover products, categories, product images, carts, orders, order items, payments, wishlists, contact messages, settings and admin logs. Products carry localized columns plus weight, ingredients and allergens, and the product page renders 3D previews via google-model-viewer. Checkout records a bank-transfer receipt and returns through a signed success route, while a guarded storage route streams uploaded media over native php artisan serve.',
            role_ar = 'مطور ويب شامل — الهندسة، واجهة المتجر RTL، الدفع، لوحة التحكم وتصميم قاعدة البيانات',
            role_en = 'Full-Stack Developer — architecture, RTL storefront, checkout, admin dashboard and database design',
            challenges_ar = 'كانت المعضلة الحقيقية في الوسائط والدفع على خادم تطوير ويندوز. صور المنتجات والإيصالات تقع خلف تخزين Laravel، لكن php artisan serve لا يخدم الملفات المربوطة اختصارياً، فظهرت إيصالات التحويل التي يرفعها العملاء معطوبة داخل لوحة التحكم. حُلّت المشكلة بمسار /storage/{path} محمي ومقيّد بالمسار يبثّ الملفات حسب نوع MIME، بينما يعتمد الإنتاج على php artisan storage:link كما هو موثق في قائمة التسليم. والتحدي الثاني كان ثنائية بيانات خلف واجهة عربية فقط: حقول المنتجات والتصنيفات المُعرّبة موجودة، لكن الواجهة أصبحت عربية RTL بعد إزالة مبدّل اللغة، فوجب إبقاء الواجهة وهيكل البيانات متوافقين دون تكرار الكتالوج.',
            challenges_en = 'The real dilemma was media and money on a native Windows dev server. Product and receipt images sit behind Laravel storage, but symlinked files are not served by php artisan serve, so checkout receipts uploaded by customers rendered broken inside the admin panel. Solved it with an explicit, path-guarded /storage/{path} route that streams files by MIME type, while production relies on php artisan storage:link as documented in the delivery checklist. The second challenge was bilingual data behind an Arabic-only UI: localized product and category columns exist, yet the storefront ships RTL-Arabic after the language switcher was removed, so the UI and the data model had to stay in step without duplicating the catalog.',
            results_ar = 'تم تسليم بناء محلي عامل: كتالوج من أربعة منتجات داخل تصنيف الجرانولا، ولوحة تحكم بسبع وحدات (الرئيسية، التصنيفات، المنتجات، الطلبات، الإعدادات، سجل العمليات، المشرفون) مقيّدة بالرتبة وحالة التفعيل، ودفع يسجّل إيصالات التحويل البنكي، وتسليم الطلب عبر واتساب برقم الطلب الفعلي، وقائمة تسليم موثقة تكشف حساب المشرف الأعلى المُهيّأ. تم التحقق على سطح المكتب والجوال بدقة 1920×1080 عبر مسارات حقيقية من التصفح حتى إدارة الطلبات.',
            results_en = 'Delivered a working local build: a four-product catalog inside a single granola category, a seven-module admin (dashboard, categories, products, orders, settings, activity logs and admins) gated by role and active status, a checkout that records bank-transfer receipts, a WhatsApp order hand-off carrying the live order number, and a documented delivery checklist exposing a seeded super-admin account. Verified across desktop and mobile at 1920×1080 with real captured flows from browsing to order management.',
            tech_stack = '["Laravel 12", "PHP 8.2", "MySQL", "Blade", "Tailwind CSS", "Alpine.js", "Vite", "Laravel Breeze", "Google Model Viewer", "Eloquent ORM"]'::jsonb,
            live_url = '',
            github_url = '',
            demo_video_url = '',
            project_status = 'local_demo',
            image_url = '/portfolio/projects/lumiere-boutique/cover.png',
            is_featured = true,
            is_published = true,
            sort_order = 1,
            project_languages = ARRAY['PHP', 'JavaScript', 'HTML', 'CSS', 'SQL'],
            project_frameworks = ARRAY['Laravel 12', 'Tailwind CSS', 'Alpine.js', 'Laravel Breeze'],
            project_tools = ARRAY['Vite', 'Composer', 'npm', 'MySQL', 'Laravel Pint', 'PHPUnit', 'XAMPP'],
            project_platforms = ARRAY['Web App', 'E-Commerce', 'Arabic RTL', 'Admin Dashboard', 'Responsive Web']
        WHERE id = v_project_id;
    END IF;

    DELETE FROM public.project_images WHERE project_id = v_project_id;

    INSERT INTO public.project_images (project_id, image_url, alt_ar, alt_en, caption_ar, caption_en, sort_order) VALUES
    (v_project_id, '/portfolio/projects/lumiere-boutique/cover.png',           'الواجهة الترحيبية للمتجر',                 'Storefront Homepage Hero',                       'واجهة RTL مع قائمة العلامة وشارة الجودة ودعوة التسوق',                 'RTL hero with brand navigation, trust badge and shop CTA',              1),
    (v_project_id, '/portfolio/projects/lumiere-boutique/01-home.png',          'التصنيفات في الصفحة الرئيسية',              'Homepage Category Showcase',                     'بطاقات التصنيفات الزجاجية الموصلة إلى الكتالوج',                      'Floating glass category cards leading into the catalog',                2),
    (v_project_id, '/portfolio/projects/lumiere-boutique/02-features.png',      'المنتجات المميزة ووعد العلامة',             'Featured Products & Brand Promise',              'تشكيلة الجرانولا المميزة مع ضمانات العلامة الأربع',                   'Featured granola collection plus the four brand guarantees',            3),
    (v_project_id, '/portfolio/projects/lumiere-boutique/03-search-filter.png', 'الكتالوج مع البحث والتصفية والترتيب',       'Catalog with Search, Filters & Sorting',         'بحث فوري وتصفية بالتصنيف وأربعة أنماط ترتيب فوق الشبكة',             'Live search, category facets and four sort modes over the grid',        4),
    (v_project_id, '/portfolio/projects/lumiere-boutique/04-details.png',       'صفحة تفاصيل المنتج',                       'Product Detail Page',                            'معرض المنتج والسعر وحالة التوفر والكمية والإضافة للسلة',             'Product gallery, price, stock status, quantity and add-to-cart',       5),
    (v_project_id, '/portfolio/projects/lumiere-boutique/05-action.png',        'صفحة الدفع وبيانات التحويل البنكي',         'Checkout with Bank-Transfer Details',            'نموذج الدفع: التواصل والشحن وبيانات التحويل البنكي وملخص الطلب',       'Checkout form: contact, shipping, bank-transfer block and order summary', 6),
    (v_project_id, '/portfolio/projects/lumiere-boutique/06-admin.png',         'لوحة التحكم التشغيلية',                     'Admin Operations Dashboard',                     'لوحة تحكم بمؤشرات الأداء وإجراءات سريعة وقائمة مقيدة بالصلاحيات',    'Admin dashboard with KPIs, quick actions and role-gated navigation',    7);

END $$;

NOTIFY pgrst, 'reload schema';

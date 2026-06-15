-- supabase/migrations/20260615000300_seed_lumiere_boutique_project.sql

DO $$
DECLARE
    v_project_id uuid;
BEGIN
    -- Try to find existing project
    SELECT id INTO v_project_id FROM public.projects WHERE slug = 'lumiere-boutique' LIMIT 1;
    
    IF v_project_id IS NULL THEN
        -- Insert project
        INSERT INTO public.projects (
            slug, title_ar, title_en, summary_ar, summary_en, 
            problem_ar, problem_en, goal_ar, goal_en, 
            solution_ar, solution_en, role_ar, role_en, 
            challenges_ar, challenges_en, results_ar, results_en, 
            tech_stack, live_url, github_url, image_url, demo_video_url, 
            is_featured, is_published, sort_order, project_status,
            project_languages, project_frameworks, project_tools, project_platforms
        ) VALUES (
            'lumiere-boutique', 
            'متجر لوميير الإلكتروني — تطبيق متجر إلكتروني فاخر', 
            'Lumière Boutique — Luxury E-commerce Web Application', 
            'تطبيق متجر إلكتروني محلي مصمم لعرض المنتجات بأسلوب فاخر، يضم واجهة متجر حديثة، كتالوج منتجات، بحث وفلترة، سلة شراء، ملف مستخدم، دعم العربية والإنجليزية، وضع داكن وفاتح، ولوحة تحكم متكاملة لإدارة المنتجات والتصنيفات والصور والطلبات.', 
            'A premium local e-commerce web application designed for luxury products, featuring a modern storefront, product catalog, search and filtering, cart flow, customer profile, bilingual Arabic/English support, dark/light mode, and a complete admin panel for managing products, categories, images, and orders.', 
            'تحتاج المتاجر الصغيرة والعلامات التجارية إلى أكثر من صفحة منتجات بسيطة. فهي تحتاج إلى متجر إلكتروني احترافي يعرض المنتجات بشكل جذاب، ويسهّل على العميل البحث والتصفح، ويدعم أكثر من لغة، ويدير الطلبات، ويمنح الإدارة القدرة على التحكم بالمنتجات والصور بدون الرجوع إلى الكود.', 
            'Small and boutique businesses need more than a simple product page. They need a professional online store that displays products beautifully, helps customers search and browse easily, supports multiple languages, manages orders, and allows administrators to control products and images without touching code.', 
            'توفير تجربة تسوق إلكترونية فاخرة متكاملة محلياً.', 
            'Provide a complete local luxury e-commerce experience.', 
            'قمت ببناء تطبيق متجر إلكتروني مخصص بهوية بصرية فاخرة وتجربة استخدام عملية. تحتوي واجهة المتجر على عرض المنتجات، البحث، الفلترة، تفاصيل المنتج، السلة، مسار الطلب، صفحة البروفايل، دعم اللغتين، والوضع الداكن والفاتح. أما لوحة التحكم فتشمل إدارة المنتجات، إضافة وتعديل المنتجات، رفع صور المنتج، إدارة التصنيفات، قائمة الطلبات، وتفاصيل الطلب.', 
            'I built a custom e-commerce web application with a luxury visual direction and a practical user flow. The storefront includes product browsing, search, filtering, product details, cart, order flow, profile page, bilingual support, and dark/light mode. The admin side includes product management, add/edit product forms, image upload, category management, orders list, and order details.', 
            'مطور ويب شامل', 
            'Full Stack Developer', 
            'تطوير وتكامل تجربة تسوق فاخرة باللغتين مع دعم للوضع الداكن والفاتح بشكل سلس.', 
            'Developing and integrating a bilingual luxury shopping experience with seamless dark and light mode support.', 
            'النتيجة هي نسخة تجريبية محلية متكاملة تعرض مسار متجر إلكتروني واقعي من تصفح المنتجات حتى إدارة الطلبات. يوضح المشروع القدرة على بناء واجهات متجر قابلة للتوسع، ولوحات تحكم منظمة، وواجهات متعددة اللغات، وأنظمة إدارة منتجات جاهزة للأعمال.', 
            'The result is a complete local demo build that presents a realistic e-commerce workflow from browsing products to managing orders. It demonstrates the ability to build scalable storefronts, clean admin dashboards, multilingual interfaces, and business-ready product management systems.', 
            '["Laravel 12", "PHP 8.2+", "SQLite", "Blade", "Tailwind CSS", "Alpine.js", "Laravel Breeze", "Google Model Viewer", "Laravel Signed Routes", "Eloquent ORM", "MVC Architecture", "Authentication", "File Uploads", "CSRF Protection"]'::jsonb, 
            NULL, 
            NULL, 
            '/portfolio/projects/lumiere-boutique/cover.png', 
            NULL, 
            true, 
            true, 
            3,
            'local_demo',
            ARRAY['PHP', 'JavaScript', 'HTML', 'CSS', 'SQL'],
            ARRAY['Laravel', 'Tailwind CSS', 'Alpine.js'],
            ARRAY['SQLite', 'Breeze'],
            ARRAY['Web']
        ) RETURNING id INTO v_project_id;
    ELSE
        -- Update existing project
        UPDATE public.projects SET
            title_ar = 'متجر لوميير الإلكتروني — تطبيق متجر إلكتروني فاخر', 
            title_en = 'Lumière Boutique — Luxury E-commerce Web Application', 
            summary_ar = 'تطبيق متجر إلكتروني محلي مصمم لعرض المنتجات بأسلوب فاخر، يضم واجهة متجر حديثة، كتالوج منتجات، بحث وفلترة، سلة شراء، ملف مستخدم، دعم العربية والإنجليزية، وضع داكن وفاتح، ولوحة تحكم متكاملة لإدارة المنتجات والتصنيفات والصور والطلبات.', 
            summary_en = 'A premium local e-commerce web application designed for luxury products, featuring a modern storefront, product catalog, search and filtering, cart flow, customer profile, bilingual Arabic/English support, dark/light mode, and a complete admin panel for managing products, categories, images, and orders.', 
            problem_ar = 'تحتاج المتاجر الصغيرة والعلامات التجارية إلى أكثر من صفحة منتجات بسيطة. فهي تحتاج إلى متجر إلكتروني احترافي يعرض المنتجات بشكل جذاب، ويسهّل على العميل البحث والتصفح، ويدعم أكثر من لغة، ويدير الطلبات، ويمنح الإدارة القدرة على التحكم بالمنتجات والصور بدون الرجوع إلى الكود.', 
            problem_en = 'Small and boutique businesses need more than a simple product page. They need a professional online store that displays products beautifully, helps customers search and browse easily, supports multiple languages, manages orders, and allows administrators to control products and images without touching code.', 
            goal_ar = 'توفير تجربة تسوق إلكترونية فاخرة متكاملة محلياً.', 
            goal_en = 'Provide a complete local luxury e-commerce experience.', 
            solution_ar = 'قمت ببناء تطبيق متجر إلكتروني مخصص بهوية بصرية فاخرة وتجربة استخدام عملية. تحتوي واجهة المتجر على عرض المنتجات، البحث، الفلترة، تفاصيل المنتج، السلة، مسار الطلب، صفحة البروفايل، دعم اللغتين، والوضع الداكن والفاتح. أما لوحة التحكم فتشمل إدارة المنتجات، إضافة وتعديل المنتجات، رفع صور المنتج، إدارة التصنيفات، قائمة الطلبات، وتفاصيل الطلب.', 
            solution_en = 'I built a custom e-commerce web application with a luxury visual direction and a practical user flow. The storefront includes product browsing, search, filtering, product details, cart, order flow, profile page, bilingual support, and dark/light mode. The admin side includes product management, add/edit product forms, image upload, category management, orders list, and order details.', 
            role_ar = 'مطور ويب شامل', 
            role_en = 'Full Stack Developer', 
            challenges_ar = 'تطوير وتكامل تجربة تسوق فاخرة باللغتين مع دعم للوضع الداكن والفاتح بشكل سلس.', 
            challenges_en = 'Developing and integrating a bilingual luxury shopping experience with seamless dark and light mode support.', 
            results_ar = 'النتيجة هي نسخة تجريبية محلية متكاملة تعرض مسار متجر إلكتروني واقعي من تصفح المنتجات حتى إدارة الطلبات. يوضح المشروع القدرة على بناء واجهات متجر قابلة للتوسع، ولوحات تحكم منظمة، وواجهات متعددة اللغات، وأنظمة إدارة منتجات جاهزة للأعمال.', 
            results_en = 'The result is a complete local demo build that presents a realistic e-commerce workflow from browsing products to managing orders. It demonstrates the ability to build scalable storefronts, clean admin dashboards, multilingual interfaces, and business-ready product management systems.', 
            tech_stack = '["Laravel 12", "PHP 8.2+", "SQLite", "Blade", "Tailwind CSS", "Alpine.js", "Laravel Breeze", "Google Model Viewer", "Laravel Signed Routes", "Eloquent ORM", "MVC Architecture", "Authentication", "File Uploads", "CSRF Protection"]'::jsonb,
            image_url = '/portfolio/projects/lumiere-boutique/cover.png',
            project_status = 'local_demo'
        WHERE id = v_project_id;
    END IF;

    -- Delete existing images for this project to re-insert them cleanly
    DELETE FROM public.project_images WHERE project_id = v_project_id;

    -- Insert images
    INSERT INTO public.project_images (project_id, image_url, alt_ar, alt_en, caption_ar, caption_en, sort_order) VALUES 
    (v_project_id, '/portfolio/projects/lumiere-boutique/01-home.png', 'الصفحة الرئيسية وبداية تجربة المتجر الفاخرة', 'Homepage and luxury storefront introduction', 'الصفحة الرئيسية وبداية تجربة المتجر الفاخرة', 'Homepage and luxury storefront introduction', 1),
    (v_project_id, '/portfolio/projects/lumiere-boutique/02-products.png', 'كتالوج المنتجات وتجربة التصفح', 'Product catalog and browsing experience', 'كتالوج المنتجات وتجربة التصفح', 'Product catalog and browsing experience', 2),
    (v_project_id, '/portfolio/projects/lumiere-boutique/03-products-filter-search.png', 'تجربة البحث وفلترة المنتجات', 'Product filtering and search experience', 'تجربة البحث وفلترة المنتجات', 'Product filtering and search experience', 3),
    (v_project_id, '/portfolio/projects/lumiere-boutique/04-search.png', 'شريط البحث لتسهيل الوصول إلى المنتجات', 'Search bar for faster product discovery', 'شريط البحث لتسهيل الوصول إلى المنتجات', 'Search bar for faster product discovery', 4),
    (v_project_id, '/portfolio/projects/lumiere-boutique/05-product-details.png', 'صفحة تفاصيل المنتج ومسار قرار الشراء', 'Product detail page and purchase decision flow', 'صفحة تفاصيل المنتج ومسار قرار الشراء', 'Product detail page and purchase decision flow', 5),
    (v_project_id, '/portfolio/projects/lumiere-boutique/06-cart.png', 'سلة الشراء وملخص الطلب', 'Shopping cart and order summary', 'سلة الشراء وملخص الطلب', 'Shopping cart and order summary', 6),
    (v_project_id, '/portfolio/projects/lumiere-boutique/07-checkout-order.png', 'إرسال الطلب ومسار الدفع', 'Order submission and checkout flow', 'إرسال الطلب ومسار الدفع', 'Order submission and checkout flow', 7),
    (v_project_id, '/portfolio/projects/lumiere-boutique/08-profile.png', 'صفحة البروفايل ومنطقة حساب العميل', 'Customer profile and account area', 'صفحة البروفايل ومنطقة حساب العميل', 'Customer profile and account area', 8),
    (v_project_id, '/portfolio/projects/lumiere-boutique/09-admin-orders.png', 'إدارة الطلبات في لوحة التحكم', 'Admin orders management', 'إدارة الطلبات في لوحة التحكم', 'Admin orders management', 9),
    (v_project_id, '/portfolio/projects/lumiere-boutique/10-admin-order-details.png', 'مراجعة تفاصيل الطلب للإدارة', 'Detailed order review for administrators', 'مراجعة تفاصيل الطلب للإدارة', 'Detailed order review for administrators', 10),
    (v_project_id, '/portfolio/projects/lumiere-boutique/11-admin-products.png', 'جدول إدارة المنتجات', 'Admin product management table', 'جدول إدارة المنتجات', 'Admin product management table', 11),
    (v_project_id, '/portfolio/projects/lumiere-boutique/12-add-edit-product.png', 'تدفق إضافة وتعديل المنتجات', 'Add and edit product workflow', 'تدفق إضافة وتعديل المنتجات', 'Add and edit product workflow', 12),
    (v_project_id, '/portfolio/projects/lumiere-boutique/13-product-image-upload.png', 'إدارة رفع صور المنتجات', 'Product image upload management', 'إدارة رفع صور المنتجات', 'Product image upload management', 13),
    (v_project_id, '/portfolio/projects/lumiere-boutique/14-categories.png', 'إدارة تصنيفات المنتجات', 'Product category management', 'إدارة تصنيفات المنتجات', 'Product category management', 14),
    (v_project_id, '/portfolio/projects/lumiere-boutique/15-bilingual-support.png', 'دعم واجهة عربية وإنجليزية', 'Arabic and English interface support', 'دعم واجهة عربية وإنجليزية', 'Arabic and English interface support', 15),
    (v_project_id, '/portfolio/projects/lumiere-boutique/16-dark-light-mode.png', 'تجربة الوضع الداكن والفاتح', 'Dark and light mode experience', 'تجربة الوضع الداكن والفاتح', 'Dark and light mode experience', 16);

END $$;

NOTIFY pgrst, 'reload schema';

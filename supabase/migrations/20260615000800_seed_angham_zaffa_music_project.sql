-- supabase/migrations/20260615000800_seed_angham_zaffa_music_project.sql

DO $$
DECLARE
    v_project_id uuid;
BEGIN
    -- Check if project exists
    SELECT id INTO v_project_id FROM public.projects WHERE slug = 'angham-zaffa-music' LIMIT 1;

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
            sort_order
        ) VALUES (
            'angham-zaffa-music',
            'Angham Zaffa Music — Wedding Audio Request Platform',
            'أنغام ميوزك — منصة زفات وشيلات أفراح حسب الطلب',
            'A live client platform for browsing wedding zaffat and sheilat, exploring categorized audio collections, viewing artists, and sending custom zaffa requests through a streamlined WhatsApp order flow.',
            'منصة منشورة لعميل تتيح تصفح الزفات والشيلات، استعراض الأقسام الصوتية، عرض الفنانين، وطلب زفة مخصصة عبر نموذج منظم مرتبط بواتساب.',
            'The client needed a professional online platform to present wedding audio works in organized categories, make it easy for visitors to find suitable zaffat, and convert visitors into direct WhatsApp requests without a complicated checkout process.',
            'كان العميل بحاجة إلى منصة احترافية لعرض أعمال الزفات والشيلات ضمن أقسام منظمة، وتسهيل وصول الزائر إلى الزفة المناسبة، وتحويل الزوار إلى طلبات واتساب مباشرة بدون تعقيد في عملية الطلب.',
            '', '', -- goal
            'I developed a responsive Arabic wedding audio platform with categorized zaffa and sheila sections, a quick browsing experience, artists pages, user guidance content, and a dedicated custom order form that prepares request details and sends them through WhatsApp.

Features:
- Live client website
- Arabic RTL interface
- Wedding zaffat and sheilat library
- Category-based browsing
- Quick browsing experience
- Artists page
- Custom zaffa order form
- WhatsApp request flow
- User guide page
- Responsive mobile layout
- Mobile navigation menu
- Admin dashboard
- Admin orders management
- Admin songs and zaffat management
- Request tracking from dashboard
- Audio content management
- Content management for zaffat and platform data
- Public footer credit',
            'قمت بتطوير منصة عربية متجاوبة لزفات وشيلات الأفراح، تشمل أقسامًا منظمة للزفات والشيلات، تجربة تصفح سهلة، صفحات للفنانين، دليل استخدام، ونموذج طلب مخصص يجهّز تفاصيل الطلب ويرسلها عبر واتساب.

المميزات:
- موقع منشور لعميل حقيقي
- واجهة عربية RTL
- مكتبة زفات وشيلات أفراح
- تصفح حسب التصنيفات
- تجربة تصفح سريعة
- صفحة الفنانين
- نموذج طلب زفة مخصصة
- إرسال الطلب عبر واتساب
- صفحة دليل الاستخدام
- تصميم متجاوب للموبايل
- قائمة موبايل
- لوحة تحكم إدارية
- إدارة الطلبات من لوحة التحكم
- إدارة الأغاني والزفات
- تتبع طلبات العملاء
- إدارة المحتوى الصوتي
- إدارة محتوى الزفات وبيانات المنصة
- ظهور حقوق التطوير في الفوتر',
            '', '', -- role
            '', '', -- challenges
            'The result is a live client-ready platform that improves the presentation of wedding audio services, makes browsing easier for customers, and turns visitors into direct WhatsApp leads through a simple and focused request flow.',
            'النتيجة هي منصة منشورة وجاهزة للعميل تعرض خدمات الزفات بشكل احترافي، تسهّل تصفح العملاء، وتحول الزوار إلى طلبات مباشرة عبر واتساب من خلال مسار طلب بسيط وواضح.',
            '["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Responsive Design", "RTL Interface", "Audio Content Management", "WhatsApp Integration", "Admin Panel"]'::jsonb,
            'https://anghamzaffa.com/',
            'live',
            '/portfolio/projects/angham-zaffa-music/cover.png',
            true,
            true,
            2
        ) RETURNING id INTO v_project_id;
    ELSE
        UPDATE public.projects SET
            title_en = 'Angham Zaffa Music — Wedding Audio Request Platform',
            title_ar = 'أنغام ميوزك — منصة زفات وشيلات أفراح حسب الطلب',
            summary_en = 'A live client platform for browsing wedding zaffat and sheilat, exploring categorized audio collections, viewing artists, and sending custom zaffa requests through a streamlined WhatsApp order flow.',
            summary_ar = 'منصة منشورة لعميل تتيح تصفح الزفات والشيلات، استعراض الأقسام الصوتية، عرض الفنانين، وطلب زفة مخصصة عبر نموذج منظم مرتبط بواتساب.',
            problem_en = 'The client needed a professional online platform to present wedding audio works in organized categories, make it easy for visitors to find suitable zaffat, and convert visitors into direct WhatsApp requests without a complicated checkout process.',
            problem_ar = 'كان العميل بحاجة إلى منصة احترافية لعرض أعمال الزفات والشيلات ضمن أقسام منظمة، وتسهيل وصول الزائر إلى الزفة المناسبة، وتحويل الزوار إلى طلبات واتساب مباشرة بدون تعقيد في عملية الطلب.',
            solution_en = 'I developed a responsive Arabic wedding audio platform with categorized zaffa and sheila sections, a quick browsing experience, artists pages, user guidance content, and a dedicated custom order form that prepares request details and sends them through WhatsApp.

Features:
- Live client website
- Arabic RTL interface
- Wedding zaffat and sheilat library
- Category-based browsing
- Quick browsing experience
- Artists page
- Custom zaffa order form
- WhatsApp request flow
- User guide page
- Responsive mobile layout
- Mobile navigation menu
- Admin dashboard
- Admin orders management
- Admin songs and zaffat management
- Request tracking from dashboard
- Audio content management
- Content management for zaffat and platform data
- Public footer credit',
            solution_ar = 'قمت بتطوير منصة عربية متجاوبة لزفات وشيلات الأفراح، تشمل أقسامًا منظمة للزفات والشيلات، تجربة تصفح سهلة، صفحات للفنانين، دليل استخدام، ونموذج طلب مخصص يجهّز تفاصيل الطلب ويرسلها عبر واتساب.

المميزات:
- موقع منشور لعميل حقيقي
- واجهة عربية RTL
- مكتبة زفات وشيلات أفراح
- تصفح حسب التصنيفات
- تجربة تصفح سريعة
- صفحة الفنانين
- نموذج طلب زفة مخصصة
- إرسال الطلب عبر واتساب
- صفحة دليل الاستخدام
- تصميم متجاوب للموبايل
- قائمة موبايل
- لوحة تحكم إدارية
- إدارة الطلبات من لوحة التحكم
- إدارة الأغاني والزفات
- تتبع طلبات العملاء
- إدارة المحتوى الصوتي
- إدارة محتوى الزفات وبيانات المنصة
- ظهور حقوق التطوير في الفوتر',
            results_en = 'The result is a live client-ready platform that improves the presentation of wedding audio services, makes browsing easier for customers, and turns visitors into direct WhatsApp leads through a simple and focused request flow.',
            results_ar = 'النتيجة هي منصة منشورة وجاهزة للعميل تعرض خدمات الزفات بشكل احترافي، تسهّل تصفح العملاء، وتحول الزوار إلى طلبات مباشرة عبر واتساب من خلال مسار طلب بسيط وواضح.',
            tech_stack = '["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Responsive Design", "RTL Interface", "Audio Content Management", "WhatsApp Integration", "Admin Panel"]'::jsonb,
            live_url = 'https://anghamzaffa.com/',
            project_status = 'live',
            image_url = '/portfolio/projects/angham-zaffa-music/cover.png'
        WHERE id = v_project_id;
    END IF;

    -- Clear existing gallery for this project
    DELETE FROM public.project_images WHERE project_id = v_project_id;

    -- Insert gallery images
    INSERT INTO public.project_images (project_id, image_url, alt_ar, alt_en, caption_ar, caption_en, sort_order) VALUES
    (v_project_id, '/portfolio/projects/angham-zaffa-music/01-home.png', 'الصفحة الرئيسية وبداية تجربة منصة الزفات', 'Homepage and wedding audio platform introduction', 'الصفحة الرئيسية وبداية تجربة منصة الزفات', 'Homepage and wedding audio platform introduction', 1),
    (v_project_id, '/portfolio/projects/angham-zaffa-music/02-zaffat-library.png', 'مكتبة تصفح الزفات والشيلات', 'Zaffat and sheilat browsing library', 'مكتبة تصفح الزفات والشيلات', 'Zaffat and sheilat browsing library', 2),
    (v_project_id, '/portfolio/projects/angham-zaffa-music/03-order-form-top.png', 'نموذج طلب الزفة وتفاصيل العمل المختار', 'Custom zaffa order form and selected audio details', 'نموذج طلب الزفة وتفاصيل العمل المختار', 'Custom zaffa order form and selected audio details', 3),
    (v_project_id, '/portfolio/projects/angham-zaffa-music/04-order-form-bottom.png', 'تفاصيل الطلب ومسار الإرسال عبر واتساب', 'Order details and WhatsApp request flow', 'تفاصيل الطلب ومسار الإرسال عبر واتساب', 'Order details and WhatsApp request flow', 4),
    (v_project_id, '/portfolio/projects/angham-zaffa-music/05-artists-page.png', 'صفحة الفنانين وأعمال الزفات', 'Artists page for wedding audio works', 'صفحة الفنانين وأعمال الزفات', 'Artists page for wedding audio works', 5),
    (v_project_id, '/portfolio/projects/angham-zaffa-music/06-user-guide.png', 'صفحة دليل الاستخدام وشرح طريقة الطلب', 'User guide page explaining how to use the platform', 'صفحة دليل الاستخدام وشرح طريقة الطلب', 'User guide page explaining how to use the platform', 6),
    (v_project_id, '/portfolio/projects/angham-zaffa-music/07-mobile-home.png', 'تجربة الصفحة الرئيسية على الجوال', 'Mobile homepage experience', 'تجربة الصفحة الرئيسية على الجوال', 'Mobile homepage experience', 7),
    (v_project_id, '/portfolio/projects/angham-zaffa-music/08-mobile-menu.png', 'قائمة التنقل في الجوال', 'Mobile navigation menu', 'قائمة التنقل في الجوال', 'Mobile navigation menu', 8),
    (v_project_id, '/portfolio/projects/angham-zaffa-music/09-admin-dashboard.png', 'نظرة عامة على لوحة التحكم', 'Admin dashboard overview', 'نظرة عامة على لوحة التحكم', 'Admin dashboard overview', 9),
    (v_project_id, '/portfolio/projects/angham-zaffa-music/11-admin-orders.png', 'إدارة الطلبات وتتبع طلبات الزفات', 'Admin order management and request tracking', 'إدارة الطلبات وتتبع طلبات الزفات', 'Admin order management and request tracking', 10),
    (v_project_id, '/portfolio/projects/angham-zaffa-music/12-admin-songs.png', 'إدارة الأغاني والزفات من لوحة التحكم', 'Admin songs and zaffat content management', 'إدارة الأغاني والزفات من لوحة التحكم', 'Admin songs and zaffat content management', 11);

END $$;

NOTIFY pgrst, 'reload schema';

-- supabase/migrations/20260615000900_seed_art_lens_project.sql

DO $$
DECLARE
    v_project_id uuid;
BEGIN
    -- Check if project exists
    SELECT id INTO v_project_id FROM public.projects WHERE slug = 'art-lens' LIMIT 1;

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
            demo_video_url,
            project_status,
            image_url, 
            is_featured, 
            is_published, 
            sort_order
        ) VALUES (
            'art-lens',
            'Art Lens — Creative Portfolio & WhatsApp Booking Website',
            'عدسة الفن — موقع إبداعي لعرض الأعمال والحجز عبر واتساب',
            'A polished local WordPress creative website built for a photography and visual services brand, featuring a custom child theme, premium dark visual design, services, packages, portfolio showcase, and a direct WhatsApp booking flow.',
            'موقع WordPress محلي مصقول لعلامة متخصصة في التصوير والخدمات البصرية، مبني بقالب ابن مخصص، ويضم تصميمًا داكنًا فاخرًا، أقسام خدمات، باقات، معرض أعمال، ونموذج حجز مباشر عبر واتساب.',
            'Creative studios need more than a basic landing page. They need a fast, visually attractive website that showcases services, builds trust through previous work, explains packages clearly, and makes it easy for visitors to request a booking.',
            'تحتاج الاستوديوهات الإبداعية إلى أكثر من صفحة تعريفية بسيطة. فهي تحتاج إلى موقع سريع وجذاب بصريًا يعرض الخدمات، يبني الثقة من خلال الأعمال السابقة، يوضح الباقات، ويسهّل على الزائر طلب الحجز.',
            '', '', -- goal
            'I developed a lightweight WordPress website using a custom child theme instead of relying heavily on page-builder output. The website includes a cinematic hero section, services grid, filtered portfolio showcase, pricing packages, and a custom Arabic booking form that prepares the request and sends it through WhatsApp.

Features:
- WordPress creative website
- Custom child theme
- Premium dark visual design
- Arabic RTL interface
- Cinematic hero section
- Services section
- Portfolio/work showcase
- Category-filtered gallery
- Pricing packages
- Testimonials section
- Custom booking form
- WhatsApp booking flow
- Responsive mobile layout
- Lightweight front-page implementation',
            'قمت بتطوير موقع WordPress خفيف باستخدام قالب ابن مخصص بدل الاعتماد الكامل على أدوات بناء الصفحات الثقيلة. يحتوي الموقع على واجهة رئيسية سينمائية، شبكة خدمات، معرض أعمال مفلتر، باقات أسعار، ونموذج حجز عربي يجهّز تفاصيل الطلب ويرسلها عبر واتساب.

المميزات:
- موقع إبداعي باستخدام WordPress
- قالب ابن مخصص
- تصميم داكن فاخر
- واجهة عربية RTL
- واجهة رئيسية سينمائية
- قسم الخدمات
- معرض أعمال
- فلترة تصنيفات الأعمال
- قسم الباقات
- قسم آراء العملاء
- نموذج حجز مخصص
- إرسال الحجز عبر واتساب
- تصميم متجاوب للموبايل
- تنفيذ خفيف للصفحة الرئيسية',
            '', '', -- role
            '', '', -- challenges
            'The result is a premium local demo website that presents the brand professionally, improves the clarity of its services and packages, and reduces booking friction through a direct WhatsApp request flow.',
            'النتيجة هي نسخة تجريبية محلية فاخرة تعرض العلامة بشكل احترافي، توضّح الخدمات والباقات، وتقلل خطوات الحجز من خلال إرسال الطلب مباشرة عبر واتساب.',
            '["WordPress", "PHP", "Custom Child Theme", "HTML5", "CSS3", "JavaScript", "Responsive Design", "RTL Interface", "Google Fonts", "FontAwesome", "WhatsApp Integration"]'::jsonb,
            NULL,
            NULL,
            'local_demo',
            '/portfolio/projects/art-lens/cover.png',
            true,
            true,
            3
        ) RETURNING id INTO v_project_id;
    ELSE
        UPDATE public.projects SET
            title_en = 'Art Lens — Creative Portfolio & WhatsApp Booking Website',
            title_ar = 'عدسة الفن — موقع إبداعي لعرض الأعمال والحجز عبر واتساب',
            summary_en = 'A polished local WordPress creative website built for a photography and visual services brand, featuring a custom child theme, premium dark visual design, services, packages, portfolio showcase, and a direct WhatsApp booking flow.',
            summary_ar = 'موقع WordPress محلي مصقول لعلامة متخصصة في التصوير والخدمات البصرية، مبني بقالب ابن مخصص، ويضم تصميمًا داكنًا فاخرًا، أقسام خدمات، باقات، معرض أعمال، ونموذج حجز مباشر عبر واتساب.',
            problem_en = 'Creative studios need more than a basic landing page. They need a fast, visually attractive website that showcases services, builds trust through previous work, explains packages clearly, and makes it easy for visitors to request a booking.',
            problem_ar = 'تحتاج الاستوديوهات الإبداعية إلى أكثر من صفحة تعريفية بسيطة. فهي تحتاج إلى موقع سريع وجذاب بصريًا يعرض الخدمات، يبني الثقة من خلال الأعمال السابقة، يوضح الباقات، ويسهّل على الزائر طلب الحجز.',
            solution_en = 'I developed a lightweight WordPress website using a custom child theme instead of relying heavily on page-builder output. The website includes a cinematic hero section, services grid, filtered portfolio showcase, pricing packages, and a custom Arabic booking form that prepares the request and sends it through WhatsApp.

Features:
- WordPress creative website
- Custom child theme
- Premium dark visual design
- Arabic RTL interface
- Cinematic hero section
- Services section
- Portfolio/work showcase
- Category-filtered gallery
- Pricing packages
- Testimonials section
- Custom booking form
- WhatsApp booking flow
- Responsive mobile layout
- Lightweight front-page implementation',
            solution_ar = 'قمت بتطوير موقع WordPress خفيف باستخدام قالب ابن مخصص بدل الاعتماد الكامل على أدوات بناء الصفحات الثقيلة. يحتوي الموقع على واجهة رئيسية سينمائية، شبكة خدمات، معرض أعمال مفلتر، باقات أسعار، ونموذج حجز عربي يجهّز تفاصيل الطلب ويرسلها عبر واتساب.

المميزات:
- موقع إبداعي باستخدام WordPress
- قالب ابن مخصص
- تصميم داكن فاخر
- واجهة عربية RTL
- واجهة رئيسية سينمائية
- قسم الخدمات
- معرض أعمال
- فلترة تصنيفات الأعمال
- قسم الباقات
- قسم آراء العملاء
- نموذج حجز مخصص
- إرسال الحجز عبر واتساب
- تصميم متجاوب للموبايل
- تنفيذ خفيف للصفحة الرئيسية',
            results_en = 'The result is a premium local demo website that presents the brand professionally, improves the clarity of its services and packages, and reduces booking friction through a direct WhatsApp request flow.',
            results_ar = 'النتيجة هي نسخة تجريبية محلية فاخرة تعرض العلامة بشكل احترافي، توضّح الخدمات والباقات، وتقلل خطوات الحجز من خلال إرسال الطلب مباشرة عبر واتساب.',
            tech_stack = '["WordPress", "PHP", "Custom Child Theme", "HTML5", "CSS3", "JavaScript", "Responsive Design", "RTL Interface", "Google Fonts", "FontAwesome", "WhatsApp Integration"]'::jsonb,
            live_url = NULL,
            demo_video_url = NULL,
            project_status = 'local_demo',
            image_url = '/portfolio/projects/art-lens/cover.png'
        WHERE id = v_project_id;
    END IF;

    -- Clear existing gallery for this project
    DELETE FROM public.project_images WHERE project_id = v_project_id;

    -- Insert gallery images
    INSERT INTO public.project_images (project_id, image_url, alt_en, alt_ar, caption_en, caption_ar, sort_order) VALUES
    (v_project_id, '/portfolio/projects/art-lens/01-home.png', 'Homepage and cinematic creative brand introduction', 'الصفحة الرئيسية وبداية التجربة البصرية للعلامة', 'Homepage and cinematic creative brand introduction', 'الصفحة الرئيسية وبداية التجربة البصرية للعلامة', 1),
    (v_project_id, '/portfolio/projects/art-lens/02-services.png', 'Photography and creative services section', 'قسم خدمات التصوير والخدمات الإبداعية', 'Photography and creative services section', 'قسم خدمات التصوير والخدمات الإبداعية', 2),
    (v_project_id, '/portfolio/projects/art-lens/03-packages.png', 'Structured pricing packages', 'باقات أسعار منظمة وواضحة', 'Structured pricing packages', 'باقات أسعار منظمة وواضحة', 3),
    (v_project_id, '/portfolio/projects/art-lens/04-booking-form.png', 'Custom WhatsApp booking form', 'نموذج حجز مخصص عبر واتساب', 'Custom WhatsApp booking form', 'نموذج حجز مخصص عبر واتساب', 4),
    (v_project_id, '/portfolio/projects/art-lens/05-portfolio-work.png', 'Filtered portfolio and work showcase', 'معرض أعمال مفلتر لعرض النماذج الإبداعية', 'Filtered portfolio and work showcase', 'معرض أعمال مفلتر لعرض النماذج الإبداعية', 5);

END $$;

NOTIFY pgrst, 'reload schema';

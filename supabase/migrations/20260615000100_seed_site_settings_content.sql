DO $$
DECLARE
    v_id uuid;
BEGIN
    -- Try to find the active row
    SELECT id INTO v_id FROM public.site_settings WHERE is_active = true LIMIT 1;

    IF v_id IS NOT NULL THEN
        UPDATE public.site_settings
        SET 
            owner_name_en = 'Hani Alshami',
            owner_name_ar = 'هاني الشامي',
            job_title_en = 'Full Stack Web Developer',
            job_title_ar = 'مطور ويب متكامل',
            hero_headline_en = 'Building Secure, Scalable Web Solutions for Modern Businesses',
            hero_headline_ar = 'أبني حلول ويب آمنة وقابلة للتوسع للأعمال الحديثة',
            hero_subtitle_en = 'I help businesses turn ideas into professional websites, admin dashboards, and digital systems built with clean code, strong performance, and a premium user experience.',
            hero_subtitle_ar = 'أساعد الشركات والأفراد على تحويل الأفكار إلى مواقع احترافية، لوحات تحكم، وأنظمة رقمية مبنية بكود نظيف، أداء قوي، وتجربة استخدام راقية.',
            short_bio_en = 'I am a Full Stack Web Developer specializing in building modern websites, admin dashboards, business systems, and scalable web applications using Laravel, PHP, MySQL, Next.js, Supabase, and modern frontend technologies. My focus is not only writing code, but delivering reliable digital solutions that help businesses work faster, look more professional, and grow with confidence.',
            short_bio_ar = 'أنا مطور ويب متكامل متخصص في بناء المواقع الحديثة، لوحات التحكم، أنظمة الأعمال، وتطبيقات الويب القابلة للتوسع باستخدام Laravel وPHP وMySQL وNext.js وSupabase وتقنيات الواجهة الحديثة. لا أركز فقط على كتابة الكود، بل على تقديم حلول رقمية موثوقة تساعد الأعمال على العمل بسرعة أكبر، والظهور بشكل احترافي، والنمو بثقة.',
            primary_cta_en = 'Start a Project',
            primary_cta_ar = 'ابدأ مشروعك',
            secondary_cta_en = 'View My Work',
            secondary_cta_ar = 'شاهد أعمالي',
            location_en = 'Yemen — Available Remotely',
            location_ar = 'اليمن — متاح للعمل عن بُعد',
            email = 'hani.websolutions@gmail.com',
            whatsapp = '+967 776962035',
            phone = '+967 776962035',
            github_url = 'https://github.com/hanialiAlshami',
            linkedin_url = 'https://www.linkedin.com/in/hani-alshami-9ba227403',
            facebook_url = NULL,
            instagram_url = NULL,
            x_url = NULL,
            
            about_eyebrow_en = 'About Me',
            about_eyebrow_ar = 'نبذة عني',
            about_title_en = 'A Developer Who Builds Business-Ready Web Solutions',
            about_title_ar = 'مطور يبني حلول ويب جاهزة للأعمال',
            about_subtitle_en = 'I combine technical development, clean architecture, and business-focused thinking to create websites and systems that are not only beautiful, but practical, secure, and ready for real use.',
            about_subtitle_ar = 'أجمع بين البرمجة الاحترافية، البنية النظيفة، والتفكير الموجّه للأعمال لبناء مواقع وأنظمة ليست جميلة فقط، بل عملية، آمنة، وجاهزة للاستخدام الحقيقي.',
            about_story_en = 'My work focuses on helping clients move from scattered ideas to complete digital products. Whether it is a portfolio website, an admin dashboard, a business management system, or a custom web application, I build solutions with attention to performance, security, usability, and long-term maintainability.

I believe a professional website should do more than look good. It should explain your value, build trust, guide visitors clearly, and support your business goals. That is why I approach every project as both a developer and a problem solver.',
            about_story_ar = 'يرتكز عملي على مساعدة العملاء في تحويل الأفكار المتفرقة إلى منتجات رقمية مكتملة. سواء كان المشروع موقعًا تعريفيًا، لوحة تحكم، نظام إدارة أعمال، أو تطبيق ويب مخصص، فأنا أبني الحلول مع التركيز على الأداء، الأمان، سهولة الاستخدام، وقابلية التطوير على المدى الطويل.

أؤمن أن الموقع الاحترافي لا يجب أن يكون جميلًا فقط، بل يجب أن يشرح قيمتك، يبني الثقة، يوجه الزائر بوضوح، ويدعم أهداف عملك. لذلك أتعامل مع كل مشروع كمطور وكحلّال مشاكل في نفس الوقت.',
            about_focus_en = 'I specialize in Laravel, PHP, MySQL, Next.js, Supabase, admin dashboards, API integrations, and custom business systems. My goal is to build solutions that are clear for users, easy for admins, and strong enough to support real business operations.',
            about_focus_ar = 'أتخصص في Laravel وPHP وMySQL وNext.js وSupabase ولوحات التحكم وتكاملات API وأنظمة الأعمال المخصصة. هدفي هو بناء حلول واضحة للمستخدمين، سهلة للإدارة، وقوية بما يكفي لدعم تشغيل الأعمال بشكل حقيقي.',
            about_trust_title_en = 'Why Clients Work With Me',
            about_trust_title_ar = 'لماذا يختارني العملاء',
            about_trust_description_en = 'Clients work with me because I focus on reliable systems, clear user experience, and clean code that can grow with the business instead of becoming a technical burden later.',
            about_trust_description_ar = 'يختارني العملاء لأنني أركز على بناء أنظمة موثوقة، وتجربة استخدام واضحة، وكود نظيف قابل للتطوير بدلًا من أن يتحول المشروع إلى عبء تقني لاحقًا.',
            
            about_value_1_title_en = 'Clean Architecture',
            about_value_1_title_ar = 'بنية نظيفة',
            about_value_1_description_en = 'I build projects with organized structure, reusable components, and maintainable code that developers can understand and improve later.',
            about_value_1_description_ar = 'أبني المشاريع ببنية منظمة، ومكونات قابلة لإعادة الاستخدام، وكود سهل الصيانة يمكن فهمه وتطويره لاحقًا.',
            
            about_value_2_title_en = 'Business Focus',
            about_value_2_title_ar = 'تركيز على الأعمال',
            about_value_2_description_en = 'Every feature is designed to support a real business goal, improve workflow, or create a better experience for users.',
            about_value_2_description_ar = 'كل ميزة يتم تصميمها لدعم هدف عملي حقيقي، تحسين سير العمل، أو تقديم تجربة أفضل للمستخدمين.',
            
            about_value_3_title_en = 'Secure Development',
            about_value_3_title_ar = 'تطوير آمن',
            about_value_3_description_en = 'I care about authentication, permissions, validation, file uploads, and protecting sensitive data from the beginning of the project.',
            about_value_3_description_ar = 'أهتم بتسجيل الدخول، الصلاحيات، التحقق من البيانات، رفع الملفات، وحماية المعلومات الحساسة منذ بداية المشروع.',
            
            about_value_4_title_en = 'Long-Term Quality',
            about_value_4_title_ar = 'جودة طويلة المدى',
            about_value_4_description_en = 'I build systems that are easy to expand, deploy, improve, and maintain as the business grows.',
            about_value_4_description_ar = 'أبني أنظمة يسهل توسيعها، نشرها، تحسينها، وصيانتها مع نمو العمل.'
        WHERE id = v_id;
    ELSE
        INSERT INTO public.site_settings (
            owner_name_en, owner_name_ar, job_title_en, job_title_ar,
            hero_headline_en, hero_headline_ar, hero_subtitle_en, hero_subtitle_ar,
            short_bio_en, short_bio_ar, primary_cta_en, primary_cta_ar, secondary_cta_en, secondary_cta_ar,
            location_en, location_ar, email, whatsapp, phone, github_url, linkedin_url,
            about_eyebrow_en, about_eyebrow_ar, about_title_en, about_title_ar,
            about_subtitle_en, about_subtitle_ar, about_story_en, about_story_ar,
            about_focus_en, about_focus_ar, about_trust_title_en, about_trust_title_ar,
            about_trust_description_en, about_trust_description_ar,
            about_value_1_title_en, about_value_1_title_ar, about_value_1_description_en, about_value_1_description_ar,
            about_value_2_title_en, about_value_2_title_ar, about_value_2_description_en, about_value_2_description_ar,
            about_value_3_title_en, about_value_3_title_ar, about_value_3_description_en, about_value_3_description_ar,
            about_value_4_title_en, about_value_4_title_ar, about_value_4_description_en, about_value_4_description_ar,
            is_active
        ) VALUES (
            'Hani Alshami', 'هاني الشامي', 'Full Stack Web Developer', 'مطور ويب متكامل',
            'Building Secure, Scalable Web Solutions for Modern Businesses', 'أبني حلول ويب آمنة وقابلة للتوسع للأعمال الحديثة',
            'I help businesses turn ideas into professional websites, admin dashboards, and digital systems built with clean code, strong performance, and a premium user experience.', 'أساعد الشركات والأفراد على تحويل الأفكار إلى مواقع احترافية، لوحات تحكم، وأنظمة رقمية مبنية بكود نظيف، أداء قوي، وتجربة استخدام راقية.',
            'I am a Full Stack Web Developer specializing in building modern websites, admin dashboards, business systems, and scalable web applications using Laravel, PHP, MySQL, Next.js, Supabase, and modern frontend technologies. My focus is not only writing code, but delivering reliable digital solutions that help businesses work faster, look more professional, and grow with confidence.', 'أنا مطور ويب متكامل متخصص في بناء المواقع الحديثة، لوحات التحكم، أنظمة الأعمال، وتطبيقات الويب القابلة للتوسع باستخدام Laravel وPHP وMySQL وNext.js وSupabase وتقنيات الواجهة الحديثة. لا أركز فقط على كتابة الكود، بل على تقديم حلول رقمية موثوقة تساعد الأعمال على العمل بسرعة أكبر، والظهور بشكل احترافي، والنمو بثقة.',
            'Start a Project', 'ابدأ مشروعك', 'View My Work', 'شاهد أعمالي',
            'Yemen — Available Remotely', 'اليمن — متاح للعمل عن بُعد', 'hani.websolutions@gmail.com', '+967 776962035', '+967 776962035',
            'https://github.com/hanialiAlshami', 'https://www.linkedin.com/in/hani-alshami-9ba227403',
            'About Me', 'نبذة عني', 'A Developer Who Builds Business-Ready Web Solutions', 'مطور يبني حلول ويب جاهزة للأعمال',
            'I combine technical development, clean architecture, and business-focused thinking to create websites and systems that are not only beautiful, but practical, secure, and ready for real use.', 'أجمع بين البرمجة الاحترافية، البنية النظيفة، والتفكير الموجّه للأعمال لبناء مواقع وأنظمة ليست جميلة فقط، بل عملية، آمنة، وجاهزة للاستخدام الحقيقي.',
            'My work focuses on helping clients move from scattered ideas to complete digital products. Whether it is a portfolio website, an admin dashboard, a business management system, or a custom web application, I build solutions with attention to performance, security, usability, and long-term maintainability.

I believe a professional website should do more than look good. It should explain your value, build trust, guide visitors clearly, and support your business goals. That is why I approach every project as both a developer and a problem solver.', 'يرتكز عملي على مساعدة العملاء في تحويل الأفكار المتفرقة إلى منتجات رقمية مكتملة. سواء كان المشروع موقعًا تعريفيًا، لوحة تحكم، نظام إدارة أعمال، أو تطبيق ويب مخصص، فأنا أبني الحلول مع التركيز على الأداء، الأمان، سهولة الاستخدام، وقابلية التطوير على المدى الطويل.

أؤمن أن الموقع الاحترافي لا يجب أن يكون جميلًا فقط، بل يجب أن يشرح قيمتك، يبني الثقة، يوجه الزائر بوضوح، ويدعم أهداف عملك. لذلك أتعامل مع كل مشروع كمطور وكحلّال مشاكل في نفس الوقت.',
            'I specialize in Laravel, PHP, MySQL, Next.js, Supabase, admin dashboards, API integrations, and custom business systems. My goal is to build solutions that are clear for users, easy for admins, and strong enough to support real business operations.', 'أتخصص في Laravel وPHP وMySQL وNext.js وSupabase ولوحات التحكم وتكاملات API وأنظمة الأعمال المخصصة. هدفي هو بناء حلول واضحة للمستخدمين، سهلة للإدارة، وقوية بما يكفي لدعم تشغيل الأعمال بشكل حقيقي.',
            'Why Clients Work With Me', 'لماذا يختارني العملاء',
            'Clients work with me because I focus on reliable systems, clear user experience, and clean code that can grow with the business instead of becoming a technical burden later.', 'يختارني العملاء لأنني أركز على بناء أنظمة موثوقة، وتجربة استخدام واضحة، وكود نظيف قابل للتطوير بدلًا من أن يتحول المشروع إلى عبء تقني لاحقًا.',
            'Clean Architecture', 'بنية نظيفة', 'I build projects with organized structure, reusable components, and maintainable code that developers can understand and improve later.', 'أبني المشاريع ببنية منظمة، ومكونات قابلة لإعادة الاستخدام، وكود سهل الصيانة يمكن فهمه وتطويره لاحقًا.',
            'Business Focus', 'تركيز على الأعمال', 'Every feature is designed to support a real business goal, improve workflow, or create a better experience for users.', 'كل ميزة يتم تصميمها لدعم هدف عملي حقيقي، تحسين سير العمل، أو تقديم تجربة أفضل للمستخدمين.',
            'Secure Development', 'تطوير آمن', 'I care about authentication, permissions, validation, file uploads, and protecting sensitive data from the beginning of the project.', 'أهتم بتسجيل الدخول، الصلاحيات، التحقق من البيانات، رفع الملفات، وحماية المعلومات الحساسة منذ بداية المشروع.',
            'Long-Term Quality', 'جودة طويلة المدى', 'I build systems that are easy to expand, deploy, improve, and maintain as the business grows.', 'أبني أنظمة يسهل توسيعها، نشرها، تحسينها، وصيانتها مع نمو العمل.',
            true
        );
    END IF;
END $$;

NOTIFY pgrst, 'reload schema';

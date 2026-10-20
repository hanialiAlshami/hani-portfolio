-- supabase/migrations/20261019183259_seed_qarmzi_series_project.sql

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

NOTIFY pgrst, 'reload schema';

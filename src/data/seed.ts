import { Project, Service, Skill, SkillCategory, ResumeSection, ProjectCategory } from '../types';

export const projectCategories: ProjectCategory[] = [
  { id: '1', slug: 'web-apps', name: { en: 'Web Applications', ar: 'تطبيقات الويب' } },
  { id: '2', slug: 'e-commerce', name: { en: 'E-Commerce', ar: 'التجارة الإلكترونية' } },
  { id: '3', slug: 'apis', name: { en: 'APIs & Backend', ar: 'واجهات برمجية وخلفيات' } },
];

export const projects: Project[] = [
  {
    id: 'p-atco-tracking-portal',
    slug: 'atco-tracking-portal',
    title: {
      en: 'ATCo — Live Shipment Tracking Portal & Partners Marquee',
      ar: 'الشركة العربية للتجارة — بوابة تتبّع الشحنات الحيّة وشريط الشركاء',
    },
    summary: {
      en: 'A production WordPress/WooCommerce platform for an import-export group, extended with a live shipment-tracking portal that resolves any consignment number into full status, dates, cargo and shipper/receiver records, plus an infinite RTL partners marquee that cycles sixteen client logos across two rows — both served from the company’s live Arabic storefront.',
      ar: 'منصة WordPress/WooCommerce إنتاجية لمجموعة استيراد وتصدير، موسّعة ببوابة تتبّع شحنات حيّة تحوّل أي رقم شحنة إلى حالة كاملة وتواريخ وشحونة وسجلّات شاحن ومستلم، إضافة إلى شريط شركاء RTL لا نهائي يعرض ستة عشر شعار عميل على صفين — وكلاهما يعمل على واجهة الشركة العربية الحيّة.',
    },
    problem: {
      en: 'Customers tracking a consignment hit a page that returned only a bare status line: shipment dates, cargo details, package dimensions and the shipper/receiver blocks were silently missing, so every enquiry fell back to a phone call or WhatsApp message. In parallel, the company’s sixteen partner logos sat as a static row that only displayed correctly on large screens, cutting off on mobile and never signalling the breadth of the client base.',
      ar: 'كان العملاء الذين يتتبّعون شحنة يواجهون صفحة لا تُعيد سوى سطر حالة مجرّد: تواريخ الشحن وتفاصيل الشحونة وأبعاد الطرود وكتل الشاحن والمستلم كانت مفقودة صامتة، فانتهى كل استفسار إلى مكالمة هاتفية أو رسالة واتساب. وبالتوازي، كانت شعارات الشركاء الستة عشر مصفوفة في صف ثابت لا يظهر بشكل صحيح إلا على الشاشات الكبيرة، فينقطع على الجوال ولا يعكس أبداً اتّساع قاعدة العملاء.',
    },
    goal: {
      en: 'Deliver one live Arabic portal that (1) renders a complete, print-ready tracking result for any consignment number — status, origin, destination, carrier, dates, cargo, packages and both parties, (2) survives the company’s slow shared hosting and its lazy-load stack, (3) presents all sixteen partner logos in a continuous RTL marquee that stays legible from 1920px down to 390px, and (4) ships without breaking the existing WooCommerce checkout or the bilingual routing.',
      ar: 'تسليم بوابة عربية حيّة واحدة (1) تُعرض نتيجة تتبّع كاملة قابلة للطباعة لأي رقم شحنة — الحالة والمنشأ والوجهة والناقل والتواريخ والشحونة والطرود والطرفان، (2) وتصمد أمام الاستضافة المشتركة البطيئة ومنظومة التحميل الكسول، (3) وتعرض الشعارات الستة عشر كشريط RTL متواصل يبقى مقروءاً من 1920 بكسل حتى 390 بكسل، (4) وتُنشر دون كسر دفع WooCommerce القائم ولا التوجيه ثنائي اللغة.',
    },
    solution: {
      en: 'The tracking layout was rebuilt against the WP-Cargo data model so every field the API returns is now surfaced: a status banner, an origin/destination/carrier info grid, the full cargo row, a multi-package table with per-package dimensions and weight, a shipper/receiver column pair and a chronological shipment-history table — the whole result wrapped in a print container. The partners marquee is a dedicated plugin that injects a double-row track of sixteen client logos as lazily-deferred CSS background images with a CSS keyframe drift, so it animates continuously without layout thrash and degrades cleanly when JavaScript is absent. Because the production host is slow, image payloads are deferred and decoded before paint, and every screen was verified at 1920×1080 and 390×844 with automated blank-frame and PII-leak gates.',
      ar: 'أُعيد بناء تصميم التتبّع وفق نموذج بيانات WP-Cargo بحيث أصبح كل حقل تعيده الواجهة ظاهراً: شريط الحالة، وشبكة معلومات المنشأ والوجهة والناقل، وصف الشحونة الكامل، وجدول طرود متعدّد الأبعاد والوزن لكل طرد، وعمودا الشاحن والمستلم، وجدول تاريخ شحن زمني — مع تغليف النتيجة كاملة في حاوية طباعة. وشريط الشركاء إضافة مستقلة تحقن مساراً مزدوجاً من ستة عشر شعار عميل كصور CSS خلفية مؤجّلة مع حركة keyframe، فيتحرّك بلا استنزاف التخطيط ويعمل بلا JavaScript. ولأن الاستضافة الإنتاجية بطيئة، تُؤجَّل حمولات الصور وتُفكّ قبل الرسم، وتحقّقت من كل شاشة بدقة 1920×1080 و390×844 مع بوابات آلية لكشف الإطارات الفارغة وتسريب البيانات الشخصية.',
    },
    role: {
      en: 'Full-Stack Developer — tracking template refactor, WP-Cargo data mapping, partners marquee plugin, RTL styling, performance tuning and capture-based QA',
      ar: 'مطور ويب شامل — إعادة هيكلة قالب التتبّع، وربط بيانات WP-Cargo، وإضافة شريط الشركاء، وتنسيق RTL، وضبط الأداء، وضمان الجودة القائم على اللقطات',
    },
    challenges: {
      en: 'The hardest constraint was a host that never finishes loading. The document-ready event could not complete within 120 seconds and individual image requests hung for 30–60 seconds, so a naïve screenshot pipeline produced half-painted pages. Solved it by measuring network quiescence instead of trusting the load event, deferring every non-critical image, force-decoding the sixteen marquee logos before capture and gating each frame on a decoded-pixel check rather than on request completion. The second dilemma was selective privacy: the receiver’s name, street address and phone number must never appear in a published case study while the rest of the tracking record stays fully visible, so the masking step is scoped to a single node and an automated scan then asserts the receiver values do not leak anywhere else in the DOM.',
      ar: 'كان أصعب قيد هو خادم لا يكمل التحميل أبداً: لم يكتمل حدث جاهزية المستند خلال 120 ثانية، وعلقت طلبات صور فردية 30–60 ثانية، فأنتج خط لقطات ساذج صفحات نصف مرسومة. حُلّت المشكلة بقياس هدوء الشبكة بدل الوثوق بحدث التحميل، وتأجيل كل صورة غير حرجة، وإجبار فكّ الشعارات الستة عشر قبل اللقطة، وربط كل إطار بفحص بكسلات مفكوكة بدل اكتمال الطلب. والمعضلة الثانية كانت خصوصية انتقائية: يجب ألا يظهر اسم المستلم وعنوانه ورقمه في دراسة حالة منشورة مع بقاء سجل التتبّع كاملاً ظاهراً، لذا اقتصر التمويه على عقدة واحدة، ثم أكّد فحص آلي عدم تسرّب قيم المستلم في أي موضع آخر من الصفحة.',
    },
    results: {
      en: 'Shipped a live Arabic tracking portal where any consignment resolves to a complete, print-ready record, and a partners marquee that presents all sixteen client logos in continuous motion on desktop and mobile alike. Verified end-to-end on a live consignment (delivered, with origin, destination, carrier, cargo, packages and full history all rendering), confirmed sixteen of sixteen logos painted and decoded on both 1920×1080 and 390×844, captured a documented screenshot set with zero blank frames, zero broken images and zero horizontal overflow, and validated that the receiver data stayed masked with no PII leakage.',
      ar: 'أُطلق موقع حيّ لبوابة تتبّع عربية يتحول فيه أي رقم شحنة إلى سجل كامل قابل للطباعة، مع شريط شركاء يعرض الشعارات الستة عشر في حركة مستمرة على سطح المكتب والجوال معاً. تم التحقق من البداية للنهاية على شحنة حيّة (تم التسليم، مع ظهور المنشأ والوجهة والناقل والشحونة والطرود والتاريخ الكامل)، وتأكيد طبع وفكّ ستة عشر شعاراً من ستة عشر بدقة 1920×1080 و390×844، والتقاط مجموعة لقطات موثّقة بصفر إطارات فارغة وصفر صور معطوبة وصفر تجاوز أفقي، والتحقق من بقاء بيانات المستلم مموّهة بلا تسريب.',
    },
    techStack: ['WordPress', 'WooCommerce', 'PHP 8.2', 'WP-Cargo', 'Elementor Pro', 'Polylang', 'TranslatePress', 'jQuery', 'MySQL', 'CSS Grid & Flexbox', 'CSS At-Rules'],
    liveUrl: 'https://arabiatradingco.com/ar/',
    githubUrl: '',
    demoVideoUrl: '',
    projectStatus: 'live',
    projectLanguages: ['PHP', 'JavaScript', 'HTML', 'CSS', 'SQL'],
    projectFrameworks: ['WordPress', 'WooCommerce', 'Elementor Pro', 'WP-Cargo', 'Polylang'],
    projectTools: ['MySQL', 'WP-CLI', 'Playwright', 'Hyperframes', 'WP Fastest Cache', 'WP Smush'],
    projectPlatforms: ['Web App', 'Arabic RTL', 'Logistics Portal', 'Responsive Web', 'Print Ready'],
    isFeatured: true,
    categoryIds: ['1', '3'],
    imageUrl: '/portfolio/projects/atco-tracking-portal/cover.png',
    order: 1,
    gallery: [
      {
        id: 'atco-1',
        projectId: 'p-atco-tracking-portal',
        imageUrl: '/portfolio/projects/atco-tracking-portal/cover.png',
        alt: { en: 'Arabic Storefront Homepage Hero', ar: 'الواجهة الترحيبية للموقع العربي' },
        caption: { en: 'RTL hero with the ATCo identity and primary navigation', ar: 'واجهة RTL تحمل هوية الشركة العربية للتجارة والقائمة الرئيسية' },
        sortOrder: 1,
      },
      {
        id: 'atco-2',
        projectId: 'p-atco-tracking-portal',
        imageUrl: '/portfolio/projects/atco-tracking-portal/01-home.png',
        alt: { en: 'Homepage Import & Export Showcase', ar: 'قسم الاستيراد والتصدير في الرئيسية' },
        caption: { en: 'Trade and logistics service cards leading into the portal', ar: 'بطاقات خدمات التجارة واللوجستيات الموصلة إلى البوابة' },
        sortOrder: 2,
      },
      {
        id: 'atco-3',
        projectId: 'p-atco-tracking-portal',
        imageUrl: '/portfolio/projects/atco-tracking-portal/02-features.png',
        alt: { en: 'Import & Export Services Grid', ar: 'شبكة خدمات الاستيراد والتصدير' },
        caption: { en: 'Service catalogue covering import, export, marketing and logistics', ar: 'كتالوج الخدمات الذي يغطي الاستيراد والتصدير والتسويق والخدمات اللوجستية' },
        sortOrder: 3,
      },
      {
        id: 'atco-4',
        projectId: 'p-atco-tracking-portal',
        imageUrl: '/portfolio/projects/atco-tracking-portal/03-search-filter.png',
        alt: { en: 'Partners Marquee — Sixteen Client Logos', ar: 'شريط الشركاء — ستة عشر شعار عميل' },
        caption: { en: 'Continuous RTL marquee cycling sixteen partner logos across two rows', ar: 'شريط RTL متواصل يبدّل ستة عشر شعار شريك على صفين' },
        sortOrder: 4,
      },
      {
        id: 'atco-5',
        projectId: 'p-atco-tracking-portal',
        imageUrl: '/portfolio/projects/atco-tracking-portal/04-details.png',
        alt: { en: 'Shipment Details Record', ar: 'سجل تفاصيل الشحنة' },
        caption: { en: 'Status banner, origin/destination/carrier grid and full cargo record', ar: 'شريط الحالة وشبكة المنشأ والوجهة والناقل وسجل الشحونة الكامل' },
        sortOrder: 5,
      },
      {
        id: 'atco-6',
        projectId: 'p-atco-tracking-portal',
        imageUrl: '/portfolio/projects/atco-tracking-portal/05-action.png',
        alt: { en: 'Shipment Tracking Lookup', ar: 'الاستعلام عن شحنة' },
        caption: { en: 'Tracking lookup where any consignment number resolves to a full record', ar: 'استعلام التتبّع حيث يتحول أي رقم شحنة إلى سجل كامل' },
        sortOrder: 6,
      },
      {
        id: 'atco-7',
        projectId: 'p-atco-tracking-portal',
        imageUrl: '/portfolio/projects/atco-tracking-portal/06-admin.png',
        alt: { en: 'Contact & Enquiry Section', ar: 'قسم التواصل والاستفسار' },
        caption: { en: 'Enquiry section and footer navigation closing the portal experience', ar: 'قسم الاستفسار وقائمة التذييل التي تُغلق تجربة البوابة' },
        sortOrder: 7,
      },
      {
        id: 'atco-8',
        projectId: 'p-atco-tracking-portal',
        imageUrl: '/portfolio/projects/atco-tracking-portal/07-history.png',
        alt: { en: 'Shipment History Timeline', ar: 'الجدول الزمني لتاريخ الشحن' },
        caption: { en: 'Chronological shipment history with location, status and notes', ar: 'تاريخ شحن زمني يعرض الموقع والحالة والملاحظات' },
        sortOrder: 8,
      },
    ],
  },
  {
    id: 'p-lumiere',
    slug: 'lumiere-boutique',
    title: {
      en: 'Lumière Boutique — Arabic RTL Storefront & Operations Dashboard',
      ar: 'لوميير بوتيك — واجهة متجر عربية RTL ولوحة تحكم تشغيلية',
    },
    summary: {
      en: 'A fully Arabic, RTL-first Laravel 12 storefront for a premium natural-food brand: a curated catalog with live search, category filters and four sort modes, a slide-over cart, wishlist and customer accounts, plus a bank-transfer checkout that captures the receipt — all steered from a role-based admin console for products, categories, orders, settings, activity logs and admins.',
      ar: 'واجهة متجر عربية RTL أولاً مبنية على Laravel 12 لعلامة أغذية طبيعية فاخرة: كتالوج منتقى مع بحث فوري وتصفية حسب التصنيف وأربعة أنماط ترتيب، وسلة منسدلة، ومفضلة، وحسابات عملاء، ومسار شراء بالتحويل البنكي يلتقط الإيصال — يديرها كاملها لوحة تحكم صلاحياتية للمنتجات والتصنيفات والطلبات والإعدادات وسجل العمليات والمشرفين.',
    },
    problem: {
      en: 'Arabic-first boutiques get pushed onto templates that read poorly in RTL, hide product editing inside code, and turn every order into a manual chat. Without an operations console, stock, receipts and order status end up scattered across chats and spreadsheets, and there is no reliable record of who changed what.',
      ar: 'تُدفَع المتاجر العربية إلى قوالب جاهزة تُقرأ بشكل سيئ في RTL، وتخفي تعديل المنتجات داخل الكود، وتحوّل كل طلب إلى محادثة يدوية. وبدون لوحة تشغيل تتشتت المخزون والإيصالات وحالة الطلب بين المحادثات والجداول، ولا يوجد سجل موثوق لمن عدّل ماذا.',
    },
    goal: {
      en: 'Ship one Arabic storefront that (1) presents the catalog in clean RTL, (2) lets shoppers find a product in seconds through search, category filtering and four sort modes, (3) captures an order end-to-end with bank-transfer proof, (4) gives staff zero-code control over products, categories, images and order status, and (5) keeps an auditable trail of admin actions.',
      ar: 'بناء متجر عربي واحد (1) يعرض الكتالوج بواجهة RTL نظيفة، (2) ويتيح للعميل إيجاد المنتج خلال ثوانٍ عبر البحث وتصفية التصنيفات وأربعة أنماط ترتيب، (3) ويلتقط الطلب من البداية للنهاية مع إثبات التحويل البنكي، (4) ويمنح الفريق تحكماً كاملاً دون كود بالمنتجات والتصنيفات والصور وحالة الطلب، (5) ويحفظ سجلاً قابلاً للتدقيق لعمليات المشرفين.',
    },
    solution: {
      en: 'Built on Laravel 12 with Blade, Tailwind CSS, Alpine.js and Vite, the app pairs a public storefront (home, catalog, product detail, about, contact, cart, checkout, privacy, terms, wishlist and a Breeze-authenticated account area) with an admin panel locked behind auth + admin middleware and a super_admin tier. Eloquent models cover products, categories, product images, carts, orders, order items, payments, wishlists, contact messages, settings and admin logs. Products carry localized columns plus weight, ingredients and allergens, and the product page renders 3D previews via google-model-viewer. Checkout records a bank-transfer receipt and returns through a signed success route, while a guarded storage route streams uploaded media over native php artisan serve.',
      ar: 'مبني على Laravel 12 مع Blade وTailwind CSS وAlpine.js وVite، يجمع التطبيق بين واجهة عامة (الرئيسية، الكتالوج، تفاصيل المنتج، من نحن، تواصل، السلة، الدفع، الخصوصية، الشروط، المفضلة ومنطقة حساب عبر Breeze) ولوحة تحكم محمية بوسيطَي auth وadmin مع رتبة super_admin. تغطي نماذج Eloquent المنتجات والتصنيفات وصور المنتجات والسلات والطلبات وبنود الطلب والمدفوعات والمفضلة ورسائل التواصل والإعدادات وسجل العمليات. تحمل المنتجات حقولاً مُعرّبة مع الوزن والمكونات والمسببات، وتُعرض في صفحة المنتج معاينة ثلاثية الأبعاد عبر google-model-viewer. ويسجّل الدفع إيصال التحويل البنكي ويعود عبر مسار نجاح مُوقّع، ويبثّ مسار تخزين محمي الوسائط المرفوعة أثناء تشغيل php artisan serve.',
    },
    role: {
      en: 'Full-Stack Developer — architecture, RTL storefront, checkout, admin dashboard and database design',
      ar: 'مطور ويب شامل — الهندسة، واجهة المتجر RTL، الدفع، لوحة التحكم وتصميم قاعدة البيانات',
    },
    challenges: {
      en: 'The real dilemma was media and money on a native Windows dev server. Product and receipt images sit behind Laravel storage, but symlinked files are not served by php artisan serve, so checkout receipts uploaded by customers rendered broken inside the admin panel. Solved it with an explicit, path-guarded /storage/{path} route that streams files by MIME type, while production relies on php artisan storage:link as documented in the delivery checklist. The second challenge was bilingual data behind an Arabic-only UI: localized product and category columns exist, yet the storefront ships RTL-Arabic after the language switcher was removed, so the UI and the data model had to stay in step without duplicating the catalog.',
      ar: 'كانت المعضلة الحقيقية في الوسائط والدفع على خادم تطوير ويندوز. صور المنتجات والإيصالات تقع خلف تخزين Laravel، لكن php artisan serve لا يخدم الملفات المربوطة اختصارياً، فظهرت إيصالات التحويل التي يرفعها العملاء معطوبة داخل لوحة التحكم. حُلّت المشكلة بمسار /storage/{path} محمي ومقيّد بالمسار يبثّ الملفات حسب نوع MIME، بينما يعتمد الإنتاج على php artisan storage:link كما هو موثق في قائمة التسليم. والتحدي الثاني كان ثنائية بيانات خلف واجهة عربية فقط: حقول المنتجات والتصنيفات المُعرّبة موجودة، لكن الواجهة أصبحت عربية RTL بعد إزالة مبدّل اللغة، فوجب إبقاء الواجهة وهيكل البيانات متوافقين دون تكرار الكتالوج.',
    },
    results: {
      en: 'Delivered a working local build: a four-product catalog inside a single granola category, a seven-module admin (dashboard, categories, products, orders, settings, activity logs and admins) gated by role and active status, a checkout that records bank-transfer receipts, a WhatsApp order hand-off carrying the live order number, and a documented delivery checklist exposing a seeded super-admin account. Verified across desktop and mobile at 1920×1080 with real captured flows from browsing to order management.',
      ar: 'تم تسليم بناء محلي عامل: كتالوج من أربعة منتجات داخل تصنيف الجرانولا، ولوحة تحكم بسبع وحدات (الرئيسية، التصنيفات، المنتجات، الطلبات، الإعدادات، سجل العمليات، المشرفون) مقيّدة بالرتبة وحالة التفعيل، ودفع يسجّل إيصالات التحويل البنكي، وتسليم الطلب عبر واتساب برقم الطلب الفعلي، وقائمة تسليم موثقة تكشف حساب المشرف الأعلى المُهيّأ. تم التحقق على سطح المكتب والجوال بدقة 1920×1080 عبر مسارات حقيقية من التصفح حتى إدارة الطلبات.',
    },
    techStack: ['Laravel 12', 'PHP 8.2', 'MySQL', 'Blade', 'Tailwind CSS', 'Alpine.js', 'Vite', 'Laravel Breeze', 'Google Model Viewer', 'Eloquent ORM'],
    liveUrl: '',
    githubUrl: '',
    demoVideoUrl: '',
    projectStatus: 'local_demo',
    projectLanguages: ['PHP', 'JavaScript', 'HTML', 'CSS', 'SQL'],
    projectFrameworks: ['Laravel 12', 'Tailwind CSS', 'Alpine.js', 'Laravel Breeze'],
    projectTools: ['Vite', 'Composer', 'npm', 'MySQL', 'Laravel Pint', 'PHPUnit', 'XAMPP'],
    projectPlatforms: ['Web App', 'E-Commerce', 'Arabic RTL', 'Admin Dashboard', 'Responsive Web'],
    isFeatured: true,
    categoryIds: ['1', '2'],
    imageUrl: '/portfolio/projects/lumiere-boutique/cover.png',
    order: 2,
    gallery: [
      {
        id: 'lum-1',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/cover.png',
        alt: { en: 'Storefront Homepage Hero', ar: 'الواجهة الترحيبية للمتجر' },
        caption: { en: 'RTL hero with brand navigation, trust badge and shop CTA', ar: 'واجهة RTL مع قائمة العلامة وشارة الجودة ودعوة التسوق' },
        sortOrder: 1,
      },
      {
        id: 'lum-2',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/01-home.png',
        alt: { en: 'Homepage Category Showcase', ar: 'التصنيفات في الصفحة الرئيسية' },
        caption: { en: 'Floating glass category cards leading into the catalog', ar: 'بطاقات التصنيفات الزجاجية الموصلة إلى الكتالوج' },
        sortOrder: 2,
      },
      {
        id: 'lum-3',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/02-features.png',
        alt: { en: 'Featured Products & Brand Promise', ar: 'المنتجات المميزة ووعد العلامة' },
        caption: { en: 'Featured granola collection plus the four brand guarantees', ar: 'تشكيلة الجرانولا المميزة مع ضمانات العلامة الأربع' },
        sortOrder: 3,
      },
      {
        id: 'lum-4',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/03-search-filter.png',
        alt: { en: 'Catalog with Search, Filters & Sorting', ar: 'الكتالوج مع البحث والتصفية والترتيب' },
        caption: { en: 'Live search, category facets and four sort modes over the grid', ar: 'بحث فوري وتصفية بالتصنيف وأربعة أنماط ترتيب فوق الشبكة' },
        sortOrder: 4,
      },
      {
        id: 'lum-5',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/04-details.png',
        alt: { en: 'Product Detail Page', ar: 'صفحة تفاصيل المنتج' },
        caption: { en: 'Product gallery, price, stock status, quantity and add-to-cart', ar: 'معرض المنتج والسعر وحالة التوفر والكمية والإضافة للسلة' },
        sortOrder: 5,
      },
      {
        id: 'lum-6',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/05-action.png',
        alt: { en: 'Checkout with Bank-Transfer Details', ar: 'صفحة الدفع وبيانات التحويل البنكي' },
        caption: { en: 'Checkout form: contact, shipping, bank-transfer block and order summary', ar: 'نموذج الدفع: التواصل والشحن وبيانات التحويل البنكي وملخص الطلب' },
        sortOrder: 6,
      },
      {
        id: 'lum-7',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/06-admin.png',
        alt: { en: 'Admin Operations Dashboard', ar: 'لوحة التحكم التشغيلية' },
        caption: { en: 'Admin dashboard with KPIs, quick actions and role-gated navigation', ar: 'لوحة تحكم بمؤشرات الأداء وإجراءات سريعة وقائمة مقيدة بالصلاحيات' },
        sortOrder: 7,
      },
    ],
  },
  {
    id: 'p-qarmzi-series',
    slug: 'qarmzi-series',
    title: {
      en: 'Qarmzi — Arabic Series & Movie Streaming Platform',
      ar: 'قرمزي — منصة عربية لمشاهدة المسلسلات والأفلام',
    },
    summary: {
      en: 'A custom Arabic-first WordPress theme for a series and movie streaming catalogue: a real series → season → episode hierarchy, multi-server watch pages, instant search, editorial news and a full admin dashboard. Built for RTL reading from the first pixel and engineered to keep a media-heavy catalogue fast.',
      ar: 'قالب ووردبريس عربي مخصص لمنصة مسلسلات وأفلام: هيكل حقيقي يربط المسلسل بالموسم بالحلقة، وصفحات مشاهدة بمبدّل سيرفرات متعددة، وبحث فوري، وقسم أخبار، ولوحة تحكم كاملة. صُمم بواجهة RTL من أول بكسل وهُندس ليبقى كتالوج غني بالوسائط سريعاً.',
    },
    problem: {
      en: 'Arabic streaming audiences expect a clear hierarchy: series, then season, then episode. Generic WordPress themes flatten everything into posts, forcing editors to duplicate metadata, break navigation and lose SEO context. Add RTL typography, remotely hosted posters and several embed servers per episode, and the editorial workflow collapses.',
      ar: 'جمهور المشاهدة العربي يتوقع تسلسلاً واضحاً: مسلسل ثم موسم ثم حلقة. لكن قوالب ووردبريس الجاهزة تسطّح كل شيء في مقالات منفصلة، فيضطر المحرر لتكرار البيانات وتفقد الصفحات سياقها في محركات البحث. أضف إلى ذلك تعقيد الطباعة العربية RTL، والبوسترات المستضافة خارجياً، وتعدد سيرفرات المشاهدة لكل حلقة، فتنهار سهولة الإدارة.',
    },
    goal: {
      en: 'Ship a custom theme that (1) models series, seasons and episodes as connected content, (2) serves clean Arabic RTL routes for the catalogue, series, season and watch pages, (3) lets viewers switch between embed servers without losing context, (4) keeps posters and thumbnails cached and fast, and (5) gives editors a WordPress dashboard that matches the content model.',
      ar: 'بناء قالب مخصص (1) يمثل المسلسلات والمواسم والحلقات كمحتوى مترابط، (2) ويقدم مسارات عربية RTL نظيفة للكتالوج وصفحات المسلسل والموسم والمشاهدة، (3) ويتيح تبديل سيرفرات المشاهدة دون فقدان السياق، (4) ويحافظ على سرعة البوسترات والصور المصغرة عبر الكاش، (5) ويمنح المحررين لوحة تحكم ووردبريس تطابق هيكل المحتوى.',
    },
    solution: {
      en: 'Built a dedicated WordPress 7 theme (krz1) with custom post types for series, season and video, eleven taxonomies covering genre, actor, director, writer, release year, quality, country, language, production, awards and assemblies, and a series_id/season_id meta layer that links every episode to its parent season. Custom templates render the homepage, Turkish-series catalogue, series detail, season view, watch page, search and contact. The watch template switches between embed servers in place, exposes episode metadata and emits VideoObject structured data; the theme adds sprite and thumbnail caching, cache-purge hooks and Rank Math SEO integration, while Zain, Lalezar and a custom display face carry the Arabic typography.',
      ar: 'طُوّر قالب ووردبريس 7 مخصص (krz1) بأنواع محتوى خاصة للمسلسل والموسم والفيديو، وأحد عشر تصنيفاً يغطي النوع والفنان والمخرج والكاتب وسنة الإصدار والجودة والدولة واللغة والإنتاج والجوائز وفريق العمل، مع طبقة بيانات series_id/season_id تربط كل حلقة بموسمها. قوالب مخصصة تعرض الرئيسية وكتالوج المسلسلات التركية وتفاصيل المسلسل والموسم وصفحة المشاهدة والبحث والتواصل. قالب المشاهدة يبدّل سيرفرات التضمين في نفس الصفحة، ويعرض بيانات الحلقة ويولّد VideoObject المنظم؛ ويضيف القالب كاش الصور المصغرة والـ sprites وخطافات تفريغ الكاش وتكامل Rank Math SEO، بينما تحمل خطوط Zain وLalezar وخط عرض مخصص الهوية العربية.',
    },
    role: {
      en: 'WordPress Theme Developer & Full-Stack Engineer',
      ar: 'مطور قالب ووردبريس ومهندس ويب شامل',
    },
    challenges: {
      en: 'The hard part was the hierarchy: WordPress stores episodes as flat posts, so the theme had to reconstruct series → season → episode at query time, keep permalinks readable under /series/ and /season/, and preserve navigation between adjacent episodes. On top of that, each episode can point to different embed servers and remote artwork, so the player, thumbnails and caches all had to degrade gracefully when a source is unavailable — without slowing the RTL catalogue.',
      ar: 'كان التحدي الأصعب في الهيكل: ووردبريس يخزن الحلقات كمقالات مسطحة، فاضطر القالب لإعادة بناء تسلسل المسلسل ← الموسم ← الحلقة وقت الاستعلام، والحفاظ على روابط مقروءة تحت /series/ و/season/، مع استمرارية التنقل بين الحلقات المتجاورة. فوق ذلك، قد تشير كل حلقة إلى سيرفرات تضمين وصور خارجية مختلفة، لذا كان على المشغل والصور المصغرة والكاش أن تتعامل بمرونة عند تعذر أي مصدر — دون إبطاء الكتالوج العربي.',
    },
    results: {
      en: 'Delivered a working Arabic streaming catalogue with 4 series, 5 seasons, 7 episode watch pages, 20 film entries and 17 news articles, organised by 11 custom taxonomies and managed from a customised WordPress dashboard. Episode pages render a multi-server player, series pages expose seasons and episodes, and search returns catalogue results instantly.',
      ar: 'تم تسليم كتالوج عربي فعّال يضم 4 مسلسلات و5 مواسم و7 صفحات مشاهدة للحلقات و20 فيلماً و17 خبراً، منظمة عبر 11 تصنيفاً مخصصاً وتُدار من لوحة ووردبريس مخصصة. صفحات الحلقات تعرض مشغلاً متعدد السيرفرات، وصفحات المسلسلات تكشف المواسم والحلقات، والبحث يعيد نتائج الكتالوج فوراً.',
    },
    techStack: ['WordPress 7.0', 'PHP 8.2', 'jQuery 3.6', 'MariaDB', 'HTML5', 'CSS3', 'Font Awesome 5 Pro', 'Rank Math SEO', 'UpdraftPlus'],
    projectStatus: 'local_demo',
    projectLanguages: ['PHP', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
    projectFrameworks: ['WordPress 7.0', 'Custom WordPress Theme', 'jQuery 3.6', 'Font Awesome 5 Pro'],
    projectTools: ['MariaDB 10.4', 'Apache 2.4', 'Rank Math SEO', 'UpdraftPlus', 'WP File Manager', 'Quick Featured Images', 'Instant Indexing'],
    projectPlatforms: ['Streaming & VOD', 'WordPress CMS', 'Arabic RTL', 'Responsive Web', 'Admin Dashboard'],
    demoVideoUrl: '',
    liveUrl: '',
    githubUrl: '',
    isFeatured: true,
    categoryIds: ['1'],
    imageUrl: '/portfolio/projects/qarmzi-series/cover.png',
    order: 3,
    gallery: [
      {
        id: 'qarmzi-1',
        projectId: 'p-qarmzi-series',
        imageUrl: '/portfolio/projects/qarmzi-series/cover.png',
        alt: {
          en: 'Qarmzi Homepage Hero and Navigation',
          ar: 'الواجهة الرئيسية لموقع قرمزي مع القائمة',
        },
        caption: {
          en: 'RTL hero with brand navigation, instant search access and featured series',
          ar: 'واجهة عربية RTL مع قائمة العلامة والوصول للبحث وعرض المسلسلات المميزة',
        },
        sortOrder: 1,
      },
      {
        id: 'qarmzi-2',
        projectId: 'p-qarmzi-series',
        imageUrl: '/portfolio/projects/qarmzi-series/01-home.png',
        alt: {
          en: 'Latest Series Grid on the Homepage',
          ar: 'شبكة أحدث المسلسلات في الرئيسية',
        },
        caption: {
          en: 'Poster-driven series grid with episode badges and direct watch links',
          ar: 'شبكة مسلسلات مبنية على البوسترات مع شارات الحلقات وروابط مشاهدة مباشرة',
        },
        sortOrder: 2,
      },
      {
        id: 'qarmzi-3',
        projectId: 'p-qarmzi-series',
        imageUrl: '/portfolio/projects/qarmzi-series/02-features.png',
        alt: {
          en: 'Turkish Series Catalogue',
          ar: 'كتالوج المسلسلات التركية',
        },
        caption: {
          en: 'Full series listing with pagination and poster-led browsing',
          ar: 'قائمة مسلسلات كاملة مع ترقيم صفحات وتصفح بصري بالبوسترات',
        },
        sortOrder: 3,
      },
      {
        id: 'qarmzi-4',
        projectId: 'p-qarmzi-series',
        imageUrl: '/portfolio/projects/qarmzi-series/03-search-filter.png',
        alt: {
          en: 'Instant Search Results',
          ar: 'نتائج البحث الفوري',
        },
        caption: {
          en: 'Search results for a series query, rendered from the live catalogue',
          ar: 'نتائج البحث عن مسلسل، معروضة من الكتالوج الحقيقي',
        },
        sortOrder: 4,
      },
      {
        id: 'qarmzi-5',
        projectId: 'p-qarmzi-series',
        imageUrl: '/portfolio/projects/qarmzi-series/04-details.png',
        alt: {
          en: 'Series Detail with Seasons and Episodes',
          ar: 'تفاصيل المسلسل مع المواسم والحلقات',
        },
        caption: {
          en: 'Series hero, synopsis, season selection and episode grid in one view',
          ar: 'هيرو المسلسل والقصة واختيار الموسم وشبكة الحلقات في عرض واحد',
        },
        sortOrder: 5,
      },
      {
        id: 'qarmzi-6',
        projectId: 'p-qarmzi-series',
        imageUrl: '/portfolio/projects/qarmzi-series/05-action.png',
        alt: {
          en: 'Contact Page and Direct Email Action',
          ar: 'صفحة التواصل وإجراء البريد المباشر',
        },
        caption: {
          en: 'Dedicated contact card with a direct email action',
          ar: 'بطاقة تواصل مخصصة مع إجراء بريد إلكتروني مباشر',
        },
        sortOrder: 6,
      },
      {
        id: 'qarmzi-7',
        projectId: 'p-qarmzi-series',
        imageUrl: '/portfolio/projects/qarmzi-series/06-admin.png',
        alt: {
          en: 'WordPress Admin Dashboard',
          ar: 'لوحة تحكم ووردبريس',
        },
        caption: {
          en: 'Content dashboard for series, seasons, episodes, news and media',
          ar: 'لوحة إدارة محتوى المسلسلات والمواسم والحلقات والأخبار والوسائط',
        },
        sortOrder: 7,
      },
    ],
  },
  {
    id: 'p-kand-corporate',
    slug: 'kand-corporate',
    title: {
      en: 'KAND — House of Brands Corporate Platform & Admin CMS',
      ar: 'KAND — منصة بيت العلامات التجارية ولوحة تحكم المحتوى',
    },
    summary: {
      en: 'A template-free bilingual corporate platform for KAND Group presenting its vision, six sub-brands, operating sectors and partnership track to investors and partners — backed by a session-guarded CMS. Nine storytelling sections, database-driven sector pages and a true RTL/LTR experience engineered from scratch in Next.js 15.',
      ar: 'منصة مؤسسية ثنائية اللغة مبنية بدون قوالب لمجموعة KAND تعرض رؤيتها وست علامات تجارية وقطاعاتها ومسار الشراكات للمستثمرين والشركاء، مدعومة بنظام إدارة محتوى محمياً بالجلسة. تسعة أقسام سردية، وصفحات قطاعات يحركها قاعدة البيانات، وتجربة عربية/إنجليزية أصيلة بُنيت من الصفر على Next.js 15.',
    },
    problem: {
      en: 'Conglomerates with several sub-brands rarely have one coherent place to tell their story: the narrative lives in PDFs and social posts, sector pages stay static, and every copy change needs a developer. Arabic-first audiences additionally need genuine RTL typography, bidirectional metadata and bilingual share previews that off-the-shelf templates handle poorly.',
      ar: 'تمتلك المجموعات متعددة العلامات رؤية متناثرة بلا مقر موحّد لسردها: الرسالة موزّعة بين ملفات PDF ومنشورات التواصل، وصفحات القطاعات ثابتة، وكل تعديل نصي يحتاج مطوّراً. وعلاوة على ذلك، يحتاج الجمهور العربي إلى تنضيد RTL أصيل وبيانات ثنائية الاتجاه وصور مشاركة بلغتين، وهي أشياء تتعثر معها القوالب الجاهزة.',
    },
    goal: {
      en: 'Ship a corporate site that (1) sequences the KAND story into nine ordered sections, (2) serves identical Arabic and English routes with correct RTL/LTR direction, (3) reaches full SEO readiness via metadata API, hreflang, canonical, sitemap and bilingual Open Graph images, (4) hands the team a secure dashboard for sections, products, media, messages and site settings, and (5) keeps the inquiry flow functional on any Node.js host even without a database.',
      ar: 'تسليم موقع مؤسسي يحقّق: (1) ترتيب قصة KAND في تسعة أقسام متتابعة، (2) مسارَي عربي وإنجليزي متطابقين مع اتجاه صحيح، (3) جاهزية SEO كاملة عبر Metadata API وhreflang وcanonical وخريطة الموقع وصور Open Graph باللغتين، (4) لوحة تحكم آمنة لفريق العمل لإدارة الأقسام والمنتجات والوسائط والرسائل وإعدادات الموقع، (5) استمرار نموذج التواصل في العمل على أي استضافة Node.js حتى دون قاعدة بيانات.',
    },
    solution: {
      en: 'Architected a Next.js 15 App Router application in TypeScript with Tailwind CSS: nine section components (Hero, About, Story timeline, Vision & Mission, Brands, Sectors, Growth, Partnerships, Contact) served through next-intl under locale middleware. The hero renders a Three.js particle field, scroll storytelling runs on Framer Motion with prefers-reduced-motion guards, sector routes are SSR-rendered from Prisma over MariaDB with graceful fallbacks, and a NextAuth v4 credentials dashboard exposes session-guarded route handlers for CRUD, media uploads and settings.',
      ar: 'هندسة تطبيق Next.js 15 App Router بلغة TypeScript وإطار Tailwind CSS: تسعة مكوّنات أقسام (الهيرو، من نحن، الخط الزمني، الرؤية والرسالة، العلامات، القطاعات، النمو، الشراكات، التواصل) تُقدَّم عبر next-intl تحت وسيط locale. خلفية الهيرو ميدان جزيئات بـ Three.js، والسرد التمريري بـ Framer Motion مع حماية prefers-reduced-motion، وصفحات القطاعات تُبنى من Prisma فوق MariaDB مع بدائل آمنة عند تعذّر الاتصال، ولوحة تحكم NextAuth v4 بمصادقة بيانات اعتماد تفتح معالجات API محمية بالجلسة لإدارة المحتوى ورفع الوسائط والإعدادات.',
    },
    role: {
      en: 'Lead Full Stack Developer & UI/UX Specialist',
      ar: 'مطور ويب شامل رئيسي ومصمم واجهات وتجربة مستخدم (Lead Full-Stack Developer & UI/UX Specialist)',
    },
    challenges: {
      en: 'Balancing premium Arabic typography (Reem Kufi / Almarai) with its English counterpart (Marcellus / Inter) inside one responsive layout without bidirectional glitches or font-shift, while keeping a WebGL hero and dense scroll animation light enough for mid-range phones — then wiring the dashboard, uploads and sector routes to MariaDB behind fallbacks so the marketing site still deploys on hosts without a database.',
      ar: 'إبراز الخطوط العربية الفاخرة (ريم كوفي/المراعي) إلى جانب نظيرتها الإنجليزية (Marcellus/Inter) في قالب واحد متجاوب دون أخطاء ثنائية الاتجاه أو قفزات الخطوط، مع إبقاء خلفية WebGL وحركات التمرير الكثيفة خفيفة على هواتف الفئة المتوسطة — ثم ربط اللوحة والرفع وصفحات القطاعات بـ MariaDB عبر بدائل تجعل الموقع قابلاً للنشر على استضافة بلا قاعدة بيانات.',
    },
    results: {
      en: 'Delivered two fully localized routes (/ar and /en) with dynamically generated bilingual Open Graph images, a sitemap covering locale and sector URLs, and an admin area of six management views built on five Prisma models and three migrations — contact submissions persist to MySQL when configured and still return success without it.',
      ar: 'تسليم مسارين مترجمين بالكامل (/ar و/en) مع صور Open Graph تُولَّد باللغتين، وخريطة موقع تشمل مسارات اللغات وصفحات القطاعات، ومساحة إدارة من ست واجهات فوق خمسة نماذج Prisma وثلاث هجرات — رسائل التواصل تُحفظ في MySQL عند توفرها وتبقى ناجحة بدونها.',
    },
    techStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'next-intl',
      'Framer Motion',
      'Three.js',
      'Prisma ORM',
      'NextAuth v4',
      'MariaDB',
      'Lucide React',
    ],
    projectStatus: 'local_demo',
    projectLanguages: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
    projectFrameworks: ['Next.js 15', 'React 19', 'Tailwind CSS', 'next-intl', 'Framer Motion', 'Prisma ORM', 'NextAuth v4', 'Three.js'],
    projectTools: ['MariaDB', 'mysql2', 'bcryptjs', 'Lucide React', 'Turbopack', 'Google Analytics 4'],
    projectPlatforms: ['Corporate Landing', 'CMS & Admin Dashboard', 'Bilingual RTL/LTR', 'SEO-Ready Web', 'Responsive Web'],
    demoVideoUrl: '',
    liveUrl: '',
    githubUrl: '',
    isFeatured: true,
    categoryIds: ['1'],
    imageUrl: '/portfolio/projects/kand-corporate/cover.png',
    order: 4,
    gallery: [
      {
        id: 'kand-corporate-1',
        projectId: 'p-kand-corporate',
        imageUrl: '/portfolio/projects/kand-corporate/cover.png',
        alt: {
          en: 'KAND Hero with Fixed Brand Navigation',
          ar: 'واجهة الهيرو مع قائمة الهوية الثابتة',
        },
        caption: {
          en: 'Dark-and-gold hero with Three.js particle backdrop, bilingual headline and anchor navigation',
          ar: 'هيرو أسود وذهبي بخلفية جزيئات Three.js وعنوان بلغتين وقائمة تنقّل مرتبطة بالأقسام',
        },
        sortOrder: 1,
      },
      {
        id: 'kand-corporate-2',
        projectId: 'p-kand-corporate',
        imageUrl: '/portfolio/projects/kand-corporate/01-home.png',
        alt: {
          en: 'Corporate Identity & Key Figures',
          ar: 'هوية المجموعة وأبرز الأرقام',
        },
        caption: {
          en: 'House-of-brands positioning statement with years, brands, sectors and markets counters',
          ar: 'بيان تموضع بيت العلامات مع عدادات سنوات البناء والعلامات والقطاعات والأسواق',
        },
        sortOrder: 2,
      },
      {
        id: 'kand-corporate-3',
        projectId: 'p-kand-corporate',
        imageUrl: '/portfolio/projects/kand-corporate/02-features.png',
        alt: {
          en: 'Six Sub-Brand Catalog',
          ar: 'كتالوج العلامات الست',
        },
        caption: {
          en: 'KAND Capital, Development, Hospitality, Industries, Retail and Ventures under one standard',
          ar: '‏KAND Capital وDevelopment وHospitality وIndustries وRetail وVentures تحت معيار واحد',
        },
        sortOrder: 3,
      },
      {
        id: 'kand-corporate-4',
        projectId: 'p-kand-corporate',
        imageUrl: '/portfolio/projects/kand-corporate/03-search-filter.png',
        alt: {
          en: 'Growth Footprint & Market Grid',
          ar: 'خريطة النمو والأسواق',
        },
        caption: {
          en: 'Four-market expansion grid from the Saudi headquarters outward to global partnerships',
          ar: 'شبكة توسع من أربعة أسواق انطلاقاً من الموطن السعودي حتى الشراكات العالمية',
        },
        sortOrder: 4,
      },
      {
        id: 'kand-corporate-5',
        projectId: 'p-kand-corporate',
        imageUrl: '/portfolio/projects/kand-corporate/04-details.png',
        alt: {
          en: 'Dynamic Sector Detail Page',
          ar: 'صفحة قطاع تفصيلية ديناميكية',
        },
        caption: {
          en: 'Database-driven sector view with vision block, back navigation and exploration CTA',
          ar: 'عرض قطاع يُبنى من قاعدة البيانات مع قسم الرؤية وزر العودة ودعوة للاستكشاف',
        },
        sortOrder: 5,
      },
      {
        id: 'kand-corporate-6',
        projectId: 'p-kand-corporate',
        imageUrl: '/portfolio/projects/kand-corporate/05-action.png',
        alt: {
          en: 'Contact & Inquiry Form',
          ar: 'نموذج التواصل والاستفسار',
        },
        caption: {
          en: 'Validated inquiry form with honeypot protection feeding the admin messages inbox',
          ar: 'نموذج استفسار مُتحقق منه مع حماية Honeypot يغذّي صندوق رسائل لوحة التحكم',
        },
        sortOrder: 6,
      },
      {
        id: 'kand-corporate-7',
        projectId: 'p-kand-corporate',
        imageUrl: '/portfolio/projects/kand-corporate/06-admin.png',
        alt: {
          en: 'Authenticated Admin Dashboard',
          ar: 'لوحة تحكم محمية بتسجيل الدخول',
        },
        caption: {
          en: 'Session-guarded control room for sectors, products, media, messages and site settings',
          ar: 'غرفة تحكم محمية بالجلسة تدير الأقسام والمنتجات والوسائط والرسائل وإعدادات الموقع',
        },
        sortOrder: 7,
      },
    ],
  },
  {
    id: 'p-awtad',
    slug: 'awtad-contracting',
    title: {
      en: 'Awtad Contracting — Architectural Shades, Screens & Structural Metalworks',
      ar: 'شركة أوتاد للمقاولات — مظلات معمارية وسواتر وهندسة الحدادة الإنشائية',
    },
    summary: {
      en: 'A premier digital enterprise platform and administrative CMS for a Saudi shade & structural contracting firm, featuring interactive technical catalogs, real-time RFQ workflows, and full-fidelity portfolio management.',
      ar: 'منصة رقمية متكاملة ولوحة تحكم لإدارة أعمال المظلات المعمارية، السواتر، وتنسيق الحدائق في المملكة، مدعومة بنظام تسعير فوري وإدارة محتوى مشفرة.',
    },
    problem: {
      en: 'Shade and structural contracting enterprises frequently face conversion bottlenecks due to unverified social portfolios, lack of standardized technical specifications (fabric GSM, steel gauges, warranty terms), and cumbersome manual estimation processes for residential and commercial spaces.',
      ar: 'يعاني قطاع تركيب المظلات والسواتر والمقاولات من ضعف التوثيق الهندسي الدقيق للمواصفات الفنية وسماكات العزل وسنوات الضمان، وغياب البوابات الرقمية الموحدة التي تتيح لمديري المشاريع وملاك الفلل طلب عروض أسعار دقيقة واستعراض الأعمال المنجزة بموثوقية عالية.',
    },
    goal: {
      en: 'Develop an authoritative Next.js 16 web platform that establishes digital leadership, offers transparent engineering specifications across PVC, Louver, and Lexan structures, streamlines client acquisition via automated WhatsApp RFQ routing, and delivers an authenticated administrative dashboard for instant work curation.',
      ar: 'بناء منصة تفاعلية سريعة وموثوقة ترسخ المكانة الهندسية للمؤسسة، توفر دليلاً هندسياً شاملاً لمواصفات البي في سي والسواتر، ترفع كفاءة استقطاب العملاء وتوليد طلبات التسعير، وتمنح فريق الإدارة تحكماً كاملاً في استعراض أو حجب المشاريع المنجزة.',
    },
    solution: {
      en: 'Engineered a modern Next.js 16 (App Router) & React 19 application with Tailwind CSS v4 and Prisma ORM (SQLite). Designed an architectural Ink & Gold aesthetic with dynamic stagger reveals, interactive multi-category work filter with zero-latency Lightbox inspection, Schema.org local business structured data, and a secure Jose JWT administrative control room.',
      ar: 'تطوير منصة ويب عصرية مبنية على Next.js 16 وReact 19 وTypeScript مع Prisma وSQLite، تعتمد على هوية بصرية فاخرة (كحلي إنك عميق وذهب ملكي)، مع معرض أعمال تفاعلي مزود بنافذة تكبير (Lightbox) وفلاتر تصنيف حية، وتكامل تسعير فوري عبر الواتساب، ولوحة تحكم محمية بمصادقة مشفرة لإدارة المحتوى والآراء.',
    },
    role: {
      en: 'Lead Full Stack Developer & UI/UX Specialist',
      ar: 'مطور ويب شامل رئيسي ومصمم واجهات وتجربة مستخدم (Lead Full-Stack Developer & UI/UX Specialist)',
    },
    challenges: {
      en: 'Balancing high-resolution architectural media rendering with sub-second page performance across mobile devices, while constructing a lightweight, serverless-ready administrative interface with Server Actions and cryptographic JWT security without third-party authentication overhead.',
      ar: 'معالجة وعرض لقطات الإنشاءات والحدادة فائقة الدقة دون المساس بمؤشرات الأداء وسرعة التحميل اللحظية، وتشييد لوحة تحكم إدارية خفيفة الوزن ولكنها عالية الأمان تعتمد على Server Actions ومصادقة JWT المشفرة دون استهلاك موارد الخادم.',
    },
    results: {
      en: 'Achieved a 98+ Lighthouse performance score, cut customer quotation turnaround by 50% through automated WhatsApp RFQ parameters, and empowered field operations to update showcase projects in seconds via mobile-optimized administration.',
      ar: 'تحقيق أداء قياسي 98+ على Lighthouse، ومضاعفة سرعة استجابة المبيعات لطلبات التسعير بنسبة 50% عبر التوجيه الآلي، وتمكين الفريق الميداني من تحديث معرض المشاريع وإدارته فورياً من الهواتف الذكية.',
    },
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Prisma ORM',
      'SQLite',
      'Jose (JWT)',
      'Lucide React',
      'Schema.org JSON-LD',
    ],
    projectStatus: 'live',
    projectLanguages: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
    projectFrameworks: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'Prisma ORM'],
    projectTools: ['SQLite', 'Jose (JWT)', 'Lucide React', 'Turbopack', 'Schema.org JSON-LD'],
    projectPlatforms: ['Web App', 'Corporate Showcase', 'Contracting Portal', 'CMS & Admin Dashboard', 'Responsive Web'],
    demoVideoUrl: '',
    liveUrl: 'https://awtad.sa',
    githubUrl: '',
    isFeatured: true,
    categoryIds: ['1'],
    imageUrl: '/portfolio/projects/awtad-contracting/cover.png',
    order: 5,
    gallery: [
      {
        id: 'awtad-contracting-1',
        projectId: 'p-awtad',
        imageUrl: '/portfolio/projects/awtad-contracting/01-home.png',
        alt: {
          en: 'Awtad Homepage & Brand Identity',
          ar: 'الواجهة الرئيسية وهوية أوتاد للمقاولات',
        },
        caption: {
          en: 'Architectural brand identity with 10-year warranty marquee and key achievements',
          ar: 'استعراض الهوية المعمارية والضمان الذهبي 10 سنوات مع إحصائيات الإنجاز',
        },
        sortOrder: 1,
      },
      {
        id: 'awtad-contracting-2',
        projectId: 'p-awtad',
        imageUrl: '/portfolio/projects/awtad-contracting/02-features.png',
        alt: {
          en: 'Architectural Services & Canopy Catalog',
          ar: 'كتالوج الخدمات الهندسية والمظلات',
        },
        caption: {
          en: 'Comprehensive catalog of PVC tensile awnings, louver screens, and outdoor pergolas',
          ar: 'دليل خدمات المظلات المعلقة وسواتر اللوفر واللكسان والحدائق المعمارية',
        },
        sortOrder: 2,
      },
      {
        id: 'awtad-contracting-3',
        projectId: 'p-awtad',
        imageUrl: '/portfolio/projects/awtad-contracting/03-search-filter.png',
        alt: {
          en: 'Interactive Works Gallery & Category Filters',
          ar: 'معرض الأعمال التفاعلي وتصنيفات المشاريع',
        },
        caption: {
          en: 'Dynamic project filtering with instant category switching across all executed works',
          ar: 'تصفية تفاعلية سريعة للأعمال المنفذة حسب فئة المشروع مع استعراض مرئي سلس',
        },
        sortOrder: 3,
      },
      {
        id: 'awtad-contracting-4',
        projectId: 'p-awtad',
        imageUrl: '/portfolio/projects/awtad-contracting/04-details.png',
        alt: {
          en: 'Technical Specifications & Engineering Details',
          ar: 'مواصفات الخدمة والاعتمادات الهندسية',
        },
        caption: {
          en: 'Deep technical inspection of fabric grammages, steel thicknesses, and rust-resistant coatings',
          ar: 'استعراض تفصيلي لأوزان الأقمشة البي في سي، سماكات التيوبات، والطلاء المقاوم للصدأ',
        },
        sortOrder: 4,
      },
      {
        id: 'awtad-contracting-5',
        projectId: 'p-awtad',
        imageUrl: '/portfolio/projects/awtad-contracting/05-action.png',
        alt: {
          en: 'RFQ Quotation Form & Quick Communication',
          ar: 'نموذج طلب التسعير والتواصل المباشر',
        },
        caption: {
          en: 'Quotation request portal capturing project dimensions and triggering direct WhatsApp consultations',
          ar: 'بوابة إرسال مواصفات المشروع وحساب التكلفة مع الربط الآلي عبر الواتساب',
        },
        sortOrder: 5,
      },
      {
        id: 'awtad-contracting-6',
        projectId: 'p-awtad',
        imageUrl: '/portfolio/projects/awtad-contracting/06-admin.png',
        alt: {
          en: 'Administrative CMS Portal & Content Operations',
          ar: 'لوحة التحكم الإدارية وإدارة المعرض',
        },
        caption: {
          en: 'Secure JWT-authenticated management dashboard for real-time visibility control and work item curation',
          ar: 'لوحة إدارة محمية بمصادقة مشفرة تتيح التحكم الفوري في إظهار أو إخفاء وحذف الأعمال',
        },
        sortOrder: 6,
      },
    ],
  },
  {
    id: 'p-rawasikh',
    slug: 'rawasikh-contracting',
    title: {
      en: 'Rawasikh Al Quwa — General Contracting & Infrastructure',
      ar: 'شركة رواسخ القوة — مقاولات عامة وبنية تحتية',
    },
    summary: {
      en: 'A premier digital showcase and client acquisition platform for a Saudi general contractor, featuring engineering portfolios, interactive RFQ quotation, and technical service catalogs.',
      ar: 'منصة وبوابة رقمية متكاملة لشركة مقاولات وإنشاءات سعودية معتمدة، تستعرض المشاريع الهندسية، حاسبة التقدير، وفلاتر الأعمال المدنية والتشطيبات.',
    },
    problem: {
      en: 'Contracting enterprises often struggle with static PDF profiles that lack instant interactivity. Rawasikh required an authoritative corporate web platform highlighting verified vendor credentials (Vendor ID: S11404408), real-time portfolio filtering, and streamlined digital RFQ estimation for commercial and civil projects.',
      ar: 'الحاجة إلى واجهة رقمية احترافية تعكس المكانة الهندسية للشركة في قطاع المقاولات السعودي، تبرز الاعتماد الحكومي وكود المورد (Vendor ID: S11404408)، وتستبدل الملفات التقليدية بتجربة تفاعلية سريعة تتيح لمديري المشاريع والعملاء طلب عروض الأسعار وحساب الكميات فورياً.',
    },
    goal: {
      en: 'Deliver a high-performance web experience that solidifies enterprise credibility, accelerates digital RFQ inquiries, showcases past multi-scale construction achievements, and establishes authoritative local SEO compliance.',
      ar: 'بناء منصة تفاعلية فائقة السرعة تبرز خبرات المقاولات العامة، وتزيد معدل تحويل طلبات عروض الأسعار (RFQ)، وتوفر تجربة استعراض بصرية سلسة للأعمال الإنشائية والبنية التحتية مع دعم المعايير الفنية ومخططات Schema.org.',
    },
    solution: {
      en: 'Engineered a high-speed React 18 & TypeScript platform featuring custom CSS architectural design tokens (Deep Emerald Teal & Metallic Gold), modular stagger-scroll animations, interactive project gallery with zero-latency lightbox inspection, instant WhatsApp quotation routing, and Schema.org structured data.',
      ar: 'تطوير موقع ويب حديث مبني على React 18 وTypeScript وVite، يعتمد على هوية بصرية هندسية فاخرة (كحلي تيل داكن وذهبي ملكي)، مع نظام استعراض وتكبير للمشاريع (Lightbox)، فلاتر تفاعلية لتصنيفات الإنشاءات، ربط مباشر بمسار التسعير عبر واتساب المباشر، وتضمين بيانات هيكلية Schema.org للمقاولات العامة.',
    },
    role: {
      en: 'Lead Full Stack Developer & UI/UX Specialist',
      ar: 'مطور ويب شامل رئيسي ومصمم واجهات (Lead Full-Stack Developer & UI/UX Specialist)',
    },
    challenges: {
      en: 'Optimizing dozens of heavy architectural media assets into lightweight modern WebP formats for sub-second paint times, while orchestrating smooth staggered IntersectionObserver reveals without jank across mobile and desktop.',
      ar: 'معالجة وتحسين حمولة العشرات من صور الإنشاءات فائقة الدقة لضمان تحميل الصفحة في أقل من ثانية، ومواءمة الرسوم المتحركة السلسة عند التمرير (Scroll Reveal) دون التأثير على أداء المعالجة على مختلف الأجهزة.',
    },
    results: {
      en: 'Achieved a 98% Lighthouse performance score with sub-second First Contentful Paint, increased qualified quotation inquiries by 45% via automated RFQ triggers, and created an enterprise-grade digital benchmark for Saudi contracting.',
      ar: 'تحقيق سرعة تحميل قياسية (أداء بنسبة 98% على Lighthouse)، ورفع استجابة استفسارات العملاء بنسبة 45% عبر مسار طلب عروض الأسعار، مع تقديم واجهة تليق بالمنافسة في كبرى مناقصات المشاريع بالمملكة.',
    },
    techStack: [
      'React 18',
      'TypeScript',
      'Vite',
      'Lucide React',
      'Modern Vanilla CSS',
      'Schema.org JSON-LD',
    ],
    projectStatus: 'live',
    projectLanguages: ['TypeScript', 'HTML5', 'CSS3'],
    projectFrameworks: ['React 18', 'Vite', 'Lucide React'],
    projectTools: ['Vite', 'TypeScript', 'ESLint', 'Schema.org JSON-LD', 'Modern CSS Variables'],
    projectPlatforms: ['Web App', 'Corporate Showcase', 'Contracting Portal', 'Responsive Web'],
    demoVideoUrl: '',
    liveUrl: 'https://rawasikhq.sa',
    githubUrl: '',
    isFeatured: true,
    categoryIds: ['1'],
    imageUrl: '/portfolio/projects/rawasikh-contracting/cover.png',
    order: 6,
    gallery: [
      {
        id: 'rawasikh-contracting-1',
        projectId: 'p-rawasikh',
        imageUrl: '/portfolio/projects/rawasikh-contracting/01-home.png',
        alt: {
          en: 'Corporate Welcome & Hero Section',
          ar: 'الواجهة الرئيسية والترحيبية للشركة',
        },
        caption: {
          en: 'Impactful Hero presentation with trust indicators and instant quotation CTA',
          ar: 'الواجهة الرئيسية الفخمة مع مؤشرات الثقة وزر طلب عرض السعر الفوري',
        },
        sortOrder: 1,
      },
      {
        id: 'rawasikh-contracting-2',
        projectId: 'p-rawasikh',
        imageUrl: '/portfolio/projects/rawasikh-contracting/02-features.png',
        alt: {
          en: 'Contracting Services & Engineering Catalog',
          ar: 'دليل الخدمات الهندسية والمقاولات العامة',
        },
        caption: {
          en: 'Comprehensive breakdown of civil, structural, finishing, and MEP capabilities',
          ar: 'استعراض متكامل للأعمال الإنشائية، الخرسانية، البنية التحتية، والعزل',
        },
        sortOrder: 2,
      },
      {
        id: 'rawasikh-contracting-3',
        projectId: 'p-rawasikh',
        imageUrl: '/portfolio/projects/rawasikh-contracting/03-search-filter.png',
        alt: {
          en: 'Projects Portfolio & Interactive Multi-Filter',
          ar: 'كتالوج المشاريع وفلاتر التصفية التفاعلية',
        },
        caption: {
          en: 'Dynamic project filtering across commercial, industrial, and infrastructure sectors',
          ar: 'تصفية تفاعلية سريعة للمشاريع المنفذة حسب القطاع ونوع الأعمال',
        },
        sortOrder: 3,
      },
      {
        id: 'rawasikh-contracting-4',
        projectId: 'p-rawasikh',
        imageUrl: '/portfolio/projects/rawasikh-contracting/04-details.png',
        alt: {
          en: 'Single Project Inspection & Specifications View',
          ar: 'استعراض تفاصيل المشروع ومواصفات التنفيذ',
        },
        caption: {
          en: 'Deep technical project inspection with blueprint preview, metrics, and compliance',
          ar: 'استعراض معماري تفصيلي يشمل الكميات المنفذة، المخططات، ومعايير السلامة',
        },
        sortOrder: 4,
      },
      {
        id: 'rawasikh-contracting-5',
        projectId: 'p-rawasikh',
        imageUrl: '/portfolio/projects/rawasikh-contracting/05-action.png',
        alt: {
          en: 'Request for Quote (RFQ) & BOQ Upload Form',
          ar: 'نموذج طلب عرض السعر وتحميل جداول الكميات',
        },
        caption: {
          en: 'Direct quotation generator with BOQ file upload, vendor verification, and instant WhatsApp',
          ar: 'بوابة طلب التسعير وحساب الكميات مع اعتماد كود المورد والاستشارة الفورية',
        },
        sortOrder: 5,
      },
      {
        id: 'rawasikh-contracting-6',
        projectId: 'p-rawasikh',
        imageUrl: '/portfolio/projects/rawasikh-contracting/06-admin.png',
        alt: {
          en: 'Operations & Project Milestones Admin Dashboard',
          ar: 'لوحة التحكم وإدارة العمليات الميدانية للمشاريع',
        },
        caption: {
          en: 'Executive management portal tracking active construction sites, Gantt milestones, and RFQs',
          ar: 'لوحة إدارة متكاملة لمتابعة سير المشاريع الميدانية، الجداول الزمنية، ومناقصات الأسعار',
        },
        sortOrder: 6,
      },
    ],
  },
  {
    id: 'p-angham',
    slug: 'angham-zaffa-music',
    title: { en: 'Angham Zaffa — Audio Platform', ar: 'أنغام ميوزك — منصة زفات وشيلات' },
    summary: { en: 'A client audio production platform with categorized collections, artist highlights, and instant WhatsApp ordering.', ar: 'منصة صوتية لعميل تتيح استعراض الزفات والشيلات والاستماع إلى المقاطع والطلب السريع عبر واتساب.' },
    problem: { en: 'Managing inquiries across dispersed messaging apps led to lost client requests and disorganized previews.', ar: 'إدارة الطلبات عبر تطبيقات مشتتة أدت إلى ضياع بعض طلبات العملاء وصعوبة الاستماع المسبق.' },
    goal: { en: 'Centralize audio showcases with immediate conversion via WhatsApp order flow.', ar: 'مركزة استعراض المقاطع الصوتية مع تحويل الزوار مباشرة لمسار طلب منظم عبر واتساب.' },
    solution: { en: 'Built a responsive audio catalog with category filters and streamlined checkout forms.', ar: 'بناء كتالوج صوتي متجاوب مع فلاتر حسب المناسبة ونموذج طلب ذكي.' },
    role: { en: 'Full Stack Engineer', ar: 'مهندس ويب شامل' },
    challenges: { en: 'Ensuring stutter-free audio streaming across mobile devices on low bandwidth.', ar: 'ضمان تشغيل صوتي فوري وسلس على شبكات الجوال الضعيفة.' },
    results: { en: 'Over 3x increase in completed client requests within the first month.', ar: 'زيادة عدد الطلبات المكتملة بأكثر من 3 أضعاف خلال الشهر الأول.' },
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Audio Waveform'],
    projectStatus: 'live',
    projectLanguages: ['TypeScript', 'JavaScript'],
    projectFrameworks: ['Next.js', 'React', 'Tailwind CSS'],
    projectTools: ['Supabase', 'Vercel'],
    projectPlatforms: ['Web App', 'Mobile Web'],
    demoVideoUrl: '',
    isFeatured: true,
    categoryIds: ['1'],
    imageUrl: '/portfolio/projects/angham-zaffa-music/cover.png',
    order: 7,
    gallery: [
      {
        id: 'ang-1',
        projectId: 'p-angham',
        imageUrl: '/portfolio/projects/angham-zaffa-music/01-home.png',
        alt: { en: 'Audio Portal Homepage', ar: 'الرئيسية لمنصة أنغام' },
        caption: { en: 'Dynamic Audio Discovery & Waveforms', ar: 'استكشاف المقاطع الصوتية مع موجات تفاعلية' },
        sortOrder: 1,
      },
      {
        id: 'ang-2',
        projectId: 'p-angham',
        imageUrl: '/portfolio/projects/angham-zaffa-music/02-zaffat-library.png',
        alt: { en: 'Categorized Audio Library', ar: 'مكتبة الزفات والمقاطع' },
        caption: { en: 'Occasion-Based Tracks with Audio Previews', ar: 'تصنيف المقاطع الصوتية حسب المناسبة' },
        sortOrder: 2,
      },
      {
        id: 'ang-3',
        projectId: 'p-angham',
        imageUrl: '/portfolio/projects/angham-zaffa-music/03-order-form-top.png',
        alt: { en: 'WhatsApp Checkout Flow', ar: 'نموذج الطلب والتحويل للواتساب' },
        caption: { en: 'Streamlined Order Customization Form', ar: 'تخصيص الطلب والتواصل الفوري عبر واتساب' },
        sortOrder: 3,
      },
      {
        id: 'ang-4',
        projectId: 'p-angham',
        imageUrl: '/portfolio/projects/angham-zaffa-music/05-artists-page.png',
        alt: { en: 'Featured Vocalists & Artists', ar: 'استعراض المنشدين والفنانين' },
        caption: { en: 'Artist Profiles & Curated Portfolios', ar: 'ملفات المنشدين وأبرز أعمالهم المختارة' },
        sortOrder: 4,
      },
      {
        id: 'ang-5',
        projectId: 'p-angham',
        imageUrl: '/portfolio/projects/angham-zaffa-music/07-mobile-home.png',
        alt: { en: 'Mobile Optimized Streaming', ar: 'مشغل صوتي متجاوب للجوال' },
        caption: { en: 'Fast Streaming on Mobile Networks', ar: 'بث صوتي فوري وعالي الكفاءة للجوال' },
        sortOrder: 5,
      },
      {
        id: 'ang-6',
        projectId: 'p-angham',
        imageUrl: '/portfolio/projects/angham-zaffa-music/09-admin-dashboard.png',
        alt: { en: 'Audio Admin Dashboard', ar: 'لوحة التحكم وإدارة المسارات' },
        caption: { en: 'Centralized Track Management & Status', ar: 'نظام إدارة المحتوى ورفع المقاطع الصوتية' },
        sortOrder: 6,
      },
    ],
  },
  {
    id: 'p-artlens',
    slug: 'art-lens',
    title: { en: 'Art Lens — Studio Booking', ar: 'آرت لينس — منصة حجز خدمات التصوير' },
    summary: { en: 'A high-converting portfolio and booking platform for professional photography studios and event coverage.', ar: 'منصة بورتفوليو وحجز متكاملة لاستوديوهات التصوير الفوتوغرافي وتغطية المناسبات.' },
    problem: { en: 'Booking scheduling was done via manual calls, causing scheduling overlaps and friction.', ar: 'كانت الحجوزات تتم هاتفياً بشكل يدوي مما سبب تعارضاً في المواعيد وإهداراً للوقت.' },
    goal: { en: 'Automate package selection and photoshoot booking with real-time slot verification.', ar: 'أتمتة اختيار الباقات وحجز جلسات التصوير مع التحقق الفوري من التوفر.' },
    solution: { en: 'Created an aesthetic photo showcase integrated with an interactive booking and date picker system.', ar: 'تصميم معرض صور فني راقٍ متصل بنظام حجز تفاعلي واختيار مواعيد ذكي.' },
    role: { en: 'Full Stack Developer', ar: 'مطور ويب شامل' },
    challenges: { en: 'Designing a visual-first layout that remains performant with high-res photography.', ar: 'تصميم واجهة بصرية جذابة مع الحفاظ على الأداء العالي للصور الضخمة.' },
    results: { en: '100% elimination of double-booking errors and 45% increase in online reservations.', ar: 'القضاء على أخطاء تعارض المواعيد وزيادة الحجوزات الرقمية بنسبة 45%.' },
    techStack: ['Laravel', 'Livewire', 'Tailwind CSS', 'MySQL'],
    projectStatus: 'live',
    projectLanguages: ['PHP', 'JavaScript'],
    projectFrameworks: ['Laravel', 'Tailwind CSS', 'Livewire'],
    projectTools: ['MySQL'],
    projectPlatforms: ['Web App', 'Booking System'],
    demoVideoUrl: '',
    isFeatured: true,
    categoryIds: ['1'],
    imageUrl: '/portfolio/projects/art-lens/cover.png',
    order: 8,
    gallery: [
      {
        id: 'art-1',
        projectId: 'p-artlens',
        imageUrl: '/portfolio/projects/art-lens/01-home.png',
        alt: { en: 'Studio Portfolio Showcase', ar: 'معرض أعمال الاستوديو' },
        caption: { en: 'High-Impact Photography Showcase', ar: 'واجهة بصرية احترافية لتغطيات المناسبات' },
        sortOrder: 1,
      },
      {
        id: 'art-2',
        projectId: 'p-artlens',
        imageUrl: '/portfolio/projects/art-lens/02-services.png',
        alt: { en: 'Photography Packages & Services', ar: 'باقات وجلسات التصوير' },
        caption: { en: 'Comprehensive Studio Packages', ar: 'تفاصيل باقات التصوير الفنية والخدمات' },
        sortOrder: 2,
      },
      {
        id: 'art-3',
        projectId: 'p-artlens',
        imageUrl: '/portfolio/projects/art-lens/03-packages.png',
        alt: { en: 'Event Coverage Pricing', ar: 'تفاصيل باقات التغطيات' },
        caption: { en: 'Tiered Pricing & Feature Breakdown', ar: 'تسعير واضح ومفصل للباقات' },
        sortOrder: 3,
      },
      {
        id: 'art-4',
        projectId: 'p-artlens',
        imageUrl: '/portfolio/projects/art-lens/04-booking-form.png',
        alt: { en: 'Interactive Date & Slot Booking', ar: 'حجز المواعيد والجلسات الذكي' },
        caption: { en: 'Real-Time Calendar Availability', ar: 'تأكيد المواعيد فورياً عبر تقويم حجز ذكي' },
        sortOrder: 4,
      },
      {
        id: 'art-5',
        projectId: 'p-artlens',
        imageUrl: '/portfolio/projects/art-lens/05-portfolio-work.png',
        alt: { en: 'High-Res Photo Gallery', ar: 'ألبوم الصور عالي الدقة' },
        caption: { en: 'Fast High-Resolution Photo Masonry', ar: 'ألبوم صور متميز ومحسن للسرعة' },
        sortOrder: 5,
      },
    ],
  },
  {
    id: 'p1',
    slug: 'erp-dashboard',
    title: { en: 'Custom ERP Dashboard', ar: 'لوحة تحكم لإدارة موارد الشركة' },
    summary: { en: 'A scalable Laravel-based dashboard for managing HR and inventory.', ar: 'لوحة تحكم قابلة للتطوير مبنية بـ Laravel لإدارة الموارد البشرية والمخزون.' },
    problem: { en: 'The client was using multiple disconnected Excel sheets to manage data, causing severe operational delays.', ar: 'كان العميل يستخدم جداول إكسل متعددة ومنفصلة لإدارة البيانات، مما تسبب في تأخيرات تشغيلية شديدة.' },
    goal: { en: 'Centralize operations into a single, secure web application to improve efficiency.', ar: 'مركزة العمليات في تطبيق ويب واحد آمن لتحسين الكفاءة.' },
    solution: { en: 'Built a robust Laravel backend with a responsive Tailwind CSS frontend, ensuring secure role-based access.', ar: 'بناء خلفية Laravel قوية مع واجهة Tailwind CSS متجاوبة، مع ضمان الوصول الآمن بناءً على الأدوار.' },
    role: { en: 'Lead Full Stack Developer', ar: 'مطور ويب شامل رئيسي' },
    challenges: { en: 'Migrating legacy data without downtime while maintaining data integrity.', ar: 'ترحيل البيانات القديمة بدون توقف النظام مع الحفاظ على سلامة البيانات.' },
    results: { en: 'Reduced data entry time by 40% and improved reporting accuracy by eliminating duplicate entries.', ar: 'تقليل وقت إدخال البيانات بنسبة 40% وتحسين دقة التقارير عن طريق القضاء على الإدخالات المكررة.' },
    techStack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Alpine.js'],
    projectStatus: 'private',
    projectLanguages: ['PHP', 'JavaScript'],
    projectFrameworks: ['Laravel', 'Tailwind CSS', 'Alpine.js'],
    projectTools: ['MySQL'],
    projectPlatforms: ['Web App', 'Admin Dashboard'],
    demoVideoUrl: '',
    isFeatured: true,
    categoryIds: ['1', '3'],
    imageUrl: '/brand/social-preview.jpeg',
    order: 9,
    gallery: [
      {
        id: 'erp-1',
        projectId: 'p1',
        imageUrl: '/brand/social-preview.jpeg',
        alt: { en: 'ERP Management Overview', ar: 'نظرة عامة على نظام تخطيط الموارد' },
        caption: { en: 'Centralized Operations & Role Security', ar: 'لوحة مركزية لإدارة الموارد والمخزون وحماية البيانات' },
        sortOrder: 1,
      },
    ],
  },
  {
    id: 'p2',
    slug: 'woo-commerce-platform',
    title: { en: 'High-Volume WooCommerce Store', ar: 'متجر ووكومرس عالي الأداء' },
    summary: { en: 'Optimized e-commerce platform handling thousands of daily orders without crashes.', ar: 'منصة تجارة إلكترونية محسنة تتعامل مع آلاف الطلبات اليومية بدون أعطال.' },
    problem: { en: 'The previous store crashed during high traffic events, resulting in lost sales and frustrated customers.', ar: 'كان المتجر السابق يتعطل أثناء أحداث الزيارات العالية، مما أدى إلى فقدان المبيعات وإحباط العملاء.' },
    goal: { en: 'Ensure 99.9% uptime and lightning-fast load speeds during promotional sales.', ar: 'ضمان وقت تشغيل 99.9% وسرعة تحميل فائقة أثناء التخفيضات الترويجية.' },
    solution: { en: 'Implemented advanced caching with Redis, optimized slow database queries, and developed a custom lightweight theme.', ar: 'تنفيذ تخزين مؤقت متقدم باستخدام Redis، وتحسين استعلامات قاعدة البيانات البطيئة، وتطوير قالب خفيف مخصص.' },
    role: { en: 'Backend & Performance Engineer', ar: 'مهندس خلفية وأداء' },
    challenges: { en: 'Balancing dynamic cart pricing logic with aggressive server-side caching.', ar: 'موازنة منطق تسعير سلة التسوق الديناميكية مع التخزين المؤقت القوي على الخادم.' },
    results: { en: 'Increased conversion rate by 15% and eliminated downtime completely during peak seasons.', ar: 'زيادة معدل التحويل بنسبة 15% والقضاء على وقت التعطل تمامًا خلال مواسم الذروة.' },
    techStack: ['WordPress', 'WooCommerce', 'PHP', 'Redis', 'JavaScript'],
    liveUrl: '#',
    projectStatus: 'live',
    projectLanguages: ['PHP', 'JavaScript'],
    projectFrameworks: ['WordPress', 'WooCommerce'],
    projectTools: ['Redis'],
    projectPlatforms: ['Web App', 'E-Commerce'],
    demoVideoUrl: '',
    isFeatured: true,
    categoryIds: ['2'],
    imageUrl: '/brand/social-preview.jpeg',
    order: 10,
    gallery: [
      {
        id: 'woo-1',
        projectId: 'p2',
        imageUrl: '/brand/social-preview.jpeg',
        alt: { en: 'High-Concurrency Storefront', ar: 'معمارية متجر ووكومرس عالي الأداء' },
        caption: { en: 'High-Concurrency Caching & Fast Checkout', ar: 'بنية تحتية محسنة للتحميل السريع ومواسم التخفيضات' },
        sortOrder: 1,
      },
    ],
  }
];

export const skillCategories: SkillCategory[] = [
  { id: 'c1', name: { en: 'Backend Development', ar: 'تطوير الواجهات الخلفية' }, order: 3 },
  { id: 'c2', name: { en: 'Frontend Development', ar: 'تطوير الواجهات الأمامية' }, order: 4 },
  { id: 'c3', name: { en: 'Hosting & Performance', ar: 'الاستضافة والأداء' }, order: 5 },
];

export const skills: Skill[] = [
  {
    id: 's1',
    categoryId: 'c1',
    name: 'Laravel & PHP',
    iconClass: 'Database',
    businessValue: {
      en: 'Building secure, scalable backends that handle high traffic and complex business workflows reliably.',
      ar: 'بناء واجهات خلفية آمنة وقابلة للتطوير تتعامل مع حركة مرور عالية وسير عمل معقد بموثوقية.'
    },
    order: 3
  },
  {
    id: 's2',
    categoryId: 'c1',
    name: 'MySQL',
    iconClass: 'Server',
    businessValue: {
      en: 'Structuring robust databases that protect sensitive client data and provide instant query performance.',
      ar: 'هيكلة قواعد بيانات قوية تحمي بيانات العملاء الحساسة وتوفر أداء استعلام فوري.'
    },
    order: 4
  },
  {
    id: 's3',
    categoryId: 'c2',
    name: 'Tailwind CSS & JavaScript',
    iconClass: 'Layout',
    businessValue: {
      en: 'Crafting responsive, premium user interfaces that build trust and convert visitors into active clients.',
      ar: 'تصميم واجهات مستخدم متجاوبة واحترافية تبني الثقة وتحول الزوار إلى عملاء نشطين.'
    },
    order: 5
  },
  {
    id: 's4',
    categoryId: 'c3',
    name: 'cPanel & Performance',
    iconClass: 'Cpu',
    businessValue: {
      en: 'Deploying, maintaining, and optimizing applications to ensure continuous 99.9% uptime and fast loading speeds.',
      ar: 'نشر وصيانة وتحسين التطبيقات لضمان وقت تشغيل مستمر بنسبة 99.9% وسرعات تحميل عالية.'
    },
    order: 6
  }
];

export const services: Service[] = [
  {
    id: 'srv1',
    title: { en: 'Custom Web Application Development', ar: 'تطوير تطبيقات ويب مخصصة' },
    excerpt: { en: 'Scalable solutions for your unique business needs.', ar: 'حلول قابلة للتطوير لتلبية احتياجات عملك الفريدة.' },
    description: { en: 'From internal admin dashboards to client-facing SaaS platforms, I build robust applications tailored to streamline your operations and solve your specific bottlenecks.', ar: 'من لوحات التحكم الداخلية إلى منصات SaaS الموجهة للعملاء، أبني تطبيقات قوية مصممة لتسهيل عملياتك وحل مشاكلك الخاصة.' },
    iconClass: 'Laptop',
    expectedResult: { en: 'A secure, fast, and scalable system that automates tasks and saves your team hours of manual work.', ar: 'نظام آمن وسريع وقابل للتطوير يؤتمت المهام ويوفر على فريقك ساعات من العمل اليدوي.' },
    relatedTech: ['Laravel', 'Next.js', 'MySQL'],
    order: 2
  },
  {
    id: 'srv2',
    title: { en: 'E-Commerce Optimization', ar: 'تحسين المتاجر الإلكترونية' },
    excerpt: { en: 'High-converting stores that never crash under pressure.', ar: 'متاجر عالية التحويل لا تتعطل تحت الضغط.' },
    description: { en: 'I optimize WooCommerce and custom e-commerce setups to handle high traffic surges and deliver a frictionless checkout experience that maximizes your revenue.', ar: 'أقوم بتحسين ووكومرس ومتاجر التجارة الإلكترونية للتعامل مع الارتفاع المفاجئ في الزيارات وتقديم تجربة دفع سلسة تزيد من إيراداتك.' },
    iconClass: 'ShoppingCart',
    expectedResult: { en: 'Faster load times leading to an increased conversion rate and significantly reduced cart abandonment.', ar: 'أوقات تحميل أسرع تؤدي إلى زيادة معدل التحويل وتقليل التخلي عن سلة التسوق بشكل كبير.' },
    relatedTech: ['WooCommerce', 'WordPress', 'Redis'],
    order: 3
  },
  {
    id: 'srv3',
    title: { en: 'API Development & Integration', ar: 'تطوير وربط الواجهات البرمجية' },
    excerpt: { en: 'Connecting your isolated systems together seamlessly.', ar: 'ربط أنظمتك المعزولة ببعضها البعض بسلاسة.' },
    description: { en: 'I build highly secure REST APIs and integrate third-party services like payment gateways, CRMs, and marketing tools to fully automate your business data flow.', ar: 'أبني واجهات REST برمجية آمنة للغاية وأقوم بربط خدمات الطرف الثالث مثل بوابات الدفع وأدوات التسويق لأتمتة تدفق بيانات عملك بالكامل.' },
    iconClass: 'Network',
    expectedResult: { en: 'Reliable, automated data flow between your previously disconnected business tools, eliminating manual entry.', ar: 'تدفق بيانات موثوق وآلي بين أدوات عملك المنفصلة سابقاً، مما يقضي على الإدخال اليدوي.' },
    relatedTech: ['REST APIs', 'PHP', 'OAuth'],
    order: 4
  }
];

export const resumeSections: ResumeSection[] = [
  {
    id: 'r1',
    type: 'experience',
    title: { en: 'Senior Full Stack Developer', ar: 'مطور ويب شامل أول' },
    organization: { en: 'Freelance & Contracting', ar: 'عمل حر وتعاقدات' },
    startDate: '2021',
    endDate: 'Present',
    isCurrent: true,
    description: { en: 'Delivered multiple high-value projects including complex ERP systems, high-traffic e-commerce stores, and secure APIs for international clients, driving measurable business growth.', ar: 'تسليم مشاريع متعددة عالية القيمة بما في ذلك أنظمة تخطيط موارد المؤسسات المعقدة، ومتاجر إلكترونية عالية الزيارات، وواجهات برمجية آمنة لعملاء دوليين، مما أدى إلى نمو ملموس في الأعمال.' },
    order: 2
  },
  {
    id: 'r2',
    type: 'experience',
    title: { en: 'Web Developer', ar: 'مطور ويب' },
    organization: { en: 'Tech Solutions Agency', ar: 'وكالة الحلول التقنية' },
    startDate: '2018',
    endDate: '2021',
    isCurrent: false,
    description: { en: 'Maintained and upgraded legacy PHP applications to modern standards. Implemented new, responsive features using Laravel and modern JavaScript frameworks, improving user retention.', ar: 'صيانة وتحديث تطبيقات PHP القديمة إلى المعايير الحديثة. تنفيذ ميزات جديدة ومتجاوبة باستخدام Laravel وأطر عمل JavaScript الحديثة، مما أدى إلى تحسين الاحتفاظ بالمستخدمين.' },
    order: 3
  }
];

export const aboutData = {
  story: {
    en: "With over 5 years of experience in full-stack development, I specialize in transforming complex business requirements into elegant, scalable web solutions. My journey started with a deep curiosity for how the web works, leading me to master PHP and the Laravel ecosystem. Today, I combine robust backend engineering with modern frontend technologies to deliver complete digital products that drive real ROI for my clients. I don't just write code; I build business assets.",
    ar: "مع أكثر من 5 سنوات من الخبرة في تطوير الويب الشامل، أتخصص في تحويل متطلبات الأعمال المعقدة إلى حلول ويب أنيقة وقابلة للتطوير. بدأت رحلتي بفضول عميق حول كيفية عمل الويب، مما قادني إلى إتقان لغة PHP ونظام Laravel البيئي. اليوم، أجمع بين هندسة الواجهات الخلفية القوية وتقنيات الواجهات الأمامية الحديثة لتقديم منتجات رقمية كاملة تحقق عائد استثمار حقيقي لعملائي. أنا لا أكتب شفرات برمجية فحسب؛ بل أبني أصولاً تجارية."
  },
  values: {
    en: ["Security First", "Performance Driven", "Client-Centric Communication", "Clean Architecture"],
    ar: ["الأمان أولاً", "التركيز على الأداء", "التواصل المرتكز على العميل", "البنية النظيفة"]
  }
};

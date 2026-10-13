import { Project, Service, Skill, SkillCategory, ResumeSection, ProjectCategory } from '../types';

export const projectCategories: ProjectCategory[] = [
  { id: '1', slug: 'web-apps', name: { en: 'Web Applications', ar: 'تطبيقات الويب' } },
  { id: '2', slug: 'e-commerce', name: { en: 'E-Commerce', ar: 'التجارة الإلكترونية' } },
  { id: '3', slug: 'apis', name: { en: 'APIs & Backend', ar: 'واجهات برمجية وخلفيات' } },
];

export const projects: Project[] = [
  {
    id: 'p-lumiere',
    slug: 'lumiere-boutique',
    title: { en: 'Lumière Boutique — Luxury Store', ar: 'متجر لوميير — تجارة إلكترونية فاخرة' },
    summary: { en: 'A premium bilingual e-commerce application with product catalog, cart flow, and comprehensive admin dashboard.', ar: 'تطبيق متجر إلكتروني فاخر ثنائي اللغة يضم كتالوج المنتجات، مسار الشراء، ولوحة تحكم شاملة.' },
    problem: { en: 'Boutique businesses need an elegant online storefront that reflects high-end branding while offering seamless order workflows.', ar: 'تحتاج العلامات التجارية الفاخرة إلى واجهة متجر تعكس الرقي وتتيح مسار طلب بسيط وسلس.' },
    goal: { en: 'Deliver a high-converting, visually stunning shopping experience with complete inventory control.', ar: 'تقديم تجربة تسوق ساحرة وعالية التحويل مع تحكم كامل بالمخزون.' },
    solution: { en: 'Engineered a custom Laravel storefront with dark/light themes, instant search filters, and rich administrative tooling.', ar: 'تطوير متجر مخصص بالوضع الداكن والفاتح، وفلاتر بحث فورية، وأدوات إدارة متقدمة.' },
    role: { en: 'Lead Full Stack Developer', ar: 'مطور ويب شامل رئيسي' },
    challenges: { en: 'Harmonizing high-resolution imagery with sub-second page transitions.', ar: 'التوفيق بين الصور فائقة الدقة وسرعة التصفح الفائقة.' },
    results: { en: 'Delivered an enterprise-ready retail showcase ready for production launch.', ar: 'إطلاق منصة تجارية متكاملة ومهيأة للنمو السريع.' },
    techStack: ['Laravel 12', 'Tailwind CSS', 'Alpine.js', 'SQLite', 'Blade'],
    projectStatus: 'live',
    projectLanguages: ['PHP', 'JavaScript'],
    projectFrameworks: ['Laravel', 'Tailwind CSS', 'Alpine.js'],
    projectTools: ['SQLite', 'Blade'],
    projectPlatforms: ['Web App', 'E-Commerce', 'Admin Panel'],
    demoVideoUrl: '',
    isFeatured: true,
    categoryIds: ['1', '2'],
    imageUrl: '/portfolio/projects/lumiere-boutique/cover.png',
    order: 1,
    gallery: [
      {
        id: 'lum-1',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/01-home.png',
        alt: { en: 'Storefront Homepage', ar: 'الواجهة الرئيسية للمتجر' },
        caption: { en: 'Luxury Storefront Experience', ar: 'واجهة متجر فاخرة ومتجاوبة بالكامل' },
        sortOrder: 1,
      },
      {
        id: 'lum-2',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/02-products.png',
        alt: { en: 'Product Catalog Grid', ar: 'كتالوج المنتجات الفاخرة' },
        caption: { en: 'Curated Catalog & Real-Time Stock', ar: 'عرض متقن للمنتجات مع حالة التوفر الفورية' },
        sortOrder: 2,
      },
      {
        id: 'lum-3',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/03-products-filter-search.png',
        alt: { en: 'Instant Filters & Search', ar: 'الفلاتر والبحث الفوري' },
        caption: { en: 'Faceted Search & Multi-Attribute Filters', ar: 'بحث متقدم وتصفية متعددة الخصائص' },
        sortOrder: 3,
      },
      {
        id: 'lum-4',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/05-product-details.png',
        alt: { en: 'Product Details & Variants', ar: 'تفاصيل المنتج والخيارات' },
        caption: { en: 'High-Resolution Imagery & Variant Selector', ar: 'استعراض تفاصيل المنتج واختيار المقاسات' },
        sortOrder: 4,
      },
      {
        id: 'lum-5',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/06-cart.png',
        alt: { en: 'Interactive Shopping Bag', ar: 'سلة المشتريات التفاعلية' },
        caption: { en: 'Frictionless Slide-Over Cart Workflow', ar: 'مسار سلة تسوق سريع وسلس مع تحديث فوري' },
        sortOrder: 5,
      },
      {
        id: 'lum-6',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/09-admin-orders.png',
        alt: { en: 'Admin Orders Dashboard', ar: 'لوحة إدارة ومتابعة الطلبات' },
        caption: { en: 'Comprehensive Operational Management', ar: 'لوحة تحكم إدارية متكاملة لمتابعة العمليات' },
        sortOrder: 6,
      },
      {
        id: 'lum-7',
        projectId: 'p-lumiere',
        imageUrl: '/portfolio/projects/lumiere-boutique/16-dark-light-mode.png',
        alt: { en: 'Adaptive Bilingual Theme', ar: 'الوضع الليلي والنهاري ثنائي اللغة' },
        caption: { en: 'Polished Arabic and English Theme Support', ar: 'دعم كامل للغتين العربية والإنجليزية' },
        sortOrder: 7,
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
    order: 2,
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
    order: 3,
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
    order: 4,
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
    order: 5,
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
  { id: 'c1', name: { en: 'Backend Development', ar: 'تطوير الواجهات الخلفية' }, order: 1 },
  { id: 'c2', name: { en: 'Frontend Development', ar: 'تطوير الواجهات الأمامية' }, order: 2 },
  { id: 'c3', name: { en: 'Hosting & Performance', ar: 'الاستضافة والأداء' }, order: 3 },
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
    order: 1
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
    order: 2
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
    order: 3
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
    order: 4
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
    order: 1
  },
  {
    id: 'srv2',
    title: { en: 'E-Commerce Optimization', ar: 'تحسين المتاجر الإلكترونية' },
    excerpt: { en: 'High-converting stores that never crash under pressure.', ar: 'متاجر عالية التحويل لا تتعطل تحت الضغط.' },
    description: { en: 'I optimize WooCommerce and custom e-commerce setups to handle high traffic surges and deliver a frictionless checkout experience that maximizes your revenue.', ar: 'أقوم بتحسين ووكومرس ومتاجر التجارة الإلكترونية للتعامل مع الارتفاع المفاجئ في الزيارات وتقديم تجربة دفع سلسة تزيد من إيراداتك.' },
    iconClass: 'ShoppingCart',
    expectedResult: { en: 'Faster load times leading to an increased conversion rate and significantly reduced cart abandonment.', ar: 'أوقات تحميل أسرع تؤدي إلى زيادة معدل التحويل وتقليل التخلي عن سلة التسوق بشكل كبير.' },
    relatedTech: ['WooCommerce', 'WordPress', 'Redis'],
    order: 2
  },
  {
    id: 'srv3',
    title: { en: 'API Development & Integration', ar: 'تطوير وربط الواجهات البرمجية' },
    excerpt: { en: 'Connecting your isolated systems together seamlessly.', ar: 'ربط أنظمتك المعزولة ببعضها البعض بسلاسة.' },
    description: { en: 'I build highly secure REST APIs and integrate third-party services like payment gateways, CRMs, and marketing tools to fully automate your business data flow.', ar: 'أبني واجهات REST برمجية آمنة للغاية وأقوم بربط خدمات الطرف الثالث مثل بوابات الدفع وأدوات التسويق لأتمتة تدفق بيانات عملك بالكامل.' },
    iconClass: 'Network',
    expectedResult: { en: 'Reliable, automated data flow between your previously disconnected business tools, eliminating manual entry.', ar: 'تدفق بيانات موثوق وآلي بين أدوات عملك المنفصلة سابقاً، مما يقضي على الإدخال اليدوي.' },
    relatedTech: ['REST APIs', 'PHP', 'OAuth'],
    order: 3
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
    order: 1
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
    order: 2
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

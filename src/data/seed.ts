import { Project, Service, Skill, SkillCategory, ResumeSection, ProjectCategory } from '../types';

export const projectCategories: ProjectCategory[] = [
  { id: '1', slug: 'web-apps', name: { en: 'Web Applications', ar: 'تطبيقات الويب' } },
  { id: '2', slug: 'e-commerce', name: { en: 'E-Commerce', ar: 'التجارة الإلكترونية' } },
  { id: '3', slug: 'apis', name: { en: 'APIs & Backend', ar: 'واجهات برمجية وخلفيات' } },
];

export const projects: Project[] = [
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
    order: 1,
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
    order: 2,
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

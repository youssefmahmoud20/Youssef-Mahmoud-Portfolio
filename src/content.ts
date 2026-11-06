export const asset = (file: string) => `/assets/${file}`;
export const base = "/developer";
export const home = (section = "home") => `${base}/#${section}`;
export const navItems = [
  { id: "home", label: "About", icon: "user" },
  { id: "services", label: "Services", icon: "code" },
  { id: "resume", label: "Resume", icon: "list" },
  { id: "works", label: "Works", icon: "eye" },
  { id: "contact", label: "Contact", icon: "plane" },
];
export const profile = {
  name: "Youssef Mahmoud",
  location: "Beirut, Lebanon",
  email: "youssefhijazibsns@gmail.com",
  phone: "+961 76 988 768",
};

export const roles = [
  "Full Stack Developer",
  "WordPress Developer",
  "Freelancer",
];

export const socials: { icon: string; label: string; url: string }[] = [
  {
    icon: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/yousseff.mahh",
  },
  {
    icon: "github",
    label: "GitHub",
    url: "https://github.com/youssefmahmoud20",
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/youssef-mahmoud-7585b1232/",
  },
  { icon: "whatsapp", label: "WhatsApp", url: "https://wa.me/96176988768" },
];

export const services = [
  {
    icon: "code",
    title: "Full Stack Development",
    text: "Build responsive web applications, dashboards, and internal tools from requirements through deployment.",
    details: [
      "React and Next.js interfaces",
      "Node.js, Express, and PHP backends",
      "MySQL, PostgreSQL, and MongoDB data models",
    ],
  },
  {
    icon: "wordpress",
    title: "WordPress Development",
    text: "Build and extend WordPress sites around your content and the way your team works.",
    details: [
      "Custom themes, plugins, and Gutenberg blocks",
      "ACF, custom post types, and tailored admin pages",
      "Multilingual, LMS, and affiliate workflows",
    ],
  },
  {
    icon: "cart",
    title: "E-commerce & WooCommerce",
    text: "Create online stores with clear product navigation and checkout flows that fit your business.",
    details: [
      "Catalog setup, categories, and filtering",
      "Payment gateway and third-party integrations",
      "Custom WooCommerce features and workflows",
    ],
  },
  {
    icon: "link",
    title: "APIs & Automation",
    text: "Connect your website and business tools so teams spend less time entering the same data twice.",
    details: [
      "REST API development and integration",
      "Authentication and data synchronization",
      "Workflow automation and administrative tools",
    ],
  },
  {
    icon: "shield",
    title: "Performance & Maintenance",
    text: "Improve page speed, resolve production issues, and make existing sites easier to maintain.",
    details: [
      "Caching, asset and database optimization",
      "Technical SEO and security improvements",
      "Hosting, DNS, Cloudflare, and migrations",
    ],
  },
  {
    icon: "rocket",
    title: "Deployment & Support",
    text: "Take an application from a working build to production and keep it running after launch.",
    details: [
      "Docker and CI/CD workflows",
      "AWS, CloudFront, and Microsoft Azure",
      "Release troubleshooting and post-launch support",
    ],
  },
];

export const testimonials = [
  {
    topic: "Store launch",
    quote:
      "The product filters made our catalog easier to browse, and the checkout flow was simple to test before launch.",
  },
  {
    topic: "WordPress maintenance",
    quote:
      "We could update the site ourselves after the handover, and the mobile pages felt quicker to load.",
  },
  {
    topic: "Business dashboard",
    quote:
      "Putting the reports in one dashboard saved us from switching between spreadsheets to answer basic questions.",
  },
];

export const experience = [
  {
    date: "2021 – Present",
    title: "Freelance Full Stack Developer",
    place: "Lebanon / Remote",
    text: "Delivered 20+ production applications, stores, dashboards, and business solutions. Built responsive interfaces, backend services, and database workflows. Integrated payments, authentication, and third-party APIs, and managed deployments, migrations, performance, security, and post-launch support.",
    current: true,
  },
  {
    date: "Jan 2026 – Jul 2026",
    title: "WordPress & Full Stack MERN Developer",
    place: "Najahak.io · Beirut, Lebanon",
    text: "Built production MERN applications, APIs, admin tools, and responsive interfaces. Developed custom WordPress plugins and WooCommerce functionality for multilingual, affiliate, LMS, and e-commerce workflows. Supported deployments, SEO, and production troubleshooting.",
  },
  {
    date: "2022 – 2025",
    title: "WordPress Developer",
    place: "Inspiral Solutions · Lebanon",
    text: "Improved WordPress website performance by up to 40% through caching, asset optimization, and code refinement. Built custom themes, plugins, and responsive templates, resolved hosting issues, and completed site migrations.",
  },
];

export const education = [
  {
    date: "2022 – 2025",
    title: "Bachelor of Science in Computer Science",
    place: "Lebanese International University (LIU)",
  },
];

export const skillGroups = [
  {
    icon: "html",
    title: "Front End",
    items: [
      "JavaScript (ES6+), TypeScript, HTML5, CSS3",
      "React, Next.js, AJAX, jQuery",
      "Responsive web development",
    ],
  },
  {
    icon: "code",
    title: "Back End & Databases",
    items: [
      "Node.js, Express.js, PHP",
      "REST APIs, integrations, SQL",
      "MySQL, PostgreSQL, MongoDB",
    ],
  },
  {
    icon: "wordpress",
    title: "WordPress & E-commerce",
    items: [
      "WordPress, WooCommerce, WP-CLI",
      "Custom themes, plugins, and Gutenberg",
      "ACF, custom post types, and custom admin pages",
    ],
  },
  {
    icon: "rocket",
    title: "Cloud & Development",
    items: [
      "AWS, CloudFront, Azure, Docker, CI/CD",
      "Git, GitHub, deployment and debugging",
      "Performance optimization and security",
      "Codex, Claude Code, Cursor",
    ],
  },
  {
    icon: "language",
    title: "Languages",
    items: ["Arabic — Native", "English — Professional working proficiency"],
  },
];

export const workCategories = [
  "E-commerce",
  "Business",
  "News",
  "Educational",
  "Nonprofit",
] as const;

export type Work = {
  title: string;
  category: (typeof workCategories)[number];
  url: string;
  image: string;
  width: number;
  height: number;
};

export const works: Work[] = [
  {
    title: "Manateq",
    category: "News",
    url: "https://manateq.net/",
    image: "works/manateq.webp",
    width: 1891,
    height: 906,
  },
  {
    title: "Huna Canada",
    category: "News",
    url: "https://hunacanada.net/",
    image: "works/huna-canada.webp",
    width: 1893,
    height: 912,
  },
  {
    title: "Shibani",
    category: "E-commerce",
    url: "https://shibani-lb.com/",
    image: "works/shibani.webp",
    width: 1893,
    height: 910,
  },
  {
    title: "Smart Garden",
    category: "E-commerce",
    url: "https://smartgarden.com.lb/",
    image: "works/smart-garden.webp",
    width: 1897,
    height: 910,
  },
  {
    title: "Nonagon",
    category: "Business",
    url: "https://nonagon-studio.com/",
    image: "works/nonagon.webp",
    width: 1893,
    height: 904,
  },
  {
    title: "Claline",
    category: "E-commerce",
    url: "https://claline.com/",
    image: "works/claline.webp",
    width: 1897,
    height: 912,
  },
  {
    title: "ANPE",
    category: "Nonprofit",
    url: "https://anpelb.org/",
    image: "works/anpe.webp",
    width: 1893,
    height: 908,
  },
  {
    title: "Perla Home",
    category: "E-commerce",
    url: "https://perlahomelebanon.com/",
    image: "works/perla-home.webp",
    width: 1895,
    height: 908,
  },
  {
    title: "Fun Square",
    category: "Business",
    url: "https://funsquareleb.com/",
    image: "works/fun-square.webp",
    width: 1895,
    height: 904,
  },
  {
    title: "EAU",
    category: "Educational",
    url: "https://eaugroup.co/",
    image: "works/eau.webp",
    width: 1897,
    height: 908,
  },
  {
    title: "Calia Group",
    category: "E-commerce",
    url: "https://shop.caliagroup.com/",
    image: "works/calia-group.webp",
    width: 1895,
    height: 910,
  },
  {
    title: "Baladi",
    category: "Business",
    url: "https://baladirestaurant.com/",
    image: "works/baladi.webp",
    width: 1868,
    height: 904,
  },
  {
    title: "Le Figuier",
    category: "Business",
    url: "https://restaurant-lefiguier.ch/",
    image: "works/le-figuier.webp",
    width: 1899,
    height: 912,
  },
  {
    title: "Ayniya",
    category: "E-commerce",
    url: "https://ayniya.com/",
    image: "works/ayniya.webp",
    width: 1895,
    height: 902,
  },
  {
    title: "AUA",
    category: "Business",
    url: "https://aua.ai/",
    image: "works/aua.webp",
    width: 1897,
    height: 904,
  },
  {
    title: "Arvada",
    category: "Business",
    url: "https://arvada-lb.com/",
    image: "works/arvada.webp",
    width: 1897,
    height: 906,
  },
];

export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  category: string;
  categorySlug: string;
  image: string;
  short: string;
  description: string;
  attributes: [string, string][];
};
export const products: Product[] = [
  {
    id: 315,
    slug: "web-development",
    name: "Web Development",
    price: 599,
    category: "Web Development",
    categorySlug: "web-development",
    image: "prod2-2.jpg",
    short:
      "Web design, front-end development, back-end development, and full-stack development.",
    description:
      "Front-end development focuses on the visual elements and behavior of a website in the browser. Back-end development handles the server, application, and database. Full-stack development brings these roles together.",
    attributes: [
      [
        "Web Design",
        "Design of the visual layout and experience of a website.",
      ],
      [
        "Front-end",
        "Development of the user interface and browser interactions.",
      ],
      ["WordPress", "Custom WordPress websites and development."],
    ],
  },
  {
    id: 322,
    slug: "branding-marketing",
    name: "Branding Marketing",
    price: 399,
    category: "Branding",
    categorySlug: "branding",
    image: "prod1-2.jpg",
    short:
      "Brand strategy, market positioning, advertising, pricing, and customer satisfaction.",
    description:
      "Branding marketing manages the strategy and positioning of your brand. Build a clear visual identity, connect with your audience, and bring a consistent message to your marketing.",
    attributes: [
      ["Logo Design", "A distinctive visual identity for your company."],
      [
        "Social Media Branding",
        "Consistent brand communication across social channels.",
      ],
      [
        "Company Name Branding",
        "Create a memorable name and identity for your business.",
      ],
    ],
  },
];
export const productUrl = (product: Product) =>
  `${base}/product/${product.slug}/`;
export const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

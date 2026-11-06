export const asset = (file: string) => `/assets/${file}`;
export const base = "/developer";
export const home = (section = "home") => `${base}/#${section}`;
export const navItems = [
  { id: "home", label: "About", icon: "user" },
  { id: "resume", label: "Resume", icon: "list" },
  { id: "works", label: "Works", icon: "eye" },
  { id: "contact", label: "Contact", icon: "plane" },
  { id: "products", label: "Products", icon: "desktop" },
];
export const roles = [
  "Back-end Developer",
  "Front-end Developer",
  "Freelancer",
  "Programmer",
];
export const socials = [
  { icon: "instagram", label: "Instagram", url: "https://dribbble.com/" },
  { icon: "twitter", label: "Twitter", url: "https://twitter.com/" },
  { icon: "github", label: "GitHub", url: "https://github.com/" },
  {
    icon: "stackoverflow",
    label: "Stack Overflow",
    url: "https://stackoverflow.com/",
  },
  { icon: "whatsapp", label: "WhatsApp", url: "https://www.whatsapp.com/" },
];
export const services = [
  {
    icon: "html",
    title: "Front-end",
    text: "Modern and mobile-ready website that will help you reach all of your marketing.",
  },
  {
    icon: "php",
    title: "Back-End",
    text: "UI/UX focus on the user, frontend focus on the settings of the user, and backend focus on the data.",
  },
  {
    icon: "wordpress",
    title: "WordPress Development",
    text: "WordPress development services improve business websites.",
  },
  {
    icon: "shield",
    title: "WordPress Security",
    text: "Security consultants can check the code and scan for vulnerabilities.",
  },
];
export const clients = [
  {
    name: "envato",
    image: "brand3_w-184x62.png",
    url: "https://www.envato.com/",
  },
  {
    name: "freelancer",
    image: "brand1_w-184x62.png",
    url: "https://www.freelancer.com/",
  },
  {
    name: "upwork",
    image: "brand2_w-184x62.png",
    url: "https://www.upwork.com/",
  },
  {
    name: "Google",
    image: "brand3-184x62.png",
    url: "https://www.google.com/",
  },
];
export const quote =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
export const testimonials = [
  { name: "Helen Floyd", role: "Art Director", image: "testi1-184x184.jpg" },
  { name: "Robert Chase", role: "CEO", image: "testi2-184x184.jpg" },
  { name: "John Doe", role: "Art Director", image: "avatar2-184x184.png" },
];
export const experience = [
  {
    date: "2018 - Present",
    title: "Team Leader",
    place: "Facebook Inc.",
    text: "Collaborate with creative and development teams on the execution of ideas.",
    logo: "rlogo3.png",
    action: "Recommendation",
    current: true,
  },
  {
    date: "2016 - 2018",
    title: "Web Developer",
    place: "Upwork Inc.",
    text: "Monitored technical aspects of the front-end delivery for projects.",
    logo: "brand2_w.png",
    action: "Recommendation",
  },
  {
    date: "2014 - 2016",
    title: "Software Developer",
    place: "Envato Inc.",
    text: "Optimize your website and apps performance using latest technology.",
    logo: "brand3_w.png",
  },
];
export const education = [
  {
    date: "2010 - 2014",
    title: "Stamford University",
    place: "United States",
    text: "Stanford University, a private research university in Stanford, California.",
    action: "Certificate",
  },
  {
    date: "2009 - 2010",
    title: "Programming Course",
    place: "London",
    text: "Coursework — Git, WordPress, Javascript, iOS, Android.",
    action: "Certificate",
  },
  {
    date: "1999 - 2009",
    title: "London School",
    place: "London",
    text: "Converting Photoshop layouts to web pages using HTML, CSS, and JavaScript.",
  },
];
export const coding = [
  { name: "WordPress", value: 90 },
  { name: "PHP / MYSQL", value: 75 },
  { name: "Angular / JavaScript", value: 85 },
  { name: "HTML / CSS", value: 95 },
];
export const knowledge = [
  "Website hosting",
  "WordPress Development",
  "Hosting Installation",
  "SEO Optimize",
  "Responsive and mobile-ready",
  "Advertising services",
  "HTML, CSS, jQuery",
  "Search engine marketing",
];
export const frontend = [
  { name: "Java", value: 90 },
  { name: "Angular", value: 65 },
  { name: "jQuery", value: 75 },
  { name: "HTML", value: 85 },
];
export const languages = [
  { name: "English", value: 90 },
  { name: "German", value: 60 },
  { name: "Italian", value: 30 },
  { name: "French", value: 70 },
];

export type Work = {
  title: string;
  slug: string;
  type: string;
  image: string;
  width: number;
  height: number;
  gallery: string[];
  thumbnailGallery?: string[];
};
const supplements = (nums: number[]) => nums.map((n) => `work-single${n}.jpg`);
export const works: Work[] = [
  {
    title: "Weather Mobile App",
    slug: "weather-mobile-app",
    type: "Gallery",
    image: "work1-1.jpg",
    width: 1200,
    height: 1200,
    gallery: supplements([1, 2, 3, 4]),
  },
  {
    title: "OYYI Furniture App",
    slug: "oyyi-furniture-app",
    type: "Link",
    image: "work2-1.jpg",
    width: 1200,
    height: 900,
    gallery: supplements([1, 2, 3, 4]),
  },
  {
    title: "Sushi Parlour App",
    slug: "sushi-parlour-app",
    type: "Gallery",
    image: "work3-1.jpg",
    width: 1200,
    height: 1600,
    gallery: supplements([6, 5]),
    thumbnailGallery: supplements([5, 6]),
  },
  {
    title: "Unicode Web App",
    slug: "unicode-web-app",
    type: "Video",
    image: "work4-1.jpg",
    width: 1200,
    height: 800,
    gallery: supplements([6, 5]),
  },
  {
    title: "SOUNDS Web App",
    slug: "sounds-web-app",
    type: "Content",
    image: "work8.jpg",
    width: 1200,
    height: 857,
    gallery: supplements([6, 5]),
  },
  {
    title: "Future Web App",
    slug: "future-web-app",
    type: "Image",
    image: "work6.jpg",
    width: 1200,
    height: 1029,
    gallery: supplements([6, 5]),
  },
  {
    title: "Furniture Mobile App",
    slug: "furniture-mobile-app",
    type: "Content",
    image: "work7.jpg",
    width: 1200,
    height: 1560,
    gallery: supplements([1, 2, 3, 4]),
  },
  {
    title: "ChatApp Mobile",
    slug: "chatapp-mobile",
    type: "Image",
    image: "work5-1.jpg",
    width: 1200,
    height: 727,
    gallery: supplements([1, 2, 3, 4]),
  },
];
export const workUrl = (work: Work) =>
  `${base}/portfolio-archive/${work.slug}/`;
export const projectDescription =
  "So striking at of to welcomed resolved. Northward by described up household therefore attention. Excellence decisively nay man yet impression for contrasted remarkably.";
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

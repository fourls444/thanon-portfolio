export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  fullSrc?: string;
  label?: string;
  description?: string;
  section?: string;
  group?: "Public Website" | "Member Portal" | "Back Office";
};

export type Project = {
  slug: string;
  title: string;
  year: number;
  category: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  confidentialityNote?: string;
  media?: ProjectMedia[];
  stack: string[];
  github?: string;
  live?: string;
  previews?: ProjectPreview[];
};

export type ProjectPreview = {
  src: string;
  alt: string;
  label?: string;
};

const internshipImage = (
  path: string,
  label: string,
  description: string,
  section: string,
): ProjectMedia => ({
  type: "image",
  src: `images/projects/internship/generated-v2/${path}.webp`,
  fullSrc: `images/projects/internship/generated-v2/${path}.webp`,
  alt: `${label}, sample Internship Project screen`,
  label,
  description,
  section,
  group: path.startsWith("member-portal/")
    ? "Member Portal"
    : path.startsWith("public-")
      ? "Public Website"
      : "Back Office",
});

const internshipMedia: ProjectMedia[] = [
  {
    type: "image",
    src: "images/projects/internship/generated-v2/public-information/home.webp",
    fullSrc: "images/projects/internship/generated-v2/public-information/home.webp",
    alt: "Sample Internship Project public website home page",
    label: "Public Website · Home",
    description: "Home page with services, activities, and news.",
    section: "Home",
    group: "Public Website",
  },
  internshipImage("public-information/about-overview", "Public Website · About Overview", "Short introduction to the sample organization.", "About"),
  internshipImage("public-information/department", "Public Website · Departments", "List of departments and their services.", "About"),
  internshipImage("public-information/contact", "Public Website · Contact", "Contact details and a simple message form.", "Contact"),
  internshipImage("public-services/service-index", "Public Website · Service Index", "List of public services with search.", "Public Services"),
  internshipImage("public-services/public-projects", "Public Website · Public Projects", "Project list with filters and short details.", "Projects"),
  internshipImage("public-services/e-service-index", "Public Website · E-Service Index", "List of online services in one place.", "E-Service"),
  internshipImage("public-services/e-service-form", "Public Website · E-Service Form", "Step-by-step online service form.", "E-Service"),
  internshipImage("public-services/meetings", "Public Website · Meetings", "List of upcoming meetings and activities.", "Activities"),
  internshipImage("public-services/news", "Public Website · News", "News page with search and categories.", "News"),
  internshipImage("public-services/other-services", "Public Website · Other Services", "Extra services grouped by type.", "Public Services"),
  internshipImage("member-portal/login", "Member Portal · Sign In", "Sign-in page using sample account details.", "Member Portal"),
  internshipImage("member-portal/member-home", "Member Portal · Dashboard", "Member home page with important updates.", "Member Home"),
  internshipImage("member-portal/profile", "Member Portal · Profile", "Member profile using sample personal data.", "Profile"),
  internshipImage("member-portal/member-services", "Member Portal · Services", "Quick links to common member services.", "Services"),
  internshipImage("member-portal/member-meetings", "Member Portal · Appointments", "Appointment list with clear status labels.", "Appointments"),
  internshipImage("member-portal/learning-hub", "Member Portal · Learning Hub", "Articles, videos, and learning materials.", "Learning"),
  internshipImage("member-portal/courses", "Member Portal · Courses", "Course list with filters and progress.", "Learning"),
  internshipImage("member-portal/careers", "Member Portal · Careers", "Job search page with sample listings.", "Careers"),
  internshipImage("member-portal/tools", "Member Portal · Tools", "Useful tools for members.", "Tools"),
  internshipImage("member-portal/store", "Member Portal · Store", "Store page with sample products and prices.", "Store"),
  internshipImage("backoffice-core/admin-login", "Back Office · Sign In", "Sign-in page for staff.", "Access"),
  internshipImage("backoffice-core/module-dashboard", "Back Office · Module Dashboard", "Main page for choosing a work area.", "Dashboard"),
  internshipImage("backoffice-core/registration-dashboard", "Back Office · Registration Dashboard", "Summary of registrations and their status.", "Registration"),
  internshipImage("backoffice-core/registration-list", "Back Office · Registration List", "Searchable list of sample registrations.", "Registration"),
  internshipImage("backoffice-core/settings", "Back Office · Settings", "Basic system settings.", "Settings"),
  internshipImage("backoffice-core/users", "Back Office · Users", "User list with roles and account status.", "Users"),
  internshipImage("backoffice-core/permissions", "Back Office · Permissions", "Page for setting access by role.", "Permissions"),
  internshipImage("council-website-cms/cms-dashboard", "Back Office · Website Dashboard", "Overview of website content.", "Website CMS"),
  internshipImage("council-website-cms/website-settings", "Back Office · Website Settings", "Settings for the sample website.", "Website CMS"),
  internshipImage("council-website-cms/homepage-manager", "Back Office · Homepage Manager", "Page for managing home page content.", "Homepage"),
  internshipImage("council-website-cms/agency-manager", "Back Office · Department Manager", "Page for managing department information.", "Departments"),
  internshipImage("council-website-cms/about-overview", "Back Office · About Overview", "Page for editing the About overview.", "About"),
  internshipImage("services-news-cms/service-overview", "Back Office · Service Overview", "Main page for managing services.", "Services"),
  internshipImage("services-news-cms/public-project-list", "Back Office · Public Projects", "List of sample public projects.", "Projects"),
  internshipImage("services-news-cms/e-service-manager", "Back Office · E-Service Manager", "Page for managing online services.", "E-Service"),
  internshipImage("services-news-cms/other-service-manager", "Back Office · Other Services", "Page for managing extra services.", "Services"),
  internshipImage("services-news-cms/news-list", "Back Office · News", "Page for managing news items.", "News"),
  internshipImage("operations/pharmacist-dashboard", "Back Office · Professional Dashboard", "Summary page for a sample service area.", "Professional Service"),
  internshipImage("operations/pharmacist-homepage", "Back Office · Professional Homepage", "Page for managing service home content.", "Professional Service"),
  internshipImage("operations/product-manager", "Back Office · Product Manager", "Page for managing sample products.", "Products"),
  internshipImage("operations/e-service-dashboard", "Back Office · E-Service Dashboard", "Summary of online service activity.", "E-Service"),
  internshipImage("operations/service-catalog", "Back Office · Service Catalogue", "List of available online services.", "E-Service"),
  internshipImage("operations/billing-dashboard", "Back Office · Billing Dashboard", "Summary of sample payments.", "Billing"),
  internshipImage("operations/transactions", "Back Office · Transactions", "Searchable list of sample payments.", "Billing"),
];

const projectEntries: Project[] = [
  {
    slug: "crystal-dreams",
    title: "Crystal Dreams",
    year: 2026,
    category: "Freelance Project",
    description:
      "A full-stack e-commerce application for a retail client, covering product browsing, checkout, payment confirmation, delivery tracking, inventory, reviews, and admin operations.",
    features: [
      {
        title: "Shopping and orders",
        description: "Browse products, manage a cart, create orders, and follow delivery status.",
      },
      {
        title: "Payment flows",
        description: "Supports PromptPay slip payment and Beam payment integration for checkout.",
      },
      {
        title: "Operations",
        description: "Provides inventory, product, order, review, and settings workflows for administrators.",
      },
      {
        title: "Full-stack implementation",
        description: "Uses Next.js API routes and Supabase-backed PostgreSQL data access with Drizzle ORM.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Drizzle ORM", "PostgreSQL"],
    github: "https://github.com/fourls444/crystaldreams",
  },
  {
    slug: "together-space",
    title: "TogetherSpace",
    year: 2026,
    category: "Web Project",
    description:
      "A web app where friends, couples, and families can share tasks, calendars, photos, chat, and expenses.",
    features: [
      {
        title: "Shared spaces",
        description: "Create a private room and invite people to join.",
      },
      {
        title: "Planning together",
        description: "Plan tasks and events together in one place.",
      },
      {
        title: "Memories and conversation",
        description: "Share photos and chat with everyone in the room.",
      },
      {
        title: "Shared finance",
        description: "Record shared expenses so everyone can see them.",
      },
    ],
    media: [
      {
        type: "image",
        src: "https://raw.githubusercontent.com/fourls444/togetherspace/master/public/images/logo.jpg",
        alt: "TogetherSpace project preview",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Drizzle ORM"],
    github: "https://github.com/fourls444/togetherspace",
    live: "https://togetherspace.vercel.app",
  },
  {
    slug: "flutter-pokedex",
    title: "Flutter Pokedex",
    year: 2025,
    category: "Mobile Project",
    description:
      "A hands-on Flutter project built to practice mobile app basics. It includes Pokémon search, type filters, details, API data, and admin tools.",
    features: [
      {
        title: "Search by name or number",
        description: "Find Pokémon by name or Pokédex number.",
      },
      {
        title: "Type filtering",
        description: "Choose a type to show matching Pokémon.",
      },
      {
        title: "Detail and base stats",
        description: "View the image, type, and six base stats.",
      },
      {
        title: "Validated CRUD workflow",
        description: "Add, edit, and delete Pokémon with input checks.",
      },
      {
        title: "Environment-aware API",
        description: "Connect to the correct API on web and Android.",
      },
    ],
    media: [
      {
        type: "video",
        src: "videos/pokedex.webm",
        alt: "Flutter Pokedex project preview",
      },
    ],
    stack: ["Flutter", "Dart", "REST API", "CRUD"],
    github: "https://github.com/fourls444/flutter_pokedex",
  },
  {
    slug: "line-developer",
    title: "LINE Developer",
    year: 2023,
    category: "Workshop Project",
    description:
      "A LINE workshop project covering chatbot Webhooks, external API data, LIFF tools, and a Rich Menu created with LINE Bot Designer.",
    features: [
      {
        title: "Webhook chatbot",
        description: "Receives LINE events and sends automated responses back to the user.",
      },
      {
        title: "External API data",
        description: "Requests weather data from a web API and returns the result inside LINE.",
      },
      {
        title: "Product and order flow",
        description: "Shows products and coupons, accepts an order confirmation, and sends a LINE Notify alert.",
      },
      {
        title: "LIFF tools",
        description: "Runs inside LINE with profile, messaging, sharing, and QR code features.",
      },
      {
        title: "Rich Menu",
        description: "Uses a Rich Menu created with LINE Bot Designer to open bot actions and LIFF pages.",
      },
    ],
    media: [
      {
        type: "video",
        src: "videos/line-developer/webhook.mp4",
        alt: "LINE chatbot Webhook and external API demonstration",
        label: "Webhook and External API Demo",
        description:
          "Receives commands, retrieves weather data from an external API, shows products and promotions, confirms an order, and sends a LINE Notify alert.",
        section: "Webhook",
      },
      {
        type: "video",
        src: "videos/line-developer/liff.mp4",
        alt: "LIFF application demonstration inside LINE",
        label: "LIFF Application Demo",
        description:
          "Opens a web application inside LINE and demonstrates profile, messaging, sharing, and QR code tools.",
        section: "LIFF",
      },
    ],
    stack: ["LINE Messaging API", "LIFF", "Node.js", "Firebase", "REST API", "LINE Bot Designer"],
  },
  {
    slug: "internship-project",
    title: "Internship Project",
    year: 2026,
    category: "Co-operative Education",
    description:
      "A web system built during my internship. It includes a public website, member portal, back-office tools, and an API connected to PostgreSQL.",
    confidentialityNote:
      "The real project is private under an NDA. These previews were remade with new names, images, and sample data, so no private information is shown.",
    features: [
      {
        title: "Public information website",
        description: "Shows services, projects, activities, news, and contact details.",
      },
      {
        title: "Member portal",
        description: "Lets members view profiles, appointments, services, and learning materials.",
      },
      {
        title: "Backoffice tools",
        description: "Lets staff manage content, users, services, and payments.",
      },
      {
        title: "Shared backend API",
        description: "Connects each website to shared data in PostgreSQL.",
      },
      {
        title: "Roles and permissions",
        description: "Controls what each staff role can view and manage.",
      },
    ],
    media: internshipMedia,
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Fastify",
      "PostgreSQL",
      "Drizzle ORM",
      "Supabase",
    ],
  },
];

const featuredOrder = ["internship-project", "crystal-dreams", "together-space", "flutter-pokedex"];

export const projects = [...projectEntries].sort((a, b) => {
  if (a.year !== b.year) return b.year - a.year;
  return featuredOrder.indexOf(a.slug) - featuredOrder.indexOf(b.slug);
});

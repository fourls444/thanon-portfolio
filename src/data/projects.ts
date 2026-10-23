export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  builtByMe?: boolean;
  fullSrc?: string;
  previewSrc?: string;
  poster?: string;
  label?: string;
  description?: string;
  section?: string;
  group?:
    | "Frontend"
    | "Public Website"
    | "Member Portal"
    | "Back Office"
    | "Storefront";
};

export type Project = {
  slug: string;
  title: string;
  year: number;
  category: string;
  projectType: "Web" | "Mobile" | "LINE Development";
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
  name: string,
  label: string,
  description: string,
): ProjectMedia => ({
  type: "image",
  src: `images/projects/internship/contributions/${name}.png`,
  fullSrc: `images/projects/internship/contributions/${name}.png`,
  alt: `${label}, Internship Project preview with confidential content blurred`,
  label,
  description,
  group: label.startsWith("Back Office") ? "Back Office" : "Frontend",
});

const internshipMedia: ProjectMedia[] = [
  internshipImage("news", "Public Website · News", "I developed the news listing and detail pages, category filters, pagination, and API connection."),
  internshipImage("meetings", "Public Website · Meetings", "I implemented meeting pages and pagination, and improved meeting details and banners."),
  internshipImage("contact", "Public Website · Contact", "I built the contact page and form, and updated the shared footer."),
  internshipImage("learning", "Member Portal · Learning", "I developed the learning page, category sections, statistics, and supporting components."),
  internshipImage("courses", "Member Portal · Courses", "I implemented the course listing, course cards, search, and filters."),
  internshipImage("careers", "Member Portal · Careers", "I developed the job listing, filtering, sorting, pagination, and responsive cards."),
  internshipImage("store", "Member Portal · Store", "I implemented the product listing, search, categories, and API-connected store components."),
  internshipImage("news-cms", "Back Office · News", "I developed and improved news management, including search, filters, publishing status, and pagination."),
  internshipImage("news-editor", "Back Office · News Editor", "I built and improved the add/edit forms, rich-text editing, images, and content preview."),
  internshipImage("website-settings", "Back Office · Website Settings", "I improved the website settings form and connected public site details to the API."),
  internshipImage("policy-cms", "Back Office · Policies", "I implemented policy management with add, edit, delete, and drag-and-drop ordering."),
  internshipImage("policy-projects", "Back Office · Policy Projects", "I implemented project management within each policy, including status, PDF uploads, and reordering."),
];

const projectEntries: Project[] = [
  {
    slug: "crystal-dreams",
    title: "Crystal Dreams",
    year: 2026,
    category: "Freelance Project",
    projectType: "Web",
    description:
      "A full-stack e-commerce application for a retail client, covering product browsing, checkout, payment confirmation, delivery tracking, inventory, reviews, and admin operations.",
    media: [
      {
        type: "image",
        src: "images/projects/crystal-dreams/cover.png",
        alt: "Crystal Dreams storefront banner introducing the pillow brand",
        label: "Crystal Dreams Storefront",
        description: "Live storefront home page and brand banner.",
        group: "Storefront",
      },
      {
        type: "image",
        src: "images/projects/crystal-dreams/storefront-full.png",
        fullSrc: "images/projects/crystal-dreams/storefront-full.png",
        alt: "Full Crystal Dreams storefront home page from header to footer",
        label: "Storefront · Full Home Page",
        description: "Full-page capture covering the campaign banner, product catalogue, sample reviews, and footer.",
        group: "Storefront",
      },
      {
        type: "image",
        src: "images/projects/crystal-dreams/backoffice-dashboard.png",
        fullSrc: "images/projects/crystal-dreams/backoffice-dashboard.png",
        alt: "Crystal Dreams Back Office dashboard with order rows blurred for privacy",
        label: "Back Office · Dashboard",
        description: "Sales, order, and inventory overview using sample data. Order rows are blurred for privacy.",
        group: "Back Office",
      },
      {
        type: "image",
        src: "images/projects/crystal-dreams/backoffice-orders.png",
        fullSrc: "images/projects/crystal-dreams/backoffice-orders.png",
        alt: "Crystal Dreams Back Office orders page with customer and order data blurred",
        label: "Back Office · Orders & Payments",
        description: "Order and payment management screen. Customer and order data are blurred for privacy.",
        group: "Back Office",
      },
      {
        type: "image",
        src: "images/projects/crystal-dreams/backoffice-products.png",
        fullSrc: "images/projects/crystal-dreams/backoffice-products.png",
        alt: "Crystal Dreams Back Office product and inventory management page",
        label: "Back Office · Products & Inventory",
        description: "Product visibility, pricing, stock, ordering, and catalogue management using sample inventory data.",
        group: "Back Office",
      },
      {
        type: "image",
        src: "images/projects/crystal-dreams/backoffice-reviews.png",
        fullSrc: "images/projects/crystal-dreams/backoffice-reviews.png",
        alt: "Crystal Dreams Back Office review management page with review rows blurred",
        label: "Back Office · Reviews",
        description: "Review moderation and visibility controls. Review entries are sample data and are blurred for privacy.",
        group: "Back Office",
      },
      {
        type: "image",
        src: "images/projects/crystal-dreams/backoffice-settings.png",
        fullSrc: "images/projects/crystal-dreams/backoffice-settings.png",
        alt: "Crystal Dreams Back Office system settings page with configuration values blurred",
        label: "Back Office · System Settings",
        description: "Homepage banners, payments, cash on delivery, and footer settings. Configuration values are blurred.",
        group: "Back Office",
      },
    ],
    confidentialityNote:
      "Some storefront and Back Office records shown in these captures use sample data. Customer-related rows and configuration values are blurred or redacted for privacy.",
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
    category: "Academic Project",
    projectType: "Web",
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
        src: "images/projects/together-space/dashboard.png",
        fullSrc: "images/projects/together-space/dashboard.png",
        alt: "TogetherSpace · Shared Rooms",
        label: "Shared Rooms",
        description: "View shared rooms for friends, couples, and families.",
      },
      {
        type: "image",
        src: "images/projects/together-space/room-home.png",
        fullSrc: "images/projects/together-space/room-home.png",
        alt: "TogetherSpace · Room Home",
        label: "Room Home",
        description: "Open room features and see a summary of the shared space. The room code is blurred.",
      },
      {
        type: "image",
        src: "images/projects/together-space/create-room.png",
        fullSrc: "images/projects/together-space/create-room.png",
        alt: "TogetherSpace · Create a Room",
        label: "Create a Room",
        description: "Choose a name, room type, and optional room image.",
      },
      {
        type: "image",
        src: "images/projects/together-space/join-room.png",
        fullSrc: "images/projects/together-space/join-room.png",
        alt: "TogetherSpace · Join a Room",
        label: "Join a Room",
        description: "Enter a room or invitation code to join a shared space.",
      },
      {
        type: "image",
        src: "images/projects/together-space/board.png",
        fullSrc: "images/projects/together-space/board.png",
        alt: "TogetherSpace · Room Board",
        label: "Room Board",
        description: "Share notes, checklists, and polls to plan together.",
      },
      {
        type: "image",
        src: "images/projects/together-space/calendar.png",
        fullSrc: "images/projects/together-space/calendar.png",
        alt: "TogetherSpace · Shared Calendar",
        label: "Shared Calendar",
        description: "View shared dates and activities in a monthly calendar.",
      },
      {
        type: "image",
        src: "images/projects/together-space/album.png",
        fullSrc: "images/projects/together-space/album.png",
        alt: "TogetherSpace · Photo Album",
        label: "Photo Album",
        description: "Upload and organize photos. An empty room is shown to protect personal photos.",
      },
      {
        type: "image",
        src: "images/projects/together-space/map.png",
        fullSrc: "images/projects/together-space/map.png",
        alt: "TogetherSpace · Shared Map",
        label: "Shared Map",
        description: "Explore the globe or map and save places together. No private locations are shown.",
      },
      {
        type: "image",
        src: "images/projects/together-space/finance.png",
        fullSrc: "images/projects/together-space/finance.png",
        alt: "TogetherSpace · Shared Expenses",
        label: "Shared Expenses",
        description: "Track shared costs and funds. This room has no expense records.",
      },
      {
        type: "image",
        src: "images/projects/together-space/chat.png",
        fullSrc: "images/projects/together-space/chat.png",
        alt: "TogetherSpace · Room Chat",
        label: "Room Chat",
        description: "Chat with members of a room. An empty conversation is shown.",
      },
      {
        type: "image",
        src: "images/projects/together-space/members.png",
        fullSrc: "images/projects/together-space/members.png",
        alt: "TogetherSpace · Room Members",
        label: "Room Members",
        description: "View members and their roles using a sample account.",
      },
      {
        type: "image",
        src: "images/projects/together-space/settings.png",
        fullSrc: "images/projects/together-space/settings.png",
        alt: "TogetherSpace · Room Settings",
        label: "Room Settings",
        description: "Manage room details, room profiles, invitations, and appearance.",
      },
      {
        type: "image",
        src: "images/projects/together-space/login.png",
        fullSrc: "images/projects/together-space/login.png",
        alt: "TogetherSpace · Sign In",
        label: "Sign In",
        description: "Sign in to open your shared rooms.",
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
    category: "Academic Project",
    projectType: "Mobile",
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
    slug: "university-logo-recognition",
    title: "University Logo Recognition",
    year: 2024,
    category: "Academic Project",
    projectType: "Web",
    description:
      "Started as a coursework project and developed further into a more complete Python app for identifying Thai university logos, with image upload, cropping, ranked suggestions, and answer review.",
    features: [
      {
        title: "Image search",
        description: "Upload a color or grayscale logo and search with the full image or a selected crop.",
      },
      {
        title: "Ranked results",
        description: "View up to five university suggestions with model scores and an uncertainty notice when results need checking.",
      },
      {
        title: "Reviewed corrections",
        description: "Submit a corrected answer for an administrator to review before using it in future training.",
      },
      {
        title: "Training report",
        description: "View training charts, dataset counts, and validation results in the Streamlit app.",
      },
    ],
    media: [
      {
        type: "image",
        src: "images/projects/university-logo-recognition/02-color-results.png",
        fullSrc: "images/projects/university-logo-recognition/02-color-results.png",
        alt: "University Logo Recognition showing a Rangsit University logo and ranked university suggestions",
        label: "Logo Search Results",
        description: "Ranked suggestions with model scores. Results require review and are not guaranteed to be correct.",
      },
      {
        type: "image",
        src: "images/projects/university-logo-recognition/01-image-preview.png",
        fullSrc: "images/projects/university-logo-recognition/01-image-preview.png",
        alt: "Uploaded Rangsit University logo preview before searching",
        label: "Image Upload",
        description: "Preview an uploaded image before searching.",
      },
      {
        type: "image",
        src: "images/projects/university-logo-recognition/03-crop-modal.png",
        fullSrc: "images/projects/university-logo-recognition/03-crop-modal.png",
        alt: "Crop tool selecting the Rangsit University logo within an image",
        label: "Crop Image",
        description: "Select the logo area to use for searching.",
      },
      {
        type: "image",
        src: "images/projects/university-logo-recognition/07-grayscale-results.png",
        fullSrc: "images/projects/university-logo-recognition/07-grayscale-results.png",
        alt: "University suggestions from a grayscale Rangsit University logo image",
        label: "Grayscale Search",
        description: "Search using a grayscale image and review the suggestions.",
      },
      {
        type: "image",
        src: "images/projects/university-logo-recognition/04-correction.png",
        fullSrc: "images/projects/university-logo-recognition/04-correction.png",
        alt: "Form for submitting a corrected university answer",
        label: "Answer Correction",
        description: "Submit a correction for review before future training.",
      },
      {
        type: "image",
        src: "images/projects/university-logo-recognition/05-admin-access.png",
        fullSrc: "images/projects/university-logo-recognition/05-admin-access.png",
        alt: "Administrator sign-in for reviewing corrections",
        label: "Admin Access",
        description: "Protect correction review with administrator access.",
      },
      {
        type: "image",
        src: "images/projects/university-logo-recognition/06-training-report.png",
        fullSrc: "images/projects/university-logo-recognition/06-training-report.png",
        alt: "Training report with validation results, dataset counts, and a chart",
        label: "Training Report",
        description: "Review model training and validation results.",
      },
    ],
    stack: ["Python", "Pandas", "Jupyter Notebook", "TensorFlow", "Streamlit"],
    github: "https://github.com/fourls444/university-logo-recognition",
  },
  {
    slug: "thai-health-analytics",
    title: "Thai Health Analytics",
    year: 2024,
    category: "Personal Project",
    projectType: "Web",
    description:
      "A health data dashboard extended from coursework into a more complete project. Choose a year or region, compare areas, and explore data through simple charts and tables.",
    features: [
      {
        title: "Health data overview",
        description: "Choose a year and region to view a summary of the data.",
      },
      {
        title: "Regional comparison",
        description: "Compare provinces and regions using bar charts.",
      },
      {
        title: "Trend charts",
        description: "Use line charts to see how the data changes over time.",
      },
      {
        title: "Data quality checks",
        description: "Check for missing or repeated data and download tables as CSV files.",
      },
    ],
    media: [
      {
        type: "image",
        src: "images/projects/thai-health-analytics/cover.png",
        fullSrc: "images/projects/thai-health-analytics/overview.png",
        alt: "Thai Health Analytics dashboard with year and region filters, summary figures, and charts",
        label: "Dashboard Overview",
        description: "Choose a year or region and explore the data with charts.",
      },
      {
        type: "image",
        src: "images/projects/thai-health-analytics/trends.png",
        fullSrc: "images/projects/thai-health-analytics/trends.png",
        alt: "Thai Health Analytics showing a line chart of daily data",
        label: "Data Trends",
        description: "Choose a category to view how the data changes over time.",
      },
      {
        type: "image",
        src: "images/projects/thai-health-analytics/data-quality.png",
        fullSrc: "images/projects/thai-health-analytics/data-quality.png",
        alt: "Thai Health Analytics showing data counts and a table of basic checks",
        label: "Basic Data Checks",
        description: "View basic checks for missing or repeated data and download a CSV file.",
      },
    ],
    stack: ["Python", "Pandas", "Jupyter Notebook"],
    github: "https://github.com/fourls444/thai-health-analytics",
  },
  {
    slug: "line-developer",
    title: "LINE Developer",
    year: 2023,
    category: "Academic Project",
    projectType: "LINE Development",
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
    projectType: "Web",
    description:
      "My contributions to a team internship project, including public and member-facing pages, news management, website settings, policy tools, and related backend API work.",
    confidentialityNote:
      "Some content is blurred for privacy, including organization names, logos, identifying images, and policy and project details. Descriptions summarize the pages and features I developed or improved within the team project.",
    features: [
      {
        title: "Public and member pages",
        description: "Developed and improved news, meetings, contact, learning, courses, careers, and store pages, including search, filters, and pagination where applicable.",
      },
      {
        title: "News management",
        description: "Developed and improved news management and add/edit forms with rich-text editing, images, content previews, and publishing controls.",
      },
      {
        title: "Website settings",
        description: "Improved the website settings form and connected public website details to the API.",
      },
      {
        title: "Policies and projects",
        description: "Implemented policy and project management with add, edit, delete, reordering, project status, and PDF uploads.",
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

const featuredOrder = ["internship-project", "crystal-dreams", "together-space", "flutter-pokedex", "university-logo-recognition", "thai-health-analytics", "line-developer"];

export const projects = projectEntries.map((project) => ({
  ...project,
  media: project.media?.map((media) => {
    if (/^https?:\/\//i.test(media.src)) return media;
    return {
      ...media,
      ...(media.type === "image"
        ? { previewSrc: media.src.replace(/\.(png|jpe?g|webp)$/i, ".preview.webp") }
        : { poster: media.src.replace(/\.(mp4|webm)$/i, ".poster.webp") }),
    };
  }),
})).sort((a, b) => {
  if (a.year !== b.year) return b.year - a.year;
  return featuredOrder.indexOf(a.slug) - featuredOrder.indexOf(b.slug);
});

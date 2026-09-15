export type TechIconPath = `/icons/${string}.webp`;

export type TechItem = {
  name: string;
  icon: TechIconPath;
  lightSurface?: true;
};

export type TechGroup = {
  title: string;
  items: TechItem[];
};

export const techGroups: TechGroup[] = [
  {
    title: "Programming Languages",
    items: [
      { name: "JavaScript", icon: "/icons/javascript.webp" },
      { name: "TypeScript", icon: "/icons/typescript.webp" },
      { name: "Python", icon: "/icons/python.webp" },
      { name: "Java", icon: "/icons/java.webp" },
      { name: "Dart", icon: "/icons/dart.webp" },
    ],
  },
  {
    title: "Frontend & Mobile",
    items: [
      { name: "HTML5", icon: "/icons/html5.webp" },
      { name: "CSS3", icon: "/icons/css3.webp" },
      { name: "React", icon: "/icons/react.webp" },
      { name: "Next.js", icon: "/icons/nextjs.webp" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.webp" },
      { name: "Flutter", icon: "/icons/flutter.webp" },
    ],
  },
  {
    title: "Backend & Database",
    items: [
      { name: "Node.js", icon: "/icons/nodejs.webp" },
      { name: "Express", icon: "/icons/express.webp" },
      { name: "PostgreSQL", icon: "/icons/postgresql.webp" },
      { name: "MySQL", icon: "/icons/mysql.webp" },
      { name: "Supabase", icon: "/icons/supabase.webp" },
      { name: "Firebase", icon: "/icons/firebase.webp" },
      { name: "Drizzle ORM", icon: "/icons/drizzle.webp" },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Git", icon: "/icons/git.webp" },
      { name: "GitHub", icon: "/icons/github.webp" },
      { name: "Vercel", icon: "/icons/vercel.webp" },
      { name: "LINE Developers", icon: "/icons/line.webp" },
      { name: "Dialogflow", icon: "/icons/dialogflow.webp" },
      { name: "Jupyter Notebook", icon: "/icons/jupyter.webp" },
      { name: "Pandas", icon: "/icons/pandas.webp", lightSurface: true },
    ],
  },
];

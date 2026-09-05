export type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  stack: string[];
  featured?: boolean;
  github?: string;
  live?: string;
  previews?: ProjectPreview[];
};

export type ProjectPreview = {
  src: string;
  alt: string;
  label?: string;
};

export const projects: Project[] = [
  {
    title: "TogetherSpace",
    category: "Featured Project",
    featured: true,
    description:
      "A shared space for friends, couples, and families, with rooms, invitations, boards, calendars, albums, chat, and shared finance modules.",
    image: "https://raw.githubusercontent.com/fourls444/togetherspace/master/public/images/logo.jpg",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Drizzle ORM"],
    github: "https://github.com/fourls444/togetherspace",
    live: "https://togetherspace.vercel.app",
  },
];

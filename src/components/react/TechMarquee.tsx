import {
  Braces,
  CodeXml,
  Database,
  Layers3,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type TechGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

const groups: TechGroup[] = [
  { title: "Frontend", icon: CodeXml, items: ["React", "Next.js", "Astro", "Tailwind CSS"] },
  { title: "Backend", icon: Layers3, items: ["Node.js", "Express", "TypeScript"] },
  { title: "Languages", icon: Braces, items: ["JavaScript", "TypeScript", "Python", "Java", "SQL"] },
  { title: "Database", icon: Database, items: ["MySQL", "TiDB", "Firebase"] },
  { title: "Other", icon: Layers3, items: ["Flutter", "Solidity", "Git", "Postman"] },
];

const allTech = groups.flatMap((group) => group.items);

export default function TechMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="tech-visual">
      <div className="tech-grid">
        {groups.map((group) => {
          const Icon = group.icon;
          return (
            <motion.article
              className="tech-card"
              key={group.title}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="tech-card-heading">
                <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                <h3>{group.title}</h3>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>

      <div className="marquee-shell" aria-hidden="true">
        <div className="marquee-track">
          {[...allTech, ...allTech].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}<i />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

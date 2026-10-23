import { techGroups } from "./tech";

const projectTechIcons = new Map<string, string>([
  ...techGroups.flatMap((group) => group.items.map((item) => [item.name, item.icon] as [string, string])),
  ["Fastify", "/icons/fastify.svg"],
  ["REST API", "/icons/api.svg"],
  ["CRUD", "/icons/database.svg"],
  ["LIFF", "/icons/line.webp"],
  ["LINE Bot Designer", "/icons/line.webp"],
  ["LINE Messaging API", "/icons/line.webp"],
  ["LINE Developers", "/icons/line.webp"],
  ["LINE OA", "/icons/line.webp"],
]);

export const projectIconPath = (technology: string) => projectTechIcons.get(technology) ?? "/icons/api.svg";

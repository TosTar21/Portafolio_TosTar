import type { IconType } from "react-icons";
import {
  SiAstro,
  SiCss3,
  SiCypress,
  SiDocker,
  SiDotnet,
  SiDrupal,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLangchain,
  SiMysql,
  SiPostman,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiSharp,
  SiShopify,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { LuActivity, LuBrain, LuCode, LuDatabase, LuDrama, LuWorkflow } from "react-icons/lu";

export interface BadgeInfo {
  label: string;
  icon: IconType;
  docs: string;
}

/** Every technology shown on the site, keyed by its normalised name (see `badgeKey`) */
export const badgeDocs: Record<string, BadgeInfo> = {
  html: { label: "HTML", icon: SiHtml5, docs: "https://developer.mozilla.org/docs/Web/HTML" },
  css: { label: "CSS", icon: SiCss3, docs: "https://developer.mozilla.org/docs/Web/CSS" },
  javascript: { label: "JavaScript", icon: SiJavascript, docs: "https://developer.mozilla.org/docs/Web/JavaScript" },
  typescript: { label: "TypeScript", icon: SiTypescript, docs: "https://www.typescriptlang.org/" },
  react: { label: "React", icon: SiReact, docs: "https://react.dev/" },
  vite: { label: "Vite", icon: SiVite, docs: "https://vite.dev/" },
  tailwindcss: { label: "Tailwind CSS", icon: SiTailwindcss, docs: "https://tailwindcss.com/" },
  reactquery: { label: "React Query", icon: SiReactquery, docs: "https://tanstack.com/query/latest" },
  reacthookform: { label: "React Hook Form", icon: SiReacthookform, docs: "https://react-hook-form.com/" },
  astro: { label: "Astro", icon: SiAstro, docs: "https://astro.build/" },
  shopify: { label: "Shopify", icon: SiShopify, docs: "https://www.shopify.com/" },
  csharp: { label: "C#", icon: SiSharp, docs: "https://learn.microsoft.com/dotnet/csharp/" },
  dotnet: { label: ".NET", icon: SiDotnet, docs: "https://dotnet.microsoft.com/" },
  csharpdotnet: { label: "C# / .NET", icon: SiDotnet, docs: "https://dotnet.microsoft.com/" },
  mysql: { label: "MySQL", icon: SiMysql, docs: "https://www.mysql.com/" },
  sqlserver: { label: "SQL Server", icon: LuDatabase, docs: "https://learn.microsoft.com/sql/sql-server/" },
  supabase: { label: "Supabase", icon: SiSupabase, docs: "https://supabase.com/" },
  firebase: { label: "Firebase", icon: SiFirebase, docs: "https://firebase.google.com/" },
  drupal: { label: "Drupal", icon: SiDrupal, docs: "https://www.drupal.org/" },
  ragllms: { label: "RAG / LLMs", icon: LuBrain, docs: "https://python.langchain.com/docs/concepts/rag/" },
  langchain: { label: "LangChain", icon: SiLangchain, docs: "https://www.langchain.com/" },
  langgraph: { label: "LangGraph", icon: LuWorkflow, docs: "https://www.langchain.com/langgraph" },
  langfuse: { label: "Langfuse", icon: LuActivity, docs: "https://langfuse.com/" },
  playwright: { label: "Playwright", icon: LuDrama, docs: "https://playwright.dev/" },
  cypress: { label: "Cypress", icon: SiCypress, docs: "https://www.cypress.io/" },
  postman: { label: "Postman", icon: SiPostman, docs: "https://www.postman.com/" },
  git: { label: "Git", icon: SiGit, docs: "https://git-scm.com/" },
  github: { label: "GitHub", icon: SiGithub, docs: "https://github.com/" },
  docker: { label: "Docker", icon: SiDocker, docs: "https://www.docker.com/" },
  figma: { label: "Figma", icon: SiFigma, docs: "https://www.figma.com/" },
};

/** "C#" → "csharp", ".NET" → "dotnet", "Tailwind CSS" → "tailwindcss" */
export function badgeKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/^\./, "dot")
    .replace(/#/g, "sharp")
    .replace(/[^a-z0-9]/g, "");
}

export function resolveBadge(name: string): BadgeInfo {
  return badgeDocs[badgeKey(name)] ?? { label: name, icon: LuCode, docs: "" };
}

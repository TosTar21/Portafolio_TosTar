import { useLayoutEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { LuArrowUpRight, LuChevronDown, LuExternalLink } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { projectsCopy, type Project } from "@/data/projects";
import { resolveBadge } from "@/data/badges";
import { TechBadge } from "@/components/ui/TechBadge";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/utils/cn";

/** Bento tiles: "wide" spans both columns (text | image), "half" is one column (text over image). "list" = compact row. */
export type CardVariant = "wide" | "half" | "list";

interface ProjectCardProps {
  project: Project;
  variant: CardVariant;
  onOpen: (id: string) => void;
}

const tileBase =
  "h-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 transition-colors duration-300 hover:border-neutral-300 dark:border-neutral-800 dark:bg-[#1a1a1a] dark:hover:border-neutral-700";

/** Title. Its button is stretched over the whole tile so the entire tile is clickable + keyboard accessible. */
function CardLabel({ project, onOpen, className }: { project: Project; onOpen: (id: string) => void; className?: string }) {
  const { tr } = useLanguage();
  return (
    <h3 className={cn("font-heading font-bold leading-snug", className)}>
      <button
        type="button"
        onClick={() => onOpen(project.id)}
        aria-haspopup="dialog"
        className="text-left after:absolute after:inset-0 after:z-[1] after:rounded-[inherit] after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-orange-400"
      >
        {tr(project.title)}
      </button>
    </h3>
  );
}

/** "01 — Web" line + placeholder flag */
function Meta({ project }: { project: Project }) {
  const { lang, tr } = useLanguage();
  return (
    <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
      <span className="tabular-nums">{project.number}</span>
      <span aria-hidden className="h-px w-4 bg-current opacity-50" />
      <span>{tr(projectsCopy.categoryLabel[project.category])}</span>
      {project.placeholder && (
        <span className="rounded border border-orange-400/60 px-1.5 py-px text-[10px] text-orange-500 dark:text-orange-300">
          {projectsCopy.status.placeholder[lang]}
        </span>
      )}
    </p>
  );
}

function QuickLinks({ project }: { project: Project }) {
  const { lang } = useLanguage();
  const m = projectsCopy.modal;
  return (
    <div className="relative z-[2] flex items-center gap-3 text-neutral-500 dark:text-neutral-400">
      {project.liveDemo && (
        <a
          href={project.liveDemo}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${m.liveDemo[lang]} — ${project.title[lang]}`}
          className="transition-colors hover:text-orange-500"
        >
          <LuExternalLink className="h-4 w-4" />
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`GitHub — ${project.title[lang]}`}
          className="transition-colors hover:text-orange-500"
        >
          <FaGithub className="h-4 w-4" />
        </a>
      )}
      <LuArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-300 group-hover/tilt:-translate-y-0.5 group-hover/tilt:translate-x-0.5 group-hover/tilt:text-orange-500"
      />
    </div>
  );
}

/** Lightweight tech row for the list view: icons only, label in the tooltip / for screen readers. Shows the whole stack. */
function StackIcons({ project }: { project: Project }) {
  return (
    <ul className="flex items-center gap-2.5 text-neutral-600 dark:text-neutral-300" aria-label="Tech stack">
      {project.badges.map((b) => {
        const { label, icon: Icon } = resolveBadge(b);
        return (
          <li key={b} title={label}>
            <Icon aria-hidden className="h-4 w-4" />
            <span className="sr-only">{label}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** Full tech badges — every project shows its whole stack */
function Badges({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {project.badges.map((b) => (
        <li key={b}>
          <TechBadge name={b} />
        </li>
      ))}
    </ul>
  );
}

/** Screenshot framed as a browser window — always shown whole, lifts slightly on hover */
function Window({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-[0_8px_30px_rgb(0_0_0/0.08)] transition-transform duration-500 ease-out group-hover/tilt:-translate-y-1.5 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-[0_8px_30px_rgb(0_0_0/0.4)]",
        className,
      )}
    >
      <div className="flex h-5 items-center gap-1 border-b border-neutral-200 px-2 dark:border-neutral-700">
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-orange-400/80" />
      </div>
      <img src={project.image} alt="" loading="lazy" draggable={false} className="aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}

/**
 * Summary clamped to 3 lines on small screens with a "Read more" toggle; always shown whole from md up.
 * The toggle only appears when the text is actually cut.
 */
function Summary({ project }: { project: Project }) {
  const { lang, tr } = useLanguage();
  const ref = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const text = tr(project.summary);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || expanded) return;
    const check = () => setClamped(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded, text]);

  return (
    <div>
      <p
        ref={ref}
        className={cn(
          "text-sm leading-relaxed text-neutral-600 dark:text-neutral-300",
          !expanded && "line-clamp-3 md:line-clamp-none",
        )}
      >
        {text}
      </p>
      {(clamped || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="relative z-[2] mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-orange-500 md:hidden dark:text-orange-300"
        >
          {expanded ? projectsCopy.readLess[lang] : projectsCopy.readMore[lang]}
          <LuChevronDown aria-hidden className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
        </button>
      )}
    </div>
  );
}

/** Same content in every tile: meta, title, full summary, full stack, whole screenshot */
function Body({ project, onOpen }: { project: Project; onOpen: (id: string) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <Meta project={project} />
        <QuickLinks project={project} />
      </div>
      <CardLabel project={project} onOpen={onOpen} className="text-xl" />
      <Summary project={project} />
      <Badges project={project} />
    </div>
  );
}

export function ProjectCard({ project, variant, onOpen }: ProjectCardProps) {
  const { tr } = useLanguage();

  if (variant === "list") {
    return (
      <TiltCard max={0} className={cn(tileBase, "rounded-xl")}>
        <div className="flex items-center gap-4 p-3 sm:gap-5">
          <img
            src={project.image}
            alt=""
            loading="lazy"
            draggable={false}
            className="aspect-[4/3] w-16 shrink-0 rounded-md object-cover sm:w-20"
          />
          <div className="min-w-0 flex-1">
            <Meta project={project} />
            <CardLabel project={project} onOpen={onOpen} className="mt-0.5 text-base" />
            <p className="truncate text-sm text-neutral-600 dark:text-neutral-300">{tr(project.summary)}</p>
          </div>
          <div className="hidden md:block">
            <StackIcons project={project} />
          </div>
          <QuickLinks project={project} />
        </div>
      </TiltCard>
    );
  }

  if (variant === "wide") {
    return (
      <TiltCard max={1.5} className={tileBase}>
        <div className="grid items-center gap-6 p-6 md:grid-cols-2 md:gap-8 md:p-8">
          <Body project={project} onOpen={onOpen} />
          <Window project={project} />
        </div>
      </TiltCard>
    );
  }

  // half
  return (
    <TiltCard max={2} className={tileBase}>
      <div className="flex h-full flex-col gap-6 p-6">
        <Body project={project} onOpen={onOpen} />
        {/* mt-auto keeps the screenshots of side-by-side tiles aligned */}
        <Window project={project} className="mt-auto" />
      </div>
    </TiltCard>
  );
}

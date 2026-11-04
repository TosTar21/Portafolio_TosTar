import { resolveBadge } from "@/data/badges";
import { cn } from "@/utils/cn";

interface TechBadgeProps {
  name: string;
  size?: "sm" | "md";
  /** render as a link to the technology docs */
  link?: boolean;
  className?: string;
}

/** Monochrome chip: technology icon + name */
export function TechBadge({ name, size = "sm", link = false, className }: TechBadgeProps) {
  const { label, icon: Icon, docs } = resolveBadge(name);
  const classes = cn(
    "inline-flex items-center rounded-md border border-neutral-300 bg-white font-medium text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100",
    size === "sm" ? "gap-1.5 px-2 py-1 text-xs" : "gap-2 px-2.5 py-1.5 text-sm",
    link && "transition-colors hover:border-orange-400 hover:text-orange-500 dark:hover:text-orange-300",
    className,
  );
  const content = (
    <>
      <Icon aria-hidden className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {label}
    </>
  );

  if (link && docs) {
    return (
      <a href={docs} target="_blank" rel="noreferrer noopener" className={classes}>
        {content}
      </a>
    );
  }
  return <span className={classes}>{content}</span>;
}

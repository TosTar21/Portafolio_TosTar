import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { aboutCopy, languages, skillGroups, type SkillGroup } from "@/data/about";
import { resolveBadge } from "@/data/badges";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/utils/cn";

// extra width on both sides leaves room for the skill labels next to the outer letters
const VIEW_W = 760;
const VIEW_H = 250;
const CYCLE_MS = 3200;

const tile =
  "rounded-2xl border border-neutral-200 bg-neutral-50/80 backdrop-blur-[2px] dark:border-neutral-800 dark:bg-[#1a1a1a]/80";

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = [number, number];

/**
 * Letter shapes in a 1 × 1.5 box (y grows downwards). Each letter is a list of strokes:
 * constellation lines follow the strokes and the stars sit on their vertices.
 */
const LETTERS: Record<SkillGroup["letter"], Pt[][]> = {
  O: [
    Array.from({ length: 9 }, (_, i) => {
      const a = -Math.PI / 2 + (i / 8) * Math.PI * 2;
      return [0.5 + Math.cos(a) * 0.5, 0.75 + Math.sin(a) * 0.75] as Pt;
    }),
  ],
  S: [[[0.95, 0.22], [0.6, 0], [0.15, 0.12], [0.08, 0.5], [0.5, 0.74], [0.92, 1.0], [0.86, 1.36], [0.42, 1.5], [0.04, 1.3]]],
  C: [[[0.95, 0.24], [0.58, 0], [0.18, 0.16], [0, 0.75], [0.18, 1.34], [0.58, 1.5], [0.95, 1.26]]],
  A: [
    [[0, 1.5], [0.25, 0.75], [0.5, 0], [0.75, 0.75], [1, 1.5]],
    [[0.25, 0.75], [0.75, 0.75]],
  ],
  R: [
    [[0, 1.5], [0, 0.75], [0, 0]],
    [[0, 0], [0.62, 0.04], [0.95, 0.36], [0.62, 0.72], [0, 0.75]],
    [[0.62, 0.72], [1, 1.5]],
  ],
};

const LETTER_W = 78;
const LETTER_GAP = 54;
const TOP = 46;
// tiny hand-placed vertical drift so the word feels like a real sky, not a font
const DRIFT = [8, -8, 12, -4, 6];

interface Star {
  x: number;
  y: number;
  /** skill on this star, or null for a filler star that only completes the letter */
  skill: { key: string; label: string } | null;
}

interface Constellation {
  group: SkillGroup;
  strokes: string[];
  stars: Star[];
  box: { x: number; y: number; w: number; h: number };
}

function buildConstellation(group: SkillGroup, index: number): Constellation {
  const ox = (VIEW_W - (LETTER_W * 5 + LETTER_GAP * 4)) / 2 + index * (LETTER_W + LETTER_GAP);
  const oy = TOP + DRIFT[index % DRIFT.length];
  const map = ([x, y]: Pt): Pt => [ox + x * LETTER_W, oy + y * LETTER_W];
  const shape = LETTERS[group.letter];

  const strokes = shape.map((stroke) =>
    stroke
      .map(map)
      .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`)
      .join(" "),
  );

  // unique vertices (closed shapes repeat their first point)
  const seen = new Set<string>();
  const vertices: Pt[] = [];
  shape.flat().forEach((p) => {
    const k = `${p[0].toFixed(3)},${p[1].toFixed(3)}`;
    if (!seen.has(k)) {
      seen.add(k);
      vertices.push(map(p));
    }
  });

  // spread the skills evenly over the vertices; the rest stay as small filler stars
  const n = group.skills.length;
  const slots = new Map<number, string>();
  group.skills.forEach((key, i) => slots.set(Math.floor((i * vertices.length) / n), key));
  const stars = vertices.map(([x, y], i) => {
    const key = slots.get(i);
    return { x, y, skill: key ? { key, label: resolveBadge(key).label } : null };
  });

  return { group, strokes, stars, box: { x: ox, y: oy, w: LETTER_W, h: LETTER_W * 1.5 } };
}

/** Faint background dust for atmosphere */
function makeDust() {
  const rng = mulberry32(5);
  return Array.from({ length: 45 }, () => ({ x: rng() * VIEW_W, y: rng() * VIEW_H, r: 0.5 + rng() * 0.8, o: 0.15 + rng() * 0.3 }));
}

function ConstellationMap({ active, onHover }: { active: string | null; onHover: (id: string | null) => void }) {
  const { tr } = useLanguage();
  const constellations = useMemo(() => skillGroups.map(buildConstellation), []);
  const dust = useMemo(makeDust, []);
  const activeGroup = skillGroups.find((g) => g.id === active);

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-auto w-full overflow-visible" role="img" aria-label={`OSCAR — ${tr(aboutCopy.skillsTitle)}`}>
      {dust.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} className="fill-neutral-500 dark:fill-neutral-400" opacity={d.o} />
      ))}

      {constellations.map(({ group, strokes, stars, box }, gi) => {
        const on = active === group.id;
        const dim = active !== null && !on;
        const midX = box.x + box.w / 2;

        return (
          <g
            key={group.id}
            onMouseEnter={() => onHover(group.id)}
            onMouseLeave={() => onHover(null)}
            className="cursor-default transition-opacity duration-500"
            opacity={dim ? 0.3 : 1}
          >
            {/* generous invisible hit area */}
            <rect x={box.x - 14} y={box.y - 14} width={box.w + 28} height={box.h + 28} fill="transparent" />

            {strokes.map((d, si) => (
              <motion.path
                key={si}
                d={d}
                fill="none"
                strokeWidth={on ? 1.3 : 0.9}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("transition-[stroke] duration-500", on ? "stroke-orange-400" : "stroke-neutral-400 dark:stroke-neutral-500")}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + gi * 0.25 + si * 0.2, ease: "easeInOut" }}
              />
            ))}

            {stars.map((s, si) => {
              const main = !!s.skill;
              const left = s.x < midX;
              return (
                <g key={si}>
                  {main && (
                    <circle cx={s.x} cy={s.y} r={on ? 8 : 5} className="fill-orange-400 transition-all duration-500" opacity={on ? 0.2 : 0} />
                  )}
                  <motion.circle
                    cx={s.x}
                    cy={s.y}
                    r={main ? (on ? 3.2 : 2.5) : 1.4}
                    className={cn("transition-[fill] duration-500", on && main ? "fill-orange-400" : "fill-neutral-800 dark:fill-neutral-100")}
                    opacity={main ? 1 : 0.55}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + gi * 0.25 + si * 0.05 }}
                    style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                  />
                  {s.skill && (
                    <text
                      x={s.x + (left ? -7 : 7)}
                      y={s.y + 3}
                      textAnchor={left ? "end" : "start"}
                      // halo in the tile colour keeps labels readable over the lines
                      className="pointer-events-none fill-neutral-700 stroke-neutral-50 text-[8.5px] font-medium transition-opacity duration-300 [paint-order:stroke] [stroke-width:3px] dark:fill-neutral-200 dark:stroke-[#1a1a1a]"
                      opacity={on ? 1 : 0}
                    >
                      {s.skill.label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* caption for the lit constellation */}
      <text
        x={VIEW_W / 2}
        y={VIEW_H - 18}
        textAnchor="middle"
        className="fill-orange-500 text-[9px] font-semibold uppercase tracking-[0.3em] dark:fill-orange-300"
      >
        {activeGroup ? `${activeGroup.letter} · ${tr(activeGroup.title)}` : ""}
      </text>
    </svg>
  );
}

/** One column per letter, laid out under the map so each list sits beneath its constellation */
function GroupList({ active, onHover }: { active: string | null; onHover: (id: string | null) => void }) {
  const { tr } = useLanguage();
  return (
    <ol className="grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-5">
      {skillGroups.map((g) => {
        const on = active === g.id;
        return (
          <li key={g.id}>
            <div
              tabIndex={0}
              onMouseEnter={() => onHover(g.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(g.id)}
              onBlur={() => onHover(null)}
              className="relative pb-3 pt-4 outline-none"
            >
              {/* accent line */}
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 right-0 top-0 h-[2px] rounded-full transition-colors duration-300",
                  on ? "bg-orange-400 shadow-[0_0_8px_rgb(251_146_60)]" : "bg-neutral-300 dark:bg-neutral-700",
                )}
              />
              <h3 className="flex items-baseline gap-2 font-heading font-semibold">
                <span
                  className={cn(
                    "text-2xl leading-none transition-colors duration-300",
                    on ? "text-orange-500 dark:text-orange-300" : "text-neutral-400 dark:text-neutral-500",
                  )}
                >
                  {g.letter}
                </span>
                <span className="text-sm">{tr(g.title)}</span>
              </h3>
              <ul className="mt-3 space-y-1.5">
                {g.skills.map((key) => {
                  const { label, icon: Icon } = resolveBadge(key);
                  return (
                    <li key={key} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                      <Icon
                        aria-hidden
                        className={cn("h-3.5 w-3.5 shrink-0 transition-colors duration-300", on ? "text-orange-400" : "text-neutral-500")}
                      />
                      {label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Decorative row of glowing stars — not a score; the level is stated in words */
function StarDots() {
  return (
    <span aria-hidden className="flex items-center gap-1.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgb(251_146_60/0.8)]" />
      ))}
    </span>
  );
}

export function SkillsConstellation() {
  const { tr } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [auto, setAuto] = useState(0);

  // when nobody is interacting, gently cycle through the letters
  useEffect(() => {
    if (reduced || hovered || !inView) return;
    const t = window.setInterval(() => setAuto((i) => (i + 1) % skillGroups.length), CYCLE_MS);
    return () => window.clearInterval(t);
  }, [reduced, hovered, inView]);

  const active = hovered ?? (reduced ? null : skillGroups[auto].id);

  return (
    <section aria-labelledby="skills-title" className="mt-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-2">
        <h2 id="skills-title" className="text-xl">
          {tr(aboutCopy.skillsTitle)}
        </h2>
        <p className="hidden text-xs text-neutral-500 sm:block dark:text-neutral-400">{tr(aboutCopy.skillsHint)}</p>
      </Reveal>

      {/* breaks out of the page column on wide screens so letters, labels and columns can breathe */}
      <div ref={ref} className={cn(tile, "mt-5 overflow-hidden xl:-mx-24")}>
        <Reveal className="hidden px-4 pt-4 sm:block">
          <ConstellationMap active={active} onHover={setHovered} />
        </Reveal>
        <Reveal className="px-6 pb-4 pt-2 lg:px-10" delay={0.1}>
          <GroupList active={active} onHover={setHovered} />
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <h2 className="text-xl">{tr(aboutCopy.languagesTitle)}</h2>
      </Reveal>
      <Reveal delay={0.08}>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {languages.map((l) => (
            <li key={l.name.en} className={cn(tile, "flex items-center justify-between gap-4 p-6")}>
              <div>
                <p className="font-heading text-lg font-semibold">{tr(l.name)}</p>
                <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-300">{tr(l.level)}</p>
              </div>
              <StarDots />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

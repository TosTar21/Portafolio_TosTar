import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

/**
 * Subtle "night sky" behind the whole site (fixed to the viewport): small dots that twinkle slowly,
 * drift a bit with the pointer and scroll with a gentle parallax (closer stars move more).
 * Dark mode → white + orange stars. Light mode → black + orange dots.
 * Plain 2D canvas (no three.js); paused when off-screen; static frame with reduced motion.
 */

const ORANGE = "251, 146, 60";
const DENSITY = 1 / 6500; // stars per px² of viewport area
const ORANGE_RATIO = 0.16;

interface Star {
  x: number; // 0..1
  y: number; // 0..1
  r: number; // radius in css px
  base: number; // base opacity
  speed: number; // twinkle speed
  phase: number;
  depth: number; // parallax factor
  orange: boolean;
}

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeStars(count: number): Star[] {
  const rng = mulberry32(7);
  return Array.from({ length: count }, () => {
    const big = rng() < 0.08;
    return {
      x: rng(),
      y: rng(),
      r: big ? 1.6 + rng() * 0.9 : 0.7 + rng() * 0.8,
      base: 0.4 + rng() * 0.5,
      speed: 0.4 + rng() * 1.2,
      phase: rng() * Math.PI * 2,
      depth: 0.3 + rng() * 0.7,
      orange: rng() < ORANGE_RATIO,
    };
  });
}

export function StarField({ dark, animate }: { dark: boolean; animate: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const base = dark ? "255, 255, 255" : "23, 23, 23";
    // light mode needs a touch less ink to stay subtle
    const strength = dark ? 1 : 0.75;

    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = makeStars(Math.round(w * h * DENSITY));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      const t = time / 1000;

      for (const s of stars) {
        const twinkle = animate ? 0.6 + 0.4 * Math.sin(t * s.speed + s.phase) : 1;
        const alpha = s.base * twinkle * strength;
        const x = s.x * w + pointer.x * 12 * s.depth;
        // scroll parallax, wrapped so the sky never runs out
        const sy = (s.y * h - window.scrollY * 0.08 * s.depth) % h;
        const y = (sy < 0 ? sy + h : sy) + pointer.y * 8 * s.depth;
        const color = s.orange ? ORANGE : base;

        if (s.orange || s.r > 1.3) {
          // soft halo for the brighter stars
          ctx.fillStyle = `rgba(${color}, ${alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(x, y, s.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (time: number) => {
      draw(time);
      if (visible) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (animate) raf = requestAnimationFrame(loop);
      else draw(0);
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (!animate) draw(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    // static mode still follows scroll, one frame per scroll event
    const onScroll = () => draw(0);
    if (animate) window.addEventListener("pointermove", onMove, { passive: true });
    else window.addEventListener("scroll", onScroll, { passive: true });
    resize();
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dark, animate]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 h-full w-full" />;
}

/** Theme-aware wrapper used once in the app layout */
export function SiteStarField() {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <StarField dark={theme === "dark"} animate={!reduced} />
    </div>
  );
}

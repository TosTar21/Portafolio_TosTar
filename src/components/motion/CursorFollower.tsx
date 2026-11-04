import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { FINE_POINTER_QUERY, useMediaQuery } from "@/lib/motion";

/** Very discreet cursor follower — desktop (fine pointer) only, off for reduced-motion */
export function CursorFollower() {
  const fine = useMediaQuery(FINE_POINTER_QUERY);
  const reduced = useReducedMotion();
  const active = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.35 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      setHovering(!!t?.closest?.("a, button, [role='button'], [role='menuitem'], input, summary"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80]"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="-ml-[14px] -mt-[14px] h-7 w-7 rounded-full border border-orange-400/70"
        animate={{
          scale: hovering ? 1.7 : 1,
          backgroundColor: hovering ? "rgba(251,146,60,0.12)" : "rgba(251,146,60,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      <span className="absolute -ml-[2px] -mt-[2px] block h-1 w-1 rounded-full bg-orange-400" />
    </motion.div>
  );
}

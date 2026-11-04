import { motion, useScroll, useSpring } from "framer-motion";

/** Thin orange scroll progress bar fixed at the top of the viewport */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-orange-400 shadow-[0_0_10px_rgb(251_146_60/0.7)]"
      style={{ scaleX }}
    />
  );
}

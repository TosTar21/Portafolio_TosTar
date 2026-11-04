import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

interface TiltCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode;
  /** max tilt in degrees */
  max?: number;
  /** show the cursor-following orange spotlight */
  spotlight?: boolean;
}

/**
 * 3D tilt following the cursor (perspective transform) + soft orange spotlight.
 * Tilt only runs for a real mouse and is skipped with prefers-reduced-motion.
 */
export function TiltCard({ children, className, max = 5, spotlight = true, style, ...rest }: TiltCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const srx = useSpring(rx, { stiffness: 220, damping: 22, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22, mass: 0.4 });
  const bg = useMotionTemplate`radial-gradient(280px circle at ${x}px ${y}px, rgb(251 146 60 / 0.14), transparent 65%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
    if (!reduced && max > 0) {
      ry.set((px - 0.5) * max * 2);
      rx.set(-(py - 0.5) * max * 2);
    }
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("group/tilt relative", className)}
      style={{ ...style, rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      {...rest}
    >
      {children}
      {spotlight && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: bg }}
        />
      )}
    </motion.div>
  );
}

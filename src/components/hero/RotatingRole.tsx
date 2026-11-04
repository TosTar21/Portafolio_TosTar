import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 2200;
const GAP_MS = 350;

/** Types each role, holds it, erases it and moves on to the next one. */
export function RotatingRole({ roles }: { roles: string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // restart when the language (and therefore the list) changes
  useEffect(() => {
    setIndex(0);
    setText("");
    setDeleting(false);
  }, [roles]);

  useEffect(() => {
    if (reduced) return;
    const full = roles[index % roles.length];
    let delay: number;
    let next: () => void;

    if (!deleting && text === full) {
      delay = HOLD_MS;
      next = () => setDeleting(true);
    } else if (deleting && text === "") {
      delay = GAP_MS;
      next = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      };
    } else {
      delay = deleting ? DELETE_MS : TYPE_MS;
      next = () => setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }

    const t = window.setTimeout(next, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, index, roles, reduced]);

  const shown = reduced ? roles[0] : text;

  return (
    <>
      {/* screen readers get the full list once instead of every keystroke */}
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden>{shown || " "}</span>
    </>
  );
}

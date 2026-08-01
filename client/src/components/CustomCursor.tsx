import { motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/hooks/use-fine-pointer";

/*
  Stands in for the pointer on any page that hides it with `cursor-none`.
  A solid dot that swaps for a text pill over anything carrying
  data-cursor-label — shared between Home and the case study pages so both
  read the same custom pointer rather than one page falling back to the
  browser's default arrow.

  Renders nothing on touch: there is no pointer to stand in for, and phones
  do fire a synthetic mousemove on tap, which would otherwise strand the dot
  wherever the last thumb landed.
*/
export default function CustomCursor() {
  const finePointer = useFinePointer();
  const mouseX = useSpring(-100, { stiffness: 200, damping: 28, mass: 0.5 });
  const mouseY = useSpring(-100, { stiffness: 200, damping: 28, mass: 0.5 });
  const dotX = useSpring(-100, { stiffness: 500, damping: 35, mass: 0.2 });
  const dotY = useSpring(-100, { stiffness: 500, damping: 35, mass: 0.2 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  // Set by [data-cursor-label] elements; swaps the ring for a text label.
  const [label, setLabel] = useState<string | null>(null);
  const [labelSize, setLabelSize] = useState<string | null>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!finePointer) return;

    /*
      Hit-test whatever is under the pointer right now. Reading the element
      from the coordinates rather than an event's target is what lets scroll
      reuse this: a scroll moves the page under a stationary cursor, so the
      element changes without any mouse event to carry a new target.
    */
    const syncToPointer = () => {
      const at = pointer.current;
      if (!at) return;
      const el = document.elementFromPoint(at.x, at.y) as HTMLElement | null;
      if (!el) {
        setLabel(null);
        setLabelSize(null);
        setHovering(false);
        return;
      }
      const labelled = el.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelled?.dataset.cursorLabel ?? null);
      setLabelSize(labelled?.dataset.cursorLabelSize ?? null);
      setHovering(!!el.closest("a, button, [role='button'], .group"));
    };

    const move = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
      syncToPointer();
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", syncToPointer, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", syncToPointer);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [finePointer, mouseX, mouseY, dotX, dotY]);

  if (!finePointer) return null;

  return (
    <>
      {/*
        One solid dot, standing in for the pointer the page hides with
        `cursor-none`. The outer ring it used to travel with is gone.

        White with `difference` rather than ink with `multiply`. Multiply can
        only ever darken, so against the projects section's near-black the old
        cursor was mathematically invisible — multiplying a value of 10 by
        anything leaves it at 10 or below. Difference inverts whatever is
        behind it instead, which reads as near-black on the cream sections and
        near-white on the dark one, with no per-section switching to keep in
        sync.

        It still steps aside for the label: on the header's photographs the
        pill replaces the dot rather than sitting next to it.
      */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
        style={{
          width: hovering ? 18 : 12,
          height: hovering ? 18 : 12,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible && !label ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.3s ease",
        }}
      />
      {/*
        The label replaces the ring rather than sitting beside it — the ring is
        a pointer, and once there are words to read the pointer is just noise.
      */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] whitespace-nowrap rounded-full bg-foreground text-background font-bold uppercase tracking-[0.2em] ${
          labelSize === "sm" ? "px-4 py-2 text-[10px]" : "px-6 py-3 text-xs"
        }`}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible && label ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        {label}
      </motion.div>
    </>
  );
}

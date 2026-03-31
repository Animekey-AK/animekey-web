"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * Aceternity-style spotlight: a radial glow that follows the cursor within the section.
 */
export function SpotlightSection({ children, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function onMouseLeave() {
    mouseX.set(-100);
    mouseY.set(-100);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative ${className ?? ""}`}
    >
      {/* Spotlight glow following cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at ${springX}px ${springY}px, rgba(113,199,4,0.06) 0%, transparent 70%)`,
          opacity: 1,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

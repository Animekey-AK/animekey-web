"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseY, [-80, 80], [8, -8]);
  const rotateY = useTransform(mouseX, [-80, 80], [-8, 8]);

  const glowX = useTransform(mouseX, [-80, 80], [0, 100]);
  const glowY = useTransform(mouseY, [-80, 80], [0, 100]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {/* Inner glow on hover following mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-[14px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]: number[]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, rgba(113,199,4,0.18) 0%, transparent 60%)`,
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

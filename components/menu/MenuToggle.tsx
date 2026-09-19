"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import { motion, type Transition, type Variants } from "motion/react";

import { useMenuStore } from "@/stores/menu.store";
import { cn } from "@/utils/cn";
import { EASE_OUT_EXPO } from "@/utils/motion";

const BAR_TRANSITION: Transition = {
  duration: 0.4,
  ease: EASE_OUT_EXPO,
  rotate: { delay: 0.1, duration: 0.3, ease: EASE_OUT_EXPO },
};

/**
 * The three bars sit on a 24x24 grid, all anchored to the same baseline and
 * offset with `x`/`y`. Opening folds the outer two into a 22px cross centred on
 * the box while the middle one fades out.
 */
const BAR_VARIANTS: Variants[] = [
  {
    closed: { width: 8, x: 5, y: -5, rotate: 0, opacity: 1 },
    open: { width: 22, x: 1, y: 0, rotate: 45, opacity: 1 },
  },
  {
    closed: { width: 14, x: 5, y: 0, rotate: 0, opacity: 1 },
    open: { width: 14, x: 5, y: 0, rotate: 0, opacity: 0 },
  },
  {
    closed: { width: 8, x: 5, y: 5, rotate: 0, opacity: 1 },
    open: { width: 22, x: 1, y: 0, rotate: -45, opacity: 1 },
  },
];

export interface MenuToggleProps {
  openLabel: string;
  closeLabel: string;
  controls: string;
  className?: string;
}

export function MenuToggle({ openLabel, closeLabel, controls, className }: MenuToggleProps) {
  const isOpen = useMenuStore((state) => state.isOpen);
  const toggle = useMenuStore((state) => state.toggle);

  return (
    <BaseButton
      type="button"
      onClick={toggle}
      aria-label={isOpen ? closeLabel : openLabel}
      aria-expanded={isOpen}
      aria-controls={controls}
      className={cn("relative size-6 cursor-pointer", className)}
    >
      {BAR_VARIANTS.map((variants, index) => (
        <motion.span
          key={index}
          className="absolute top-[11px] left-0 block h-0.5 rounded-full bg-gray-900"
          variants={variants}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          transition={BAR_TRANSITION}
        />
      ))}
    </BaseButton>
  );
}

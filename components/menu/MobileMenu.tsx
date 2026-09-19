"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { useLockBodyScroll } from "@/hooks";
import { useMenuStore } from "@/stores/menu.store";
import type { NavItem } from "@/types";
import { cn } from "@/utils/cn";
import { EASE_OUT_EXPO } from "@/utils/motion";

export const MOBILE_MENU_ID = "mobile-menu";

const LIST_VARIANTS: Variants = {
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  open: { transition: { delayChildren: 0.12, staggerChildren: 0.07 } },
};

const ITEM_VARIANTS: Variants = {
  closed: { opacity: 0, y: 28, transition: { duration: 0.25, ease: EASE_OUT_EXPO } },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

export interface MobileMenuProps {
  items: NavItem[];
  label: string;
}

export function MobileMenu({ items, label }: MobileMenuProps) {
  const isOpen = useMenuStore((state) => state.isOpen);
  const close = useMenuStore((state) => state.close);
  const pathname = usePathname();

  useLockBodyScroll(isOpen);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          id={MOBILE_MENU_ID}
          className="fixed inset-0 z-40 bg-white lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.nav
            aria-label={label}
            className="absolute bottom-[100px] left-12 flex flex-col gap-[13px]"
            variants={LIST_VARIANTS}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {items.map((item) => (
              <motion.div key={item.href} variants={ITEM_VARIANTS}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "block text-2xl leading-8 font-medium transition-colors",
                    pathname === item.href ? "text-gray-700" : "text-gray-500 hover:text-gray-700",
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

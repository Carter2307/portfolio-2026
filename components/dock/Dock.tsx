"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon, Tooltip, TooltipProvider } from "@/components/ui";
import type { NavItem } from "@/types";
import { cn } from "@/utils/cn";

/** Floating desktop navigation; mobile reaches the same routes through the menu. */
export interface DockProps {
  items: NavItem[];
  label: string;
}

export function Dock({ items, label }: DockProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider delay={150} closeDelay={80}>
      <nav aria-label={label} className="fixed bottom-10 left-1/2 hidden -translate-x-1/2 rounded-[32px] bg-gray-100 px-6 py-4 lg:flex">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Tooltip key={item.href} label={item.label}>
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className="flex items-center rounded-2xl px-4 py-2 transition-colors hover:bg-gray-200"
              >
                <Icon
                  name={item.icon}
                  className={cn("transition-colors", isActive ? "text-primary" : "text-slate-500")}
                />
              </Link>
            </Tooltip>
          );
        })}
      </nav>
    </TooltipProvider>
  );
}

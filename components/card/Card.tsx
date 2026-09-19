import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export interface CardProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <section className={cn("flex w-full flex-col gap-3 rounded-[32px] bg-gray-100 p-6", className)}>
      <h2 className="pl-4 text-base leading-6 font-semibold text-gray-700">{title}</h2>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}

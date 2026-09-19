import type { IconName } from "@/components";

export interface NavItem {
  key: "home" | "craft" | "photographies";
  href: string;
  label: string;
  icon: IconName;
}

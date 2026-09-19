import type { IconName } from "@/components";
import type { Dictionary, NavItem } from "@/types";

const ROUTES = [
  { key: "home", path: "", icon: "home" },
  { key: "craft", path: "/craft", icon: "craft" },
  { key: "photographies", path: "/photographies", icon: "photographies" },
] as const satisfies ReadonlyArray<{
  key: NavItem["key"];
  path: string;
  icon: IconName;
}>;

export function getNavItems(locale: string, dictionary: Dictionary): NavItem[] {
  return ROUTES.map(({ key, path, icon }) => ({
    key,
    icon,
    href: `/${locale}${path}`,
    label: dictionary.nav[key],
  }));
}

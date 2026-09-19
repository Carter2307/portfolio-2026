"use client";

import { MenuToggle, MOBILE_MENU_ID } from "@/components/menu";
import { Button, Icon } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { useMenuStore } from "@/stores/menu.store";
import type { Dictionary } from "@/types";
import { cn } from "@/utils/cn";

export interface HeaderProps {
  actions: Dictionary["actions"];
}

export function Header({ actions }: HeaderProps) {
  const isMenuOpen = useMenuStore((state) => state.isOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-white pt-6 lg:static lg:pt-6">
      <div className="mx-auto flex w-full max-w-[1128px] items-center justify-between px-5">
        <MenuToggle
          className="ml-4 lg:hidden"
          controls={MOBILE_MENU_ID}
          openLabel={actions.openMenu}
          closeLabel={actions.closeMenu}
        />
        <div
          className={cn(
            "ml-auto flex items-center gap-4 transition-opacity duration-200",
            isMenuOpen && "pointer-events-none opacity-0 lg:pointer-events-auto lg:opacity-100",
          )}
        >
          <Button
            variant="secondary"
            className="hidden lg:inline-flex"
            render={<a href={`mailto:${siteConfig.email}`} />}
          >
            {actions.emailMe}
          </Button>
          <Button render={<a href={siteConfig.cvPath} download />}>
            {actions.downloadCv}
            <Icon name="download" size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
}

import { cn } from "@/utils/cn";

const ICON_SOURCES = {
  home: "/icons/home.svg",
  craft: "/icons/hammer.svg",
  photographies: "/icons/pic.svg",
  download: "/icons/download.svg",
  menu: "/icons/menu.svg",
  close: "/icons/times.svg",
  plus: "/icons/plus.svg",
  externalLink: "/icons/Arrow-h.svg",
} as const;

export type IconName = keyof typeof ICON_SOURCES;

export interface IconProps {
  name: IconName;
  /** Square size in pixels. */
  size?: number;
  className?: string;
}

/**
 * The source files in `public/icons` carry a hard-coded black paint. Painting
 * them through a CSS mask keeps a single file per icon while letting every call
 * site recolour it with `currentColor`.
 */
export function Icon({ name, size = 24, className }: IconProps) {
  const source = `url(${ICON_SOURCES[name]})`;

  return (
    <span
      aria-hidden="true"
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        width: size,
        height: size,
        maskImage: source,
        WebkitMaskImage: source,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

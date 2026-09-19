"use client";

import type { ReactElement, ReactNode } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

export const TooltipProvider = BaseTooltip.Provider;

export interface TooltipProps {
  label: ReactNode;
  /** Element the tooltip is attached to. */
  children: ReactElement<Record<string, unknown>>;
  side?: BaseTooltip.Positioner.Props["side"];
  sideOffset?: number;
}

export function Tooltip({ label, children, side = "top", sideOffset = 7 }: TooltipProps) {
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={sideOffset}>
          <BaseTooltip.Popup className="origin-[var(--transform-origin)] rounded-full bg-primary px-2.5 py-1 text-xs leading-4 font-medium text-white transition-[transform,opacity] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-95 data-starting-style:opacity-0">
            {label}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

import { isValidElement } from "react";
import { Button as BaseButton } from "@base-ui/react/button";

import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "bg-gray-100 text-black hover:bg-gray-200",
};

export interface ButtonProps extends BaseButton.Props {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  className,
  render,
  nativeButton,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      render={render}
      // Base UI needs to know when `render` swaps the native <button> for
      // something else, such as the anchors used by the CV and email actions.
      nativeButton={nativeButton ?? (!isValidElement(render) || render.type === "button")}
      className={cn(
        "inline-flex h-8 cursor-pointer items-center justify-center gap-2.5 rounded-2xl px-4 py-2 text-xs leading-4 font-medium whitespace-nowrap transition-colors select-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}

"use client";

import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface TipProps {
  label: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  hotkey?: string;
  /** Render the trigger inline without an extra wrapping span (use when the
   *  child is already a Button/forwardRef element). Defaults to true. */
  asChild?: boolean;
}

/**
 * Project-wide tooltip wrapper. Replaces native `title=""` attributes so
 * tooltips:
 *  - adapt to dark/light theme via popover tokens
 *  - share consistent animation, spacing and hotkey styling
 *  - never block screen readers (Radix handles aria-describedby)
 */
export function Tip({
  label,
  children,
  side = "top",
  align = "center",
  hotkey,
  asChild = true,
}: TipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        sideOffset={6}
        className="border border-border bg-popover text-popover-foreground shadow-lg"
      >
        <span className="flex items-center gap-2">
          <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>{label}</span>
          {hotkey && (
            <kbd
              className="inline-flex h-4 min-w-[1rem] items-center justify-center rounded border border-border bg-secondary px-1 text-muted-foreground"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "0.625rem",
                fontWeight: 600,
              }}
            >
              {hotkey}
            </kbd>
          )}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}

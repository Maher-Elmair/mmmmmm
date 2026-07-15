"use client";

import { useState, useEffect } from "react";
import { Toaster as Sonner, ToasterProps } from "sonner";

function detectTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<"dark" | "light">(detectTheme);

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => setTheme(detectTheme()));
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };

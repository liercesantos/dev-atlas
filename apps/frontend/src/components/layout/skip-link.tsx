import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="absolute left-0 top-0 z-50 -translate-y-full bg-primary px-4 py-2 text-primary-foreground transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>
  );
}

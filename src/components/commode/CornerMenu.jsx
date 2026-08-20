import React, { useState } from "react";

// Placeholder — replaced by the Base44 export.
// Fixed corner marks plus a "+" that opens the section index.
const LINKS = [
  { href: "#strategic-intent", label: "Sectors" },
  { href: "#inquiry", label: "Inquiry" },
  { href: "#global-pulse", label: "Network" },
];

const CORNERS = [
  "left-4 top-4 border-l border-t",
  "right-4 top-4 border-r border-t",
  "left-4 bottom-4 border-l border-b",
  "right-4 bottom-4 border-r border-b",
];

export default function CornerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40">
        {CORNERS.map((c) => (
          <span key={c} className={`absolute h-5 w-5 border-foreground/25 ${c}`} />
        ))}
      </div>

      <div className="fixed right-5 top-20 z-50 flex flex-col items-end gap-3 sm:right-10">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close section index" : "Open section index"}
          className="grid h-9 w-9 place-items-center border border-border bg-background/70 text-foreground/70 backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          <span
            className={`block text-lg leading-none transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>

        <nav
          className={`flex flex-col items-end gap-2 border border-border bg-background/80 px-4 py-3 backdrop-blur-sm transition-all duration-300 ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono-label text-[10px] text-foreground/70 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

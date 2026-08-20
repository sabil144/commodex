import React from "react";

// Rebuilt from the Base44 screenshot — replace with the real export.
// Ambient overlay: the horizon line crossing the viewport over CRT lines and a vignette.
export default function HorizonScan() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40">
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div
        className="animate-horizon-scan absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, hsl(var(--accent) / 0.35) 18%, hsl(var(--accent) / 0.75) 50%, hsl(var(--accent) / 0.35) 82%, transparent)",
          boxShadow: "0 0 28px hsl(var(--accent) / 0.35)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 95% at 50% 45%, transparent 42%, hsl(var(--background) / 0.6) 100%)",
        }}
      />
    </div>
  );
}

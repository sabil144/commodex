import React from "react";

// Placeholder — replaced by the Base44 export.
// Ambient overlay: a scan line crossing the viewport, fine CRT lines and a vignette.
export default function HorizonScan() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40">
      {/* fine horizontal lines */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* sweeping horizon */}
      <div
        className="absolute inset-x-0 h-px animate-horizon"
        style={{
          background:
            "linear-gradient(to right, transparent, hsl(var(--accent) / 0.35) 18%, hsl(var(--accent) / 0.7) 50%, hsl(var(--accent) / 0.35) 82%, transparent)",
          boxShadow: "0 0 28px hsl(var(--accent) / 0.35)",
        }}
      />

      {/* vignette */}
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

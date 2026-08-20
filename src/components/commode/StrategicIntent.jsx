import React from "react";

// Rebuilt from the Base44 screenshot — replace with the real export.
const PILLARS = [
  {
    index: "01",
    title: "Energy",
    body:
      "From upstream extraction to refined transit, we position capital and cargo across the volatile geometry of global power. Precision-hedged, institutionally scaled.",
    specs: ["Crude · Gas · Power", "12 Jurisdictions", "24/7 Desk"],
  },
  {
    index: "02",
    title: "Agriculture",
    body:
      "Grain, oilseed, and soft commodities routed through the silent machinery of storage and season. We hold the line between harvest and the hungry market.",
    specs: ["Grain · Softs", "Continental Silos", "Seasonal Arbitrage"],
  },
  {
    index: "03",
    title: "Metals",
    body:
      "Base and ferrous mass moved with the weight of infrastructure itself. Cold steel, hot strategy — the foundational matter of the modern market.",
    specs: ["Ferrous · Base", "Mill Direct", "Physical + Paper"],
  },
];

export default function StrategicIntent() {
  return (
    <section id="strategic-intent" className="relative z-10 border-t border-border">
      <div className="flex flex-col gap-8 px-5 py-20 sm:px-10 sm:py-28 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono-label text-[10px] text-accent">§ Strategic Intent</p>
          <h2 className="mt-6 max-w-lg font-display text-3xl leading-tight text-balance sm:text-4xl">
            Three pillars of mass, motion, and margin.
          </h2>
        </div>
        <p className="max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
          We define the scope of the firm without revealing its method. Each pillar is a fortress of
          disciplined flow.
        </p>
      </div>

      <div className="grid grid-cols-1 border-t border-border md:grid-cols-3">
        {PILLARS.map((pillar) => (
          <article
            key={pillar.index}
            className="group relative flex flex-col justify-between gap-10 border-b border-border p-5 pb-14 pt-6 transition-colors duration-500 hover:bg-card sm:p-10 sm:pb-20 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <header className="flex items-center gap-4">
              <span className="font-mono-label text-[10px] text-muted-foreground">
                {pillar.index}
              </span>
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono-label text-[10px] text-muted-foreground transition-colors duration-500 group-hover:text-accent">
                <span className="group-hover:hidden">Sector</span>
                <span className="hidden group-hover:inline">Active</span>
              </span>
            </header>

            <div>
              <h3 className="font-display text-3xl leading-none sm:text-4xl">{pillar.title}</h3>
              <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>

              <ul className="mt-8 flex flex-col gap-1.5">
                {pillar.specs.map((spec) => (
                  <li key={spec} className="font-mono-label text-[10px] text-muted-foreground">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

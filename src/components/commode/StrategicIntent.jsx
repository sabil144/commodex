import React from "react";

// Rebuilt from the Base44 screenshot — replace with the real export.
const PILLARS = [
  {
    index: "01",
    title: "Energy",
    body:
      "From upstream extraction to refined transit, we position capital and cargo across the volatile geometry of global power. Precision-hedged, institutionally scaled.",
    specs: ["Crude · Gas · Power", "42 Jurisdictions", "24/7 Desk"],
    image: "/sectors/energy.svg",
  },
  {
    index: "02",
    title: "Agriculture",
    body:
      "Grain, oilseed, and soft commodities routed through the silent machinery of storage and season. We hold the line between harvest and the hungry market.",
    specs: ["Grain · Softs", "Continental Silos", "Seasonal Arbitrage"],
    image: "/sectors/agriculture.svg",
  },
  {
    index: "03",
    title: "Business Consulting",
    body:
      "Advisory drawn from the desk, not the deck. Market structure, risk architecture and execution strategy for producers, processors and sovereign buyers entering the flow.",
    specs: [
      "Strategy · Risk",
      "Government Procurement",
      "G2G Contracts",
      "Market Structure",
      "Execution Advisory",
    ],
    image: "/sectors/consulting.svg",
  },
];

export default function StrategicIntent() {
  return (
    <section id="strategic-intent" className="relative z-10 border-t border-border">
      <div className="flex flex-col gap-8 px-5 py-20 sm:px-10 sm:py-28 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono-label text-[10px] text-accent">§ Strategic Intent</p>
          <h2 className="animate-color-cycle mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
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
            className="group relative flex flex-col justify-between gap-10 overflow-hidden border-b border-border p-5 pb-14 pt-6 sm:p-10 sm:pb-20 md:border-b-0 md:border-r md:last:border-r-0"
          >
            {/* Sector artwork, revealed on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-bottom opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-80"
              style={{ backgroundImage: `url(${pillar.image})` }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
            <header className="relative flex items-center gap-4">
              <span className="font-mono-label text-[10px] text-muted-foreground">
                {pillar.index}
              </span>
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono-label text-[10px] text-muted-foreground transition-colors duration-500 group-hover:text-accent">
                <span className="group-hover:hidden">Sector</span>
                <span className="hidden group-hover:inline">Active</span>
              </span>
            </header>

            <div className="relative">
              <h3 className="font-display text-4xl font-bold leading-[0.95] transition-colors duration-500 group-hover:text-accent sm:text-5xl">
                {pillar.title}
              </h3>
              <p className="mt-6 max-w-sm text-justify font-body text-sm leading-relaxed text-muted-foreground">
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

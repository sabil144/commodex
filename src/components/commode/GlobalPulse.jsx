import React from "react";
import { WORLD_DOTS, WORLD_VIEWBOX } from "./world-dots";

// Rebuilt from the Base44 screenshot — replace with the real export.
// Hubs are placed from real coordinates on the same equirectangular projection
// as the generated dot-matrix landmass.
const HUBS = [
  { id: "canada", label: "Canada", lat: 51.05, lon: -114.07, dy: -16 },
  { id: "brazil", label: "Brazil", lat: -15.79, lon: -47.88 },
  { id: "saudi", label: "Saudi Arabia", lat: 24.71, lon: 46.68, anchor: "end", dy: 22 },
  { id: "qatar", label: "Qatar", lat: 25.29, lon: 51.53, dy: -18 },
  { id: "dubai", label: "Dubai", lat: 25.2, lon: 55.27, dy: 26 },
  { id: "bangladesh", label: "Bangladesh", lat: 23.81, lon: 90.41, anchor: "end", dy: 54 },
  { id: "shanghai", label: "Shanghai", lat: 31.23, lon: 121.47, dy: -14 },
  { id: "singapore", label: "Singapore", lat: 1.35, lon: 103.82, dy: 20 },
  { id: "australia", label: "Australia", lat: -33.87, lon: 151.21, anchor: "end", home: true },
];

const { width: W, height: H, latTop: LAT_TOP, latSpan: LAT_SPAN } = WORLD_VIEWBOX;

const project = ({ lat, lon }) => ({
  x: ((lon + 180) / 360) * W,
  y: ((LAT_TOP - lat) / LAT_SPAN) * H,
});

export default function GlobalPulse() {
  return (
    <section id="global-pulse" className="relative z-10 border-t border-border px-5 py-20 sm:px-10 sm:py-28">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono-label text-xs text-accent">§ Global Pulse</p>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
            A network rooted in the south.
          </h2>
        </div>
        <p className="max-w-sm font-body text-base leading-relaxed text-muted-foreground">
          Commodex Pty Ltd operates from Sydney, connecting Australian resources to the world&rsquo;s
          principal trade hubs.
        </p>
      </div>

      <div className="mt-12 overflow-x-auto border border-border">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[680px]"
          role="img"
          aria-label="World map marking Commodex trade hubs, anchored on Sydney"
        >
          {/* Landmass, sampled from Natural Earth into a dot matrix. */}
          <path d={WORLD_DOTS} fill="hsl(var(--muted-foreground))" opacity="0.28" />

          {HUBS.map((hub, i) => {
            const point = project(hub);
            const color = hub.home ? "hsl(var(--accent))" : "hsl(var(--foreground))";
            const anchor = hub.anchor === "end" ? "end" : "start";
            return (
              <g key={hub.id}>
                {/* Blinking marker: a steady core under an expanding ring. */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={hub.home ? 13 : 9}
                  fill="none"
                  stroke={color}
                  strokeWidth="1"
                  className="animate-pulse-node"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    transformOrigin: `${point.x}px ${point.y}px`,
                  }}
                />
                <circle cx={point.x} cy={point.y} r={hub.home ? 5 : 3.5} fill={color} />
                <text
                  x={point.x + (anchor === "end" ? -18 : 18)}
                  y={point.y + (hub.dy || 4)}
                  textAnchor={anchor}
                  fill={color}
                  style={{
                    font: `500 ${hub.home ? 16 : 14}px var(--font-mono)`,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  {hub.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <footer className="mt-20 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-start sm:justify-between">
        <p className="flex items-baseline gap-3">
          <span className="font-display text-4xl font-bold tracking-[0.06em] sm:text-5xl">COMMODEX</span>
          <span className="font-mono-label text-sm text-muted-foreground">Pty Ltd</span>
        </p>

        <div className="flex flex-col gap-2 sm:text-right">
          <p className="font-mono-label text-sm text-muted-foreground">
            © Commodex Pty Ltd · ABN 40 686 470 502
          </p>
          <p className="max-w-lg font-mono-label text-xs leading-relaxed text-muted-foreground">
            All rights reserved. AFSL considerations apply. This page is a statement of intent, not an
            offer to trade.
          </p>
        </div>
      </footer>
    </section>
  );
}

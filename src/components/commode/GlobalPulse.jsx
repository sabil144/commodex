import React from "react";

// Rebuilt from the Base44 screenshot — replace with the real export.
// Hubs are placed from real coordinates on an equirectangular projection.
const HUBS = [
  { id: "houston", label: "Houston", lat: 29.76, lon: -95.37 },
  { id: "newyork", label: "New York", lat: 40.71, lon: -74.01, anchor: "end" },
  { id: "saopaulo", label: "São Paulo", lat: -23.55, lon: -46.63 },
  { id: "london", label: "London", lat: 51.51, lon: -0.13, anchor: "end" },
  { id: "rotterdam", label: "Rotterdam", lat: 51.92, lon: 4.48 },
  { id: "dubai", label: "Dubai", lat: 25.2, lon: 55.27 },
  { id: "singapore", label: "Singapore", lat: 1.35, lon: 103.82 },
  { id: "shanghai", label: "Shanghai", lat: 31.23, lon: 121.47 },
  { id: "tokyo", label: "Tokyo", lat: 35.68, lon: 139.65 },
  { id: "sydney", label: "Sydney", lat: -33.87, lon: 151.21, home: true },
];

const ROUTES = [
  ["sydney", "singapore"],
  ["sydney", "shanghai"],
  ["sydney", "tokyo"],
  ["singapore", "shanghai"],
  ["shanghai", "tokyo"],
  ["singapore", "dubai"],
  ["dubai", "rotterdam"],
  ["rotterdam", "london"],
  ["london", "newyork"],
  ["newyork", "houston"],
  ["newyork", "saopaulo"],
  ["houston", "saopaulo"],
];

const W = 1000;
const H = 420;
const project = ({ lat, lon }) => ({
  x: ((lon + 180) / 360) * W,
  y: 20 + ((60 - lat) / 100) * (H - 60),
});

const POINTS = Object.fromEntries(HUBS.map((hub) => [hub.id, { ...hub, ...project(hub) }]));

export default function GlobalPulse() {
  return (
    <section id="global-pulse" className="relative z-10 border-t border-border px-5 py-20 sm:px-10 sm:py-28">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono-label text-[10px] text-accent">§ Global Pulse</p>
          <h2 className="mt-6 max-w-lg font-display text-3xl leading-tight text-balance sm:text-4xl">
            A network rooted in the south.
          </h2>
        </div>
        <p className="max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
          Commodex Pty Ltd operates from Sydney, connecting Australian resources to the world&rsquo;s
          principal trade hubs.
        </p>
      </div>

      <div className="mt-12 overflow-x-auto border border-border">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[640px]"
          role="img"
          aria-label="Trade routes from Sydney to ten global commodity hubs"
        >
          <g stroke="hsl(var(--border))" strokeWidth="1" fill="none">
            {ROUTES.map(([from, to]) => (
              <line
                key={`${from}-${to}`}
                x1={POINTS[from].x}
                y1={POINTS[from].y}
                x2={POINTS[to].x}
                y2={POINTS[to].y}
              />
            ))}
          </g>

          {HUBS.map((hub, i) => {
            const point = POINTS[hub.id];
            const color = hub.home ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))";
            const anchor = hub.anchor === "end" ? "end" : "start";
            return (
              <g key={hub.id}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={hub.home ? 4 : 2.5}
                  fill={color}
                  className="animate-pulse-node"
                  style={{ animationDelay: `${i * 0.28}s`, transformOrigin: `${point.x}px ${point.y}px` }}
                />
                <text
                  x={point.x + (anchor === "end" ? -10 : 10)}
                  y={point.y + 3.5}
                  textAnchor={anchor}
                  fill={color}
                  style={{
                    font: '500 9px var(--font-mono)',
                    letterSpacing: "0.18em",
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
          <span className="font-display text-xl tracking-[0.08em]">COMMODEX</span>
          <span className="font-mono-label text-[9px] text-muted-foreground">Pty Ltd</span>
        </p>

        <div className="flex flex-col gap-2 sm:text-right">
          <p className="font-mono-label text-[9px] text-muted-foreground">
            © MMXXVI Commodex Pty Ltd · ABN 40 686 470 502
          </p>
          <p className="max-w-md font-mono-label text-[9px] leading-relaxed text-muted-foreground">
            All rights reserved. AFSL considerations apply. This page is a statement of intent, not an
            offer to trade.
          </p>
        </div>
      </footer>
    </section>
  );
}

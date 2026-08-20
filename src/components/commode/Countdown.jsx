import React, { useEffect, useState } from "react";

// Placeholder — replaced by the Base44 export.
// Target date is a guess from the screenshot (132 days out); set LAUNCH to the real one.
const LAUNCH = new Date("2026-12-31T00:00:00+11:00").getTime();

const UNITS = [
  { key: "days", label: "Days", pad: 3 },
  { key: "hours", label: "Hours", pad: 2 },
  { key: "minutes", label: "Mins", pad: 2 },
  { key: "seconds", label: "Secs", pad: 2 },
  { key: "ms", label: "MS", pad: 2, accent: true },
];

function split(remaining) {
  const s = Math.floor(remaining / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor(s / 3600) % 24,
    minutes: Math.floor(s / 60) % 60,
    seconds: s % 60,
    ms: Math.floor((remaining % 1000) / 10),
  };
}

export default function Countdown() {
  const [parts, setParts] = useState(() => split(Math.max(0, LAUNCH - Date.now())));

  useEffect(() => {
    let frame;
    const tick = () => {
      setParts(split(Math.max(0, LAUNCH - Date.now())));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex items-start justify-center gap-3 sm:gap-5" aria-label="Time until launch">
      {UNITS.map((unit, i) => (
        <React.Fragment key={unit.key}>
          {i > 0 && (
            <span className="pt-1 font-display text-xl text-muted-foreground/50" aria-hidden="true">
              :
            </span>
          )}
          <div className="flex flex-col items-center">
            <span
              className={`font-display text-2xl sm:text-3xl tabular-nums leading-none ${
                unit.accent ? "text-accent" : "text-foreground"
              }`}
            >
              {String(parts[unit.key]).padStart(unit.pad, "0")}
            </span>
            <span className="mt-2 font-mono-label text-[9px] text-muted-foreground">
              {unit.label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

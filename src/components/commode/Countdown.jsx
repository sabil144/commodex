import React, { useEffect, useState } from "react";

// Rebuilt from the Base44 screenshot — replace with the real export.
const LAUNCH = new Date("2026-08-22T00:00:00+10:00").getTime();

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
    <div className="flex items-start justify-center gap-3 sm:gap-6" aria-label="Time until launch">
      {UNITS.map((unit, i) => (
        <React.Fragment key={unit.key}>
          {i > 0 && (
            <span
              aria-hidden="true"
              className="animate-ticker-blink pt-1 font-display text-xl text-muted-foreground"
            >
              :
            </span>
          )}
          <div className="flex flex-col items-center">
            <span
              className={`font-display text-2xl leading-none tabular-nums sm:text-3xl ${
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

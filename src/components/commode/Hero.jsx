import React, { useRef } from "react";
import { Image } from "@/components/ui/image";
import Countdown from "./Countdown";

const HERO_IMG = "https://media.base44.com/images/public/6a867c74ad558edb1978a634/7c0241032_generated_082ac954.png";
// Used when the Base44 CDN can't be reached (blocked host, offline, strict CSP).
const HERO_FALLBACK = "/hero.jpg";

export default function Hero() {
  const flareRef = useRef(null);

  const handleMove = (e) => {
    const el = flareRef.current;
    if (!el) return;
    el.style.setProperty("--fx", `${e.clientX}px`);
    el.style.setProperty("--fy", `${e.clientY}px`);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMove}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0 animate-wave-drift">
        <Image
          src={HERO_IMG}
          alt="Molten metal macro texture"
          className="h-full w-full"
          fittingType="fill"
          fallbackSrc={HERO_FALLBACK} />
        
        {/* Light rippling across the molten surface */}
        <div
          className="animate-wave-sheen absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{
            backgroundImage:
              "repeating-linear-gradient(100deg, transparent 0px, hsl(var(--accent) / 0.18) 90px, transparent 190px, transparent 280px)",
            backgroundSize: "220% 100%",
          }} />

        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
            "linear-gradient(to right, hsl(var(--foreground)) 0.5px, transparent 0.5px), linear-gradient(to bottom, hsl(var(--foreground)) 0.5px, transparent 0.5px)",
            backgroundSize: "80px 80px"
          }} />
        
        {/* Lens flare */}
        <div
          ref={flareRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background:
            "radial-gradient(600px circle at var(--fx, 50%) var(--fy, 50%), hsl(var(--accent) / 0.12), transparent 70%)"
          }} />
        
      </div>

      {/* Top bar */}
      <header className="relative z-20 flex items-center justify-between px-5 pt-6 sm:px-10 sm:pt-9">
        <span className="font-mono-label text-[10px] sm:text-xs text-foreground/70">
          Commodex / Pty Ltd
        </span>
        <span className="hidden sm:block font-mono-label text-[10px] text-muted-foreground">
          Est. MMXXVI
        </span>
      </header>

      {/* Wordmark */}
      <div className="relative z-20 flex flex-1 items-center justify-center px-2 sm:px-6">
        <h1 className="font-display font-bold leading-[0.82] tracking-[-0.03em] text-foreground select-none">
          <span className="block text-[13.2vw]">COMMODEX</span>
        </h1>
      </div>

      {/* Center countdown + tagline */}
      <div className="relative z-20 flex flex-col items-center gap-6 px-5 pb-10 sm:pb-14 -mt-4">
        <p className="max-w-md text-center font-body text-sm sm:text-base text-foreground/70 leading-relaxed text-balance">
          The monolith of global exchange — architecting the physical and digital
          flow of energy, agriculture, and metals.
        </p>
        <Countdown />
        <a
          href="#inquiry"
          className="group mt-2 inline-flex items-center gap-3 border border-border px-7 py-3 font-mono-label text-[11px] text-foreground/80 hover:border-accent hover:text-accent transition-colors duration-300">
          
          Request Access
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>);

}

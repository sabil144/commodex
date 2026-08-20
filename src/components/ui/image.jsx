import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Stand-in for the Base44 <Image> component.
 * API kept to what Hero.jsx uses: src, alt, className, fittingType ("fill" | "fit").
 *
 * fallbackSrc covers the case where the remote source is unreachable — a blocked
 * CDN, an offline viewer, a strict CSP — so the hero is never a blank panel.
 */
export function Image({ src, alt = "", className, fittingType = "fill", fallbackSrc, ...props }) {
  const [current, setCurrent] = useState(src);

  useEffect(() => setCurrent(src), [src]);

  return (
    <img
      src={current}
      alt={alt}
      decoding="async"
      onError={() => {
        if (fallbackSrc && current !== fallbackSrc) setCurrent(fallbackSrc);
      }}
      className={cn(
        "block",
        fittingType === "fit" ? "object-contain" : "object-cover",
        className
      )}
      {...props}
    />
  );
}

export default Image;

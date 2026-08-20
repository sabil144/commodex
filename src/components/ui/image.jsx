import React from "react";
import { cn } from "@/lib/utils";

/**
 * Stand-in for the Base44 <Image> component.
 * Replace with the Base44 export when it lands — the API kept here is the one
 * Hero.jsx uses: src, alt, className, fittingType ("fill" | "fit").
 */
export function Image({ src, alt = "", className, fittingType = "fill", ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
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

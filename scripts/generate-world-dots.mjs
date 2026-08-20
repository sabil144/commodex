import { readFileSync, writeFileSync } from "node:fs";
import * as topojson from "topojson-client";
import { geoContains } from "d3-geo";

const topo = JSON.parse(readFileSync("node_modules/world-atlas/land-110m.json", "utf8"));
const land = topojson.feature(topo, topo.objects.land);

// Same projection the component uses: equirectangular over lon [-180,180], lat [78,-60].
const W = 1000, H = 420, LAT_TOP = 78, LAT_SPAN = 138;
const x = (lon) => ((lon + 180) / 360) * W;
const y = (lat) => ((LAT_TOP - lat) / LAT_SPAN) * H;

const STEP = 3;          // degrees between samples
const DOT = 2;         // square side in user units
let d = "";
let count = 0;

for (let lat = 74; lat >= -56; lat -= STEP) {
  for (let lon = -180; lon <= 180; lon += STEP) {
    if (!geoContains(land, [lon, lat])) continue;
    const px = +x(lon).toFixed(1);
    const py = +y(lat).toFixed(1);
    d += `M${px} ${py}h${DOT}v${DOT}h-${DOT}z`;
    count++;
  }
}

writeFileSync(
  "src/components/commode/world-dots.js",
  `// Generated: dot-matrix land mass, equirectangular over lon [-180,180], lat [${LAT_TOP}, ${LAT_TOP - LAT_SPAN}].
// Source: world-atlas land-110m (Natural Earth, public domain), sampled every ${STEP}°.
// Regenerate with scripts/generate-world-dots.mjs.
export const WORLD_VIEWBOX = { width: ${W}, height: ${H}, latTop: ${LAT_TOP}, latSpan: ${LAT_SPAN} };
export const WORLD_DOTS =
  "${d}";
`
);
console.log("dots:", count, "path length:", d.length);

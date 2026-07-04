// Downloads Cartagena / Murcia imagery from Wikimedia Commons into public/images.
import { writeFileSync, mkdirSync, existsSync, statSync } from "fs";
import { join } from "path";

const OUT = "public/images";
const FORCE = process.argv.includes("--force");
mkdirSync(OUT, { recursive: true });
const WIDTH = 1600;
const UA = "cartagena-shore-excursions/1.0 (image fetch; contact webmaster)";

const targets = {
  "cartagena.jpg": ["Cartagena Spain harbour", "Cartagena Murcia port", "Cartagena city Spain"],
  "roman-theatre.jpg": ["Teatro Romano Cartagena", "Roman Theatre Cartagena Spain"],
  "roman-forum.jpg": [
    "Museo Foro Romano Cartagena",
    "Roman Forum Cartagena Spain",
    "Teatro Romano Cartagena interior",
  ],
  "punic-wall.jpg": ["Muralla Punica Cartagena", "Punic Wall Cartagena Spain", "Cartagena archaeology"],
  "castle.jpg": [
    "Castillo de la Concepcion Cartagena",
    "Conception Castle Cartagena",
    "Cartagena castle harbour view",
  ],
  "old-town.jpg": [
    "Calle Mayor Cartagena",
    "Cartagena old town Spain",
    "Cartagena historic centre Murcia",
  ],
  "harbour.jpg": [
    "Cartagena harbour Spain",
    "Cartagena naval port",
    "Cartagena waterfront Murcia",
  ],
  "murcia.jpg": ["Murcia cathedral Spain", "Catedral Murcia", "Murcia city Spain"],
  "tapas.jpg": ["Spanish tapas", "Tapas bar Spain", "Pinchos Spanish food"],
  "market.jpg": ["Spanish market food", "Mercado Spain vegetables", "Cartagena Spain market"],
  "maritime.jpg": [
    "Cartagena naval museum",
    "Submarine Peral Cartagena",
    "Cartagena maritime museum",
  ],
  "beach.jpg": ["La Manga del Mar Menor", "Cartagena beach Spain", "Costa Calida beach"],
  "kayaking.jpg": ["Sea kayaking Mediterranean", "Kayaking Spain coast", "Kayak Mediterranean"],
  "family.jpg": ["Cartagena Spain city", "Family travel Spain beach", "Cartagena cruise port"],
  "private.jpg": ["Cartagena Spain sightseeing", "Cartagena guided tour", "Cartagena old town"],
  "cruise-port.jpg": ["Cartagena cruise port", "Cruise ships Cartagena Spain", "Muelle Cartagena"],
  "hero-home.jpg": [
    "Panorama Roman Theatre Cartagena",
    "Cartagena Spain panorama",
    "Cartagena harbour aerial",
  ],
  "og-default.jpg": [
    "Teatro Romano Cartagena",
    "Cartagena Roman Theatre panorama",
    "Cartagena Spain coastline",
  ],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function searchThumb(term) {
  const api =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo" +
    "&generator=search&gsrnamespace=6&gsrlimit=12" +
    `&gsrsearch=${encodeURIComponent(term)}` +
    `&iiprop=url|mime|size&iiurlwidth=${WIDTH}`;
  let res;
  for (let attempt = 0; attempt < 4; attempt++) {
    await sleep(600 + attempt * 800);
    try {
      res = await fetch(api, { headers: { "User-Agent": UA } });
      if (res.ok) break;
    } catch {}
    res = null;
  }
  if (!res || !res.ok) return [];
  const data = await res.json();
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  pages.sort((a, b) => (a.index ?? 99) - (b.index ?? 99));
  const landscape = [];
  const other = [];
  for (const p of pages) {
    const ii = p.imageinfo?.[0];
    if (!ii || !/jpe?g/i.test(ii.mime || "")) continue;
    const url = ii.thumburl || ii.url;
    if ((ii.width || 0) >= (ii.height || 0)) landscape.push(url);
    else other.push(url);
  }
  return [...landscape, ...other];
}

async function grab(candidates) {
  for (const url of candidates) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 15000) continue;
      return { buf, url };
    } catch {}
  }
  return null;
}

async function main() {
  for (const [file, terms] of Object.entries(targets)) {
    const dest = join(OUT, file);
    if (!FORCE && existsSync(dest) && statSync(dest).size > 25000) {
      console.log(`skip ${file} (exists)`);
      continue;
    }
    let candidates = [];
    for (const term of terms) {
      candidates.push(...(await searchThumb(term)));
      if (candidates.length >= 6) break;
    }
    candidates = [...new Set(candidates)];
    const got = await grab(candidates);
    if (got) {
      writeFileSync(dest, got.buf);
      console.log(`ok ${file} <- ${got.url.slice(0, 80)}…`);
    } else {
      console.warn(`FAIL ${file}`);
    }
  }
}

main();

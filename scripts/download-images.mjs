// Downloads Cartagena / Murcia imagery from Wikimedia Commons into public/images.
import { writeFileSync, mkdirSync, existsSync, statSync } from "fs";
import { join } from "path";

const OUT = "public/images";
const FORCE = process.argv.includes("--force");
mkdirSync(OUT, { recursive: true });
const WIDTH = 1600;
const UA = "cartagena-shore-excursions/1.0 (image fetch; contact webmaster)";

const targets = {
  "cartagena.jpg": ["Cartagena Spain harbour", "Cartagena Murcia port"],
  "roman-theatre.jpg": ["Roman Theatre Cartagena Spain", "Teatro Romano Cartagena"],
  "roman-forum.jpg": ["Roman Forum Cartagena", "Cartagena archaeological museum"],
  "punic-wall.jpg": ["Punic Wall Cartagena", "Muralla Punica Cartagena"],
  "castle.jpg": ["Castillo de la Concepcion Cartagena", "Castle Cartagena harbour"],
  "old-town.jpg": ["Cartagena old town Spain", "Cartagena historic centre"],
  "harbour.jpg": ["Cartagena naval harbour", "Cartagena waterfront promenade"],
  "murcia.jpg": ["Murcia cathedral Spain", "Murcia city centre"],
  "tapas.jpg": ["Spanish tapas Cartagena", "Cartagena restaurant food"],
  "market.jpg": ["Cartagena market Spain", "Mercado Cartagena"],
  "maritime.jpg": ["Cartagena naval museum", "Cartagena maritime heritage"],
  "beach.jpg": ["Cartagena beach Costa Calida", "La Manga beach Murcia"],
  "kayaking.jpg": ["Kayaking Mediterranean Spain", "Coastal kayaking Cartagena"],
  "family.jpg": ["Cartagena family travel", "Cartagena cruise port"],
  "private.jpg": ["Cartagena guided tour", "Cartagena Spain sightseeing"],
  "cruise-port.jpg": ["Cartagena cruise port", "Muelle Alfonso XII Cartagena"],
  "hero-home.jpg": ["Cartagena Spain panorama", "Cartagena harbour aerial"],
  "og-default.jpg": ["Cartagena Roman Theatre", "Cartagena Spain coastline"],
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
      if (buf.length < 25000) continue;
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

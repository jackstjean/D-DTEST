```dataviewjs
const pages = dv.pages('"Mechanics/Items"');
const rows = [];
const changes = [];

for (const p of pages) {
  const dnd = Number((p.value?.dnd));      // D&D price (baseline)
  const hb  = Number((p.value?.source) * 1.5);   // Homebrew price

  let pct = null;
  if (isFinite(dnd) && isFinite(hb) && dnd !== 0) {
    pct = ((hb - dnd) / dnd) * 100;
    changes.push(pct);
  }

  rows.push([
    p.file.link,
    dnd ?? "",
    hb ?? "",
    pct == null ? "" : `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`
  ]);
}

dv.table(["File","D&D Price","Homebrew Price","% vs D&D"], rows);

// —— helpers ——
const avg = arr => arr.reduce((a,b)=>a+b,0) / arr.length;

const quantile = (sorted, q) => {
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (base + 1 < sorted.length) return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  return sorted[base];
};

// —— trimmed mean (drop 10% on each end) ——
const trimmedMean = (arr, proportion = 0.10) => {
  if (!arr.length) return null;
  const s = [...arr].sort((a,b)=>a-b);
  const cut = Math.floor(s.length * proportion);
  const t = s.slice(cut, s.length - cut);
  return t.length ? avg(t) : null;
};

// —— IQR-filtered mean (drop outside Q1±1.5·IQR) ——
const iqrFilteredMean = (arr, k = 1.5) => {
  if (!arr.length) return null;
  const s = [...arr].sort((a,b)=>a-b);
  const q1 = quantile(s, 0.25);
  const q3 = quantile(s, 0.75);
  const iqr = q3 - q1;
  const lo = q1 - k * iqr;
  const hi = q3 + k * iqr;
  const f = s.filter(v => v >= lo && v <= hi);
  return f.length ? avg(f) : null;
};

const meanTrim10 = trimmedMean(changes, 0.40);
const meanIQR    = iqrFilteredMean(changes, 1.5);

if (meanTrim10 != null) dv.paragraph(`**Trimmed mean (10%):** ${meanTrim10 >= 0 ? "+" : ""}${meanTrim10.toFixed(1)}%`);
if (meanIQR != null)    dv.paragraph(`**IQR-filtered mean:** ${meanIQR >= 0 ? "+" : ""}${meanIQR.toFixed(1)}%`);

```
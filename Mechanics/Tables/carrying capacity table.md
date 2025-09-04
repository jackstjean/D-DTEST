---
obsidianUIMode: preview
tinyStr: 7
oneStr: 10
---


# Carrying Capacity

```dataviewjs

// --- Config ---------------------------------------------------------------
const SIZES = [
  { name: "Tiny",         carry: 7.5,  drag: 15 },
  { name: "Small/Medium", carry: 15,   drag: 30 },
  { name: "Large",        carry: 30,   drag: 60 },
  { name: "Huge",         carry: 60,   drag: 120 },
  { name: "Gargantuan",   carry: 120,  drag: 240 },
];

// --- Helpers --------------------------------------------------------------
const fmtLb = (n) => {
  const x = Math.round(n * 10) / 10; // 1 decimal
  return (Number.isInteger(x) ? x.toFixed(0) : x.toFixed(1)) + " lb.";
};
function el(tag, props = {}, parent = null) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === "text") node.textContent = v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "class") node.className = v;
    else if (k === "attrs") Object.entries(v).forEach(([ak, av]) => node.setAttribute(ak, av));
    else node[k] = v;
  });
  if (parent) parent.appendChild(node);
  return node;
}

// --- UI: input + table ----------------------------------------------------
const root = this.container;

// Input row
const controls = el("div", { class: "mb-controls", style: "margin: 0 0 8px 0;" }, root);
const label = el("label", { htmlFor: "str-input", style: "font-weight:600;" }, controls);
label.append("");
const input = el("input", {
  id: "str-input",
  type: "number",
  placeholder: "Str",
  style: "width:4.5em; margin-left:8px;"
}, controls);

// Table
const table = el("table", { class: "dataview table-view-table" }, root);
const thead = el("thead", {}, table);
const htr = el("tr", {}, thead);
["Creature Size", "Carry", "Drag/Lift/Push"].forEach(h => el("th", { text: h }, htr));
const tbody = el("tbody", {}, table);

// Rows (retain cell refs for updates)
const rows = SIZES.map(({ name, carry, drag }) => {
  const tr = el("tr", {}, tbody);
  el("td", { text: name }, tr);
  const tdCarry = el("td", {}, tr);
  const tdDrag  = el("td", {}, tr);
  return { name, carry, drag, tdCarry, tdDrag };
});

// --- Render ---------------------------------------------------------------
function render() {
  const v = parseFloat(input.value);
  const has = Number.isFinite(v) && v > 0;

  for (const r of rows) {
    r.tdCarry.textContent = has ? fmtLb(v * r.carry) : `Str × ${r.carry} lb.`;
    r.tdDrag.textContent  = has ? fmtLb(v * r.drag)  : `Str × ${r.drag} lb.`;
  }
}
input.addEventListener("input", render);
render();

```

^table

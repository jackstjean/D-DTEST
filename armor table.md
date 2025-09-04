---
obsidianUIMode: preview
---


# Light Armor

```dataviewjs

const items = dv.pages("#item/armor/light-armor").sort(p => p.baseAC, "asc");

// helper to show [[File|Display]]
const linkName = (p) => `[[${p.file.path}|${p.name ?? p.file.name}]]`;

const armorClass = (p) => {
  try { return globalThis.acHelper?.(p)?.baseAC ?? ""; }
  catch { return ""; }
};

const costRange = (p) => {
  try { return (globalThis.valueHelper?.(p)?.range) ?? ""; }
  catch { return ""; }
};

const weightFormat = (p) => {
  try { return globalThis.weightHelper?.(p) ?? ""; }
  catch { return ""; }
};

dv.table(
  ["Item", "AC", "Str", "Stealth", "Weight", "Cost"],
  items.map(p => [
    linkName(p),
    armorClass(p),
    p.strReq ?? "—",
    (Array.isArray(p.grantsDisadvantage) && p.grantsDisadvantage.includes("stealth")) ? "Disadv." : "—",
    weightFormat(p),
    costRange(p)
  ])
);

```
^light

# Medium Armor 

```dataviewjs

const items = dv.pages("#item/armor/medium-armor").sort(p => p.baseAC, "asc");

// helper to show [[File|Display]]
const linkName = (p) => `[[${p.file.path}|${p.name ?? p.file.name}]]`;

const armorClass = (p) => {
  try { return globalThis.acHelper?.(p)?.baseAC ?? ""; }
  catch { return ""; }
};

const costRange = (p) => {
  try { return (globalThis.valueHelper?.(p)?.range) ?? ""; }
  catch { return ""; }
};

const weightFormat = (p) => {
  try { return globalThis.weightHelper?.(p) ?? ""; }
  catch { return ""; }
};

dv.table(
  ["Item", "AC", "Str", "Stealth", "Weight", "Cost"],
  items.map(p => [
    linkName(p),
    armorClass(p),
    p.strReq ?? "—",
    (Array.isArray(p.grantsDisadvantage) && p.grantsDisadvantage.includes("stealth")) ? "Disadv." : "—",
    weightFormat(p),
    costRange(p)
  ])
);

```
^medium

# Heavy Armor 

```dataviewjs

const items = dv.pages("#item/armor/heavy-armor").sort(p => p.baseAC, "asc");

// helper to show [[File|Display]]
const linkName = (p) => `[[${p.file.path}|${p.name ?? p.file.name}]]`;

const armorClass = (p) => {
  try { return globalThis.acHelper?.(p)?.baseAC ?? ""; }
  catch { return ""; }
};

const costRange = (p) => {
  try { return (globalThis.valueHelper?.(p)?.range) ?? ""; }
  catch { return ""; }
};

const weightFormat = (p) => {
  try { return globalThis.weightHelper?.(p) ?? ""; }
  catch { return ""; }
};

dv.table(
  ["Item", "AC", "Str", "Stealth", "Weight", "Cost"],
  items.map(p => [
    linkName(p),
    armorClass(p),
    p.strReq ?? "—",
    (Array.isArray(p.grantsDisadvantage) && p.grantsDisadvantage.includes("stealth")) ? "Disadv." : "—",
    weightFormat(p),
    costRange(p)
  ])
);

```
^heavy
```dataviewjs
const page = dv.current();

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const base = page.itemBase;

const hasBase = (p, b) => {
  const v = p.itemBase;
  if (Array.isArray(v)) return v.some(x => String(x).toLowerCase() === b);
  return String(v ?? "").toLowerCase() === b;
};

dv.list(
  dv.pages("#item/vehicle/water")
    .where(p => hasBase(p, base))                 // only variants with itemBase: galley
    .where(p => p.file.name.toLowerCase() !== "galley") // exclude the base note
    .sort(p => p.file.name, "asc")
    .map(p => `[[${toTitleCase(p.file.name)}]]`)                        // safer than toTitleCase(...)
);
```
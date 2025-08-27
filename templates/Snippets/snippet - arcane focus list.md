```dataviewjs
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

dv.list(
  dv.pages("#item/spellcasting-focus/arcane-focus")
    .where(t => 
      !t.file.name.includes("Arcane Focus") && 
      !t.file.name.includes("Template") && 
      !t.file.name.includes("arcane focus")
    )
    .sort(t => t.file.name)
    .map(t => `[[${toTitleCase(t.file.name)}]]`)
);
```
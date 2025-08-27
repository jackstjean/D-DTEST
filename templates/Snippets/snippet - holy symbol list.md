```dataviewjs
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

dv.list(
  dv.pages("#item/spellcasting-focus/holy-symbol")
    .where(t => 
      !t.file.name.includes("Holy Symbol") && 
      !t.file.name.includes("Template") && 
      !t.file.name.includes("holy symbol")
    )
    .sort(t => t.file.name)
    .map(t => `[[${toTitleCase(t.file.name)}]]`)
);
```
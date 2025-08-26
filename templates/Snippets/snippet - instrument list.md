```dataviewjs
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

dv.list(
  dv.pages("#item/instrument")
    .where(t => 
      !t.file.name.includes("Musical Instrument") && 
      !t.file.name.includes("Template") && 
      !t.file.name.includes("musical instrument")
    )
    .sort(t => t.file.name)
    .map(t => `[[${toTitleCase(t.file.name)}]]`)
);
```
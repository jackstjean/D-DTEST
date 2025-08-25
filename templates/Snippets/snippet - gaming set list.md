```dataviewjs
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

dv.list(
  dv.pages("#item/gaming-set")
    .where(t => 
      !t.file.name.includes("Gaming Set") && 
      !t.file.name.includes("Template") && 
      !t.file.name.includes("gaming set")
    )
    .map(t => `[[${toTitleCase(t.file.name)}]]`)
);
```
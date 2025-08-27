```dataviewjs
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

dv.list(
  dv.pages("#item/tool/artisans-tool")
    .where(t => 
      !t.file.name.includes("Artisan's Tools") && 
      !t.file.name.includes("Template") && 
      !t.file.name.includes("artisan's tools")
    )
    .sort(t => t.file.name)
    .map(t => `[[${toTitleCase(t.file.name)}]]`)
);
```
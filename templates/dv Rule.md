```dataviewjs

const page = dv.current();
const path = "Assets/scripts/helpers/"

const itemHelper = await dv.io.load(path + "item.js");
eval(itemHelper);

const name = page.name ?? "No name.";
const entry = page.entry ?? "No entry.";
const sources = window.sourceHelper(page); 

dv.header(1, name);
dv.span(sources);
dv.paragraph(entry);

```
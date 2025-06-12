```dataviewjs
// 1) load & eval nameHelper
const nameCode = await dv.io.load("Assets/scripts/helpers/name.js");
eval(nameCode);

// 2) load & eval sourceHelper
const srcCode = await dv.io.load("Assets/scripts/helpers/sources.js");
eval(srcCode);

// 3) now both helpers are defined synchronously
const page    = dv.current();
const name    = window.nameHelper(page);
const sources = window.sourceHelper(page);

// 4) render
dv.span(`> [!recite|no-i]- ${name}\n>`);
dv.span(`
> [!blank|txt-c]
> <font size=2>${sources}</font>
`);

```
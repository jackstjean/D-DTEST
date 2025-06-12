```dataviewjs
// load & eval the helpers
// await dv.io.load("helper.js"); = Asks Dataview to fetch the raw text of the .js file
// eval(); = Takes that string of code and runs it in this dvjs block
const path = "Assets/scripts/helpers/" // makes filepath easier and more consistent
// NAME
const nameHelper = await dv.io.load(path + "name.js");
eval(nameHelper);
// SOURCE
const sourceHelper = await dv.io.load(path + "sources.js");
eval(sourceHelper);
// IMAGE
const imageHelper = await dv.io.load(path + "image.js");
eval(imageHelper);

// Calling all variables. I repeat: Calling all variables.
const page = dv.current();

const name = window.nameHelper(page);
const image = window.imageHelper(page);
const sources = window.sourceHelper(page);

// RENDER
// TITLE
dv.span(`> [!recite|no-i]- ${name}\n>`);

// IMAGE
dv.span(image);

// SOURCES
dv.span(`
> [!blank|txt-c]
> <font size=2>${sources}</font>
`);

```
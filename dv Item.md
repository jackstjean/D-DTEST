```dataviewjs
// load and eval helpers
const helpers = await dv.io.load("Assets/scripts/helpers/index.js");
eval(helpers);

// refactoring 
const page = dv.current();

const name = window.nameHelper(page);

// =============== TITLE
dv.span(
    `>[!recite|no-i]- ${name}\n` +
    `>`
);
```
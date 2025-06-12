```dataviewjs
const page = dv.current(); // makes parsing note easier
const path = "Assets/scripts/helpers/" // makes filepath easier and more consistent

// load & eval the helpers
// await dv.io.load("helper.js"); = Asks Dataview to fetch the raw text of the .js file
// eval(); = Takes that string of code and runs it in this dvjs block

// ###### NAME
const nameHelper = await dv.io.load(path + "name.js");
eval(nameHelper);
const name = window.nameHelper(page);

// ###### IMAGE
const imageHelper = await dv.io.load(path + "image.js");
eval(imageHelper);
const image = window.imageHelper(page);

// ###### SOURCE
const sourceHelper = await dv.io.load(path + "sources.js");
eval(sourceHelper);
const sources = window.sourceHelper(page);

// ###### ITEM COLLAR
const itemHelper = await dv.io.load(path + "weapon.js");
eval(itemHelper);

// ## BASE ITEM (e.g. Longsword)
const itemBase = window.fmtItemBase(page);

// ## ITEM TYPE (e.g. Weapon, Armor)
const itemType = window.fmtItemType(page);

// ## WEAPON TYPE (e.g. Martial Weapon, Ranged Weapon)
const weaponType = window.fmtWeaponType(page);

// ## WEAPON PROPERTIES (e.g. Versatile, Light, Thrown)
const weaponProperties = window.fmtWeaponProps(page);



// RENDER
// TITLE
dv.span(
    `> [!recite|no-i]- ${name}\n` + 
    `>`
    );

// IMAGE
dv.span(image);

// COLLAR
dv.span(
    `${itemType}` + `${itemBase}\n` +
    `${weaponType}\n`
    // + `${weaponProperties}`
    );

// SOURCES
dv.span(`
> [!blank|txt-c]
> <font size=2>${sources}</font>
`);

```
```dataviewjs
const page = dv.current(); // makes parsing note easier
const path = "Assets/scripts/helpers/" // makes filepath easier and more consistent

// load & eval the helpers
// await dv.io.load("helper.js"); = Asks Dataview to fetch the raw text of the .js file
// eval(); = Takes that string of code and runs it in this dvjs block

const itemHelper = await dv.io.load(path + "item.js");
eval(itemHelper);

const name = window.nameHelper(page); // ###### NAME
const image = window.imageHelper(page); // ###### IMAGE
const sources = window.sourceHelper(page); // ###### SOURCE
const itemType = window.fmtItemType(page); // ## ITEM TYPE (e.g. Weapon, Armor)
const itemBase = window.fmtItemBase(page); // ## BASE ITEM (e.g. Longsword, Backpack, Plate Armor)


const weaponHelper = await dv.io.load(path + "weapon.js");
eval(weaponHelper);

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
    `${weaponType} ${itemType}` + `${itemBase}\n`
    );

// SOURCES
dv.span(`
> [!blank|txt-c]
> <font size=2>${sources}</font>
`);

```
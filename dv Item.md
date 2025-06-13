```dataviewjs
const page = dv.current(); // makes parsing note easier
const path = "Assets/scripts/helpers/" // makes filepath easier and more consistent

// load & eval the helpers
// await dv.io.load("helper.js"); = Asks Dataview to fetch the raw text of the .js file
// eval(); = Takes that string of code and runs it in this dvjs block

const itemHelper = await dv.io.load(path + "item.js");
eval(itemHelper);

const weaponHelper = await dv.io.load(path + "weapon.js");
eval(weaponHelper);


// ========= GENERAL ITEM INFO
const name = window.nameHelper(page); // NAME
const image = window.imageHelper(page); // IMAGE
const sources = window.sourceHelper(page); // SOURCE
const itemType = window.itemType(page); // ITEM TYPE (e.g. Weapon, Armor)
const itemBase = window.itemBase(page); // BASE ITEM (e.g. Longsword, Backpack, Plate Armor)


// ========= WEAPON INFO
const weaponType = window.fmtWeaponType(page); // ## WEAPON TYPE (e.g. Martial Weapon, Ranged Weapon)
const weaponProperties = window.fmtWeaponProps(page); // ## WEAPON PROPERTIES (e.g. Versatile, Light, Thrown)
const dmg1 = window.weaponDamage(page);

// ================== RENDER
// ========= TITLE
dv.span(
    `> [!recite|no-i]- ${name}\n` + 
    `>`
    );

// ========= IMAGE
dv.span(image);

// ========= COLLAR
dv.span(
    // `> [!blank|embed]\n` +
    `###### ${weaponType} ${itemType}` + `${itemBase}\n`
    );

// ========= CORE PROPERTIES 
let coreRows = [];

// Every row of the below table is inputted as an index in a "table array" which will be joined later with linebreaks
if (dmg1) coreRows.push(`| Damage: | ${dmg1} |`)

// Only render the table if there are inputs in the frontmatter
if (coreRows.length) {
    const table = [
        // Build the table header as the first indexes of the table array
        `> [!metadata|table n-th]`,
        `> | |`,
        `> |-:|-|`,
        // and then add whatever rows that have an input
        ...coreRows
    ];
    // Now we join every row index with a linebreak
    dv.span(table.join("\n"));
}

// ========= SOURCES
dv.span(`
> [!blank|txt-c]
> <font size=2>${sources}</font>
`);

```
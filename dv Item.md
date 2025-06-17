```dataviewjs
const page = dv.current(); // makes parsing note easier
const path = "Assets/scripts/helpers/" // makes filepath easier and more consistent

// load & eval the helpers
// await dv.io.load("helper.js"); = Asks Dataview to fetch the raw text of the .js file
// eval(); = Takes that string of code and runs it in this dvjs block
const keyHelper = await dv.io.load(path + "keyHelper.js");
await eval(keyHelper);

const itemHelper = await dv.io.load(path + "item.js");
eval(itemHelper);

const weaponHelper = await dv.io.load(path + "weapon.js");
eval(weaponHelper);

// ========= WEAPON INFO
const weaponType = window.fmtWeaponType(page); // ## WEAPON TYPE (e.g. Martial Weapon, Ranged Weapon)
const weaponProperties = window.fmtWeaponProps(page); // ## WEAPON PROPERTIES (e.g. Versatile, Light, Thrown)
const mastery = window.weaponMastery(page);
const dmg1 = window.weaponDamage(page);


// ========= GENERAL ITEM INFO
const name = window.nameHelper(page); // NAME
const image = window.imageHelper(page); // IMAGE
const sources = window.sourceHelper(page); // SOURCE
let itemType = window.itemType(page); // ITEM TYPE (e.g. Weapon, Armor)
// if the type is a weapon, just use the formatted weapon type (e.g. Simple Melee Weapon)
if (itemType === "Weapon" ) {itemType = weaponType}
const itemBase = window.itemBase(page); // BASE ITEM (e.g. Longsword, Backpack, Plate Armor)
const weight = window.weightHelper(page);
const { dnd, source, local, nearby, distant } = window.valueHelper(page);

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
    // `> [!blank|embed txt-c]\n` +
    `${itemType}` + `${itemBase}`
    );

// ========= CORE PROPERTIES 
let coreRows = [];

// Every row of the below table is inputted as an index in a "table array" which will be joined later with linebreaks
if (dmg1) coreRows.push(`| **Damage:** | ${dmg1} |`)
if (mastery) coreRows.push(`| **Mastery:** | ${mastery} |`)
if (weight) coreRows.push(`| **Weight:** | ${weight} |`)

// Only render the table if there are inputs in the frontmatter
if (coreRows.length) {
    const table = [
        // Build the table header as the first indexes of the table array
        `> [!metadata|alt-line no-t n-th tcm table-cell-top]`,
        `> | |`,
        `> |-:|-|`,
        // and then add whatever rows that have an input
        ...coreRows
    ];
    // Now we join every row index with a linebreak
    dv.span(table.join("\n"));
}

// ========= VALUE CALLOUT
let econRows = [];

if (source) econRows.push(`| **Source:** | ${source} |`)
if (local) econRows.push(`| **Local Marketplace:** | ${local} |`)
if (nearby) econRows.push(`| **Nearby City:** | ${nearby} |`)
if (distant) econRows.push(`| **Distant City:** | ${distant} |`)
if (dnd) econRows.push(`| *D&D 5e (2024):* | ${dnd} |`)

if (econRows.length) {
    const callout = [
        `> [!metadata|co-block tcm]- Economic Details`,
        `> | **Price from...** |`,
        `> | -:| - |`,
        ...econRows
    ];

    dv.span(callout.join("\n"));
}

// ========= SOURCES
dv.span(`
> [!blank|txt-c]
> <font size=2>${sources}</font>
`);

```
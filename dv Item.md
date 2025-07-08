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
const attackHelper = await dv.io.load(path + "combat.js");
eval(attackHelper);
const defenseHelper = await dv.io.load(path + "defense.js");
eval(defenseHelper);
const bonusesHelper = await dv.io.load(path + "bonuses.js");
eval(bonusesHelper);

// ========= GENERAL ITEM INFO
const name = window.nameHelper(page); // NAME
const { desc, entry } = window.descHelper(page);
const image = window.imageHelper(page); // IMAGE
const sources = window.sourceHelper(page); // SOURCE
let itemType = window.itemType(page) 
const itemBase = window.itemBase(page); // BASE ITEM (e.g. Longsword, Backpack, Plate Armor)
const rarity = window.rarityHelper(page);
const weight = window.weightHelper(page);
const attunement = `<font size=2> ${window.attuneHelper(page)}</font>`;

// ========= COMBAT INFO
const weaponProperties = window.fmtWeaponProps(page); // ## WEAPON PROPERTIES (e.g. Versatile, Light, Thrown)
const mastery = window.weaponMastery(page);
const dmg1 = window.weaponDamage(page);
const weaponBonuses = window.weaponBonuses(page);

// ========= DEFENSE INFO
const { baseAC, strReq } = window.acHelper(page);
const { resistances } = window.resistanceImmunity(page);
const itemBonuses = window.formatItemBonuses(page);

// ========= CRAFTING & ECON INFO
const { dnd, source, local, nearby, distant, range } = window.valueHelper(page);
const { craftMats, craftTime, craftChecks, craftDC, craftTools } = window.craftHelper(page);
const { enchantMats, enchantTime, enchantChecks, enchantDC } = window.enchantHelper(page);


// ========= BONUSES
const savingThrows = window.bonusSavingThrow(page);


// ================== ## RENDER ## ================== //
// ========= TITLE
dv.span(
    `> [!recite|no-i txt-c]- ${name}\n` + 
    `>${desc}`
    );

// ========= IMAGE
dv.span(image);

// ========= COLLAR
if (!image) {
  dv.span(
    `> [!blank|embed txt-c]\n` +
    `${itemType}` + `${itemBase}\n` +
    `${rarity}` + `${attunement}`
  );
} else {
  dv.span(`
  <div style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      
    ">
    <span>${rarity}</span>
    <span>${itemType}${itemBase}</span>
  </div>
`);
}

// ========= CORE PROPERTIES TABLE
let coreRows = [];

// Every row of the below table is inputted as an index in a "table array" which will be joined later with linebreaks
if (baseAC) coreRows.push(`| **Armor Class** | ${baseAC} |`)
if (dmg1) coreRows.push(`| **Damage:** | ${dmg1} |`)
if (weaponProperties) coreRows.push(`| **Properties:** | ${weaponProperties}`)
if (mastery) coreRows.push(`| **Mastery:** | ${mastery} |`)
if (weight) coreRows.push(`| **Weight:** | ${weight} |`)
if (range) coreRows.push(`| **Value:** | ${range} |`)

// Only render the table if there are inputs in the frontmatter
if (coreRows.length) {
    const coreTable = [
        // Build the table header as the first indexes of the table array
        `> [!metadata|table n-th tcm table-cell-top]`,
        `> | |`,
        `> |-:|-|`,
        // and then add whatever rows that have an input
        ...coreRows
    ];
    // Now we join every row index with a linebreak
    dv.span(coreTable.join("\n"));
}


// ========= ENTRY
// if (weaponBonuses) {
//   dv.paragraph(weaponBonuses)
// }
// if (entry) {
//   dv.el("div",
//     entry,
//     { attr: { style: "border: 1px solid; box-sizing: border-box; border-radius: 5px; border-color: gray; padding: 10px;" } }
//   );
// }

if (itemBonuses) {
  dv.paragraph(itemBonuses)
}

if (entry) {
  dv.paragraph(entry);
}

if (strReq) {
  dv.paragraph(strReq);
}



// ========= ECONOMIC DETAILS CALLOUT
let gigPriceRows = [];
let gigPriceTable = [];
let bookPriceRows = [];
let bookPriceTable = [];

// Building Grain Into Gold price table
if (source) gigPriceRows.push(`| *Source:* | ${source} |`)
if (local) gigPriceRows.push(`| *Local Marketplace:* | ${local} |`)
if (nearby) gigPriceRows.push(`| *Nearby City:* | ${nearby} |`)
if (distant) gigPriceRows.push(`| *Distant City:* | ${distant} |`)

if (dnd) bookPriceRows.push(`| *D&D 5e (2024):* | ${dnd} |`)

const econTable = [
  `> [!metadata|co-block tcm n-th]- Economic Details`
];

// append the GIG table if you have any rows  
if (gigPriceRows.length) {
  econTable.push(
    `>`,
    `> | |`,
    `> |:-:|`,
    `> | ***Price from...*** |`,
    `>`,
    `> | |`,
    `> | -:| - |`,
    ...gigPriceRows
  );
}

// append the official table if you have any rows  
if (bookPriceRows.length) {
  econTable.push(
    `>`,
    `> | |`,
    `> |:-:|`,
    `> | ***Official Sources*** |`,
    `>`,
    `> | |`,
    `> | -:| - |`,
    ...bookPriceRows
  );
}

// render it once
if (gigPriceRows.length || bookPriceRows.length) {
  dv.span(econTable.join("\n"));
}

let craftReqRows = [];
let matRows = [];

if (craftTools) craftReqRows.push(`| *Tools:* | ${craftTools} |`);
if (craftTime) craftReqRows.push(`| *Time:* | ${craftTime} hours |`);
if (craftDC) craftReqRows.push(`| *Crafting DC:* | ${craftDC} |`);

if (craftMats) matRows.push(`| ${craftMats} |`)

const craftTable = [
  `> [!metadata|co-block tcm n-th]- Crafting`
];

if (craftReqRows.length) {
  craftTable.push(
    `>`,
    `> | |`,
    `> |:-:|`,
    `> | ***Requirements*** |`,
    `>`,
    `> | |`,
    `> | -:| - |`,
    ...craftReqRows 
  )
}

if (matRows.length) {
  craftTable.push(
    `>`,
    `>| |`, 
    `>|:-:|`,
    `>| ***Materials*** |`,
    ...matRows
  )
}

if (matRows.length || craftReqRows.length) {
  dv.span(craftTable.join("\n"));
}

let enchantReqRows = [];
let enchantRows = [];

if (enchantTime)    enchantReqRows.push(`| *Time:*            | ${enchantTime} hours |`);
if (enchantDC)      enchantReqRows.push(`| *Enchanting DC:*   | ${enchantDC}       |`);

if (enchantMats)    enchantRows.push(`| ${enchantMats} |`);

const enchantTable = [
  `> [!metadata|co-block tcm n-th]- Enchanting`
];

if (enchantReqRows.length) {
  enchantTable.push(
    `>`,
    `> |    |`,
    `> |:-:|`,
    `> | ***Requirements*** |`,
    `>`,
    `> |    |`,
    `> | -:| - |`,
    ...enchantReqRows
  );
}

if (enchantRows.length) {
  enchantTable.push(
    `>`,
    `> |    |`,
    `> |:-:|`,
    `> | ***Materials*** |`,
    ...enchantRows
  );
}

if (enchantReqRows.length || enchantRows.length) {
  dv.span(enchantTable.join("\n"));
}


// dv.span(`
// >
// >| |
// >|:-:|
// >| ***Requirements*** |
// >
// >| |
// >|-:|-|
// >| *Tools:* | [[Smith's Tools]] | 
// >| *craftTime:* | ${craftTime} hours |
// >| *Crafting craftDC:* | ${craftDC} |
// >
// >| | 
// >|:-:|
// >| ***Materials*** |
// >| ${mats} |
// `);


// ========= SOURCES
dv.span(`
> [!blank|txt-c embed]
> <font size=2>${sources}</font>
`);

```
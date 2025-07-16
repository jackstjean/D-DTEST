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
const miscHelper = await dv.io.load(path + "misc.js");
eval(miscHelper);

// ========= GENERAL ITEM INFO
const name = window.nameHelper(page); // NAME
const { desc, abilities, entry, jsEntry } = window.descHelper(page);
const image = window.imageHelper(page); // IMAGE
const sources = window.sourceHelper(page); // SOURCE
const itemSlot = window.itemSlot(page);
const itemType = window.itemType(page) 
const itemBase = window.itemBase(page); // BASE ITEM (e.g. Longsword, Backpack, Plate Armor)
const rarity = window.rarityHelper(page);
const weight = window.weightHelper(page);
const attunement = ` <font size=2>${window.attuneHelper(page)}</font>`;
const lootTables = window.lootTables(page);

// ========= COMBAT INFO
const weaponProperties = window.fmtWeaponProps(page); // ## WEAPON PROPERTIES (e.g. Versatile, Light, Thrown)
const mastery = window.weaponMastery(page);
const dmg1 = window.weaponDamage(page);
const weaponBonuses = window.weaponBonuses(page);

// ========= DEFENSE INFO
const { baseAC, strReq } = window.acHelper(page);
const { resistIcons, immunityIcons, condImmunityIcons } = window.resistanceImmunity(page);
const itemBonuses = window.formatItemBonuses(page);

// ========= CRAFTING & ECON INFO
const { dnd, source, local, nearby, distant, range } = window.valueHelper(page);
const { craftMats, craftTime, craftChecks, craftDC, craftTools } = window.craftHelper(page);
const { enchantMats, enchantTime, enchantChecks, enchantDC } = window.enchantHelper(page);

// ========= MOUNTS & VEHICLES
const { carry, mountSpeed } = window.mountHelper(page);
const { vehicleSpeed, vehicleCargo, vehiclePassengers, vehicleCrew, vehicleCapacity, vehicleAC, vehicleHP, vehicleDamageThreshold, shipInfo} = window.vehicleHelper(page);

// ========= BONUSES
const savingThrows = window.bonusSavingThrow(page);
const bonusAbility = window.bonusAbility(page);

// ========= CRAFTING & ECON INFO
const { allDis, sneakDis } = window.grantsDisadvantage(page);

// ================== ## RENDER ## ================== //
// ========= TITLE
dv.span(
    `> [!recite|no-i txt-c]- ${name}\n` + 
    `>${desc}`
    );

// ========= IMAGE
dv.span(image);

// ========= COLLAR
// if (!image) {
//   dv.span(
//     `> [!blank|embed txt-c]\n` +
//     `${itemType}` + `${itemBase}\n` +
//     `${rarity}` + `${attunement}`
//   );
// } else {
//   dv.span(`
//   <div style="
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       width: 100%;
      
//     ">
//     <span>${rarity}</span>
//     <span>${itemType}${itemBase}</span>
//   </div>
// `);
// }
dv.span(
    `> [!blank|embed txt-c]\n` +
    `${itemType}` + `${itemBase}\n` +
    `${rarity}` + `${attunement}`
  );

// ========= CORE PROPERTIES TABLE
let coreRows = [];

// Every row of the below table is inputted as an index in a "table array" which will be joined later with linebreaks
if (dmg1) coreRows.push(`| **Damage:** | ${dmg1} |`)
if (weaponProperties) coreRows.push(`| **Properties:** | ${weaponProperties}`)
if (baseAC) coreRows.push(`| **Armor Class:** | ${baseAC} |`)
if (resistIcons) coreRows.push(`|**Resistances:** | ${resistIcons} |`)
if (immunityIcons) coreRows.push(`|**Immunities:** | ${immunityIcons} |`)
if (condImmunityIcons) coreRows.push(`|**Cond. Immunities:** | ${condImmunityIcons} |`)
if (mastery) coreRows.push(`| **Mastery:** | ${mastery} |`)
if (strReq) coreRows.push(`| **Requirements:** | ${page.strReq} <font size=2>STR</font> |`)
if (sneakDis) coreRows.push(`| **Disadvantages:** | ${sneakDis} |`)
if (carry) coreRows.push(`| **Carrying Capacity:** | ${carry} |`)
if (mountSpeed) coreRows.push(`| **Speed:** | ${mountSpeed} |`)
if (vehicleSpeed) coreRows.push(`| **Speed:** | ${vehicleSpeed} |`);
if (vehicleCapacity) coreRows.push(`| **Capacity:** | ${vehicleCapacity} |`);
if (vehicleAC) coreRows.push(`| **AC:** | ${vehicleAC}  |`);
if (vehicleHP) coreRows.push(`| **HP:**   | ${vehicleHP}  |`);
if (vehicleDamageThreshold) coreRows.push(`| **Damage Threshold:** | ${vehicleDamageThreshold} |`);

if (weight) coreRows.push(`| **Weight:** | ${weight} |`)
if (itemSlot) coreRows.push(`|**Slot:** | ${itemSlot} |`)
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

let jsEntryArray = [];
if (weaponBonuses) jsEntryArray.push(weaponBonuses);
if (itemBonuses) jsEntryArray.push(itemBonuses);
if (abilities) jsEntryArray.push(abilities);
if (allDis) jsEntryArray.push(allDis);
if (strReq) jsEntryArray.push(strReq);
// if (page.itemType === "vehicle" && page?.vehicle?.type === "water") jsEntryArray.push(shipInfo);

if (jsEntryArray.length) {
  // build up a list of block-quoted lines
  const lines = [];
  
  // header
  lines.push('> [!metadata|co-o no-i]+ Item Entry');
  
  // each entry, plus a blank-quote line after
  for (let entry of jsEntryArray) {
    lines.push(`> ${entry}`);
    lines.push('>');     // blank line in the quote
  }
  
  // one final blank-quote if you like
  lines.push('>');
  
  // join into a single markdown string
  const md = lines.join("\n");
  
  // render it
  dv.span(md);
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
  `> [!metadata|co-o bg-c-blue tcm n-th]- Economic Details`
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
  `> [!metadata|co-o bg-c-blue tcm n-th]- Crafting`
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
  `> [!metadata|co-o bg-c-blue bg-c-blue tcm n-th]- Enchanting`
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

// ========= MISC
if (page.itemType === "vehicle" && page?.vehicle?.type === "water") {
  const lines = [];
  
  // header
  lines.push('> [!metadata|co-o bg-c-blue]- Ship Mechanics');
  lines.push(`> ` + shipInfo)

  const md = lines.join("\n");

  dv.span(md)
  
}
// ========= SOURCES
if (lootTables) {
  dv.paragraph(lootTables)
}

dv.span(`
> [!blank|txt-c embed]
> <font size=2>${sources}</font>
`);

```
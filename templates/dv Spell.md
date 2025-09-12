```dataviewjs

const page = dv.current();

const name = page.name ?? "";
const image = page.image ?? "";
const tags = page.tags ?? "";
const sources = page.sources ?? "";

const school = page.school ?? "";
const level = page.level ?? "";
const castingTime = page.castingTime ?? "";
const range = page.range ?? "";
const components = page.components ?? "";
const duration = page.duration ?? "";
const concentration = page.concentration ?? "";

const entry = page.entry ?? "";

const classes = page.classes ?? "";
const subclasses = page.subclasses ?? "";
const species = page.species ?? "";
const feats = page.feats ?? "";
const otherOptions = page.otherOptions ?? "";

let levelFormat = "";

switch (level) {
    case 0:
        levelFormat = `${school} Cantrip`
        break;
    case 1:
        levelFormat = `1st level ${school}`
        break;
    case 2:
        levelFormat = `2nd level ${school}`
        break;
    case 3:
        levelFormat = `3rd level ${school}`
        break;
    case 4:
        levelFormat = `4th level ${school}`
        break;
    case 5:
        levelFormat = `5th level ${school}`
        break;
    case 6:
        levelFormat = `6th level ${school}`
        break;
    case 7:
        levelFormat = `7th level ${school}`
        break;
    case 8:
        levelFormat = `8th level ${school}`
        break;
    case 9:
        levelFormat = `9th level ${school}`
        break;
    case 10:
        levelFormat = `10th level ${school}`
        break;
}


let infoArray = [];

infoArray.push(
    `> [!metadata|table tbl-cln]`,
    `> ||`,
    `> |:-:|:-:|:-:|:-:|`,
    `> | :ra_hand: 1 ${castingTime} | :ra_archery_target: ${range} ft. | :ra_leaf: ${components} | :ra_hourglass: ${duration} |`
)
const infoCollar = infoArray.join("\n");


// ========= RENDER =========

dv.header(1, name)
dv.el("i", levelFormat);

dv.span(infoCollar);

dv.span(entry);

```
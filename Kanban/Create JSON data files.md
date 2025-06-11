const [propOrder, weaponTypes, armorTypes, gearTypes, srcTitles] = await Promise.all([
  loadJSON("…/propertyOrder.json"),
  loadJSON("…/weaponTypes.json"),
  loadJSON("…/armorTypes.json"),
  loadJSON("…/gearTypes.json"),
  loadJSON("…/sourceTitles.json"),
]);
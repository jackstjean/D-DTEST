(async () => {
  const nameHelper = await dv.io.load("name.js");
  eval(nameHelper);

  const sourceHelper = await dv.io.load("sources.js");
  eval(sourceHelper);

})();

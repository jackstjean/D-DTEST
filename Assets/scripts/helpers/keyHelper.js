// Assets/scripts/helpers/keyHelper.js
(async () => {
  const raw = await dv.io.load("Assets/scripts/helpers/keys.json");
  const meta = JSON.parse(raw||"{}");

  window.keyMaps = {};
  for (const [listName, arr] of Object.entries(meta)) {
    if (!Array.isArray(arr)) continue;
    window.keyMaps[listName] = arr.reduce((m,v)=>{
      m[v.toLowerCase()] = v;
      return m;
    }, {});
  }
})();

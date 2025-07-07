(function () {
  window.bonusSavingThrow = page => {
    // 1) grab the array (or default to empty array)
    const rawMisc = page.statbonus?.savingThrows?.misc ?? [];
    if (!Array.isArray(rawMisc) || rawMisc.length === 0) return "";

    // 2) process each entry
    const outputs = rawMisc.map(entry => {
      const str = String(entry).trim();
      const m = str.match(/^(.*?);\s*(.*)$/);
      if (!m) return null;            // skip non-matching
      const [, bonus, type] = m;

      switch (bonus) {
        case "a":
          return `[[Advantage]] on saving throws against ${type}`;
        case "1":
        case "2":
        case "3":
          return `+${bonus} to ${type}`;
        default:
          return `⚠️ Unknown bonus "${bonus}" on saving throws against ${type}`;
      }
    })
    // 3) drop any nulls, then join however you like
    .filter(Boolean);

    // e.g. return as comma-separated list:
    return outputs.join(", ");
  }
})();

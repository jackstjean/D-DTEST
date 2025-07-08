(function () {
    window.formatItemBonuses = page => {
        // build array 
        const bonusArray = [];
        const combatBonus = window.weaponBonuses(page);
        const ac = window.bonusArmorClass(page);
        const saves = window.bonusSavingThrow(page);
        const { resistances, immunities, conditionImmunities } = window.resistanceImmunity(page);
        if (combatBonus) bonusArray.push(combatBonus);
        if (ac) bonusArray.push(ac);
        if (saves) bonusArray.push(saves);
        if (resistances) bonusArray.push(resistances);
        if (immunities) bonusArray.push(immunities);
        if (conditionImmunities) bonusArray.push(conditionImmunities)
        

        let bonusStr = "";
        if (bonusArray.length === 0) {
            return "";
        } else if (bonusArray.length === 1) {
            bonusStr = bonusArray[0];
        } else if (bonusArray.length === 2) {
            bonusStr = bonusArray.join(" and ");
        } else {
            const allButLast = bonusArray.slice(0, -1).join(", ");
            const last = bonusArray[bonusArray.length -1];
            bonusStr = `${allButLast}, and ${last}`
        }
        // item type -> action phrase
        const actionPhrases = {
            armor: "wearing this armor",
            weapon: "wielding this weapon"
        }

        // pick appropriate phrase or fall back to generic one 
        const whenPhrase = actionPhrases[page.itemType]
           ? `While ${actionPhrases[page.itemType]}, you gain`
           : `While using this item, you gain`;

        // glue it all together
        return `${whenPhrase} ${bonusStr}.`;

    }
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
                    return `+${bonus} on saving throws against ${type}`;
                default:
                    return `⚠️ Unknown bonus "${bonus}" on saving throws against ${type}`;
            }
        })
            // 3) drop any nulls, then join however you like
            .filter(Boolean);

        // e.g. return as comma-separated list:
        return outputs.join(", ");
    }
    window.bonusArmorClass = page => {
        const input = page.statBonus?.armorClass ?? "";

        if (!input) {
            return "";
        } else {
            return `a +${input} bonus to [[Armor Class]]`
        }
    }
})();

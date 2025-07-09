(function () {
    window.formatItemBonuses = page => {
        // build array 
        const verbArray = [];
        const combatBonus = window.weaponBonuses(page);
        const ac = window.bonusArmorClass(page);
        const saves = window.bonusSavingThrow(page);
        const { resistances, immunities, conditionImmunities } = window.resistanceImmunity(page);
        if (combatBonus) verbArray.push(combatBonus);
        if (ac) verbArray.push(ac);
        if (saves) verbArray.push(saves);
        if (resistances) verbArray.push(resistances);
        if (immunities) verbArray.push(immunities);
        if (conditionImmunities) verbArray.push(conditionImmunities)

        const nounArray = [];
        const abilityScoreIncrease = window.bonusAbility(page) ?? [];
        if (abilityScoreIncrease.length) nounArray.push(abilityScoreIncrease);

        function oxfordJoin(arr) {
            if (arr.length === 0) return "";
            if (arr.length === 1) return arr[0];
            if (arr.length === 2) return arr.join(" and ");
            // 3 or more:
            return `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
        }

        const nounStr = oxfordJoin(nounArray);
        const verbStr = oxfordJoin(verbArray);

        const actionPhrases = {
            armor: "wearing this armor",
            weapon: "wielding this weapon"
        }

        // pick appropriate phrase or fall back to generic one 
        const whenPhrase = actionPhrases[page.itemType]
            ? `While ${actionPhrases[page.itemType]},`
            : `While using this item,`;

        if (nounStr && verbStr) {
            return `${whenPhrase} ${nounStr}. You also gain ${verbStr}.`
        } else if (nounStr && !verbStr) {
            return `${whenPhrase} ${nounStr}.`
        } else if (verbStr && !nounStr) {
            return `${whenPhrase} you gain ${verbStr}.`
        } else {
            return "";
        }


        let bonusesStr = "";
        if (bonusArray.length === 0) {
            return "";
        } else if (bonusArray.length === 1) {
            bonusesStr = bonusArray[0];
        } else if (bonusArray.length === 2) {
            bonusesStr = bonusArray.join(" and ");
        } else {
            const allButLast = bonusArray.slice(0, -1).join(", ");
            const last = bonusArray[bonusArray.length - 1];
            bonusesStr = `${allButLast}, and ${last}`
        }
        // item type -> action phrase


        // glue it all together
        return `${whenPhrase} ${bonusesStr}.`;

    }
    window.bonusSavingThrow = page => {
        // 1) grab the array (or default to empty array)
        const rawMisc = page.savingThrows?.misc ?? [];
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
        const input = page.armorClass ?? "";

        if (!input) {
            return "";
        } else {
            return `a +${input} bonus to [[Armor Class]]`
        }
    }
    window.bonusAbility = page => {
        const input = page.abilityMod ?? {};
        const abilities = {
            str: "Strength",
            dex: "Dexterity",
            con: "Constitution",
            int: "Intelligence",
            wis: "Wisdom",
            cha: "Charisma"
        }

        // filter through the objects with inputs and then map them to a new object
        const filter = Object.entries(input)
            .filter(([, val]) => val !== null && val !== undefined && val !== "")
            .map(([key, val]) => ({ ability: key, raw: String(val) }));

        const decoded = filter.map(({ ability, raw }) => {
            const m = raw.match(/^([=+\-])(\d+)$/);
            if (!m) {
                return { ability, error: "invalid format", raw };
            }
            const [_, operator, amount] = m;

            const abilityFormat = abilities[ability]

            switch (operator) {
                case "=":
                    return `your ${abilityFormat} score changes to ${amount}. The item has no effect on you if your Strength without the belt is equal to or greater than the belt's score`
                case "+":
                    return `your ${abilityFormat} score increases by ${amount}`
                case "-":
                    return ` your ${abilityFormat} score decreases by ${amount}`
            }
        });

        return decoded;
    }
})();

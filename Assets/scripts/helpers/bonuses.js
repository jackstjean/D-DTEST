(function () {
    window.formatItemBonuses = page => {
        // build array 
        const verbArray = [];
        const nounArray = [];
        const entry = [];

        const { slayerBonus, combatBonus } = window.weaponBonuses(page);
        const ac = window.bonusArmorClass(page);
        const saves = window.bonusSavingThrow(page);
        const { resistances, immunities, conditionImmunities } = window.resistanceImmunity(page);
        // const proficiencies = window.grantsProficiency(page);
        const spellcastingFocus = window.spellcastingFocus(page);
        const abilityScoreIncrease = window.bonusAbility(page) ?? [];
        
        // VERB ARRAY
        if (combatBonus) verbArray.push(combatBonus);
        if (ac) verbArray.push(ac);
        if (saves) verbArray.push(saves);
        if (resistances) verbArray.push(resistances);
        if (immunities) verbArray.push(immunities);
        if (conditionImmunities) verbArray.push(conditionImmunities)
        // if (proficiencies) verbArray.push(proficiencies);
        
        // NOUN ARRAY
        if (abilityScoreIncrease.length) nounArray.push(abilityScoreIncrease);
        
        
        function oxfordJoin(arr) {
            if (arr.length === 0) return "";
            if (arr.length === 1) return arr[0];
            if (arr.length === 2) return arr.join(", and ");
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
            entry.push(`${whenPhrase} ${nounStr}. You also gain ${verbStr}`);
        } else if (nounStr && !verbStr) {
            entry.push(`${whenPhrase} ${nounStr}`)
        } else if (verbStr && !nounStr) {
            entry.push(`${whenPhrase} you gain ${verbStr}`)
        } else {
            entry.push();
        }

        if (slayerBonus) entry.push(slayerBonus)
        if (spellcastingFocus) entry.push(spellcastingFocus);


        return (entry.join(`. `) + `.`);
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
                    return `your ${abilityFormat} score changes to ${amount}. The item has no effect if your ${abilityFormat} is higher without it`
                case "+":
                    return `your ${abilityFormat} score increases by ${amount}`
                case "-":
                    return ` your ${abilityFormat} score decreases by ${amount}`
            }
        });

        return decoded;
    }
    window.grantsProficiency = page => {

        function oxfordJoin(arr) {
            if (arr.length === 0) return "";
            if (arr.length === 1) return arr[0];
            if (arr.length === 2) return arr.join(" and ");
            // 3 or more:
            return `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
        }
        const weaponTags = page.weaponBonusTags ?? [];
        const profTags = page.grantsProficiency ?? [];

        // Exclude any tags already handled in weaponBonuses
        const onlyProfTags = profTags.filter(tag => !weaponTags.includes(tag));
        const onlyProfCaps = onlyProfTags.map(
            tag => `${tag.charAt(0).toUpperCase()}${tag.slice(1).toLowerCase()}s`
        );

        // return onlyProfCaps.length
        //     ? `proficiency with ${oxfordJoin(onlyProfCaps)}`
        //     : '';
        return "";
    };
})();

(function () {
    window.acHelper = page => {
        const baseAC = page.baseAC ?? "";
        const dexCapInput = page.maxDexMod ?? "";
        const strInput = page.strReq ?? "";

        let formattedAC = "";
        if (!baseAC) {
            return "";
        } else {
            // Formatting the dex mod cap for armors (e.g. max 2)
            let dex = "";
            if (!dexCapInput) {
                dex = ` + Dex`
            } else if (dexCapInput === 0) {
                dex = ""
            } else {
                dex = ` + Dex (max ${dexCapInput})`
            }
            formattedAC = baseAC + dex;
        }

        let strReq = "";
        if (!strInput) {
            // strReq = "";
        } else {
            strReq = `If the wearer has a Strength score lower than ${strInput}, their speed is reduced by 10 feet.`
        }

        return {
            baseAC: formattedAC,
            strReq: strReq
        }
    };
    window.resistanceImmunity = page => {
        const rawResist = page.resist ?? [];
        const rawImmunity = page.immunity ?? [];
        const rawCondImm = page.conditionImmunity ?? [];

        const dmgIcons = {
            acid: ":bg3_acid:",
            bludgeoning: ":bg3_bludgeoning:",
            cold: ":bg3_cold:",
            fire: ":bg3_fire:",
            force: ":bg3_force:",
            lightning: ":bg3_lightning:",
            necrotic: ":bg3_necrotic:",
            piercing: ":bg3_piercing:",
            poison: ":bg3_poison:",
            psychic: ":bg3_psychic:",
            radiant: ":bg3_radiant:",
            slashing: ":bg3_slashing:",
            thunder: ":bg3_thunder:",
            charmed: ":cond_charmed:",
        };
        

        const resistIcons = rawResist
            .map(r => dmgIcons[r])
            .filter(Boolean)
            .join(", ");
        const immunityIcons = rawImmunity
            .map(r => dmgIcons[r])
            .filter(Boolean)
            .join(", ");
        const condImmunityIcons = rawCondImm
            .map(r => dmgIcons[r])
            .filter(Boolean)
            .join(", ");

        // helper: build a grammar‐aware phrase
        function formatList(arr, label, suffix = "") {
            if (!Array.isArray(arr) || arr.length === 0) return "";
            if (arr.length === 1) {
                return `[[${label}]] to ${arr[0]}${suffix}`;
            } else if (arr.length === 2) {
                return `[[${label}]] to ${arr[0]} and ${arr[1]}${suffix}`;
            } else {
                const allButLast = arr.slice(0, -1).join(", ");
                const last = arr[arr.length - 1];
                return `[[${label}]] to ${allButLast}, and ${last}${suffix}`;
            }
        }

        // 1) Resistances
        const resistArray = rawResist
            .map(r => {
                if (!(r in dmgIcons)) return `⚠️ Unknown damage type: "${r}"`;
                const icon = dmgIcons[r];
                const cap = r[0].toUpperCase() + r.slice(1);
                return `${icon}${cap}`;
            })
            .filter(x => !!x);

        const resistances = formatList(resistArray, "Resistance", " damage");

        // 2) Damage Immunities
        const immArray = rawImmunity
            .map(r => {
                if (!(r in dmgIcons)) return `⚠️ Unknown damage type: "${r}"`;
                const icon = dmgIcons[r];
                const cap = r[0].toUpperCase() + r.slice(1);
                return `${icon}${cap}`;
            })
            .filter(x => !!x);

        const immunities = formatList(immArray, "Immunity", " damage");

        // 3) Condition Immunities (custom grammar)
        const condArray = rawCondImm
            .map(c => {
                const icon = dmgIcons[c] || "";
                const cap = c[0].toUpperCase() + c.slice(1);
                return `${icon}${cap}`;
            })
            .filter(x => !!x);

        let conditionImmunities = "";
        if (condArray.length === 1) {
            conditionImmunities = `[[Immunity]] from the ${condArray[0]} condition`;
        } else if (condArray.length === 2) {
            conditionImmunities = `[[Immunity]] from the ${condArray[0]} and ${condArray[1]} conditions`;
        } else if (condArray.length > 2) {
            const allButLast = condArray.slice(0, -1).join(", ");
            const last = condArray[condArray.length - 1];
            conditionImmunities = `[[Immunity]] from the ${allButLast}, and ${last} conditions`;
        }

        return {
            resistances,
            resistIcons,
            immunities,
            immunityIcons,
            conditionImmunities,
            condImmunityIcons
        };
    }
})();
(function () {
    window.acHelper = page => {
        const baseAC = page.baseAC ?? "";
        const dexCapInput = page.maxDexMod ?? "";
        const strInput = page.strReq ?? "";
        // const resist = page.resist ?? [];
        // const immunity = page.immunity ?? [];
        // const condImmun = page.conditionImmunity ?? [];

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
        const rawConditionImmunity = page.conditionImmunity ?? [];

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
        };

        
        let resistances = "";
        if (!rawResist) {
            // resistances = "";
        } else {
            // mapping each damage type to a damage type icon
            const resistArray = rawResist.map(r => {
                if (!(r in dmgIcons)) return `⚠️ Unknown damage type: "${rawResist}"`;
                const dmgIcon = dmgIcons[r];
                const dmgType = r.charAt(0).toUpperCase() + r.slice(1);
                return `${dmgIcon}${dmgType}`;
            })

            // grammar based on amount of resistances
            if (resistArray.length === 0) {
                // resistances = "";
            } else if (resistArray.length === 1) {
                resistances = `[[Resistance]] to ${resistArray} damage`;
            } else if (resistArray.length === 2) {
                resistances = `[[Resistance]] to ${resistArray[0]} and ${resistArray[1]} damage`
            } else {
                const allButLast = resistArray.slice(0, -1).join(", ");
                const last = resistArray[resustArray.length - 1];
                resistances = `[[Resistance]] to ${allButLast}, and ${last}`;
            }
        }

        return {
            resistances: resistances
        }
    }
})();
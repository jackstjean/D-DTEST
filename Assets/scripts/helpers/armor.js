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
})();
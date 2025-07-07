(function () {
    window.acHelper = page => {
        const baseAC = page.baseAC ?? "";
        const modAC = page.modAC ?? "";
        const dexCap = page.dex ?? "";
        const strReq = page.strReq ?? "";
        // const resist = page.resist ?? [];
        // const immunity = page.immunity ?? [];
        // const condImmun = page.conditionImmunity ?? [];

        if (baseAC === null) {
            return "";
        }
        let appliedDexMod;
        if (dexCap === null) {
            appliedDexMod = ` + Dex`
        } else if (dexCap === 0) {
            appliedDexMod = ""
        } else {
            appliedDexMod = ` + Dex (max ${dexCap})`
        }

        const formattedAC = baseAC + appliedDexMod

        return {
            baseAC: formattedAC,
            strReq: strReq
        }
    };
})();
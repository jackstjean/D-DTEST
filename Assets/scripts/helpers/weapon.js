(function () {
    window.fmtWeaponType = page => {
        const weaponType = (page.weaponType ?? [])
            .join(" ");
        return weaponType;
    }
    window.fmtWeaponProps = page => {
        const weaponProperties = page.weaponProperties ?? [];
        return weaponProperties;
    }
    window.weaponDamage = page => {
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

        let fmtDmg = ""; // this will be the final return variable

        const dmg1Input = (page.damage?.dmg1 ?? "")
        const m = dmg1Input.match(/^(\d+d)(\d+)$/)
        // ^(\d+d) = one-or-more digits (\d+) followed immediately by the literal d
        // (\d+)$  = one-or-more digits
        // ex: m[1] = 1d8; m[2] = 1d; m[3] = 8

        // then destructure so that we can read things easier
        // throw away 1d8 cause we'll add it in later
        // example: beforeNum = 1d; type = 8
        let [_, beforeNum, diceType] = m;
        // make sure that the last number is actually a number so that we can add 2 to it in case there is versatile
        const num = diceType
            ? parseInt(diceType)
            : num;

        // add the matches together to get 1d8
        const dmg1Dice = beforeNum + num;

        const dmg1TypeInput = (page.damage?.dmg1Type ?? "").toLowerCase();
        const dmg1Type = dmg1TypeInput
          ? dmg1TypeInput.charAt(0).toUpperCase() + dmg1TypeInput.slice(1)
          : "";
        const dmg1Icon = dmgIcons[dmg1TypeInput] ?? "";

        // ### versatile check
        // Pull the array and ensure that it actually is an array
        const wProps = Array.isArray(page.weaponProperties)
            ? page.weaponProperties
            : [];
        // use .some() function to normalize and test for the versatile property in the property array
        const hasVersatile = wProps
            .some(p => p.toLowerCase() === "versatile");

        // If the weapon has the Versatile property, add 2 to the dice type and add it onto the end of the first damage type
        if (!hasVersatile) {
            return fmtDmg = `${dmg1Icon} ${dmg1Dice} ${dmg1Type}`;
        } else {
            return fmtDmg = `${dmg1Icon} ${dmg1Dice} ${dmg1Type} ([[Versatile]] ${beforeNum + (num + 2)})`
        }
    }
})();
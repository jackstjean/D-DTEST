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
        let fmtDmg = "";

        const dmg1Input = (page.damage?.dmg1 ?? "")
        const m = dmg1Input.match(/^(\d+d)(\d+)$/)
        // ^(\d+d) = one-or-more digits (\d+) followed immediately by the literal d
        // (\d+)$  = one-or-more digits
        // ex: m[1] = 1d8; m[2] = 1d; m[3] = 8

        // then destructure so that we can read things easier
        // throw away 1d8 cause we'll add it in later
        // example: beforeNum = 1d; type = 8
        let [_, beforeNum, type] = m;
        // make sure that the last number is actually a number so that we can add 2 to it in case there is versatile
        const num = type
            ? parseInt(type)
            : num;

        // add the matches together to get 1d8
        const dmg1 = beforeNum + num;
        const dmg1Type = page.damage?.dmg1Type ?? "";

        // ### versatile check
        // Pull the array and ensure that it actually is an array
        const wProps = Array.isArray(page.weaponProperties)
            ? page.weaponProperties
            : [];

        // normalize and test with `some()`
        const hasVersatile = wProps
            .some(p => p.toLowerCase() === "versatile");

        if (!hasVersatile) {
            return fmtDmg = `${dmg1} ${dmg1Type}`;
        } else {
            return fmtDmg = `${dmg1} ${dmg1Type} (Versatile ${beforeNum + (num + 2)})`
        }
    }
})();
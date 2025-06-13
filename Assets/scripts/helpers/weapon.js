(function () {
    window.fmtWeaponType = page => {
        const weaponType = (page.weaponType ?? [])
            .map(t => {
                return `${t}`;
            })
            .join(" ");

        return weaponType;
    }
    window.fmtWeaponProps = page => {
        const weaponProperties = page.weaponProperties ?? [];
        return weaponProperties;
    }
});
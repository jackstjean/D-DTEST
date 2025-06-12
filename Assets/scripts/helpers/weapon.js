(function(){
    window.fmtItemBase = page => {
        const itemBaseInput = page.itemBase ?? "";
        let itemBase = "";
        if (itemBaseInput.toLowerCase() !== page.name.toLowerCase()){
           itemBase = ` (${itemBaseInput})`;
        };
        return itemBase;
    }
    window.fmtItemType = page => {
        const itemType = page.itemType ?? "";
        return itemType;
    }
    window.fmtWeaponType = page => {
        const weaponType = (page.weaponType ?? [])
        .map(t => {
            return `${t} weapon`;
        })
        .join(", ");

        return weaponType;
    }
    window.fmtWeaponProps = page => {
        const weaponProperties = page.weaponProperties ?? [];
        return weaponProperties;
    }
})();
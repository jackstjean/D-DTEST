(function () {
    window.parseDice = dmgStr => {
        const m = String(dmgStr).match(/^(\d+d)(\d+)$/);
        if (!m) return null;
        const [, beforeNum, diceType] = m;
        const num = parseInt(diceType, 10);
        return {
            base: beforeNum + num,
            versatile: beforeNum + (num + 2)
        };
    };
    window.computeVersatileDice = page => {
        const parsed = window.parseDice(page.damage?.dmg1 ?? "");
        return parsed
            ? parsed.versatile
            : "";
    };
    window.fmtWeaponProps = page => {
        const input = page.weaponProperties ?? [];
        // if (!input) return "";
        const map = window.keyMaps?.weaponProperties ?? {};
        const weaponProperties = input.map(w => {
            const canon = map[w];
            if (!canon) {
                return `⚠️ Unknown property: "${w}"`;
            }

            // if it's versatile, append the bonus dice
            if (w.toLowerCase() === 'versatile') {
                const dice = window.computeVersatileDice(page);
                return `[[${canon}]]${dice ? ` <font size=2>(${dice})</font>` : ''}`;
            }

            if (w.toLowerCase() === 'thrown' || w.toLowerCase() === `ammunition`) {
                const min = page.weaponRange?.min ?? "Min";
                const max = page.weaponRange?.max ?? "Max";
                return `[[${canon}]] <font size=2>(${min}/${max} ft.)</font>`
            }

            return `[[${canon}]]`;
        }).join(`<br>`);

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

        // parse both the base and the versatile dice amt
        const parsed = window.parseDice(page.damage?.dmg1 ?? "");
        if (!parsed) return "";
        const { base: dmg1Dice, versatile: dmg1Versatile } = parsed;

        // type & icon
        const dmg1Input = (page.damage?.dmg1Type ?? "").trim().toLowerCase();
        if (!(dmg1Input in dmgIcons)) return `⚠️ Unknown damage type: "${dmg1TypeInput}"`;
        const dmg1Icon = dmgIcons[dmg1Input];
        const dmg1Type = dmg1Input.charAt(0).toUpperCase() + dmg1Input.slice(1);

        // versatile check
        const props = Array.isArray(page.weaponProperties)
            ? page.weaponProperties
            : [];
        const hasVersatile = props.some(p => p.toLowerCase() === "versatile");

        if (!hasVersatile) {
            return `${dmg1Icon} ${dmg1Dice} ${dmg1Type}`;
        }
        return `${dmg1Icon} ${dmg1Dice} ${dmg1Type} <font size=2>(${dmg1Versatile} [[Versatile]])</font>`;
    }
    window.weaponMastery = page => {
        // grab input
        const input = page.mastery ?? "";
        // normalize to lowercase for lookup 
        const key = input.toLowerCase();
        // pull the mastery map
        const map = window.keyMaps?.masteryProperties ?? {};
        // look up the canonical (e.g. "Sap")
        const canon = map[key]; // map["sap"] -> "Sap"

        if (!input) return "";

        if (canon) {
            return `[[${canon.charAt(0).toUpperCase() + canon.slice(1).toLowerCase()}]]`;
        }
        return `⚠️ Unknown mastery property: "${input}"`;
    }
    window.weaponBonuses = page => {
        // Pull frontmatter values for regular attack/damage
        const bonusAttack = Number(page.weaponAttack ?? 0);
        const bonusDmg = Number(page.weaponDamage ?? 0);

        // Pull frontmatter values for slayer
        const slayer = page.slayer ?? {};
        const targetList = slayer.targetTypes ?? (slayer.targetType ? [slayer.targetType] : []);
        const extraDice = slayer.extraDice;
        const dmgType = slayer.damageType;

        // Build slayer phrase
        let slayerBonus = "";
        if (targetList.length && extraDice && dmgType) {
            const caps = targetList.map(t => t[0].toUpperCase() + t.slice(1));
            let targets;
            if (caps.length === 1) targets = caps[0];
            else if (caps.length === 2) targets = caps.join(' or ');
            else {
                const last = caps.pop();
                targets = `${caps.join(', ')}, or ${last}`;
            }
            slayerBonus = `${targets} take an extra ${extraDice} ${dmgType} damage when hit with this weapon.`;
        }

        // Build regular bonus phrase
        let combatBonus = "";
        if (bonusAttack && bonusDmg === 0) {
            combatBonus = `a +${bonusAttack} bonus to attack rolls`;
        } else if (bonusDmg > 0 && bonusAttack === 0) {
            combatBonus = `a +${bonusDmg} bonus to damage rolls`;
        } else if (bonusAttack > 0 && bonusDmg > 0) {
            combatBonus = `a +${bonusAttack} bonus to attack and damage rolls`;
        }

        // Return both separately
        return { slayerBonus, combatBonus };
    };
})();
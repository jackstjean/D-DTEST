(function () {
    window.grantsDisadvantage = page => {
        const skills = {
            acrobatics: "Dexterity",
            animalHandling: "Wisdom",
            arcana: "Intelligence",
            athletics: "Strength",
            deception: "Charisma",
            history: "Intelligence",
            insight: "Wisdom",
            intimidation: "Charisma",
            investigation: "Intelligence",
            medicine: "Wisdom",
            nature: "Intelligence",
            perception: "Wisdom",
            performance: "Charisma",
            persuasion: "Charisma",
            religion: "Intelligence",
            sleightOfHand: "Dexterity",
            stealth: "Dexterity",
            survival: "Wisdom"
        };


        const input = (page.grantsDisadvantage ?? [])
        // formatting each input
        // e.g. "stealth" -> "Dexterity (Stealth)"    
        .map(l => {
                l.toLowerCase();
                if (!(l in skills)) return `⚠️(${l}?)`;
                const skill = skills[l] || "";
                const cap = l[0].toUpperCase() + l.slice(1);
                return `${skill} ([[${cap}]])`
            });
        const shorthand = (page.grantsDisadvantage ?? [])
        .map(s => {
            s.toLowerCase();
            if (!(s in skills)) return `⚠️(${l}?)`;
            const cap = s[0].toUpperCase() + s.slice(1);
            return `[[${cap}]]`;
        })
        .join(",<br>");

        // good grammar pls
        let disadvantageStr = "";
        if (input.length === 0) {
            return "";
        } else if (input.length === 1) {
            disadvantageStr = input[0];
        } else if (input.length === 2) {
            disadvantageStr = input.join(" and ");
        } else {
            const allButLast = input.slice(0, -1).join(", ");
            const last = input[input.length - 1];
            disadvantageStr = `${allButLast}, and ${last}`
        }

        // Verbage can change depending on type of item 
        const actionPhrases = {
            armor: "The wearer",
            weapon: "The wielder"
        }

        const whenPhrase = actionPhrases[page.itemType]
            ? `${actionPhrases[page.itemType]} has [[Disadvantage]] on`
            : `This item gives [[Disadvantage]] on`;

        return {
            allDis: `${whenPhrase} ${disadvantageStr} checks.`,
            sneakDis: shorthand
        }
    }
    window.spellcastingFocus = page => {
        const input = (page.spellcastingFocus ?? []).map(i => {
            const cap = i[0].toUpperCase() + i.slice(1);
            return `[[${cap}]]`
        })
        if (input.length === 0) return "";

        function oxfordJoin(arr) {
            if (arr.length === 0) return "";
            if (arr.length === 1) return arr[0];
            if (arr.length === 2) return arr.join(" or ");
            // 3 or more:
            return `${arr.slice(0, -1).join(", ")}, or ${arr[arr.length - 1]}`;
        }
        
        return `A ${oxfordJoin(input)} can use this item as a [[Spellcasting Focus]].`
    }
})();
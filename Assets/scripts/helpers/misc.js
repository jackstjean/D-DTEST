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

        return `${whenPhrase} ${disadvantageStr} checks.`
    }
})();
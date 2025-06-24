(async () => {
    window.nameHelper = page => {
        const nameInput = page.name ?? "Item";
        let formattedName = nameInput.toUpperCase();
        return formattedName;
    };
    window.imageHelper = page => {
        const imageLink = page.image ?? "";
        let formattedImage = imageLink
            ? `![[${imageLink}|relative static wmed hmed center]]`
            : "";
        return formattedImage
    };
    window.sourceHelper = page => {
        const sourceMap = {
            // decoding the input title shorthands, AKA "keys"
            "xPHB": {
                "title": "Player's Handbook (2024)",
                "file": "Players-Handbook-2024.pdf",
                "offset": -1 // to match the PDF page with the printed page
            }
        };
        const srcInput = page.sources ?? [];
        // Mapping the inputs of the "sources" array (e.g. xPHB69) from the note
        // to format them like `[PDF link w/ icon] Player's Handbook (2024), p.69`
        return srcInput.map(source => {
            // ^(\D+) = group of () one-or-more (n+) non-digits (\D) at the start of string (^)
            // (\d+) = group of () one-or-more (n+) digits (\d) at the end of string ($)
            // m[0] whole string, m[1] = prefix (non-digits), m[2] = suffix (digits)
            const m = source.match(/^(\D+)(\d+)$/);
            if (!m) return source;

            // Desctructuring the match array
            // We want to ignore the whole string (m[0], so the first arg is _)
            // And then set source title, or "key", to = m[1] and pg = m[2]
            let [_, key, pg] = m;
            // Look up the data from the sourceMap at the top
            // And if it's missing use an empty object so that map.offset and map.file don't break
            const map = sourceMap[key] ?? {};

            // Convert the page "string" into an "integer"
            const p = parseInt(pg);
            // Then confirm that its a valid number and add PDF page offset. 
            const num = Number.isNaN(p)
                ? "" // if it isn't a number just leave it blank
                : p + (map.offset ?? 0); // if it is a number, add the offset (or 0 if there isn't one)

            // Get the File Name for the obsidian link
            // If there is no valid link, just use the key
            const fileName = map.file
            // Build the actual link
            const link = `${fileName}#page=${num}`;
            // Build the title. If no valid title, just use the raw key
            const title = map.title ?? key;
            // Now return a markdown link with everything put together
            return `[:luc_bookmark_plus:](${link}) ${title}, p.${pg}`;
        })
            // Join the new formatted source array with line breaks
            .join("\n");
    };
    window.itemBase = page => {
        const itemBaseInput = (page.itemBase ?? "").trim().toLowerCase();
        let itemBase = "";
        if (!itemBaseInput) return "";
        if (itemBaseInput.toLowerCase() !== page.name.toLowerCase()) {
            itemBase = ` (${itemBaseInput})`;
        };
        return itemBase;
    }
    window.itemType = page => {
        const input = page.itemType ?? ""
        const key = window.keyMaps.typeKeys ?? {};
        if (!input) return "";
        if (input in key) {
            const cap = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
            return cap;
        } else {
            return `⚠️ Unknown item type: "**${input}**"`
        }
    };
    window.rarityHelper = page => {
        const input = (page.rarity ?? "").toLowerCase();
        const key = window.keyMaps.rarities ?? {};

        if (!input) return "";

        if (input in key) {
            const cap = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
            return cap;
        } else {
            return `⚠️ Unknown rarity: "**${input}**"`
        }
    };
    window.weightHelper = page => {
        // get inputs
        const rawInput = page.weight ?? "";
        const rawBulk = page.bulk ?? "";

        // make weight an integer
        const w = parseInt(rawInput);
        if (isNaN(w) || w === 0) return "";
        // if we're at or above 2000 lb, convert to tons
        const LB_PER_TON = 2000;
        if (w >= LB_PER_TON) {
            // divide & round to one decimal (e.g. 1.5)
            let t = (w / LB_PER_TON).toFixed(1)
                .replace(/\.0$/, ""); // strip “.0” for whole tons

            // singular vs plural
            const unit = t === "1"
                ? "ton"
                : "tons";
            return `${t} ${unit}`;
        }

        // 3) otherwise stay in lbs, handle plural
        const unit = w === 1
            ? "lb"
            : "lbs";

        if (rawBulk) {
            return `${w} ${unit} (${rawBulk} Bulk)`
        }
        return `${w} ${unit}`
    }
    window.valueHelper = page => {
        // getting the value from D&D 5e (2024)
        const dndValInput = parseFloat(page.value?.dnd ?? "");
        const dnd = isNaN(dndValInput)
            ? ""
            : `:coin_gp: ${dndValInput}`
        // getting the value from Grain Into Gold (or a value inspired by their methods)
        const sourceInput = parseFloat(page.value?.source ?? "");
        // making the source input an integer
        let source = [parseInt(sourceInput)]
        // now we can calculate the values for 
        // price from a local marketplace, from a nearby city, and a distant city
        // local = src*1.5, distant = src*3, exotic = src*6
        let local = +(source * 1.5).toFixed(2);
        let nearby = +(source * 3).toFixed(2);
        let distant = +(source * 6).toFixed(2);

        // function coins (silver) {
        //     return [100, 10, 1, 0.1].map(function(coins) {
        //         return [~~(silver / coins), silver %= coins][0];
        //     });
        // }

        /* 
        * given an amount in silver
        * return an array of how many coins you'd get
        * for each denomination [100, 10, 1, 0.1]
        */
        const denominations = {
            "Platinum": {
                value: 1000,
                icon: ":coin_pp:",
                minTotal: 5000
            },
            "Gold": {
                value: 10,
                icon: ":coin_gp:",
                minTotal: 1000
            },
            "Silver": {
                value: 1,
                icon: ":coin_sp:"
            },
            "Copper": {
                value: 0.1,
                icon: ":coin_cp:",
                maxTotal: 50
            }
        }

        function coins(silver) {
            const original = silver;
            let remaining = silver;
            const result = [];
            const entries = Object.entries(denominations);

            for (const [name, { value, icon, minTotal = 0, maxTotal = Infinity }] of entries) {
                if (original < minTotal || original > maxTotal) continue;
                const count = Math.floor(remaining / value);
                remaining %= value;
                if (count > 0) {
                    result.push(`${icon} ${count}`)
                }
            }
            return result.join(" ");
        }

        // Value range
        const rawCosts = [source, local, nearby, distant];
        const numericCosts = rawCosts
            .map(c => {
                const n = typeof c === "number" // if it's already a number...
                    ? c // keep it
                    : parseFloat(c); // if not, parseFloat will pull out the number 
                return isNaN(n)
                    ? null
                    : n;
            })
            .filter(n => n !== null);

        let range;
        if (numericCosts.length === 0) {
            range = ""; // no costs at all
        } else if (numericCosts.length === 1) {
            range = numericCosts[0].toString();
        } else {
            const low = Math.min(...numericCosts);
            const high = Math.max(...numericCosts);
            range = `${coins(low)} - ${coins(high)}`;
        }


        return {
            dnd: dnd,
            source: coins(source),
            local: coins(local),
            nearby: coins(nearby),
            distant: coins(distant),
            range: range
        };
    }
    window.craftHelper = page => {
        const titleCase = s =>
    s.toLowerCase().replace(/(?:^|\s)\S/g, c => c.toUpperCase());

        const timeInput = parseInt(page.crafting.timeHours ?? "");
        const checks = timeInput / 2
        const dcInput = parseInt(page.crafting.dc ?? "");

        const matInput = (page.crafting.materials ?? []).filter(m => m.name);
        const mats = matInput.map(m => {
            // get units
            const units = m.units;
            // 2+ word titlecase checker. Splits at any spaces and titlecases the index of that new array
            const name = m.name
                .split(" ")
                .map(u => u.charAt(0).toUpperCase() + u.slice(1).toLowerCase() )
                .join(" ");
            return `${units} [[${name}]]`;
        }).join(",<br>");

        const rawTool = (page.crafting.tools ?? "").trim().toLowerCase();

        // 2) Grab your slug→canonical map
        const toolMap = window.keyMaps?.artisanTools ?? {};

        // 3) Try exact match first
        let canon = toolMap[rawTool];

        // 4) If that failed, find the first map-key that starts with the slug
        if (!canon) {
            // Object.entries(toolMap) gives [ [key, value], … ]
            const entry = Object.entries(toolMap)
                .find(([key, value]) => key.startsWith(rawTool));

            // If we found one, use its value (the canonical name)
            if (entry) canon = entry[1];
        }

        // 5) Build your final `tools` output
        let tools = "";
        if (rawTool) {
            if (canon) {
                tools = `[[${titleCase(canon)}]]`;
            } else {
                tools = `⚠️ Unknown tool: "${rawTool}"`;
            }
        }

        return {
            mats: mats,
            time: timeInput,
            checks: checks,
            dc: dcInput,
            tools: tools
        };
    }
})();
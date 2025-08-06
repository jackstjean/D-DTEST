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
    window.descHelper = page => {
        const desc = page.desc ?? "";
        const entryInput = page.entry ?? "";
        const abilities = (page.abilities ?? []).join("\n<br>");

        let entry = "";
        if (entryInput) {
            entry = entryInput
                .split("\n")
                .map(line => line.trim() === ""
                    ? ">"
                    : `> ${line}`)
                .join("\n");
        }

        // I DON'T THINK THIS IS BEING USED
        // ALTHOUGH I KINDA FORGOT
        let jsEntryArray = [];
        const combatBonus = window.weaponBonuses(page);
        const itemBonuses = window.formatItemBonuses(page);
        const disadvantages = window.grantsDisadvantage(page);
        const { baseAC, strReq } = window.acHelper(page);

        if (combatBonus) jsEntryArray.push(combatBonus);
        if (itemBonuses) jsEntryArray.push(itemBonuses);
        if (abilities) jsEntryArray.push(abilities);
        if (disadvantages) jsEntryArray.push(disadvantages);
        if (strReq) jsEntryArray.push(strReq);

        const jsEntry = jsEntryArray
            .map(a => { return `dv.paragraph(${a});` })
            .join("\n");


        return {
            desc,
            abilities,
            entry: entry.replace(/^> ?/, ""),
            jsEntry
        };
    }
    window.sourceHelper = page => {
        const sourceMap = {
            // decoding the input title shorthands, AKA "keys"
            "xPHB": {
                "title": "Player's Handbook (2024)",
                "file": "Players-Handbook-2024.pdf",
                "offset": -1 // to match the PDF page with the printed page
            },
            "xDMG": {
                "title": "Dungeon Master's Guide (2024)",
                "file": "Dungeon-Masters-Guide-2024.pdf",
                "offset": 3
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
    window.itemSlot = page => {
        const slotInput = page?.slot?.type ?? ""
        if (!slotInput) return "";
        const groupInput = page?.slot?.isArmorAttire ?? "";

        const map = window?.keyMaps.inventory ?? {};
        const canon = map[slotInput]
        if (!canon) return `⚠️ Unknown slot: "${slotInput}"`
        const slot = canon.charAt(0).toUpperCase() + canon.slice(1);

        let group = "";
        if (groupInput !== "armor" && groupInput !== "attire") {
            if (groupInput === "") {
                group = "";
            } else {
                group = `⚠️ Unknown group: "${groupInput}"`
            }
        } else {
            group = ` <font size=2>(${groupInput.toUpperCase()})</font>`
        }

        return slot + group
    }
    window.itemBase = page => {
        // Normalize itemBase to an array
        const bases = page.itemBase
            ? (Array.isArray(page.itemBase) ? page.itemBase : [page.itemBase])
            : []

        // Make everything lowercase once
        const nameLower = (page.name ?? "").toLowerCase()

        // 1) Remove any entries identical to page.name
        const filtered = bases.filter(b => b && b.toLowerCase() !== nameLower)

        if (filtered.length > 0) {
            // 2) Title-case & wikilink each remaining entry
            const links = filtered.map(i =>
                `[[${i
                    .split(" ")
                    .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
                    .join(" ")}]]`
            )
            // 3) Only now wrap in parentheses
            return ` (${links.join(", ")})`
        }

        // Fallback to vehicle.type if no itemBase
        if (page?.vehicle?.type) {
            return ` (${page.vehicle.type})`
        }

        // Otherwise nothing
        return ""
    }
    window.itemType = page => {
        const rawInput = page.itemType ?? "";
        if (!rawInput) return "";

        const keyMap = window.keyMaps?.typeKeys ?? {};
        const inputs = Array.isArray(rawInput) ? rawInput : [rawInput];

        const formatted = inputs.map(type => {
            if (!(type in keyMap)) {
                return `⚠️ Unknown item type: "${type}"`;
            }

            if (type === "armor") {
                const typeRaw = page.armorType ?? "";
                switch (typeRaw) {
                    case "l": return "Light Armor";
                    case "m": return "Medium Armor";
                    case "h": return "Heavy Armor";
                    default: return "⚠️ Invalid Armor Type";
                }

            } else if (type === "weapon") {
                const weaponTypes = page.weaponType ?? [];
                const format = weaponTypes.map(w => {
                    const canon = keyMap[`${w.toLowerCase()} weapon`];
                    if (!canon) return `⚠️ Unknown weapon type: "${w}"`;
                    const base = canon.replace(/ Weapon$/i, "");
                    return base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
                });
                return format.concat("Weapon").join(" ");

            } else {
                // Title-case generic types
                return type
                    .split(" ")
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                    .join(" ");
            }
        });

        return formatted.join(", ");
    };

    window.rarityHelper = page => {
        const input = (page.rarity ?? "").toLowerCase();
        if (!input) return "";
        const key = window.keyMaps.rarities ?? {};
        if (input in key) {
            const cap = input
                .split(" ")
                .map(u => u.charAt(0).toUpperCase() + u.slice(1).toLowerCase())
                // join the titlecase array back into a string
                .join(" ");
            return cap;
        } else {
            return `⚠️ Unknown rarity: "${input}"`
        }
    };
    window.weightHelper = page => {
        // get inputs
        const rawInput = page.weight ?? "";
        const rawBulk = page.bulk ?? "";

        // make weight an integer
        const w = parseFloat(rawInput);
        if (isNaN(w) || w === 0) return "";
        // if we're at or above 2000 lb, convert to tons
        const LB_PER_TON = 2000;
        if (w >= LB_PER_TON) {
            // divide & round to one decimal (e.g. 1.5)
            let t = (w / LB_PER_TON)
                .toFixed(1)
                .replace(/\.0$/, ""); // strip “.0” for whole tons

            // singular vs plural
            const unit = t === "1"
                ? "ton"
                : "tons";
            return rawBulk
                ? `${t} ${unit} <font size=2>(${rawBulk} Bulk)</font>`
                : `${t} ${unit}`;
        }

        if (w < 1) {
            // map decimal values to fractions
            const fracMap = {
                0.25: "¼",
                0.50: "½",
                0.75: "¾"
            };
            // find matching key
            const match = Object.keys(fracMap).find(key =>
                Math.abs(w - parseFloat(key)) < Number.EPSILON
            );
            // use the fraction symbol if found, otherwise fall back to decimal
            const frac = match
                ? fracMap[match]
                : `<1`
            // Always use singular "lb" for fractions
            const unit = "lb";
            return rawBulk
                ? `${frac} ${unit} <font size=2>(${rawBulk} Bulk)</font>`
                : `${frac} ${unit}`;
        }

        // 3) otherwise stay in lbs, handle plural
        const unit = w === 1
            ? "lb"
            : "lbs";

        return rawBulk
            ? `${w} ${unit} <font size=2>(${rawBulk} Bulk)</font>`
            : `${w} ${unit}`;
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
        let source = [parseFloat(sourceInput)]
        // now we can calculate the values for 
        // price from a local marketplace, from a nearby city, and a distant city
        // local = src*1.5, distant = src*3, exotic = src*6
        let local = +(source * 1.5).toFixed(2);
        let nearby = +(source * 3).toFixed(2);
        let distant = +(source * 6).toFixed(2);

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

        // this switch for breaking up the price into individual coins vs just silver
        if (page.coinSwitch === true) {
            return {
                dnd: dnd,
                source: source,
                local: local,
                nearby: nearby,
                distant: distant,
                range: range
            };
        } else {
            return {
                dnd: dnd,
                source: coins(source),
                local: coins(local),
                nearby: coins(nearby),
                distant: coins(distant),
                range: range
            };
        }


    }
    window.craftHelper = page => {
        const titleCase = s =>
            s.toLowerCase().replace(/(?:^|\s)\S/g, c => c.toUpperCase());

        const timeInput = parseInt(page.crafting.timeHours ?? "");
        const checks = timeInput / 2
        const dcInput = parseInt(page.crafting.dc ?? "");

        // ←—— REPLACED MATERIALS BLOCK ——→
        const rawMats = page.crafting?.materials ?? [];
        const mats = rawMats
            .map(item => {
                // 1) match "1 ring", "2 scroll of illusory script", etc.
                const match = item.match(/^(\d+)\s+(.+)$/);
                if (!match) return null;
                const [, units, matName] = match;

                // 2) title-case each word
                const name = matName
                    .trim()
                    .split(/\s+/)
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                    .join(" ");

                return `${units} [[${name}]]`;
            })
            .filter(Boolean)          // drop any non-matches
            .join(",<br>");           // comma + line-break list
        // ←———————————— END MATERIALS BLOCK ———————————→

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

        // 5) Build final `tools` output
        let tools = "";
        if (rawTool) {
            if (canon) {
                tools = `[[${titleCase(canon)}]]`;
            } else {
                tools = `⚠️ Unknown tool: "${rawTool}"`;
            }
        }

        return {
            craftMats: mats,
            craftTime: timeInput,
            craftChecks: checks,
            craftDC: dcInput,
            craftTools: tools
        };
    }
    window.enchantHelper = page => {
        const rawMats = page.enchanting?.materials ?? [];
        const timeInput = parseInt(page.enchanting?.timeHours ?? "");
        const checks = timeInput / 2
        const dcInput = parseInt(page.enchanting?.dc ?? "");

        const mats = rawMats
            .map(item => {
                // 1) match "1 ring", "2 scroll of illusory script", etc.
                const match = item.match(/^(\d+)\s+(.+)$/);
                if (!match) return null;           // skip anything that doesn't match
                const [, count, matName] = match;

                // 2) title-case each word in matName
                const name = matName
                    .trim()
                    .split(/\s+/)
                    .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
                    .join(" ");

                return `${count} [[${name}]]`;
            })               // drop any nulls
            .join(",<br>");

        return {
            enchantMats: mats,
            enchantTime: timeInput,
            enchantChecks: checks,
            enchantDC: dcInput
        }

    }
    window.attuneHelper = page => {
        const reqAttune = page.attunement?.reqAttune === "t";
        const attuneTags = page.attunement?.reqTags ?? []

        if (!reqAttune) {
            return ""
        } else if (attuneTags.length === 0) {
            return `(requires [[attunement]])`;
        } else if (attuneTags.length === 1) {
            return `(requires [[attunement]] by a ${attuneTags[0]})`;
        } else if (attuneTags.length === 2) {
            return `(requires [[attunement]] by a ${attuneTags[0]} or ${attuneTags[1]})`;
        } else {
            // three or more
            const allButLast = attuneTags.slice(0, -1).join(", ");
            const last = attuneTags[attuneTags.length - 1];
            return `(requires [[attunement]] by a ${allButLast}, or ${last})`;
        }
    }
    window.lootTables = page => {
        const input = (page.lootTables ?? [])
            .map(l => `[[${l}]]`)
            .join(", ");
        if (!input) {
            return "";
        } else {
            return `**Found On:** ${input}`
        }

        // const str = input.join(", ");

    }
    window.mountHelper = page => {
        const carryInput = page?.mount?.carryCapacity ?? 0;
        const speedInput = page?.mount?.speed ?? 0;

        let carry = "";
        let speed = "";

        // guard/formatting for Carrying Capacity
        if (carryInput >= 0) {
            carry = "";
        } else {
            carry = `${carry} lbs`
        }
        // guard/formatting for Mount Speed
        if (speedInput >= 0) {
            speed = "";
        } else {
            speed = `${speed} ft`;
        }

        return {
            carry,
            mountSpeed: speed
        }
    }
    window.vehicleHelper = page => {
        const vehicle = page?.vehicle ?? {};

        // format each field or empty string
        const speed = vehicle.speed ? `${vehicle.speed} mph` : "";
        const cargo = vehicle.cargoCapacity ? `${vehicle.cargoCapacity} <font size=2>tons of cargo</font>` : "";
        const passengers = vehicle.passengerCapacity ? `${vehicle.passengerCapacity} <font size=2>passengers</font>` : "";
        const crew = vehicle.crew ? `${vehicle.crew} <font size=2>crewmates</font>` : "";
        const ac = vehicle.ac ? `${vehicle.ac}` : "";
        const hp = vehicle.hp ? `${vehicle.hp}` : "";
        const damageThreshold = vehicle.damageThreshold ? `${vehicle.damageThreshold}` : "";

        let cargoArray = [];
        let capacity = "";
        if (crew) cargoArray.push(crew);
        if (passengers) cargoArray.push(passengers);
        if (cargo) cargoArray.push(cargo);
        if (cargoArray.length) {
            capacity = cargoArray.join(`,<br>`)
        }

        const shipInfo = `
**Speed.** A ship sailing against a strong wind moves at half speed. In a dead calm (no wind), waterborne ships can't move under sail and must be rowed. [[keelboat|Keelboats]] and [[rowboat|Rowboats]] are used on lakes and rivers. If going downstream, add the speed of the current (typically 3 miles per hour) to the speed of the vehicle. These vehicles can't be rowed against any significant current, but they can be pulled upstream by draft animals on the shores. A [[rowboat|Rowboat]] can be carried and weighs 100 pounds.
>
**Crew.** A ship larger than a [[Keelboat]] or [[rowboat|Rowboat]] needs a crew of skilled hirelings (see "[[Services]]") to function. The minimum number of skilled hirelings needed to crew a ship depends on the type of ship.
>
**Passengers.** The number of Small and Medium passengers the ship can accommodate using hammocks. A ship outfitted with private accommodations can carry one-fifth as many passengers. A passenger usually pays 18 SP per day for a hammock, but prices can vary from ship to ship. A small private cabin usually costs 5 GP per day.
>
**Damage Threshold.** See the [[rules glossary]].
>
**Ship Repair.** Repairs to a damaged ship can be made while the vessel is berthed. Repairing 1 [[hit points|Hit Point]] of damage requires 1 day and costs 20 GP for materials and labor. If the repairs are made in a location where supplies and skilled labor are abundant, such as a city shipyard, the repair time and cost are halved.`;

        return {
            vehicleSpeed: speed,
            vehicleCargo: cargo,
            vehiclePassengers: passengers,
            vehicleCrew: crew,
            vehicleCapacity: capacity,
            vehicleAC: ac,
            vehicleHP: hp,
            vehicleDamageThreshold: damageThreshold,
            shipInfo
        };
    };
})();
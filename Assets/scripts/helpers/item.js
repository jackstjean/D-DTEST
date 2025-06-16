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
            : "No Image.";
        return formattedImage
    };
    window.sourceHelper = page => {
        const sourceMap = {
            // decoding the input title shorthands, AKA "keys"
            "xPHB": {
                "title": "Player's Handbook (2024)",
                "file": "Players-Handbook-2024.pdf",
                "offset": 1 // to match the PDF page with the printed page
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
            return `[:luc_bookmark_plus:](${link}) ${title}, p.${num}`;
        })
            // Join the new formatted source array with line breaks
            .join("\n");

    };
    window.itemBase = page => {
        const itemBaseInput = (page.itemBase ?? "").trim().toLowerCase();
        let itemBase = "";
        if (itemBaseInput.toLowerCase() !== page.name.toLowerCase()) {
            itemBase = ` (${itemBaseInput})`;
        };
        return itemBase;
    }
    window.itemType = page => {
        const input = page.itemType ?? []
        const key = window.keyMaps.typeKeys ?? {};
        if (input in key) {
            const cap = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
            return cap;
        } else {
            return `⚠️ Unknown item type: "${input}"`
        }
    };
})();
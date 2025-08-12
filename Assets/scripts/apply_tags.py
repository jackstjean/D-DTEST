from pathlib import Path

folder = Path(r"C:\Obsidian Vaults\D&DTEST\items")

for file_path in folder.glob("*.md"):
    lines = file_path.read_text(encoding="utf-8").splitlines()
    new_lines = []
    in_tags = False

    for line in lines:
        # Detect the start of the tags block
        if line.strip() == "tags:":
            new_lines.append(line)
            in_tags = True
            continue

        if in_tags:
            # Append our new tag after 'item/gear' if it's not already present
            if line.strip() == "- item/gear" or line.strip() == "- item/gear":
                new_lines.append(line)
                if "source/xphb" not in [l.strip("- ").strip() for l in lines]:
                    new_lines.append("  - source/xphb")
                in_tags = False  # stop modifying after we add
                continue

        new_lines.append(line)

    file_path.write_text("\n".join(new_lines), encoding="utf-8")

print("Added 'source/xphb' tag to all files in", folder)

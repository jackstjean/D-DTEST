# fix_rules_frontmatter.py
# Usage:
#   py fix_rules_frontmatter.py "C:\Obsidian Vaults\D&DTEST\Mechanics\Rules"

import sys
import re
from pathlib import Path
from typing import Dict, Any, Tuple, List

try:
    import yaml
except ImportError:
    print("PyYAML is required. Install with: py -m pip install pyyaml")
    sys.exit(1)

# --- Config ---
SMALL_WORDS = {
    "a","an","and","as","at","but","by","for","from","in","into","of","on",
    "or","per","so","the","to","via","vs","with","without","over","under",
    "between","among","about","after","before","around","across","upon","within"
}
DESIRED_KEY_ORDER = [
    "obsidianUIMode", "cssclasses", "name", "aliases", "sources", "tags", "entry"
]

# --- YAML helpers to force literal style for 'entry' and clean scalars ---

class LiteralStr(str):
    """Marker type to force literal block style for YAML scalars (entry)."""
    pass

def _literal_representer(dumper: yaml.Dumper, data: LiteralStr):
    # Force literal block scalar (|). We'll switch to "|-" after dumping via regex.
    return dumper.represent_scalar('tag:yaml.org,2002:str', str(data), style='|')

def _none_representer(dumper, _data):
    # Represent None as an empty scalar (so you see `key:` instead of `key: null`)
    return dumper.represent_scalar('tag:yaml.org,2002:null', '')

class LiteralDumper(yaml.SafeDumper):
    pass

# Register representers (order matters: functions must be defined first)
LiteralDumper.add_representer(LiteralStr, _literal_representer)
LiteralDumper.add_representer(type(None), _none_representer)

# Keep PyYAML from line-wrapping long lines
LiteralDumper.width = 10**9
LiteralDumper.default_flow_style = False

def dump_frontmatter(data: Dict[str, Any]) -> str:
    # Normalize values: empty strings / False -> None (so they render blank, not 'null')
    clean: Dict[str, Any] = {}
    for k, v in data.items():
        if v == "" or v is False:
            v = None
        clean[k] = v

    # Optional: make empty lists print as blank keys instead of `[]`
    for key in ("cssclasses", "aliases", "sources", "tags"):
        if key in clean and isinstance(clean[key], list) and len(clean[key]) == 0:
            clean[key] = None

    # Force literal block for entry text
    if "entry" in clean and isinstance(clean["entry"], str):
        clean["entry"] = LiteralStr(clean["entry"])

    dumped = yaml.dump(
        clean,
        Dumper=LiteralDumper,
        sort_keys=False,
        allow_unicode=True,       # keep real Unicode (— “ ” etc.)
        default_flow_style=False
    ).rstrip()

    # Ensure 'entry:' uses '|-' (strip-chomp) instead of just '|'
    dumped = re.sub(r'(?m)^entry:\s*\|\s*\n', 'entry: |-\n', dumped)

    return "---\n" + dumped + "\n---\n"

# --- Title case that skips SMALL_WORDS (except first/last) and keeps hyphen chunks ---
def smart_title(s: str) -> str:
    if not s:
        return s

    def cap_word(w: str, is_first: bool, is_last: bool) -> str:
        # preserve all-caps abbreviations (e.g., "PHB", "DC")
        if len(w) > 1 and w.isupper():
            return w
        base = w.lower()
        if (not is_first and not is_last) and base in SMALL_WORDS:
            return base
        parts = base.split("-")
        parts = [p.capitalize() if p else p for p in parts]
        return "-".join(parts)

    tokens = s.split()
    out = []
    n = len(tokens)
    for i, t in enumerate(tokens):
        out.append(cap_word(t, i == 0, i == n - 1))
    return " ".join(out)

# --- Frontmatter extract/replace ---
FM_RE = re.compile(r'^---\r?\n(.*?)\r?\n---\r?\n?', re.DOTALL)

def extract_frontmatter(text: str) -> Tuple[Dict[str, Any], Tuple[int, int]]:
    m = FM_RE.search(text)
    if not m:
        return {}, (-1, -1)
    fm_text = m.group(1)
    try:
        data = yaml.safe_load(fm_text) or {}
        if not isinstance(data, dict):
            data = {}
    except Exception:
        data = {}
    return data, m.span()

def reorder_keys(original: Dict[str, Any]) -> Dict[str, Any]:
    new = {}
    seen = set()
    for k in DESIRED_KEY_ORDER:
        if k in original:
            new[k] = original[k]
            seen.add(k)
    for k, v in original.items():
        if k not in seen:
            new[k] = v
    return new

def ensure_list(value) -> List[Any]:
    if value is None:
        return []
    if isinstance(value, list):
        return value
    return [value]

def process_yaml_map(data: Dict[str, Any], filename_stem: str) -> Dict[str, Any]:
    out = dict(data)  # shallow copy

    # 1) obsidianUImode -> obsidianUIMode
    if "obsidianUImode" in out:
        if "obsidianUIMode" not in out:
            out["obsidianUIMode"] = out["obsidianUImode"]
        del out["obsidianUImode"]

    # 2) Title-case name (default to filename if empty)
    name_val = out.get("name", "")
    name_str = str(name_val or "").strip()
    if not name_str:
        name_str = filename_stem.replace("-", " ").replace("_", " ")
    out["name"] = smart_title(name_str)

    # 3) Ensure sources includes xPHB
    sources = ensure_list(out.get("sources"))
    norm_sources = []
    has_xphb = False
    for s in sources:
        s_str = str(s).strip()
        if s_str.lower() == "xphb":
            has_xphb = True
            norm_sources.append("xPHB")
        elif s_str:
            norm_sources.append(s_str)
    if not has_xphb:
        norm_sources.append("xPHB")
    out["sources"] = norm_sources

    # 4) Set tags exactly to the two requested
    out["tags"] = ["rule/core", "source/xphb"]

    # Preserve entry text; LiteralStr applied at dump time
    out = reorder_keys(out)
    return out

def process_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    data, span = extract_frontmatter(text)
    if span == (-1, -1):
        return False

    before, after = text[:span[0]], text[span[1]:]
    processed = process_yaml_map(data, path.stem)
    new_fm = dump_frontmatter(processed)
    new_text = before + new_fm + after

    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        return True
    return False

def main():
    if len(sys.argv) < 2:
        print("Usage: py fix_rules_frontmatter.py <folder>")
        sys.exit(2)

    root = Path(sys.argv[1]).expanduser()
    if not root.exists() or not root.is_dir():
        print(f"Folder not found: {root}")
        sys.exit(2)

    changed = 0
    scanned = 0
    for p in sorted(root.rglob("*.md")):
        scanned += 1
        try:
            if process_file(p):
                changed += 1
        except Exception as e:
            print(f"ERROR processing {p}: {e}")

    print(f"Scanned: {scanned} files")
    print(f"Changed: {changed} files")

if __name__ == "__main__":
    main()

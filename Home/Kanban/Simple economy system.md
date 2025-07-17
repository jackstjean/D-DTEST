Here’s a minimal “sandbox” of notes you can spin up to prove the whole pipeline end-to-end:

---

## 1) Item notes

Create two or three representative items, each with a single “base” price and producer list:

```yaml
# File: Items/Longsword.md
---
value:
  base: 100
producers:
  - IronPeakCrag
tradeCategory: weapon
---
```

```yaml
# File: Items/Healing Potion.md
---
value:
  base: 50
producers:
  - AlchemistsGlen
tradeCategory: potion
---
```

```yaml
# File: Items/Iron Ore.md
---
value:
  base: 10
producers:
  - IronPeakCrag
tradeCategory: raw-material
---
```

---

## 2) Settlement notes

Two or three towns, each defining exports, partners, and multipliers:

```yaml
# File: Settlements/IronPeakCrag.md
---
id: IronPeakCrag
exports:
  - weapon
  - raw-material
tradePartners:
  - Riverhaven
multipliers:
  localExport:  0.8   # 20% off base
  importNearby: 1.2   # partners pay +20%
  importDistant:1.5   # others pay +50%
---
```

```yaml
# File: Settlements/Riverhaven.md
---
id: Riverhaven
exports:
  - potion
tradePartners:
  - IronPeakCrag
multipliers:
  localExport:  0.9
  importNearby: 1.1
  importDistant:1.4
---
```

```yaml
# File: Settlements/DistantFreeCity.md
---
id: DistantFreeCity
exports: []
tradePartners: []
multipliers:
  localExport:  1.0
  importNearby: 1.3
  importDistant:1.6
---
```

---

## 3) Shop notes

One shop in each settlement, optionally with its own markup overrides:

```yaml
# File: Shops/IronPeakCrag-Blacksmith.md
---
settlement: IronPeakCrag
shopModifiers:
  import: 1.0
  export: 0.9
inventory:
  - Items/Longsword.md
  - Items/Iron Ore.md
---
```

```yaml
# File: Shops/Riverhaven-GeneralStore.md
---
settlement: Riverhaven
shopModifiers:
  import: 1.05
inventory:
  - Items/Longsword.md
  - Items/Healing Potion.md
---
```

```yaml
# File: Shops/DistantFreeCity-ExoticGoods.md
---
settlement: DistantFreeCity
shopModifiers:
  import: 1.2
inventory:
  - Items/Longsword.md
  - Items/Healing Potion.md
  - Items/Iron Ore.md
---
```

---

## 4) Your test DataviewJS template

On each **Shop** note, render a table or list:

```dataviewjs
// …load your helpers…
const shop = dv.current();
for (let inv of shop.inventory) {
  const item = dv.page(inv);
  const price = window.priceAtShop(item, shop);
  dv.list(`[[${item.name}]] — ${price}`);
}
```

—this should show **different prices** for Longsword in each of the three shops:

- **IronPeakCrag**: 100 × 0.8 × 1.0
    
- **Riverhaven** (partner): 100 × 1.2 × 1.05
    
- **DistantFreeCity**: 100 × 1.5 × 1.2
    

and likewise for your other items.

---

### Why this covers everything

- **Item notes** define only a base price and who makes it.
    
- **Settlements** configure regional supply, partners, and markups.
    
- **Shops** inherit that region’s logic and tweak it per‐merchant.
    
- **One template** drives all the math and renders each shop’s inventory with its unique pricing.
    

That little suite of 3 × 3 notes plus your JS helper is all you need to prove the system—and then you can start adding more complex categories, distance-based fallbacks, scarcity tweaks, etc.
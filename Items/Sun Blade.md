---
obsidianUIMode: preview
cssclasses:
  - itemcard


name: Sun Blade
image: 
sources: 
  - xDMG312
aliases: []
tags: []
lootTables: 
  - Armaments (Rare)

itemType: weapon
itemBase: longsword
armorType:  #light = l, medium = m, heavy = h
weaponType: 
  - martial
  - melee
weaponProperties: 
  - finesse
  - versatile

rarity: rare
attunement:
  reqAttune: t
  reqTags: []

weight: 3
bulk: 2
value:
  dnd: 
  source: 


# Stat Bonuses
weaponAttack: 2
weaponDamage: 2
spellAttack:
spellSaveDC:
armorClass: 
savingThrows: 
  str:
  dex:
  con:
  int:
  wis:
  cha:
  # misc is for saving throws not related to abilities
  # formatting is [bonus]; [saving throw type]. "a" is"advantage" and 1,2,3 are for +1,+2,+3 etc. 
  # e.g. "- a; breath weapons of Dragons"
  misc: []

abilityMod:
  str: 
  dex: 
  con: 
  int: 
  wis: 
  cha: 

# skillMod:
#   acrobatics:
#   animalHandling:
#   arcana:
#   athletics:
#   deception:
#   history:
#   insight:
#   intimidation:
#   investigation:
#   medicine:
#   nature:
#   perception:
#   performance:
#   persuasion:
#   religion:
#   sleightOfHand:
#   stealth:
#   survival:


# Combat Properties
weaponRange:
  min: 
  max: 
mastery: sap
damage:
  dmg1: 1d8
  dmg1Type: radiant 
slayer:
  targetTypes:
    - undead
  extraDice: 1d8
  damageType: radiant

# Defense Properties
baseAC: 
maxDexMod: 
strReq: 
resist: []
immunity: []
conditionImmunity: []


# Crafting
crafting:
  tools: 
  materials:
  timeHours: 
  dc: 
enchanting:
  materials: 
    - 1 sword hilt worth 200 silver
    - 1 scroll of vorpal weapon
    - 1 scroll of magic weapon
    - 1 scroll of daylight
    - 3 rare divine essence
    - 2 uncommon arcane essence
    - 2 uncommon primal essence
  timeHours: 24
  dc: 17


# Misc Properties
grantsDisadvantage: []
spellcastingFocus: []


# Description and Abilities (Entry)
desc: |-
  This item appears to be a sword hilt.
abilities: 
  - "**Blade of Radiance.** While grasping the hilt, you can take a [[Bonus Action]] to cause a blade of pure radiance to spring into existence or make the blade disappear. While the blade exists, this magic weapon functions as a [[Longsword]] with [[Finesse]]. If you are proficient with [[Longswords]] or [[Shortswords]], you are proficient with the Sun Blade."
  - "**Sunlight.** The sword's luminous blade emits [[light|Bright Light]] in a 15-foot radius and [[light|Dim Light]] for an additional 15 feet. The light is sunlight. While the blade persists, you can take a [[Magic action]] to expand or reduce its radius of [[light|Bright Light]] and [[light|Dim Light]] by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each"
entry: |-
  ***Blade of Radiance.*** While grasping the hilt, you can take a [[Bonus Action]] to cause a blade of pure radiance to spring into existence or make the blade disappear. While the blade exists, this magic weapon functions as a [[Longsword]] with [[Finesse]]. If you are proficient with [[longsword|Longswords]] or [[shortsword|Shortswords]], you are proficient with the Sun Blade.

  You gain a +2 bonus to attack rolls and damage rolls made with this weapon, which deals Radiant damage instead of Slashing damage. When you hit an Undead with it, that target takes an extra 1d8 Radiant damage.

  ***Sunlight.*** The sword's luminous blade emits [[light|Bright Light]] in a 15-foot radius and [[light|Dim Light]] for an additional 15 feet. The light is sunlight. While the blade persists, you can take a [[light|Magic action]] to expand or reduce its radius of [[light|Bright Light]] and [[light|Dim Light]] by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each.
---

```meta-bind-embed

[[dv Item]]

```
---
obsidianUIMode: preview
cssclasses:
  - itemcard


name: Sword of Kas
image: 
sources: 
  - xDMG313
aliases: []
tags: []
lootTables: []

slot:
  type: scabbard
  isArmorAttire: 
itemType: weapon
itemBase: longsword
armorType:  #light = l, medium = m, heavy = h
weaponType:  # martial, ranged, melee, etc.
  - martial
  - melee
  - magic
weaponProperties:  # versatile, finesse, etc.
  - versatile

rarity: artifact
attunement:
  reqAttune: t
  reqTags: []

weight: 3
bulk: 2
value:
  dnd: 
  source: 
coinSwitch: false

# Combat Properties
weaponRange:
  min: 
  max: 
mastery: sap
damage:
  dmg1: 1d8
  dmg1Type: slashing 
slayer:
  targetTypes: 
    - undead
  extraDice: 2d10
  damageType: slashing
critLowerTo: 19

# Defense Properties
baseAC: 
maxDexMod: 
strReq: 
resist:
  - necrotic
immunity: []
conditionImmunity: []


# Stat Bonuses
weaponAttack: 3
weaponDamage: 3
weaponBonusTags:
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
  # formatting is [bonus]; [saving throw type]. "a" is "advantage" and 1,2,3 are for +1,+2,+3 etc. 
  # e.g. "- a; breath weapons of Dragons"
  misc: []

abilityMod: # needs quotes. Ex. "=19", "+2", "-1", etc
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



# Charges/Usage
charges:
  totalAmount: 
  rechargeAmount: 


# Crafting
crafting:
  tools: 
  materials:
  timeHours: 
  dc: 
enchanting:
  materials: []
  timeHours: 
  dc: 


# Mounts and Vehicles
mount:
  carryCapacity:
  speed:
vehicle:
  type: 
  speed:
  cargoCapacity: 
  passengerCapacity: 
  crew: 
  ac: 
  hp: 
  damageThreshold: 


# Speed Modifiers
modifySpeed:
  walk:
  climb:
  swim:
  fly:
  burrow:


# Misc Properties
spellcastingFocus: []
grantsAdvantage: []
grantsDisadvantage: []
grantsProficiency: []
randomProperties:
  - 1 minor beneficial
  - 1 major beneficial
  - 1 minor detrimental
  - 1 major detrimental



# Description and Abilities (Entry)
desc: |-
  Kas was a powerful warrior who served [[Vecna]] and whose loyalty was rewarded with this sword. As Kas's power grew, so did his hubris. The sword urged Kas to destroy [[Vecna]] and usurp his throne. Legend says [[Vecna]]'s destruction came at Kas's hand, but [[Vecna]] also wrought his rebellious lieutenant's doom, leaving only Kas's sword behind.
abilities: []
entry: |
  **Random Properties.** The sword has the following random properties:

    - 1 minor beneficial property
    - 1 major beneficial property
    - 1 minor detrimental property
    - 1 major detrimental property

  **Spells.** While the sword is on your person, you can cast the following spells (save DC 18) from it:

    - Call Lightning
    - Divine Word
    - Finger of Death

  Once you use the sword to cast a spell, you can't cast that spell again from it until the next dawn.

  **Spirit of Kas.** While the sword is on your person, you gain the following benefits:

  **Battle Hunger.** You add 1d10 to your Initiative rolls.

  **Blade of Defense.** When you take an action to attack with the sword, you can transfer some or all of its attack bonus to your Armor Class instead. The adjusted bonuses remain in effect until the start of your next turn.

  **Sentience.** The Sword of Kas is a sentient Chaotic Evil weapon with an Intelligence of 15, a Wisdom of 13, and a Charisma of 16. It has hearing and Darkvision out to 120 feet.

  The weapon communicates telepathically with its wielder and speaks Common.

  **Personality.** The sword's purpose is to bring ruin to Vecna. Killing Vecna's worshipers, destroying the lich's works, and foiling his machinations all help to fulfill this goal.

  The Sword of Kas also seeks to destroy anyone corrupted by the Eye and Hand of Vecna.

  **Destroying the Sword.** A creature attuned to both the Eye of Vecna and the Hand of Vecna can use the Wish property of those combined Artifacts to unmake the Sword of Kas, provided the sword is within 30 feet of the spell's caster. Upon casting Wish, the creature makes a DC 18 Charisma saving throw. On a failed save, nothing happens, and the Wish spell is wasted. On a successful save, the Sword of Kas is destroyed.
---

```meta-bind-embed

[[dv Item]]

```
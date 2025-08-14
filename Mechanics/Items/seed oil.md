---
obsidianUIMode: preview
cssclasses:
  - itemcard


name: Seed Oil
image: 
sources: 
  - xPHB227
aliases: 
  - "hemp seed oil"
  - "linseed oil"
  - "oil"
tags:
  - item/gear
  - source/xphb
lootTables: []

itemType: adventuring gear
itemBase: oil
slot:
  type: 
  isArmorAttire: 

armorType:  
# ^light = l, medium = m, heavy = h
weaponType:
# ^martial, ranged, melee, etc.
weaponProperties:  []
# ^versatile, finesse, etc.  

rarity: 
attunement:
  reqAttune: 
  reqTags: []

weight: 1
bulk: 1
value:
  dnd: 0.1
  source: 25
coinSwitch: 

# Combat Properties
weaponRange:
  min: 
  max: 
mastery: 
damage:
  dmg1: 
  dmg1Type:  
slayer:
  targetTypes: []
  extraDice: 
  damageType: 
critLowerTo: 

# Defense Properties
baseAC: 
maxDexMod: 
strReq: 
resist: []
immunity: []
conditionImmunity: []


# Stat Bonuses
weaponAttack: 
weaponDamage: 
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

skillMod:
  acrobatics:
  animalHandling:
  arcana:
  athletics:
  deception:
  history:
  insight:
  intimidation:
  investigation:
  medicine:
  nature:
  perception:
  performance:
  persuasion:
  religion:
  sleightOfHand:
  stealth:
  survival:



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
spellScrollLevel: []
grantsAdvantage: []
grantsDisadvantage: []
grantsProficiency: []
grantsExpertise: []
userRestrictions: []



# Description and Abilities (Entry)
desc: |-
  A clear glass jug holding a pint of premium seed oil pressed from hemp and flax.
abilities: []
entry: |-
  Seed Oil for 8 hours in a lamp or lantern—2 hours longer than [[oil|standard oil]]—and grants bright illumination to 20 ft (dim light for an additional 30 ft) while emitting no smoke or odor.

  You can douse a creature, object, or space with Oil or use it as fuel, as detailed below.

  **Dousing a Creature or an Object.** When you take the [[Attack]] action, you can replace one of your attacks with throwing an Oil flask. Target one creature of object within 20 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 + your Dexterity modifier and [[Proficiency Bonus]]) or be covered in oil. If the target takes Fire damage before the oil dries (after 1 minute), the target takes an extra 5 Fire damage from burning oil. 

  **Dousing a Space.** You can take the [[Utilize]] action to pour an Oil flask on level ground to cover a 5-foot-square area within 5 feet of yourself. If lit, the oil burns until the end of the turn 2 rounds from when the oil was list (or 12 seconds) and deals 5 Fire damage to any creature that enters the area or ends its turn there. A creature can take this damage only once per turn.

  **Fuel.** Oil serves as fuel for Lamps and Lanterns. Once lit, a flask of Hemp Seed Oil burns for 8 hours in a Lamp or Lantern. That duration doesn't need to be consecutive; you can extinguish the burning Oil (as a [[Utilize]] action) and rekindle it again until it has burned for a total of 8 hours. 
---

```meta-bind-embed

[[dv Item]]

```
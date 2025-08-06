---
obsidianUIMode: preview
cssclasses:
  - itemcard


name: Healer's Kit
image: 
sources: 
  - xPHB225
aliases: []
tags: 
  - kit
lootTables: []

itemType: adventuring gear
itemBase: []
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

weight: 3
bulk: 1
value:
  dnd: 5
  source: 35
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
  This kit is a leather pouch containing bandages, salves, and splints.
abilities: []
entry: |-
  A Healer's Kit has ten uses. As a [[Utilize]] action, you can expend one of its uses to stabilize an [[Unconscious]] creature that has 0 [[Hit Points]] without needing to make a Wisdom (Medicine) check.
---

```meta-bind-embed

[[dv Item]]

```
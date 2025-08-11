---
obsidianUIMode: preview
cssclasses:
  - itemcard


name: Net
image: 
sources: 
  - xPHB227
aliases: []
tags:
  - item/gear
  - source/xphb
lootTables: []

itemType: adventuring gear
itemBase: net
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
bulk: 2
value:
  dnd: 1
  source: 40
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
  
abilities: []
entry: |-
  When you take the Attack action, you can replace one of your attacks with throwing a Net. Target a creature you can see within 15 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 + your Dexterity modifier and [[Proficiency Bonus]]) or have the [[Restrained]] condition until is escapes. The target succeeds automatically if it is Huge or larger.

  To escape, the target or a creature within 5 feet of it must take an action to make a DC 10 Strength (Athletics) check, freeing the [[Restrained]] creature on a success. Destroying the Net (AC 10; 5 HP; [[Immunity]] to Bludgeoning, Poison, and Psychic damage) also frees the targetm ending the effect.
---

```meta-bind-embed

[[dv Item]]

```
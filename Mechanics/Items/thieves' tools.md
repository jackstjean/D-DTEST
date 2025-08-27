---
obsidianUIMode: preview
cssclasses:
  - itemcard


name: Thieves' Tools
image: 
sources: 
  - xPHB221
  - CEM155
aliases: []
tags: 
  - item/tool/kit
  - source/xphb
  - source/cem
lootTables: []

itemType: tool
itemBase: 
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
  dnd: 25
  source: 25
legality: illegal
coinSwitch: 

# Combat Properties
ammo:
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
poisonType: 


# Description and Abilities (Entry)
desc: |-
  A complex set of picks and tools used to disable locks and traps, organized in a roll-up leather satchel. These tools resemble a highly-specialized segment of tinker's tools and can be disguised as such.
abilities: []
entry: |-
  **Ability:** Dexterity

  **Utilize:** Pick a [[steel lock|lock]] (DC 15), or disarm a trap (DC 15)

  Thieves tools are primarily employed to unlock locks or disarm traps, but additional uses are possible. Use thieves' tools to disarm traps or open locks, rolling against variable difficulties (DC 5–30).

  These tools let you create an improvised trap using parts you have on hand. The result of your Dexterity check using thieves' tools sets the DC to discover or disable the trap. An improvised trap deals damage appropriate to the materials used to create it, like an improvised weapon. It may also (or alternately) create a sound designed to wake nearby sleepers. Additives like poisons, ball bearings, or bells can add better functionality or warning effects to these makeshift traps.

  You can also reset a disabled trap if your check meets the original DC to disable it. Reset traps use their original DCs to discover or disable, along with their original damage (unless a vital component is missing, like poison for the spikes).
---

```meta-bind-embed

[[dv Item]]

```
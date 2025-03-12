"use strict";

/*===================================
  Predefined Foe Templates and Databases
===================================*/

// Featured Foe Templates with Weapons and Schticks
const featuredTemplates = {
  "enforcer": {
    attack: 13,
    defense: 13,
    toughness: 5,
    speed: 7,
    weapons: [
      { name: "Thompson Center Arms Contender", damage: "12/3/7" },
      { name: "CZ 75B", damage: "10/1/3" }
    ],
    schticks: [
      "Headshot: After a successful attack, foe may decide that hero takes –2 penalty to skill checks until beginning of subsequent fight. Usable once per fight.",
      "Pedal to the Metal [Driving]: When driving as the pursuer in a chase, gain +2 Driving if one or more PC drivers have fewer Chase Points.",
      "Ram-Alama-Bam [Driving]: When driving, if foe rams a vehicle, gains +2 Frame. +4 Damage Value when foe hits a pedestrian."
    ]
  },
  "hitman": {
    attack: 15,
    defense: 12,
    toughness: 5,
    speed: 8,
    weapons: [
      { name: "SVD Dragunov", damage: "13/5/3" },
      { name: "Beretta 92 Centurion", damage: "10/2/3" },
      { name: "Heckler & Koch MP5 K", damage: "10/3/1" }
    ],
    schticks: []
  },
  "securityHoncho": {
    attack: 13,
    defense: 14,
    toughness: 5,
    speed: 6,
    weapons: [
      { name: "Colt 1911A", damage: "10/2/4" },
      { name: "Heckler & Koch MP5 K", damage: "10/3/1" },
      { name: "Remington 870 Police", damage: "13/5/4" }
    ],
    schticks: []
  },
  "sinisterBodyguard": {
    attack: 13,
    defense: 13,
    toughness: 5,
    speed: 6,
    weapons: [
      { name: "Browning Hi-Power", damage: "10/2/3" }
    ],
    schticks: [
      "Be the Shield: Spend 1 shot to lower bodyguard’s Defense by 2, increasing ally’s Defense by 2, until bodyguard goes down.",
      "Shibuya Slide [Driving]: When driving as the evader in a chase, gain +2 Driving if one or more PC drivers have fewer Chase Points."
    ]
  },
  "badBusinessman": {
    attack: 13,
    defense: 13,
    toughness: 5,
    speed: 6,
    weapons: [
      { name: "AMT Automag V", damage: "12/3/5" },
      { name: "Beretta M12", damage: "10/5/6" },
      { name: "Benelli 90 M3", damage: "13/5/4" }
    ],
    schticks: []
  },
  "giangHuWarrior": {
    attack: 14,
    defense: 13,
    toughness: 5,
    speed: 7,
    weapons: [
      { name: "Sword", damage: "10" }
    ],
    schticks: []
  },
  "martialArtist": {
    attack: 13,
    defense: 13,
    toughness: 6,
    speed: 7,
    weapons: [
      { name: "Unarmed strike", damage: "10" }
    ],
    schticks: []
  },
  "officer": {
    attack: 13,
    defense: 13,
    toughness: 5,
    speed: 6,
    weapons: [
      { name: "Norinco Tokarev", damage: "10/2/4" },
      { name: "AK-47", damage: "13/5/1" }
    ],
    schticks: []
  },
  "insurgent": {
    attack: 14,
    defense: 13,
    toughness: 5,
    speed: 8,
    weapons: [
      { name: "Machete/indigenous short sword", damage: "10" },
      { name: "AK-47", damage: "13/5/1" },
      { name: "Lee-Enfield bolt-action rifle", damage: "12/5/4" }
    ],
    schticks: []
  },
  "wheelman": {
    attack: 13,
    defense: 13,
    toughness: 5,
    speed: 7,
    weapons: [
      { name: "Tire iron", damage: "10" }
    ],
    schticks: []
  },
  "sorcerousVassal": {
    attack: 13,
    defense: 13,
    toughness: 5,
    speed: 7,
    weapons: [
      { name: "Blast", damage: "10" }
    ],
    schticks: []
  },
  "tenThousandMan": {
    attack: 13,
    defense: 13,
    toughness: 6,
    speed: 6,
    weapons: [
      { name: "Intratec Tec-22", damage: "8/2/1" },
      { name: "Buzzsaw Hand", damage: "11" }
    ],
    schticks: []
  },
  "cyberApe": {
    attack: 14,
    defense: 12,
    toughness: 7,
    speed: 7,
    weapons: [
      { name: "Chest-mounted machine gun", damage: "11/1/1" },
      { name: "Bite", damage: "11" }
    ],
    schticks: []
  },
  "monster": {
    attack: 14,
    defense: 13,
    toughness: 5,
    speed: 7,
    weapons: [
      { name: "Claw, fang, horn, arm spike, etc.", damage: "11" }
    ],
    schticks: []
  },
  "gladiator": {
    attack: 13,
    defense: 13,
    toughness: 6,
    speed: 8,
    weapons: [
      { name: "Unarmed", damage: "9" },
      { name: "Chain", damage: "11" },
      { name: "Sword", damage: "11" }
    ],
    schticks: []
  },
  "mutant": {
    attack: 13,
    defense: 13,
    toughness: 6,
    speed: 7,
    weapons: [
      { name: "Force blast/natural weapon/super-punch", damage: "11" }
    ],
    schticks: []
  },
  "wastelander": {
    attack: 13,
    defense: 13,
    toughness: 6,
    speed: 7,
    weapons: [
      { name: "Unidentifiable shotgun", damage: "13/5/4" },
      { name: "Unidentifiable revolver", damage: "11/3/5" }
    ],
    schticks: []
  },
  "sinisterScientist": {
    attack: 14,
    defense: 13,
    toughness: 5,
    speed: 7,
    weapons: [
      { name: "Heckler & Koch P7", damage: "10/2/4" }
    ],
    schticks: []
  },
  "keyJiangshi": {
    attack: 15,
    defense: 13,
    toughness: 5,
    speed: 7,
    weapons: [
      { name: "Claw", damage: "11" },
      { name: "Bite", damage: "8" }
    ],
    schticks: [
      "Contagion: After a successful Bite, the victim makes a Defense Check. On failure, the victim takes 1 Impairment until the end of the fight."
    ]
  },
  "keySnakePerson": {
    attack: 14,
    defense: 12,
    toughness: 5,
    speed: 8,
    weapons: [
      { name: "Scimitar", damage: "10" }
    ],
    schticks: []
  },
  "niceGuyBadAss": {
    attack: 16,
    defense: 17,
    toughness: 5,
    speed: 9,
    weapons: [
      { name: "Unarmed mastery", damage: "16" }
    ],
    schticks: []
  }
};

// Mook Templates – fixed stats; template only supplies a damage bonus.
const mookTemplates = {
  "handToHand8": { templateDamage: 8 },
  "handToHand9": { templateDamage: 9 },
  "handToHand10": { templateDamage: 10 },
  "magic9": { templateDamage: 9 },
  "ranged9": { templateDamage: 9 },
  "ranged10": { templateDamage: 10 },
  "ranged13": { templateDamage: 13 },
  "mixed10H2H7R": { templateDamage: 10 },
  "mixed9H2H10R": { templateDamage: 9 },
  "mixed10H2H8R": { templateDamage: 10 }
};

// Weapons Database – only the name and damage (only the first number is used)
const weaponDatabase = [
  { name: "Bow and Arrow", damage: "7/5/–" },
  { name: "Black powder pistol", damage: "7/3/6" },
  { name: "Crossbow", damage: "7/4/6" },
  { name: "Musket", damage: "8/5/6" },
  { name: "American Derringer Mini-Cop", damage: "11/1/6" },
  { name: "AMT Automag v", damage: "12/3/5" },
  { name: "Auto-ordnance pit Bull", damage: "10/1/4" },
  { name: "Beretta 92FS Centurion", damage: "10/2/3" },
  { name: "Beretta Model 21 Bobcat", damage: "8/1/4" },
  { name: "Beretta Model 950BS Jet Fire", damage: "8/1/4" },
  { name: "Beretta M9", damage: "10/2/3" },
  { name: "Browning Hi-power", damage: "10/2/3" },
  { name: "Colt Delta Elite MKIv Series 80", damage: "11/2/4" },
  { name: "Colt 380 Gov't pocketlite", damage: "8/1/4" },
  { name: "Colt 1911A", damage: "10/2/4" },
  { name: "CZ 75B", damage: "10/1/3" },
  { name: "Desert Eagle .357 Magnum", damage: "11/3/3" },
  { name: "Desert Eagle .50AE", damage: "12/3/4" },
  { name: "E.T. 'Series one Laseraim'", damage: "11/3/3" },
  { name: "Glock 17", damage: "10/1/3" },
  { name: "Glock 18", damage: "10/1/3" },
  { name: "Glock 18 Variant", damage: "10/2/1" },
  { name: "Grendel p-12", damage: "9/1/3" },
  { name: "Grendel p-30", damage: "8/1/1" },
  { name: "Heckler & Koch p7", damage: "10/2/4" },
  { name: "Heckler & Koch HK45C", damage: "10/2/3" },
  { name: "Kahr K9", damage: "10/1/4" },
  { name: "Intratec Tec-9", damage: "10/3/1" },
  { name: "Intratec Tec-22", damage: "8/2/1" },
  { name: "Kimber Solo Carry", damage: "10/1/6" },
  { name: "Llama Large Frame", damage: "10/2/4" },
  { name: "Makarov", damage: "10/2/4" },
  { name: "Norinco Type M1911", damage: "10/3/4" },
  { name: "Norinco Tokarev", damage: "10/2/4" },
  { name: "ruger p89", damage: "10/2/3" },
  { name: "Sig-Sauer p-220", damage: "10/2/4" },
  { name: "Smith & Wesson 2213 Sportsman", damage: "8/1/4" },
  { name: "Smith & Wesson 3566", damage: "11/3/3" },
  { name: "Smith & Wesson Sigma", damage: "10/1/3" },
  { name: "Walther p-5 Compact", damage: "10/1/4" },
  { name: "Walther ppK", damage: "9/1/5" },
  { name: "Chiappa rhino", damage: "12/3/5" },
  { name: "Colt Detective Special", damage: "9/1/5" },
  { name: "Colt King Cobra", damage: "11/3/5" },
  { name: "rossi Model 515", damage: "8/2/4" },
  { name: "rossi Model 851", damage: "9/2/5" },
  { name: "S&W Model 19 Combat Magnum", damage: "11/2/5" },
  { name: "Smith & Wesson Model 500", damage: "12/3/5" },
  { name: "Taurus Model 85", damage: "9/2/5" },
  { name: "Thompson Center Arms Contender", damage: "12/3/6" },
  { name: "Beretta M12", damage: "10/5/6" },
  { name: "FN p90", damage: "13/5/6" },
  { name: "Colt M6351", damage: "10/5/1" },
  { name: "Heckler & Koch Mp5", damage: "10/5/1" },
  { name: "Heckler & Koch Mp5 K", damage: "10/3/1" },
  { name: "Heckler & Koch Mp5 police", damage: "11/5/1" },
  { name: "Heckler & Koch Mp7", damage: "12/5/1" },
  { name: "Heckler & Koch uMp", damage: "11/5/1" },
  { name: "Mp40", damage: "10/5/1" },
  { name: "M3", damage: "10/5/1" },
  { name: "Mini uZI", damage: "10/3/1" },
  { name: "ruger Mp9", damage: "10/3/1" },
  { name: "TDI vector", damage: "11/5/2" },
  { name: "Thompson M1A1", damage: "10/5/1" },
  { name: "uZI", damage: "10/4/1" },
  { name: "Amsel Striker", damage: "13/4/3" },
  { name: "Benelli 121", damage: "13/5/4" },
  { name: "Benelli 90 M3", damage: "13/5/4" },
  { name: "Beretta 1201 riot", damage: "13/5/5" },
  { name: "Bernadelli", damage: "13/5/3" },
  { name: "Franchi SpAS-12", damage: "13/5/4" },
  { name: "Mossberg Special purpose", damage: "13/5/4" },
  { name: "Remington 870 police", damage: "13/5/4" },
  { name: "Ruger red Label", damage: "10/5/6" },
  { name: "Winchester Model 1300 Marine", damage: "13/5/4" },
  { name: "AK-47", damage: "13/5/1" },
  { name: "AK-74", damage: "13/5/1" },
  { name: "K2", damage: "13/4/1" },
  { name: "FN F2000", damage: "13/5/1" },
  { name: "M16", damage: "13/5/1" },
  { name: "M14", damage: "13/5/2" },
  { name: "SvD Dragunov", damage: "13/5/3" },
  { name: "Tavor TAr-21", damage: "13/5/1" },
  { name: "Winchester Model 70", damage: "12/5/5" }
];

// Schticks Database – each entry is a string; only the title (text before the first colon) is bolded.
const schtickDatabase = [
  "Ablative Lackey: If at least one mook is up, as an interrupt after the foe takes Wound Points, the foe takes 0 Wound Points and 1 mook goes down.",
  "Anti-Mystical: +1 Defense vs. Creature Powers and Sorcery attacks.",
  "Anti-Tech: +1 Defense vs. Guns, Mutant, and Scroungetech attacks.",
  "Back to the Wall: If the foe is attacked by more than one character in any sequence, the shot cost of a standard attack drops to 2 until end of sequence.",
  "Bark of the Underdog: +2 Toughness when more than half the mooks on the foe’s side have been put down.",
  "Bone Fissure (Sorcerer, Supernatural Creature): Spend 1 shot; if the foe is still active at the start of the next keyframe, target hero takes 7 Wound Points at the start of their next fight.",
  "Broken Trigram (Sorcerer): Spend 1 shot; if the foe is still active at the start of the next keyframe, target hero suffers a financial setback in a later scene.",
  "Clear Aim: +3 Attack vs. characters whose current Defense exceeds their base Defense.",
  "Contagion (Supernatural Creature): On a successful Bite attack, target hero makes a Defense Check. On failure, the victim takes 1 Impairment until the end of the fight and requires a storyline cure.",
  "Copy Cat: After missing a Dodging hero, the foe gains +2 Defense until next keyframe.",
  "Cursed Weapon (Sorcerer, Supernatural Creature): When a hero misses a weapon attack, subsequent attacks with that weapon take a –2 penalty and cost +1 shot.",
  "Cyclical Flow (Martial Artist): Damage equals current shot number +5.",
  "Defensive Mastery (Martial Artist): When the foe takes more than 10 Wound Points from a weapon-wielding hero, the foe may spend 1 shot to Disarm the hero.",
  "Delayed Death Strike (Martial Artist): On a successful unarmed strike, target hero starts their next fight with 1 Mark of Death.",
  "Disarm: The foe’s first successful hit against a hero each fight disarms that hero.",
  "Disfiguring Strike: On an attack with an Outcome of 4 or more, the target hero suffers a gruesome (if temporary) injury that leads to a complication.",
  "Disrupt Meridian (Martial Artist): Spend 6 shots as an interrupt after a successful attack. Roll a die: Even result, damage doubles. Odd result, hero takes 0 damage.",
  "Domination (Sorcerer, Supernatural Creature, Scroungetech): The foe spends 1 shot and forces a hero to make a Difficulty 10 Will Check. On failure, the foe chooses their next attack target.",
  "Don't Turn Your Back: +2 Attack if the foe has not been attacked since its last attack.",
  "Dread Resurrection (Sorcerer): Spend 1 shot; if the foe is still active at start of next keyframe, an enemy of the target will return from the dead in a later scene.",
  "Energy Drain (Mutant, Supernatural Creature, Scroungetech): +2 Attack if any hero spent a Fortune point since foe’s previous attack.",
  "Explosive Vest: When the foe goes down, all nearby heroes take a Smackdown of 12.",
  "Flying Guillotine (Martial Artist): On a successful Martial Arts ranged hit, note damage based on a Damage Value of 20. If not removed within 3 shots, hero suffers that damage.",
  "Furious Wrath: If the foe’s last attack missed, its current one gains +1 Attack and +3 Damage.",
  "Garrotte of Destiny (Sorcerer, Supernatural Creature): At the beginning of each sequence, all heroes lose 1 Fortune while this foe is active.",
  "Headshot: After a successful attack, the foe may decide that a hero takes –2 penalty to skill checks until beginning of a subsequent fight.",
  "Heal Steal (Sorcerer): When a hero uses a healing effect, the foe spends 1 shot to cancel the effect if it succeeds on a Sorcery check against the hero’s Defense.",
  "Helix Shredder (Scroungetech): On a successful attack, the target takes –1 penalty to Up Checks until end of fight.",
  "Hot Metal (Sorcerer, Supernatural Creature, Mutant): On a successful hit, a hero carrying a weapon must drop that weapon or suffer a –2 attack penalty until next keyframe.",
  "Implant Suggestion (Sorcerer, Supernatural Creature, Scroungetech): Spend 1 shot; if the foe is still active at the start of the next keyframe, target hero takes an action in favor of the foe’s faction in a later scene.",
  "Inspire Loyalty: When this foe goes down, all active Featured Foes make an interrupt attack at a shot cost of 0.",
  "Kneecapper: When the foe’s close attack hits with an Outcome of 3 or more, the target loses 3 Speed until end of fight.",
  "Last Rally: As an interrupt after taking 35+ Wound Points, the foe makes an attack at +2 Attack and +6 Damage.",
  "Nuh-uh: As an interrupt when a hero regains any Fortune, spend 3 shots to attack that hero.",
  "Offended Honor: +1 Damage for each hero after the first that has attacked it during the current fight.",
  "Quantum Bastard (Scroungetech): While the foe is up, all heroes take 5 Wound Points each time they roll boxcars.",
  "Teleport: The foe can instantly move from ranged to close combat for an attack, then back to ranged distance.",
  "Toxic Dart: When downed, the foe makes an attack against any hero. If successful, 10 minutes after the fight ends, the hero must make a Constitution Check or take 15 Wound Points.",
  "Turnabout: While the foe is up, this and all other foes lose 5 Wound Points on every hero’s successful Up Check.",
  "Fender Blender: If a foe is hit as a pedestrian during a chase, the foe takes no Wound Points. The Wound Points the foe would have taken are added to the Driver’s Chase Point total as a ram or sideswipe.",
  "Inspire Fanaticism: When a weapon-wielding hero announces an attack while at least 1 mook is still up, the foe spends 1 shot as an interrupt. One mook goes down. Roll a die: Odd result, the attack is nullified, and the hero is Disarmed.",
  "Leveling Strike: After a successful attack, the target hero is at –1 Attack vs. mooks while the foe remains active. This penalty is not cumulative.",
  "Mach Schnell!: Add +3 to mook initiative while this foe is up.",
  "Medkit: Spend 3 shots to remove 7 Wound Points from a Boss or Featured Foe.",
  "Mimic Form: Spend 1 shot as an interrupt after taking Wound Points from an attack with a higher Damage Value than the foe’s weapons. The foe’s Damage Value now equals that of the attacking hero.",
  "Monkey See, Monkey Crouch: When a hero Dodges, the foe gains +3 Defense against the next attack. This is not cumulative.",
  "Not So Fast: When a hero Cheeses It, this foe may spend 3 shots as an interrupt to deal that hero 14 Damage. This does not expend the bad guys’ one chance to stop the hero from Cheesing It.",
  "Numerical Superiority: Add +2 Toughness when more than half the mooks on the foe’s side are still standing.",
  "Oxygen Sink (Mutant): While the foe is up, heroes take –1 penalty to Up Checks.",
  "Parting Shot: If the foe successfully Cheeses It despite a hero’s attempt to stop it, the hero takes 14 Damage.",
  "Pause That Refreshes: As an interrupt when a hero makes a Dodge, the foe may remove 4 Wound Points from any foe, including itself.",
  "Pep Talk: Spend 1 shot and make an attack against the Defense of the hero the foe last tried to hit. On a success, a number of downed mooks equal to 1 plus the Outcome recovers, and the foe spends 2 more shots.",
  "Protective Fury (Martial Artist): When a mook is downed by a weapon-wielding hero, the foe may spend 1 shot to Disarm that hero.",
  "Radiation Poisoning (Scroungetech, Mutant): Spend 3 shots and beat a hero’s Defense with a Scroungetech or Mutant Check; if the foe is still active at the end of a sequence, that hero takes 22 Damage.",
  "Reinforced Skeleton (Scroungetech, Mutant, Supernatural Creature): On a failed Martial Arts attack against the foe, the attacker takes Wound Points equal to the difference between the result and the foe’s Defense.",
  "Reversion Curse (Sorcerer, Ancient or Past Martial Artist): Spend 1 shot; if the foe is still active at the start of the next keyframe, all Transformed Animal heroes gain 5 Reversion Points at the start of the next session.",
  "Requires Group Effort: +1 Damage for each hero who has yet to attack the foe during the current fight.",
  "Retrench: Regain 7 Wound Points at the end of any sequence in which a hero Dodged.",
  "Rock Hard (Martial Artist, Supernatural Creature, Cyborg): Heroes making successful unarmed attacks against this foe take 2 Wound Points per attack.",
  "Screaming Steel (Sorcerer, Supernatural Creature, Mutant): On a successful attack against a hero fighting with a weapon, all mooks make a 0-shot cost attack on the hero as an interrupt every time the hero attacks with that weapon.",
  "Severed Love Line (Sorcerer): Spend 1 shot; if the foe is still active at the start of the next keyframe, target hero suffers a romantic setback in a later scene.",
  "Shattered Loyalties (Sorcerer): Spend 1 shot; if the foe is still active at the start of the next keyframe, target hero suffers a betrayal from a friendly supporting character in a later scene.",
  "Shouted Orders: As an interrupt when a mook hits a hero, the foe may spend 1 shot to add 4 Damage to the mook’s hit.",
  "Skull-Mounted Targeting Goggles (Cyborg): Add +3 Initiative if Wound Points are less than 20.",
  "Slipstrike (Martial Artist): When this foe’s attack against a hero is successful but deals less than 5 Wound Points to that hero, the hero is Disarmed.",
  "Spin the Cylinder (Featured Foe with Guns attack): After Reloading, the foe’s next attack is at +2 Attack and +6 Damage.",
  "Stasis Field (Scroungetech): On a successful attack with an Outcome of 3 or more, +1 to the Reload value of all guns the hero carries.",
  "Stunt Stopper: As an interrupt when a hero announces a stunt, spend 3 shots to make an attack against the hero.",
  "Supergun (Guns character): If the foe brings a hero to 35 or more Wound Points, the hero gains an additional Mark of Death.",
  "T is for Target: As an interrupt after a failed attack on a hero, spend 1 shot; up to three mooks, as an interrupt, may attack the hero.",
  "Tactical Genius: Spend 1 shot; until the foe goes down, mooks gain +2 Attack.",
  "Taskmaster (Boss): Add +3 to Featured Foe Initiative while the Boss is up.",
  "Tongue Grab (Supernatural Creature, Mutant): Spend 1 shot; the foe draws target hero from ranged to close combat distance.",
  "Vehicle Hit: Spend 3 shots and make an Attack against a driver’s Driving AV. The Driver’s vehicle takes Outcome +11 Chase Points, counting as a ram or sideswipe.",
  // DRIVING SCHTICKS:
  "Armor Plated: +2 to the Frame of the foe’s starting vehicle.",
  "Rehearsed Getaway: –3 to Chase Points dealt to the foe’s vehicle when a hero narrows the gap.",
  "Shibuya Slide: When driving as the evader in a chase, gain +2 Driving if one or more hero drivers have fewer Chase Points.",
  "Pedal to the Metal: When driving as the pursuer in a chase, gain +2 Driving if one or more hero drivers have fewer Chase Points.",
  "Wrench the Wheel: –3 to Chase Points dealt to the foe’s vehicle in any ram or sideswipe.",
  "Braced for Impact: When the foe’s vehicle crashes, all occupants gain +4 Toughness against crash damage.",
  "Counterslam: If the foe’s vehicle’s higher Frame gives an opposing vehicle a Bump value, that value increases by 3.",
  "Dazed and Contused: Until the next keyframe, enemies exiting a vehicle the foe rammed or sideswiped take 1 point of Impairment and add 1 to all shot costs.",
  "High Gear: If the foe’s Initiative is lower than that of the first hero Driver to act, the foe’s Initiative equals that hero’s Initiative –1.",
  "Ram-Alama-Bam: When driving, if the foe rams a vehicle, gain +2 Frame. Also, +4 Damage Value when the foe hits a pedestrian.",
  "Wicked Ride: +2 to the Handling of the foe’s starting vehicle."
];

/*===================================
  End of Database Definitions
===================================*/

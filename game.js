'use strict';

// ── Acts ──────────────────────────────────────────────────────────────────────

const ACTS = [
  { name: "ACT I — Devil's Awakening",        chapters: [0,1,2]    },
  { name: "ACT II — The Three Factions",       chapters: [3,4]      },
  { name: "ACT III — Khaos Brigade",           chapters: [5,6,7]    },
  { name: "ACT IV — Evil Gods",                chapters: [8,9]      },
  { name: "ACT V — Underworld Chaos",          chapters: [10,11]    },
  { name: "ACT VI — Evil Dragon War",          chapters: [12,13,14] },
  { name: "ACT VII — Dragon Gods & Apocalypse",chapters: [15,16]    },
  { name: "ACT VIII — Shin DxD",               chapters: [17,18,19] },
];

// ── Chapters ──────────────────────────────────────────────────────────────────

const CHAPTERS = [
  // ── ACT I ──
  {
    id: 0, act: 0,
    name: 'Fallen Angel Ambush',
    subtitle: 'Chapter 1 · Kuoh Town Cemetery · Vol. 1',
    enemy: {
      name: 'Raynare', title: 'Fallen Angel of Light', art: '🖤', level: 1,
      hp: 120, maxHp: 120, mp: 60, maxMp: 60, atk: 14, def: 8,
      expReward: 80, goldReward: 50,
      flavor: '"You\'re just a lowly human. Hand over the Sacred Gear and I\'ll make your death quick."',
      moveset: ['lightSpear','lightSpear','darkWing','lightSpear'],
      statusEffects: [],
    },
    intro: 'The girl who handed you a flyer for the Occult Research Club was a Fallen Angel all along. Now, in the dark cemetery, Raynare stands before you — ready to steal your Sacred Gear and end your life.',
    winDialog: 'Raynare: "I-Impossible… a human defeating me?! This can\'t be…"',
    loseDialog: 'Raynare: "Did you really think a human could stand against a Fallen Angel? Pathetic."',
  },
  {
    id: 1, act: 0,
    name: 'Crazed Exorcist',
    subtitle: 'Chapter 2 · Old Church Ruins · Vol. 2',
    enemy: {
      name: 'Freed Sellzen', title: 'Defrocked Exorcist', art: '⛪', level: 3,
      hp: 200, maxHp: 200, mp: 100, maxMp: 100, atk: 20, def: 10,
      expReward: 150, goldReward: 80,
      flavor: '"Hahaha! I LOVE killing devils! The smell of burning Sacred Gear is exquisite!"',
      moveset: ['holySlash','holySlash','berserkSlash','holySlash','berserkSlash'],
      statusEffects: [],
    },
    intro: 'A defrocked priest with a blessed chainsaw. Freed Sellzen doesn\'t care about good or evil — he just wants to kill. He\'s been hired to stop you from interfering with the Stray Devil hunts.',
    winDialog: 'Freed: "Hahaha! I\'ll remember this, Dragon brat! See you again!"',
    loseDialog: 'Freed: "Devils die, Sacred Gears shatter, everything burns! Beautiful!"',
  },
  {
    id: 2, act: 0,
    name: 'Phoenix Rating Game',
    subtitle: 'Chapter 3 · Riser Phenex Rating Game · Vol. 3',
    enemy: {
      name: 'Riser Phenex', title: 'Phoenix of House Phenex', art: '🔥', level: 5,
      hp: 320, maxHp: 320, mp: 160, maxMp: 160, atk: 28, def: 15,
      expReward: 250, goldReward: 130,
      flavor: '"You cannot kill a Phoenix. I regenerate. I am immortal. Give up before I embarrass you further."',
      moveset: ['fireBlast','fireBlast','phoenixRegen','fireBlast','phoenixWing','fireBlast'],
      statusEffects: [], special: 'regen',
    },
    intro: 'Riser Phenex — arrogant heir who forced Rias into an engagement. His phoenix flame means every wound heals instantly. You must overwhelm him completely before he recovers. This is the first Rating Game of your life.',
    winDialog: 'Riser: "...This can\'t be. Defeated by a pawn?! My pride! My perfect record!"',
    loseDialog: 'Riser: "Did you see that, Rias? This is why low-class devils stay in their place."',
  },
  // ── ACT II ──
  {
    id: 3, act: 1,
    name: 'Warlord of Heaven',
    subtitle: 'Chapter 4 · Abandoned Factory · Vol. 4',
    enemy: {
      name: 'Kokabiel', title: 'Fallen Angel Warlord', art: '⚡', level: 8,
      hp: 500, maxHp: 500, mp: 250, maxMp: 250, atk: 40, def: 20,
      expReward: 400, goldReward: 200,
      flavor: '"Revive the Three-way War? No — I will START a new one. Beginning with your extermination."',
      moveset: ['lightningSpear','darkMeteor','lightningSpear','warlordStrike','lightningSpear','darkMeteor','angelSlaughter'],
      statusEffects: [],
    },
    intro: 'A mad general of heaven turned apocalyptic warlord. Kokabiel has captured the Excaliburs and seeks to restart the Great War. Even Sona and Rias are powerless here. The fate of Kuoh rests on you.',
    winDialog: 'Kokabiel: "...A Dragon Emperor. I truly underestimated the Red One\'s vessel."',
    loseDialog: 'Kokabiel: "This is why the Great War must restart. The weak have no place in my new world."',
  },
  {
    id: 4, act: 1,
    name: 'Heavenly Dragon Clash',
    subtitle: 'Chapter 5 · Sacred Gear Summit · Vol. 5',
    enemy: {
      name: 'Vali Lucifer', title: 'White Dragon Emperor · Lucifer Heir', art: '🐉', level: 12,
      hp: 800, maxHp: 800, mp: 400, maxMp: 400, atk: 55, def: 30,
      expReward: 700, goldReward: 350,
      flavor: '"Albion and I will Divide your power in half, Issei Hyoudou. That is the destiny of the Two Heavenly Dragons."',
      moveset: ['dividePower','albionShot','dividePower','vanishingDragon','albionShot','dividePower','vanishingDragon','halfDimension'],
      statusEffects: [], special: 'halve',
    },
    intro: 'Vali — the White Dragon Emperor who wields Vanishing Dragon. His Sacred Gear can halve anything infinitely. He\'s a descendant of the original Lucifer and the ultimate rival Ddraig has waited millennia for. The clash of the Two Heavenly Dragons begins.',
    winDialog: 'Vali: "...Interesting. You\'ve grown to be a worthy rival, Issei Hyoudou. I look forward to the next time."',
    loseDialog: 'Vali: "Albion and I will await the day you can truly challenge us. Grow stronger, Red Dragon."',
  },
  // ── ACT III ──
  {
    id: 5, act: 2,
    name: 'The True Longinus',
    subtitle: 'Chapter 6 · Hero Faction Headquarters · Vol. 7',
    enemy: {
      name: 'Cao Cao', title: 'Hero Faction Leader · True Longinus', art: '🔱', level: 15,
      hp: 1100, maxHp: 1100, mp: 500, maxMp: 500, atk: 65, def: 35,
      expReward: 900, goldReward: 450,
      flavor: '"The True Longinus — the spear that pierced the Son of God. Even your Red Dragon Emperor cannot match a Longinus wielded by a descendant of heroes."',
      moveset: ['longinusPierce','spiritOfTruth','longinusPierce','heroStrike','spiritOfTruth','longinusPierce','trueHeroAura','longinusPierce'],
      statusEffects: [],
    },
    intro: 'Cao Cao leads the Hero Faction of Khaos Brigade — humans with Sacred Gears who seek to surpass gods and devils alike. His True Longinus, the first Longinus ever created, can pierce through any defense. And his "Spirit of Truth" technique can nullify the Boosted Gear\'s power.',
    winDialog: 'Cao Cao: "...Impressive. The Red Dragon Emperor lives up to his legend after all."',
    loseDialog: 'Cao Cao: "Humans wielding the power of heroes — that is why we will surpass all supernatural beings."',
  },
  {
    id: 6, act: 2,
    name: 'Demonic Swordsman',
    subtitle: 'Chapter 7 · Mountain Battlefield · Vol. 8',
    enemy: {
      name: 'Siegfried', title: 'Chaos Edge Sieg · Hero Faction', art: '⚔️', level: 16,
      hp: 900, maxHp: 900, mp: 400, maxMp: 400, atk: 70, def: 30,
      expReward: 850, goldReward: 420,
      flavor: '"Gram, the Sword of the Sun. Nothung, the Sword of Twilight. Four swords at once — this is the Chaos Edge that no one has survived."',
      moveset: ['gramsSlash','nibelungStrike','gramsSlash','chaosEdge','gramsSlash','nibelungStrike','chaosEdge','gramSolar'],
      statusEffects: [],
    },
    intro: 'Siegfried wields four demonic swords simultaneously using arms augmented by the hero Siegfried\'s remnants. His prized sword Gram — the dragon-slaying blade — is particularly dangerous to Issei. This fight will push your combat instincts to their limit.',
    winDialog: 'Siegfried: "The Red Dragon Emperor... you truly are something else."',
    loseDialog: 'Siegfried: "A dragon-slaying hero versus a dragon emperor. The outcome was inevitable."',
  },
  {
    id: 7, act: 2,
    name: 'Annihilation Maker',
    subtitle: 'Chapter 8 · Dimensional Rift · Vol. 8',
    enemy: {
      name: 'Georg', title: 'Annihilation Maker · Hero Faction', art: '🌀', level: 17,
      hp: 750, maxHp: 750, mp: 600, maxMp: 600, atk: 60, def: 25,
      expReward: 800, goldReward: 400,
      flavor: '"Annihilation Maker creates concepts of evil. My Sacred Gear is the pinnacle of creation-type Longinus."',
      moveset: ['voidCreature','annihilationMaker','voidCreature','conceptualEvil','annihilationMaker','voidCreature','annihilationMaker'],
      statusEffects: [],
    },
    intro: 'Georg\'s Annihilation Maker is a Longinus-class Sacred Gear that can create living evil concepts from imagination — monsters with no natural counters. The Hero Faction\'s final line of defense before their true plan is revealed.',
    winDialog: 'Georg: "The Red Dragon Emperor\'s will overcomes even conceptual creation... noted."',
    loseDialog: 'Georg: "Creation always defeats destruction. That is the absolute truth."',
  },
  // ── ACT IV ──
  {
    id: 8, act: 3,
    name: 'The Norse Evil God',
    subtitle: 'Chapter 9 · Yggdrasil Gateway · Vol. 10–11',
    enemy: {
      name: 'Loki', title: 'God of Mischief · Norse Evil God', art: '🐍', level: 20,
      hp: 1400, maxHp: 1400, mp: 700, maxMp: 700, atk: 80, def: 45,
      expReward: 1200, goldReward: 600,
      flavor: '"I am Loki, the god who will bring about Ragnarok. Even the Dragon Emperor cannot stop what I have set in motion."',
      moveset: ['runeBinding','divinePoison','runeBinding','midgardSerpent','divinePoison','runeBinding','lokiTransform','divinePoison','midgardSerpent'],
      statusEffects: [],
    },
    intro: 'Loki — the Norse Evil God who seeks to trigger Ragnarok, the end of the world. He arrived in Kuoh to use Jörmungandr, the World Serpent. Odin himself fled. This is your first fight against a genuine deity.',
    winDialog: 'Loki: "...Defeated by the vessel of the Red Dragon. How Ragnarok mocks me."',
    loseDialog: 'Loki: "Ragnarok cannot be stopped. The world tree will burn, and all pantheons will fall."',
  },
  {
    id: 9, act: 3,
    name: 'Wolf of the Apocalypse',
    subtitle: 'Chapter 10 · Yggdrasil Root · Vol. 11',
    enemy: {
      name: 'Fenrir', title: 'Divine Wolf · Son of Loki', art: '🐺', level: 22,
      hp: 1200, maxHp: 1200, mp: 300, maxMp: 300, atk: 90, def: 40,
      expReward: 1100, goldReward: 550,
      flavor: '"GROOARRR—" The wolf that devours gods speaks no words. Its fangs cut through divine protection itself.',
      moveset: ['divineGnaw','fenrirRush','divineGnaw','godKillerBite','fenrirRush','divineGnaw','apocalypseFang'],
      statusEffects: [],
    },
    intro: 'Fenrir — the giant wolf whose fangs can slay gods and whose bite ignores all divine protection. Even Ddraig\'s armour cannot fully block its strikes. Arthur Pendragon and Vali fought it together. Now it\'s your turn.',
    winDialog: '*Fenrir whimpers and retreats into the shadows of Yggdrasil.*',
    loseDialog: '*The divine wolf\'s jaws close around your armour, crushing the Boosted Gear\'s light.*',
  },
  // ── ACT V ──
  {
    id: 10, act: 4,
    name: 'Corrupt Devil Lord',
    subtitle: 'Chapter 11 · Underworld Trap · Vol. 12',
    enemy: {
      name: 'Diodora Astaroth', title: 'House Astaroth · Corrupt High-Class Devil', art: '🕳️', level: 24,
      hp: 900, maxHp: 900, mp: 500, maxMp: 500, atk: 70, def: 35,
      expReward: 950, goldReward: 480,
      flavor: '"Asia Argento was my toy from the beginning. Did you think you could rescue her from me so easily, Red Dragon?"',
      moveset: ['darkRitual','demonDomination','darkRitual','voidTrap','demonDomination','darkRitual','soulDrain','voidTrap'],
      statusEffects: [],
    },
    intro: 'Diodora Astaroth lured Asia into a trap — he\'s been manipulating her fate since she was exorcised from the Church. He stands between you and Asia\'s rescue in the heart of the underworld. The anger of the Red Dragon Emperor reaches its boiling point.',
    winDialog: 'Diodora: "H-How did you break through my domain?! This is impossible—"',
    loseDialog: 'Diodora: "Asia belongs to me. Did you think your petty rage could overcome house Astaroth?"',
  },
  {
    id: 11, act: 4,
    name: 'Old Satan Reborn',
    subtitle: 'Chapter 12 · Dimensional Gap · Vol. 12–13',
    enemy: {
      name: 'Shalba Beelzebub', title: 'Old Satan Faction Leader', art: '👿', level: 26,
      hp: 1300, maxHp: 1300, mp: 650, maxMp: 650, atk: 85, def: 50,
      expReward: 1300, goldReward: 650,
      flavor: '"You destroyed Diodora? No matter. I will cast you into the dimensional gap myself. Disappear, Red Dragon Emperor!"',
      moveset: ['oldSatanPower','dimensionLost','oldSatanPower','beelzebubStrike','dimensionLost','oldSatanPower','satanAnnihilate','oldSatanPower'],
      statusEffects: [],
    },
    intro: 'Shalba — the man who sent Issei\'s body into the dimensional gap and nearly killed him. The Old Satan Faction believes the current Satan successors are weak pretenders. He possesses power befitting the original Beelzebub bloodline. And he\'s stolen Asia\'s soul.',
    winDialog: 'Shalba: "...You survived the gap. You\'re a monster, Red Dragon Emperor. A true monster."',
    loseDialog: 'Shalba: "The Old Satan bloodline will reclaim its throne. This is the natural order."',
  },
  // ── ACT VI ──
  {
    id: 12, act: 5,
    name: 'Invincible Evil Dragon',
    subtitle: 'Chapter 13 · Evil Dragon Battlefield · Vol. 14–15',
    enemy: {
      name: 'Grendel', title: 'Evil Dragon of Rage', art: '💀', level: 30,
      hp: 2000, maxHp: 2000, mp: 400, maxMp: 400, atk: 100, def: 80,
      expReward: 1800, goldReward: 900,
      flavor: '"KILL. DESTROY. HATE. That is all I am. That is all I need to be."',
      moveset: ['rageStrike','invincibleHide','rageStrike','rageStrike','berserkFury','invincibleHide','rageStrike','hatredClaw','rageStrike'],
      statusEffects: [],
    },
    intro: 'Rizevim\'s Qlippoth faction has revived the Evil Dragons sealed since ancient times. Grendel — the dragon of pure hatred and rage, the one who exists only to kill — is the first. His hide deflects most attacks. You need to break through with sheer overwhelming power.',
    winDialog: '*Grendel lets out a dying screech of pure, confused rage.*',
    loseDialog: '*Grendel\'s claws tear through your armour. The hatred in its eyes is the last thing you see.*',
  },
  {
    id: 13, act: 5,
    name: 'Dragon of Pure Combat',
    subtitle: 'Chapter 14 · Ancient Battlefield · Vol. 15–16',
    enemy: {
      name: 'Crom Cruach', title: 'Evil Dragon · Strongest Evil Dragon', art: '🌑', level: 33,
      hp: 1800, maxHp: 1800, mp: 500, maxMp: 500, atk: 120, def: 60,
      expReward: 2000, goldReward: 1000,
      flavor: '"I don\'t care about Qlippoth or Rizevim\'s goals. I simply want to fight the strong. And you, Red Dragon Emperor, might finally be interesting."',
      moveset: ['pureCombat','dragonDominance','pureCombat','combatInstinct','dragonDominance','pureCombat','dragonOverwhelm','pureCombat','combatInstinct'],
      statusEffects: [],
    },
    intro: 'Crom Cruach is different from other Evil Dragons — he joined Qlippoth not for destruction, but because it lets him fight the strongest opponents. He\'s considered the most powerful Evil Dragon in existence. Pure combat mastery, no tricks, no gimmicks. Just overwhelming force.',
    winDialog: 'Crom Cruach: "...Heh. Not bad, Red Dragon Emperor. Not bad at all. I\'ll be watching your growth."',
    loseDialog: 'Crom Cruach: "You\'re not there yet. Come back when you\'ve truly mastered your dragon power."',
  },
  {
    id: 14, act: 5,
    name: 'Son of the Original Lucifer',
    subtitle: 'Chapter 15 · Qlippoth Stronghold · Vol. 17–18',
    enemy: {
      name: 'Rizevim Livan Lucifer', title: 'Silver-Haired Lucifer · Son of the Original', art: '😈', level: 38,
      hp: 2500, maxHp: 2500, mp: 800, maxMp: 800, atk: 130, def: 70,
      expReward: 2500, goldReward: 1250,
      flavor: '"Sacred Gears? Oh, those little trinkets. I\'m the son of the original Lucifer — Sacred Gears simply don\'t work on me. Isn\'t that wonderful?"',
      moveset: ['sacredGearNull','luciferDescendant','sacredGearNull','silverWings','luciferDescendant','sacredGearNull','apocalypseSeed','luciferDescendant','sacredGearNull'],
      statusEffects: [],
    },
    intro: 'Rizevim Livan Lucifer — the true mastermind behind Qlippoth. Son of the original Lucifer, he possesses an innate ability to nullify Sacred Gears entirely. Your Boosted Gear, your Balance Breaker, your Dragon Shot — all useless against him. You must fight with your body and will alone, finding the gaps in his nullification.',
    winDialog: 'Rizevim: "...My, my. The Red Dragon Emperor broke through my nullification with sheer willpower. How utterly, disgustingly impressive."',
    loseDialog: 'Rizevim: "Sacred Gears are just tools. And tools mean nothing to the blood of the original Lucifer."',
  },
  // ── ACT VII ──
  {
    id: 15, act: 6,
    name: 'Evil Dragon God',
    subtitle: 'Chapter 16 · Dimensional Gap · Vol. 19–20',
    enemy: {
      name: 'Apophis', title: 'Evil Dragon God · God of Chaos', art: '🌌', level: 45,
      hp: 3000, maxHp: 3000, mp: 1000, maxMp: 1000, atk: 150, def: 80,
      expReward: 3500, goldReward: 1750,
      flavor: '"I am the serpent dragon who devours the sun. A God of Chaos. Ddraig, your host is nothing compared to the forces I command."',
      moveset: ['chaosEnergy','darkGodRoar','chaosEnergy','serpentCoil','darkGodRoar','chaosEnergy','dragonGodAura','serpentCoil','chaosEnergy','darkGodRoar'],
      statusEffects: [],
    },
    intro: 'Apophis — the Evil Dragon God born of primordial chaos. In the dimensional gap where Great Red dwells, this ancient deity-class dragon has awakened. Ddraig himself acknowledges the danger. This is the first opponent where the Red Dragon Emperor must fight at the very limits of his power.',
    winDialog: 'Apophis: "...The Red Dragon Emperor has grown beyond what I calculated. The age of chaos bows to the age of dragons."',
    loseDialog: 'Apophis: "The sun is devoured by my darkness. Even the Red Dragon Emperor cannot escape entropy."',
  },
  {
    id: 16, act: 6,
    name: 'Beast of the Apocalypse',
    subtitle: 'Chapter 17 · Reality\'s Edge · Vol. 21–22',
    enemy: {
      name: 'Trihexa (666)', title: 'Beast of the Apocalypse · Seven Heads', art: '☠️', level: 55,
      hp: 5000, maxHp: 5000, mp: 1200, maxMp: 1200, atk: 200, def: 100,
      expReward: 5000, goldReward: 2500,
      flavor: '"...666... 666... 666..." The Beast speaks in only numbers. Its existence alone destabilizes reality.',
      moveset: ['apocaRoar','sevenHeads','apocaRoar','worldEnd','sevenHeads','apocaRoar','realityTear','sevenHeads','apocaRoar','worldEnd','realityTear'],
      statusEffects: [],
    },
    intro: 'Trihexa — the "Beast 666" from the Book of Revelation. The creature that Sirzechs and the other Satans sacrificed themselves to seal away. Now it stands before you. Even gods have fallen before it. This is the battle that decides the fate of all existence.',
    winDialog: '*The seven heads of Trihexa fall silent one by one. Existence itself shudders, then stabilizes.*',
    loseDialog: '*The Beast of the Apocalypse advances. Even the Red Dragon Emperor cannot hold back the end of all things.*',
  },
  // ── ACT VIII — Shin DxD ──
  {
    id: 17, act: 7,
    name: 'The Ratings Emperor',
    subtitle: 'Chapter 18 · High-Class Devil Rating Game · Shin Vol. 1–2',
    enemy: {
      name: 'Diehauser Belial', title: 'Emperor of Rating Games · House Belial', art: '👑', level: 40,
      hp: 2000, maxHp: 2000, mp: 900, maxMp: 900, atk: 140, def: 90,
      expReward: 3000, goldReward: 1500,
      flavor: '"I am the Emperor. In three hundred years of Rating Games, no one has beaten me. Your peerage is impressive, Hyoudou Issei — but impressive is not enough."',
      moveset: ['emperorJudgment','innovateClear','emperorJudgment','worthlessTotal','innovateClear','emperorJudgment','belialMaster','worthlessTotal','emperorJudgment'],
      statusEffects: [],
    },
    intro: 'Now a High-Class Devil with his own peerage, Issei faces the greatest Rating Game challenge yet — Diehauser Belial, the undisputed Emperor. His Sacred Gear "Innovate Clear" can overwrite phenomena. Three hundred years undefeated. This is the Rating Game that will define Issei\'s legacy.',
    winDialog: 'Diehauser: "...You broke through Innovate Clear\'s absolute rewrite. The Red Dragon Emperor\'s will cannot be overwritten. Magnificent."',
    loseDialog: 'Diehauser: "Three hundred years of experience cannot be overcome by passion alone. Come back when you\'ve tempered that fire into steel."',
  },
  {
    id: 18, act: 7,
    name: 'God of the Underworld',
    subtitle: 'Chapter 19 · Realm of the Dead · Shin Vol. 3',
    enemy: {
      name: 'Hades', title: 'God of Death · Greek Pantheon', art: '⚰️', level: 50,
      hp: 3500, maxHp: 3500, mp: 1100, maxMp: 1100, atk: 170, def: 110,
      expReward: 4500, goldReward: 2000,
      flavor: '"Death is the one constant no dragon can escape. I am Hades — the boundary all living things must cross. Even the Red Dragon Emperor must die eventually."',
      moveset: ['deathChain','plagueBreath','deathChain','nidhoggrCurse','plagueBreath','deathChain','realmOfDead','nidhoggrCurse','deathChain','plagueBreath'],
      statusEffects: [],
    },
    intro: 'Hades — the Greek God of Death who commands the realm of the dead and the Evil Dragon Nidhogg. After Trihexa\'s sealed away, Hades moves to claim dominance over the supernatural world\'s grief. He has targeted the people dear to Issei. The God of Death himself stands before the Red Dragon Emperor.',
    winDialog: 'Hades: "...To overcome death itself... the Red Dragon Emperor is truly a being that defies fate."',
    loseDialog: 'Hades: "All things return to the underworld eventually. Even dragons. Even legends."',
  },
  {
    id: 19, act: 7,
    name: 'The Void That Devours Gods',
    subtitle: 'Chapter 20 · Final Battle · Shin Vol. 4',
    enemy: {
      name: 'Aži Dahāka', title: 'Storm Dragon of Three Heads · Evil God Dragon', art: '🌪️', level: 65,
      hp: 6000, maxHp: 6000, mp: 1500, maxMp: 1500, atk: 250, def: 120,
      expReward: 8000, goldReward: 4000,
      flavor: '"I am Aži Dahāka — the three-headed storm dragon sealed since the dawn of the world. I have devoured gods. I have ended ages. And now I will devour the Red Dragon Emperor himself."',
      moveset: ['threeHeadRoar','stormLightning','threeHeadRoar','voidConsumption','stormLightning','threeHeadRoar','godDevourer','voidConsumption','threeHeadRoar','stormLightning','eternalStorm','godDevourer'],
      statusEffects: [],
    },
    intro: 'The final chapter. Aži Dahāka — the three-headed Evil God Dragon who was sealed before recorded history — has broken free, threatening to devour the new peace between the Three Factions. This is everything Issei has fought for. Every battle, every boost, every fallen comrade — it all leads here. The Red Dragon Emperor versus the Storm Dragon that devoured gods.',
    winDialog: 'Aži Dahāka: "...Im...possible. The power of the Red Dragon Emperor... surpasses even a God Dragon? Ddraig... your host... is truly the strongest..."',
    loseDialog: 'Aži Dahāka: "The Three Headed Dragon has stood since before your world had a name. No Red Dragon Emperor has ever surpassed me. And today is no different."',
  },
];

// ── Enemy Moves ───────────────────────────────────────────────────────────────

const ENEMY_MOVES = {
  // Act I
  lightSpear:       { name: 'Light Spear',          dmgMult: 1.0, mpCost: 8,  effect: null },
  darkWing:         { name: 'Dark Wing Slash',       dmgMult: 1.2, mpCost: 12, effect: null },
  holySlash:        { name: 'Holy Chainsaw',         dmgMult: 1.1, mpCost: 10, effect: null },
  berserkSlash:     { name: 'Berserk Slash',         dmgMult: 1.5, mpCost: 18, effect: null },
  fireBlast:        { name: 'Phoenix Flame',         dmgMult: 1.1, mpCost: 12, effect: 'burn' },
  phoenixRegen:     { name: 'Immortal Flame',        dmgMult: 0,   mpCost: 20, effect: 'selfHeal' },
  phoenixWing:      { name: 'Phoenix Wing',          dmgMult: 1.3, mpCost: 15, effect: null },
  // Act II
  lightningSpear:   { name: 'Lightning Spear',       dmgMult: 1.2, mpCost: 15, effect: null },
  darkMeteor:       { name: 'Dark Meteor',           dmgMult: 1.6, mpCost: 25, effect: null },
  warlordStrike:    { name: 'Warlord Strike',        dmgMult: 1.8, mpCost: 30, effect: null },
  angelSlaughter:   { name: 'Angel Slaughter',       dmgMult: 2.0, mpCost: 40, effect: null },
  dividePower:      { name: 'DIVIDE!',               dmgMult: 0.8, mpCost: 20, effect: 'halve' },
  albionShot:       { name: 'Albion Shot',           dmgMult: 1.4, mpCost: 18, effect: null },
  vanishingDragon:  { name: 'Vanishing Dragon',      dmgMult: 2.0, mpCost: 35, effect: null },
  halfDimension:    { name: 'Half Dimension',        dmgMult: 0,   mpCost: 50, effect: 'halfMaxHp' },
  // Act III
  longinusPierce:   { name: 'True Longinus Thrust',  dmgMult: 1.8, mpCost: 30, effect: null },
  spiritOfTruth:    { name: 'Spirit of Truth',       dmgMult: 0,   mpCost: 35, effect: 'nullBoost' },
  heroStrike:       { name: 'Hero\'s Strike',        dmgMult: 1.5, mpCost: 20, effect: null },
  trueHeroAura:     { name: 'True Hero Aura',        dmgMult: 2.0, mpCost: 45, effect: null },
  gramsSlash:       { name: 'Gram — Sun Sword',      dmgMult: 1.6, mpCost: 22, effect: 'burn' },
  nibelungStrike:   { name: 'Nibelung Strike',       dmgMult: 1.4, mpCost: 18, effect: null },
  chaosEdge:        { name: 'Chaos Edge',            dmgMult: 2.0, mpCost: 38, effect: null },
  gramSolar:        { name: 'Gram Solar Burst',      dmgMult: 2.2, mpCost: 50, effect: 'burn' },
  voidCreature:     { name: 'Void Creature',         dmgMult: 1.3, mpCost: 20, effect: null },
  annihilationMaker:{ name: 'Annihilation Maker',    dmgMult: 1.8, mpCost: 35, effect: null },
  conceptualEvil:   { name: 'Conceptual Evil',       dmgMult: 2.0, mpCost: 45, effect: 'seal' },
  // Act IV
  runeBinding:      { name: 'Rune Binding',          dmgMult: 0.8, mpCost: 25, effect: 'seal' },
  divinePoison:     { name: 'Divine Poison',         dmgMult: 1.2, mpCost: 30, effect: 'burn' },
  midgardSerpent:   { name: 'Midgard Serpent',       dmgMult: 2.0, mpCost: 50, effect: 'burn' },
  lokiTransform:    { name: 'Loki\'s True Form',     dmgMult: 2.5, mpCost: 60, effect: null },
  divineGnaw:       { name: 'Divine Gnaw',           dmgMult: 1.6, mpCost: 20, effect: null },
  fenrirRush:       { name: 'Fenrir Rush',           dmgMult: 1.4, mpCost: 15, effect: null },
  godKillerBite:    { name: 'God Killer Bite',       dmgMult: 2.0, mpCost: 35, effect: 'seal' },
  apocalypseFang:   { name: 'Apocalypse Fang',       dmgMult: 2.8, mpCost: 60, effect: null },
  // Act V
  darkRitual:       { name: 'Dark Ritual',           dmgMult: 1.3, mpCost: 25, effect: null },
  demonDomination:  { name: 'Demon Domination',      dmgMult: 1.6, mpCost: 30, effect: 'seal' },
  voidTrap:         { name: 'Void Trap',             dmgMult: 1.4, mpCost: 22, effect: null },
  soulDrain:        { name: 'Soul Drain',            dmgMult: 0,   mpCost: 30, effect: 'drainMp' },
  oldSatanPower:    { name: 'Old Satan Power',       dmgMult: 1.8, mpCost: 35, effect: null },
  dimensionLost:    { name: 'Dimension Lost',        dmgMult: 0,   mpCost: 45, effect: 'seal' },
  beelzebubStrike:  { name: 'Beelzebub Strike',      dmgMult: 2.0, mpCost: 40, effect: null },
  satanAnnihilate:  { name: 'Satan Annihilation',    dmgMult: 2.5, mpCost: 60, effect: null },
  // Act VI
  rageStrike:       { name: 'Rage Strike',           dmgMult: 1.4, mpCost: 15, effect: null },
  invincibleHide:   { name: 'Invincible Hide',       dmgMult: 0,   mpCost: 20, effect: 'selfDefUp' },
  berserkFury:      { name: 'Berserk Fury',          dmgMult: 2.0, mpCost: 35, effect: null },
  hatredClaw:       { name: 'Hatred Claw',           dmgMult: 2.5, mpCost: 50, effect: null },
  pureCombat:       { name: 'Pure Combat Strike',    dmgMult: 1.6, mpCost: 20, effect: null },
  dragonDominance:  { name: 'Dragon Dominance',      dmgMult: 2.0, mpCost: 35, effect: null },
  combatInstinct:   { name: 'Combat Instinct',       dmgMult: 1.8, mpCost: 28, effect: null },
  dragonOverwhelm:  { name: 'Dragon Overwhelm',      dmgMult: 2.5, mpCost: 50, effect: null },
  sacredGearNull:   { name: 'Sacred Gear Nullify',   dmgMult: 0,   mpCost: 30, effect: 'sealGear' },
  luciferDescendant:{ name: 'Lucifer Descendant',    dmgMult: 2.2, mpCost: 45, effect: null },
  silverWings:      { name: 'Silver Wings',          dmgMult: 1.8, mpCost: 30, effect: null },
  apocalypseSeed:   { name: 'Apocalypse Seed',       dmgMult: 3.0, mpCost: 70, effect: null },
  // Act VII
  chaosEnergy:      { name: 'Chaos Energy',          dmgMult: 1.8, mpCost: 35, effect: null },
  darkGodRoar:      { name: 'Dark God Roar',         dmgMult: 2.2, mpCost: 50, effect: null },
  serpentCoil:      { name: 'Serpent Coil',          dmgMult: 1.5, mpCost: 25, effect: 'seal' },
  dragonGodAura:    { name: 'Dragon God Aura',       dmgMult: 2.5, mpCost: 60, effect: null },
  apocaRoar:        { name: 'Apocalypse Roar',       dmgMult: 2.0, mpCost: 40, effect: null },
  sevenHeads:       { name: 'Seven Heads Strike',    dmgMult: 2.5, mpCost: 55, effect: null },
  worldEnd:         { name: 'World End',             dmgMult: 3.0, mpCost: 80, effect: null },
  realityTear:      { name: 'Reality Tear',          dmgMult: 0,   mpCost: 60, effect: 'halfMaxHp' },
  // Act VIII
  emperorJudgment:  { name: 'Emperor\'s Judgment',   dmgMult: 1.8, mpCost: 35, effect: null },
  innovateClear:    { name: 'Innovate Clear',        dmgMult: 0,   mpCost: 50, effect: 'nullBoost' },
  worthlessTotal:   { name: 'Worthless',             dmgMult: 2.5, mpCost: 55, effect: null },
  belialMaster:     { name: 'Belial Mastery',        dmgMult: 3.0, mpCost: 70, effect: null },
  deathChain:       { name: 'Death Chain',           dmgMult: 1.8, mpCost: 35, effect: 'seal' },
  plagueBreath:     { name: 'Plague Breath',         dmgMult: 2.0, mpCost: 45, effect: 'burn' },
  nidhoggrCurse:    { name: 'Nidhoggr Curse',        dmgMult: 2.5, mpCost: 60, effect: 'burn' },
  realmOfDead:      { name: 'Realm of the Dead',     dmgMult: 3.0, mpCost: 80, effect: 'halfMaxHp' },
  threeHeadRoar:    { name: 'Three-Headed Roar',     dmgMult: 2.0, mpCost: 40, effect: null },
  stormLightning:   { name: 'Storm Lightning',       dmgMult: 2.2, mpCost: 50, effect: 'burn' },
  voidConsumption:  { name: 'Void Consumption',      dmgMult: 2.5, mpCost: 60, effect: 'drainMp' },
  godDevourer:      { name: 'God Devourer',          dmgMult: 3.5, mpCost: 90, effect: null },
  eternalStorm:     { name: 'Eternal Storm',         dmgMult: 3.0, mpCost: 80, effect: 'burn' },
};

// ── Player Actions ────────────────────────────────────────────────────────────

const PLAYER_ACTIONS = [
  {
    id: 'punch',       name: 'Dragon Punch',          icon: '👊', type: 'attack',
    desc: 'Basic gauntlet strike',         mpCost: 0,  dmgMult: 1.0,  unlocksAt: 1,
  },
  {
    id: 'boost',       name: 'BOOST!',                icon: '⚡', type: 'boost',
    desc: 'Ddraig doubles your power!',    mpCost: 0,  dmgMult: 0,    unlocksAt: 1,  effect: 'boost',
  },
  {
    id: 'dragonShot',  name: 'Dragon Shot',           icon: '🔴', type: 'attack',
    desc: 'Burst of dragon energy',        mpCost: 15, dmgMult: 1.6,  unlocksAt: 1,
  },
  {
    id: 'dressBreak',  name: 'Dress Break!',          icon: '💥', type: 'special',
    desc: 'Halves enemy DEF permanently',  mpCost: 20, dmgMult: 0.5,  unlocksAt: 1,  effect: 'dressBreak',
  },
  {
    id: 'riasgift',    name: "Rias's Gift",            icon: '💖', type: 'support',
    desc: 'Recover 30% max HP',            mpCost: 25, dmgMult: 0,    unlocksAt: 1,  effect: 'heal',
  },
  {
    id: 'balanceBreaker', name: 'Balance Breaker',    icon: '🐲', type: 'special',
    desc: 'Welsh Dragoon! Needs ×4 boost', mpCost: 60, dmgMult: 4.0,  unlocksAt: 3,  effect: 'balanceBreaker',
  },
  {
    id: 'crimsonBlaster', name: 'Crimson Blaster',    icon: '🔥', type: 'attack',
    desc: 'Focused red dragon beam',       mpCost: 25, dmgMult: 2.0,  unlocksAt: 7,
  },
  {
    id: 'juggernautDrive', name: 'Juggernaut Drive',  icon: '🩸', type: 'special',
    desc: 'Costs 30% HP — crushes all',    mpCost: 0,  dmgMult: 6.0,  unlocksAt: 9,  effect: 'juggernaut',
  },
  {
    id: 'longinusSmasher', name: 'Longinus Smasher',  icon: '💣', type: 'attack',
    desc: 'Pierces 70% of enemy DEF',      mpCost: 40, dmgMult: 3.0,  unlocksAt: 12,
  },
  {
    id: 'cardinalCrimson', name: 'Cardinal Crimson Queen', icon: '👑', type: 'special',
    desc: 'Queen form: ATK×1.5 for 3 turns', mpCost: 50, dmgMult: 2.5, unlocksAt: 14, effect: 'queenState',
  },
  {
    id: 'blazingInferno', name: 'Blazing Inferno',    icon: '🌋', type: 'attack',
    desc: 'Dragon fire that burns all',    mpCost: 55, dmgMult: 3.5,  unlocksAt: 17,  effect: 'burnEnemy',
  },
  {
    id: 'infinityBlaster', name: 'Infinity Blaster',  icon: '🌟', type: 'special',
    desc: 'Ultimate dragon cannon — finale', mpCost: 80, dmgMult: 5.0, unlocksAt: 20, effect: 'infinityBlaster',
  },
];

// ── Game State ────────────────────────────────────────────────────────────────

const state = {
  screen: 'title',
  player: {
    name: 'Issei Hyoudou',
    title: 'Red Dragon Emperor',
    art: '🔴',
    level: 1,
    exp: 0, expToNext: 100,
    hp: 160, maxHp: 160,
    mp: 80,  maxMp: 80,
    atk: 18, def: 10,
    boostMult: 1,
    statusEffects: [],
    gold: 0,
    queenBonus: 1,
  },
  chapters: Array(20).fill(null).map((_, i) => ({ completed: false, unlocked: i === 0 })),
  currentChapter: null,
  enemy: null,
  turnCount: 0,
  playerTurn: true,
  moveIndex: 0,
  battleOver: false,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pct(val, max) { return clamp((val / max) * 100, 0, 100); }
function expForLevel(lvl) { return Math.floor(100 * Math.pow(1.45, lvl - 1)); }
function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }
const $ = id => document.getElementById(id);

function showScreen(name) {
  document.querySelectorAll('[data-screen]').forEach(el => el.classList.add('hidden'));
  const el = $('screen-' + name);
  if (el) el.classList.remove('hidden');
  state.screen = name;
}

function log(msg, cls = '') {
  const box = $('battle-log');
  if (!box) return;
  const div = document.createElement('div');
  div.className = 'log-entry' + (cls ? ' ' + cls : '');
  div.innerHTML = msg;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function floatDmg(text, cls, targetEl) {
  if (!targetEl) return;
  const rect = targetEl.getBoundingClientRect();
  const div = document.createElement('div');
  div.className = `damage-float ${cls}`;
  div.textContent = text;
  div.style.left = (rect.left + rect.width / 2 - 30) + 'px';
  div.style.top = (rect.top + rect.height / 2 - 20) + 'px';
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 1300);
}

function shake(id) {
  const el = $(id);
  if (!el) return;
  const art = el.querySelector('.art-emoji');
  if (!art) return;
  art.classList.remove('shake');
  void art.offsetWidth;
  art.classList.add('shake');
  setTimeout(() => art.classList.remove('shake'), 500);
}

function attackAnim(id) {
  const el = $(id);
  if (!el) return;
  const art = el.querySelector('.art-emoji');
  if (!art) return;
  art.classList.remove('attack-anim');
  void art.offsetWidth;
  art.classList.add('attack-anim');
  setTimeout(() => art.classList.remove('attack-anim'), 350);
}

// ── Status helpers ────────────────────────────────────────────────────────────

function addStatus(target, type, turns) {
  const ex = target.statusEffects.find(s => s.type === type);
  if (ex) { ex.turns = Math.max(ex.turns, turns); return; }
  target.statusEffects.push({ type, turns });
}

function hasStatus(target, type) {
  return target.statusEffects.some(s => s.type === type);
}

function removeStatus(target, type) {
  target.statusEffects = target.statusEffects.filter(s => s.type !== type);
}

function isGearSealed() {
  return hasStatus(state.player, 'sealGear') || hasStatus(state.player, 'seal');
}

// ── Combat calc ───────────────────────────────────────────────────────────────

function calcDamage(atk, def, mult, isCrit) {
  const base = Math.max(1, atk - Math.floor(def / 2));
  return Math.floor(base * mult * (isCrit ? 1.8 : 1) * (0.85 + Math.random() * 0.3));
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function renderBattle() {
  const p = state.player;
  const e = state.enemy;
  if (!e) return;

  $('p-hp-bar').style.width = pct(p.hp, p.maxHp) + '%';
  $('p-hp-val').textContent = `${p.hp} / ${p.maxHp}`;
  $('p-mp-bar').style.width = pct(p.mp, p.maxMp) + '%';
  $('p-mp-val').textContent = `${p.mp} / ${p.maxMp}`;
  $('p-exp-bar').style.width = pct(p.exp, p.expToNext) + '%';
  $('p-exp-label').textContent = `EXP ${p.exp}/${p.expToNext}`;
  $('p-level').textContent = `Lv.${p.level}`;

  const bv = $('boost-value');
  bv.textContent = `×${p.boostMult}`;
  const bd = $('boost-display');
  if (p.boostMult > 1) bd.classList.add('sacred-gear-active');
  else bd.classList.remove('sacred-gear-active');

  $('e-hp-bar').style.width = pct(e.hp, e.maxHp) + '%';
  $('e-hp-val').textContent = `${e.hp} / ${e.maxHp}`;
  $('e-mp-bar').style.width = pct(e.mp, e.maxMp) + '%';
  $('e-mp-val').textContent = `${e.mp} / ${e.maxMp}`;

  renderStatusEffects('p-statuses', p.statusEffects);
  renderStatusEffects('e-statuses', e.statusEffects);

  const tb = $('turn-badge');
  if (state.playerTurn) {
    tb.textContent = 'YOUR TURN';
    tb.className = 'turn-badge turn-player';
  } else {
    tb.textContent = 'ENEMY TURN';
    tb.className = 'turn-badge turn-enemy turn-enemy-thinking';
  }

  renderActionButtons();
}

function renderStatusEffects(containerId, effects) {
  const el = $(containerId);
  if (!el) return;
  const labels = { burn:'🔥 Burn', regen:'💚 Regen', seal:'🔒 Sealed', sealGear:'🚫 Gear Null',
                   halved:'➗ Halved', dragon:'🐲 Dragon', queenState:'👑 Queen', juggernaut:'💀 Berserk' };
  const cls    = { burn:'status-burn', regen:'status-regen', seal:'status-seal', sealGear:'status-seal',
                   halved:'status-halved', dragon:'status-dragon', queenState:'status-divined', juggernaut:'status-burn' };
  el.innerHTML = effects.map(s =>
    `<span class="status-badge ${cls[s.type]||''}">${labels[s.type]||s.type}${s.turns>0?' ('+s.turns+')':''}</span>`
  ).join('');
}

function renderActionButtons() {
  const grid = $('actions-grid');
  if (!grid) return;
  const p = state.player;
  const sealed = isGearSealed();
  const gearActions = new Set(['dragonShot','dressBreak','balanceBreaker','crimsonBlaster',
                                'juggernautDrive','longinusSmasher','cardinalCrimson','blazingInferno','infinityBlaster']);

  grid.innerHTML = PLAYER_ACTIONS
    .filter(a => p.level >= a.unlocksAt)
    .map(a => {
      const costDisplay = a.mpCost > 0 ? `${a.mpCost} MP` :
        (a.effect === 'juggernaut' ? '30% HP' : 'Free');
      const noMp = p.mp < a.mpCost;
      const noBoost = a.effect === 'balanceBreaker' && p.boostMult < 4;
      const noHp = a.effect === 'juggernaut' && p.hp <= Math.floor(p.maxHp * 0.15);
      const gearLocked = sealed && gearActions.has(a.id);
      const disabled = !state.playerTurn || state.battleOver || noMp || noBoost || noHp || gearLocked;
      const disabledAttr = disabled ? 'disabled' : '';
      const hint = noBoost ? 'Need ×4 boost!' : gearLocked ? 'Gear sealed!' : '';
      return `
        <button class="btn-action type-${a.type}" onclick="playerAction('${a.id}')" ${disabledAttr}>
          <div class="act-icon">${a.icon}</div>
          <span class="act-name">${a.name}</span>
          <span class="act-desc">${hint || a.desc}</span>
          <span class="act-cost">${costDisplay}</span>
        </button>`;
    }).join('');
}

function renderMap() {
  const p = state.player;
  $('map-level').textContent = p.level;
  $('map-hp').textContent = `${p.hp}/${p.maxHp}`;
  $('map-atk').textContent = p.atk;
  $('map-def').textContent = p.def;
  $('map-gold').textContent = p.gold;
  $('map-exp').textContent = `${p.exp}/${p.expToNext}`;

  const list = $('chapters-list');
  list.innerHTML = ACTS.map(act => {
    const chapterCards = act.chapters.map(i => {
      const ch = CHAPTERS[i];
      const cs = state.chapters[i];
      const locked = !cs.unlocked;
      const done = cs.completed;
      return `
        <div class="chapter-card ${locked?'locked':''} ${done?'completed':''}"
             onclick="${locked ? '' : `startChapter(${i})`}">
          <div class="chapter-num">${i+1}</div>
          <div class="chapter-info">
            <div class="chapter-name">${ch.name}</div>
            <div class="chapter-sub">${ch.subtitle}</div>
          </div>
          <div class="chapter-badge">${done?'✅':locked?'🔒':'⚔️'}</div>
        </div>`;
    }).join('');
    return `<div class="act-section"><div class="act-title">${act.name}</div>${chapterCards}</div>`;
  }).join('');
}

// ── Battle flow ───────────────────────────────────────────────────────────────

function startChapter(idx) {
  const ch = CHAPTERS[idx];
  state.currentChapter = idx;
  state.enemy = deepClone(ch.enemy);
  state.turnCount = 0;
  state.playerTurn = true;
  state.moveIndex = 0;
  state.battleOver = false;
  state.player.boostMult = 1;
  state.player.statusEffects = [];
  state.player.queenBonus = 1;
  const p = state.player;
  p.hp = p.maxHp;
  p.mp = p.maxMp;

  showScreen('story');
  $('story-content').innerHTML = `
    <div class="chapter-intro">
      <div class="intro-chapter-tag">${ch.subtitle}</div>
      <div class="intro-enemy-art">${ch.enemy.art}</div>
      <div class="intro-enemy-name">${ch.enemy.name}</div>
      <div class="intro-enemy-title">${ch.enemy.title}</div>
      <div class="intro-flavor">${ch.intro}</div>
      <div class="story-box" style="font-style:italic;color:#c39bd3;max-width:420px;text-align:center;padding:12px 20px;">
        ${ch.enemy.flavor}
      </div>
      <button class="btn btn-primary" onclick="enterBattle()">⚔️ Fight!</button>
    </div>`;
}

function enterBattle() {
  showScreen('battle');
  const ch = CHAPTERS[state.currentChapter];
  const e = state.enemy;
  $('battle-chapter').textContent = ch.subtitle;
  $('e-name').textContent = e.name;
  $('e-title').textContent = e.title;
  $('e-art').textContent = e.art;
  $('battle-log').innerHTML = '';
  log(`⚔️ Battle begins! ${state.player.name} vs ${e.name}!`, 'log-system');
  log(`<span class="log-ddraig">Ddraig: "Don't lose, Partner! Show them the power of the Red Dragon Emperor!"</span>`, 'log-ddraig');
  renderBattle();
}

// ── Player actions ────────────────────────────────────────────────────────────

function playerAction(actionId) {
  if (!state.playerTurn || state.battleOver) return;
  const action = PLAYER_ACTIONS.find(a => a.id === actionId);
  if (!action) return;

  const p = state.player;
  if (p.mp < action.mpCost) return;

  const sealed = isGearSealed();
  const gearActions = new Set(['dragonShot','dressBreak','balanceBreaker','crimsonBlaster',
                                'juggernautDrive','longinusSmasher','cardinalCrimson','blazingInferno','infinityBlaster']);
  if (sealed && gearActions.has(actionId)) {
    log('Your Sacred Gear is sealed! You can only use basic attacks and Boost!', 'log-system');
    return;
  }

  p.mp -= action.mpCost;
  attackAnim('player-card');

  // ── BOOST ──
  if (action.effect === 'boost') {
    p.boostMult *= 2;
    const bv = $('boost-value');
    bv.classList.remove('boosting');
    void bv.offsetWidth;
    bv.classList.add('boosting');
    log(`<b>⚡ BOOST!</b> Power doubled! Now ×${p.boostMult}`, 'log-boost');
    if (p.boostMult >= 16)
      log(`<span class="log-ddraig">Ddraig: "PARTNER! The aura of the Red Dragon Emperor is reaching the heavens!!"</span>`, 'log-ddraig');
    else if (p.boostMult >= 8)
      log(`<span class="log-ddraig">Ddraig: "The power flowing through you is incredible, Partner!"</span>`, 'log-ddraig');
    endPlayerTurn(); return;
  }

  // ── HEAL ──
  if (action.effect === 'heal') {
    const heal = Math.floor(p.maxHp * 0.30 + rand(10, 25));
    p.hp = Math.min(p.maxHp, p.hp + heal);
    log(`💖 Rias\'s healing power restores <b>${heal}</b> HP!`, 'log-heal');
    floatDmg('+' + heal, 'dmg-heal', $('player-card'));
    endPlayerTurn(); return;
  }

  // ── DRESS BREAK ──
  if (action.effect === 'dressBreak') {
    const old = state.enemy.def;
    state.enemy.def = Math.max(0, Math.floor(old * 0.5));
    log(`💥 <b>Dress Break!</b> ${state.enemy.name}'s defenses crumble! DEF ${old}→${state.enemy.def}`, 'log-player');
    const dmg = calcDamage(p.atk, 0, 0.5 * p.boostMult * p.queenBonus, false);
    dealDamageToEnemy(dmg, 'log-player');
    p.boostMult = 1;
    endPlayerTurn(); return;
  }

  // ── BALANCE BREAKER ──
  if (action.effect === 'balanceBreaker') {
    if (p.boostMult < 4) { p.mp += action.mpCost; log('Need ×4 boost first!','log-system'); return; }
    addStatus(p, 'dragon', 2);
    const dmg = calcDamage(p.atk, state.enemy.def, action.dmgMult * p.boostMult * p.queenBonus, false);
    log(`🐲 <b>BALANCE BREAKER — Welsh Dragoon!!!</b>`, 'log-boost');
    log(`<span class="log-ddraig">Ddraig: "ROOOOAAARRR!!! Let the heavens tremble!!!"</span>`, 'log-ddraig');
    dealDamageToEnemy(dmg, 'log-critical');
    p.boostMult = 1;
    endPlayerTurn(); return;
  }

  // ── JUGGERNAUT DRIVE ──
  if (action.effect === 'juggernaut') {
    const hpCost = Math.floor(p.hp * 0.30);
    if (p.hp <= Math.floor(p.maxHp * 0.15)) { log('Too low HP for Juggernaut Drive!','log-system'); return; }
    p.hp = Math.max(1, p.hp - hpCost);
    addStatus(p, 'juggernaut', 2);
    log(`🩸 <b>JUGGERNAUT DRIVE!!!</b> Sacrificing ${hpCost} HP to unleash the berserk dragon!`, 'log-boost');
    log(`<span class="log-ddraig">Ddraig: "PARTNER! Don't lose yourself — but don't hold back either!!"</span>`, 'log-ddraig');
    const dmg = calcDamage(p.atk, 0, action.dmgMult * p.queenBonus, Math.random() < 0.3);
    dealDamageToEnemy(dmg, 'log-critical');
    endPlayerTurn(); return;
  }

  // ── LONGINUS SMASHER ──
  if (actionId === 'longinusSmasher') {
    const piercedDef = Math.floor(state.enemy.def * 0.3);
    const isCrit = Math.random() < 0.2;
    const dmg = calcDamage(p.atk, piercedDef, action.dmgMult * p.boostMult * p.queenBonus, isCrit);
    log(`💣 <b>Longinus Smasher!</b> Penetrating fire pierces through armor!${isCrit?' <b class="log-critical">CRITICAL!</b>':''}`, 'log-player');
    dealDamageToEnemy(dmg, isCrit ? 'log-critical' : 'log-damage');
    p.boostMult = 1;
    endPlayerTurn(); return;
  }

  // ── CARDINAL CRIMSON QUEEN ──
  if (action.effect === 'queenState') {
    addStatus(p, 'queenState', 3);
    p.queenBonus = 1.5;
    const dmg = calcDamage(p.atk, state.enemy.def, action.dmgMult * p.boostMult, false);
    log(`👑 <b>Cardinal Crimson Promotion — Queen!</b> Issei's power blazes to 150%!`, 'log-boost');
    log(`<span class="log-ddraig">Ddraig: "True Queen power — the crimson flame of a king burns within you!"</span>`, 'log-ddraig');
    dealDamageToEnemy(dmg, 'log-critical');
    p.boostMult = 1;
    endPlayerTurn(); return;
  }

  // ── BLAZING INFERNO ──
  if (action.effect === 'burnEnemy') {
    const isCrit = Math.random() < 0.2;
    const dmg = calcDamage(p.atk, state.enemy.def, action.dmgMult * p.boostMult * p.queenBonus, isCrit);
    log(`🌋 <b>Blazing Inferno!</b> Dragon fire engulfs the battlefield!`, 'log-boost');
    dealDamageToEnemy(dmg, isCrit ? 'log-critical' : 'log-damage');
    addStatus(state.enemy, 'burn', 3);
    log(`🔥 ${state.enemy.name} is engulfed in dragon flames! (3 turns)`, 'log-damage');
    p.boostMult = 1;
    endPlayerTurn(); return;
  }

  // ── INFINITY BLASTER ──
  if (action.effect === 'infinityBlaster') {
    const dmg = calcDamage(p.atk, Math.floor(state.enemy.def * 0.2), action.dmgMult * p.boostMult * p.queenBonus, true);
    log(`🌟 <b>INFINITY BLASTER!!!</b> The ultimate dragon cannon fires!`, 'log-boost');
    log(`<span class="log-ddraig">Ddraig: "THIS IS THE PINNACLE OF THE RED DRAGON EMPEROR!!! GOOOOO!!!"</span>`, 'log-ddraig');
    dealDamageToEnemy(dmg, 'log-critical');
    p.boostMult = 1;
    endPlayerTurn(); return;
  }

  // ── STANDARD ATTACK ──
  const isCrit = Math.random() < 0.15;
  const dmg = calcDamage(p.atk, state.enemy.def, action.dmgMult * p.boostMult * p.queenBonus, isCrit);
  log(`${action.icon} Issei uses <b>${action.name}</b>!${isCrit?' <b class="log-critical">CRITICAL HIT!</b>':''}`, 'log-player');
  dealDamageToEnemy(dmg, isCrit ? 'log-critical' : 'log-damage');
  p.boostMult = 1;
  endPlayerTurn();
}

function dealDamageToEnemy(dmg, logClass) {
  state.enemy.hp = Math.max(0, state.enemy.hp - dmg);
  log(`💥 Deals <b>${dmg}</b> damage to ${state.enemy.name}!`, logClass);
  floatDmg('-' + dmg, 'dmg-enemy', $('enemy-card'));
  shake('enemy-card');
  renderBattle();
  if (state.enemy.hp <= 0) endBattle(true);
}

function dealDamageToPlayer(dmg, logClass) {
  state.player.hp = Math.max(0, state.player.hp - dmg);
  log(`💔 Issei takes <b>${dmg}</b> damage!`, logClass);
  floatDmg('-' + dmg, 'dmg-player', $('player-card'));
  shake('player-card');
  renderBattle();
  if (state.player.hp <= 0) endBattle(false);
}

function processStatuses(target, isPlayer) {
  const toRemove = [];
  target.statusEffects.forEach(s => {
    if (s.type === 'burn') {
      const dmg = rand(isPlayer ? 8 : 5, isPlayer ? 22 : 18);
      target.hp = Math.max(0, target.hp - dmg);
      log(`🔥 ${target.name} burns for <b>${dmg}</b>!`, 'log-damage');
      if (isPlayer) { shake('player-card'); renderBattle(); }
    }
    if (s.type === 'regen') {
      const heal = Math.floor(target.maxHp * 0.12);
      target.hp = Math.min(target.maxHp, target.hp + heal);
      log(`💚 ${target.name} regenerates <b>${heal}</b> HP!`, 'log-heal');
    }
    if (s.type === 'queenState' && isPlayer && s.turns === 1) {
      state.player.queenBonus = 1;
      log('👑 Cardinal Crimson Queen state fades.', 'log-system');
    }
    s.turns--;
    if (s.turns <= 0) toRemove.push(s.type);
  });
  toRemove.forEach(t => {
    if (t === 'queenState') state.player.queenBonus = 1;
    removeStatus(target, t);
  });
}

function endPlayerTurn() {
  processStatuses(state.player, true);
  renderBattle();
  if (state.player.hp <= 0) { endBattle(false); return; }
  if (state.enemy.hp <= 0) { endBattle(true); return; }
  state.playerTurn = false;
  renderBattle();
  setTimeout(enemyTurn, 1200);
}

function enemyTurn() {
  if (state.battleOver) return;
  const e = state.enemy;
  const moveId = e.moveset[state.moveIndex % e.moveset.length];
  const move = ENEMY_MOVES[moveId];
  state.moveIndex++;
  attackAnim('enemy-card');

  if (!move || e.mp < move.mpCost) {
    log(`${e.name} recovers power...`, 'log-system');
    e.mp = Math.min(e.maxMp, e.mp + 30);
    finishEnemyTurn(); return;
  }
  e.mp -= move.mpCost;
  log(`${e.name} uses <b>${move.name}</b>!`, 'log-enemy');

  if (move.effect === 'selfHeal') {
    const heal = Math.floor(e.maxHp * 0.18);
    e.hp = Math.min(e.maxHp, e.hp + heal);
    log(`💚 ${e.name} heals for <b>${heal}</b> HP!`, 'log-heal');
    floatDmg('+' + heal, 'dmg-heal', $('enemy-card'));
    finishEnemyTurn(); return;
  }

  if (move.effect === 'selfDefUp') {
    e.def = Math.floor(e.def * 1.3);
    log(`🛡️ ${e.name}'s hide hardens! DEF increased!`, 'log-system');
    finishEnemyTurn(); return;
  }

  if (move.effect === 'halve') {
    state.player.boostMult = Math.max(1, Math.floor(state.player.boostMult / 2));
    log(`✂️ <b>DIVIDE!</b> Albion halves Issei's boost power! Now ×${state.player.boostMult}`, 'log-damage');
    addStatus(state.player, 'halved', 1);
  }

  if (move.effect === 'halfMaxHp') {
    state.player.maxHp = Math.max(20, Math.floor(state.player.maxHp / 2));
    state.player.hp = Math.min(state.player.hp, state.player.maxHp);
    log(`😱 ${e.name} halves Issei's max HP! Now <b>${state.player.maxHp}</b>!`, 'log-damage');
  }

  if (move.effect === 'nullBoost') {
    state.player.boostMult = 1;
    log(`🔄 ${e.name} nullifies Issei's boost charge! Reset to ×1!`, 'log-damage');
  }

  if (move.effect === 'seal') {
    addStatus(state.player, 'seal', 2);
    log(`🔒 ${e.name} seals Issei's movement! Sealed for 2 turns!`, 'log-damage');
  }

  if (move.effect === 'sealGear') {
    addStatus(state.player, 'sealGear', 2);
    log(`🚫 ${e.name} nullifies the Sacred Gear! Gear abilities locked for 2 turns!`, 'log-damage');
    log(`<span class="log-ddraig">Ddraig: "Partner! Sacred Gear's power is being blocked — use your own body!"</span>`, 'log-ddraig');
  }

  if (move.effect === 'drainMp') {
    const drained = Math.floor(state.player.mp * 0.4);
    state.player.mp = Math.max(0, state.player.mp - drained);
    log(`💧 ${e.name} drains <b>${drained}</b> MP from Issei!`, 'log-damage');
  }

  if (move.dmgMult > 0) {
    const isCrit = Math.random() < 0.1;
    const dmg = calcDamage(e.atk, state.player.def, move.dmgMult, isCrit);
    if (isCrit) log(`💀 <b class="log-critical">CRITICAL HIT!</b>`, 'log-critical');
    dealDamageToPlayer(dmg, 'log-damage');
  }

  if (move.effect === 'burn' && move.dmgMult > 0) {
    if (Math.random() < 0.55) {
      addStatus(state.player, 'burn', 2);
      log(`🔥 Issei is afflicted with Burns! (2 turns)`, 'log-damage');
    }
  }

  if (!state.battleOver) finishEnemyTurn();
}

function finishEnemyTurn() {
  processStatuses(state.enemy, false);
  if (state.enemy.hp <= 0) { endBattle(true); return; }
  renderBattle();
  state.turnCount++;
  state.player.mp = Math.min(state.player.maxMp, state.player.mp + 12);
  state.playerTurn = true;
  renderBattle();
}

// ── End / Result ──────────────────────────────────────────────────────────────

function endBattle(victory) {
  if (state.battleOver) return;
  state.battleOver = true;
  state.playerTurn = false;

  const ch = CHAPTERS[state.currentChapter];
  const p = state.player;

  if (victory) {
    log(`🏆 <b>${state.enemy.name} is defeated!</b>`, 'log-boost');
    log(`<span class="log-ddraig">Ddraig: "Well done, Partner! That is the power of a Dragon Emperor!"</span>`, 'log-ddraig');

    const expGained = state.enemy.expReward;
    const goldGained = state.enemy.goldReward;
    p.exp += expGained;
    p.gold += goldGained;

    let levelsGained = 0;
    while (p.exp >= p.expToNext) {
      p.exp -= p.expToNext;
      p.level++;
      levelsGained++;
      p.expToNext = expForLevel(p.level);
      p.maxHp  = Math.floor(160 * Math.pow(1.12, p.level - 1));
      p.maxMp  = Math.floor(80  * Math.pow(1.10, p.level - 1));
      p.hp     = p.maxHp;
      p.mp     = p.maxMp;
      p.atk    = Math.floor(18  * Math.pow(1.12, p.level - 1));
      p.def    = Math.floor(10  * Math.pow(1.10, p.level - 1));
    }

    state.chapters[state.currentChapter].completed = true;
    if (state.currentChapter + 1 < CHAPTERS.length)
      state.chapters[state.currentChapter + 1].unlocked = true;

    // Check if a new ability unlocked
    const newAbility = PLAYER_ACTIONS.find(a => a.unlocksAt === p.level);

    setTimeout(() => showResult({
      victory: true, dialog: ch.winDialog,
      expGained, goldGained, levelsGained,
      newAbility: newAbility || null,
    }), 800);
  } else {
    log(`💀 <b>Issei has fallen...</b>`, 'log-damage');
    log(`<span class="log-ddraig">Ddraig: "Don't give up, Partner... you must survive..."</span>`, 'log-ddraig');
    p.hp  = Math.floor(p.maxHp * 0.3);
    p.mp  = Math.floor(p.maxMp * 0.5);
    p.statusEffects = [];
    p.queenBonus = 1;
    setTimeout(() => showResult({ victory: false, dialog: ch.loseDialog }), 800);
  }
}

function showResult(result) {
  showScreen('result');
  const el = $('result-screen');
  if (result.victory) {
    el.className = 'result-victory';
    $('result-icon').textContent = '🏆';
    $('result-title').textContent = 'Victory!';
    $('result-dialog').textContent = result.dialog;
    const newAbilityHTML = result.newAbility
      ? `<div class="reward-row" style="color:var(--gold-light)">
           <span class="reward-label">New Ability!</span>
           <span class="reward-value">${result.newAbility.icon} ${result.newAbility.name}</span>
         </div>` : '';
    $('result-rewards').innerHTML = `
      <div class="reward-row"><span class="reward-label">EXP Gained</span><span class="reward-value">+${result.expGained}</span></div>
      <div class="reward-row"><span class="reward-label">Gold Gained</span><span class="reward-value">+${result.goldGained}</span></div>
      ${result.levelsGained ? `<div class="reward-row"><span class="reward-label">Levels Gained</span><span class="reward-value" style="color:#f1c40f">+${result.levelsGained} (Lv.${state.player.level})</span></div>` : ''}
      ${newAbilityHTML}
    `;
    $('result-btn-retry').classList.add('hidden');
    $('result-btn-continue').textContent =
      state.currentChapter + 1 < CHAPTERS.length ? 'Next Chapter ➜' : '🏆 Return to Map';
  } else {
    el.className = 'result-defeat';
    $('result-icon').textContent = '💀';
    $('result-title').textContent = 'Defeated!';
    $('result-dialog').textContent = result.dialog;
    $('result-rewards').innerHTML = `
      <div class="reward-row"><span class="reward-label">Grow stronger and try again</span><span class="reward-value">—</span></div>`;
    $('result-btn-retry').classList.remove('hidden');
  }
}

// ── Navigation ────────────────────────────────────────────────────────────────

function retryChapter()         { startChapter(state.currentChapter); }
function continueAfterVictory() {
  const next = state.currentChapter + 1;
  if (next < CHAPTERS.length && state.chapters[next].unlocked) startChapter(next);
  else goToMap();
}
function goToMap() {
  state.player.statusEffects = [];
  state.player.queenBonus = 1;
  showScreen('map');
  renderMap();
}
function startGame() {
  Object.assign(state, {
    screen: 'title',
    player: {
      name: 'Issei Hyoudou', title: 'Red Dragon Emperor', art: '🔴',
      level: 1, exp: 0, expToNext: 100,
      hp: 160, maxHp: 160, mp: 80, maxMp: 80,
      atk: 18, def: 10, boostMult: 1,
      statusEffects: [], gold: 0, queenBonus: 1,
    },
    chapters: Array(20).fill(null).map((_, i) => ({ completed: false, unlocked: i === 0 })),
    currentChapter: null, enemy: null, turnCount: 0,
    playerTurn: true, moveIndex: 0, battleOver: false,
  });
  showScreen('map');
  renderMap();
}

// Expose for inline handlers
window.playerAction = playerAction;
window.startChapter = startChapter;
window.enterBattle  = enterBattle;
window.retryChapter = retryChapter;
window.continueAfterVictory = continueAfterVictory;
window.goToMap  = goToMap;
window.startGame = startGame;

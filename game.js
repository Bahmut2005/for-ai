'use strict';

// ── Data ─────────────────────────────────────────────────────────────────────

const CHAPTERS = [
  {
    id: 0,
    name: 'Fallen Angel Ambush',
    subtitle: 'Chapter 1 · Kuoh Town Cemetery',
    enemy: {
      name: 'Raynare',
      title: 'Fallen Angel of Light',
      art: '🖤',
      level: 1,
      hp: 120, maxHp: 120,
      mp: 60, maxMp: 60,
      atk: 14, def: 8,
      expReward: 80, goldReward: 50,
      flavor: '"You\'re just a lowly human. Hand over the Sacred Gear and I\'ll make your death quick."',
      moveset: ['lightSpear', 'lightSpear', 'darkWing', 'lightSpear'],
      statusEffects: [],
    },
    intro: 'The girl who gave you the Red Dragon flyer… she was a Fallen Angel. Now, in the dark cemetery, she stands before you ready to kill.',
    winDialog: 'Raynare: "I-Impossible... a human defeating me?!"',
    loseDialog: 'Raynare: "Did you really think a human could stand against a Fallen Angel? Pathetic."',
  },
  {
    id: 1,
    name: 'Crazed Exorcist',
    subtitle: 'Chapter 2 · Old Church Ruins',
    enemy: {
      name: 'Freed Sellzen',
      title: 'Defrocked Exorcist',
      art: '⛪',
      level: 3,
      hp: 200, maxHp: 200,
      mp: 100, maxMp: 100,
      atk: 20, def: 10,
      expReward: 150, goldReward: 80,
      flavor: '"Hahaha! I LOVE killing devils! The smell of burning Sacred Gear is exquisite!"',
      moveset: ['holySlash', 'holySlash', 'berserkSlash', 'holySlash', 'berserkSlash'],
      statusEffects: [],
    },
    intro: 'A laughing priest with a chainsaw blessed by the church. He doesn\'t care about good or evil — he just wants to kill.',
    winDialog: 'Freed: "Hahaha! I\'ll remember this, Dragon brat!"',
    loseDialog: 'Freed: "Devils die, Sacred Gears shatter, everything burns! Beautiful!"',
  },
  {
    id: 2,
    name: 'Phoenix Riser',
    subtitle: 'Chapter 3 · Riser Phenex Rating Game',
    enemy: {
      name: 'Riser Phenex',
      title: 'Phoenix of the Phenex House',
      art: '🔥',
      level: 5,
      hp: 320, maxHp: 320,
      mp: 160, maxMp: 160,
      atk: 28, def: 15,
      expReward: 250, goldReward: 130,
      flavor: '"You cannot kill a Phoenix. I regenerate. I am immortal. Give up before I embarrass you further."',
      moveset: ['fireBlast', 'fireBlast', 'phoenixRegen', 'fireBlast', 'phoenixWing', 'fireBlast'],
      statusEffects: [],
      special: 'regen',
    },
    intro: 'The arrogant heir of House Phenex. His flame never dies — every wound heals instantly. You need to overwhelm him completely.',
    winDialog: 'Riser: "...This can\'t be. Defeated by a pawn? My pride!"',
    loseDialog: 'Riser: "Did you see that, Rias? This is why low-class devils should stay in their lane."',
  },
  {
    id: 3,
    name: 'Warlord of Heaven',
    subtitle: 'Chapter 4 · Abandoned Factory',
    enemy: {
      name: 'Kokabiel',
      title: 'Fallen Angel Warlord',
      art: '⚡',
      level: 8,
      hp: 500, maxHp: 500,
      mp: 250, maxMp: 250,
      atk: 40, def: 20,
      expReward: 400, goldReward: 200,
      flavor: '"Revive the Three-way War? No. I will START a new one. Beginning with your extermination."',
      moveset: ['lightningSpear', 'darkMeteor', 'lightningSpear', 'warlordStrike', 'lightningSpear', 'darkMeteor', 'angelSlaughter'],
      statusEffects: [],
    },
    intro: 'A general of heaven turned mad warlord. Kokabiel commands power that shakes the earth. Even Sona and Rias are powerless here.',
    winDialog: 'Kokabiel: "...A Dragon Emperor. I underestimated the Red One\'s vessel."',
    loseDialog: 'Kokabiel: "This is why dragons are dangerous. But not dangerous enough."',
  },
  {
    id: 4,
    name: 'Heavenly Dragon Clash',
    subtitle: 'Chapter 5 · Sacred Gear Summit',
    enemy: {
      name: 'Vali Lucifer',
      title: 'White Dragon Emperor · Lucifer Descendant',
      art: '🐉',
      level: 12,
      hp: 800, maxHp: 800,
      mp: 400, maxMp: 400,
      atk: 55, def: 30,
      expReward: 700, goldReward: 350,
      flavor: '"Albion and I will Divide your power in half, Hyoudou Issei. That is the fate of the Red Dragon Emperor."',
      moveset: ['dividePower', 'albionShot', 'dividePower', 'vanishingDragon', 'albionShot', 'dividePower', 'vanishingDragon', 'halfDimension'],
      statusEffects: [],
      special: 'halve',
    },
    intro: 'Vali — the rival of the Red Dragon Emperor. His Sacred Gear Vanishing Dragon can halve your power with every hit. The ultimate clash of the Two Heavenly Dragons.',
    winDialog: 'Vali: "...Interesting. You\'ve grown to be a worthy rival, Issei Hyoudou."',
    loseDialog: 'Vali: "Albion and I will await the day you can truly challenge us."',
  },
];

const ENEMY_MOVES = {
  lightSpear:     { name: 'Light Spear',     dmgMult: 1.0, mpCost: 8,  desc: 'Hurls a holy light lance.',   effect: null },
  darkWing:       { name: 'Dark Wing Slash',  dmgMult: 1.2, mpCost: 12, desc: 'Swoops with shadowed wings.', effect: null },
  holySlash:      { name: 'Holy Chainsaw',    dmgMult: 1.1, mpCost: 10, desc: 'Screaming blessed blade!',    effect: null },
  berserkSlash:   { name: 'Berserk Slash',    dmgMult: 1.5, mpCost: 18, desc: 'Wild unstoppable strike!',    effect: null },
  fireBlast:      { name: 'Phoenix Flame',    dmgMult: 1.1, mpCost: 12, desc: 'Scorching phoenix fire.',     effect: 'burn' },
  phoenixRegen:   { name: 'Immortal Flame',   dmgMult: 0,   mpCost: 20, desc: 'Heals with undying flame.',   effect: 'selfHeal' },
  phoenixWing:    { name: 'Phoenix Wing',     dmgMult: 1.3, mpCost: 15, desc: 'Burning feather slash.',      effect: null },
  lightningSpear: { name: 'Lightning Spear',  dmgMult: 1.2, mpCost: 15, desc: 'Crack of divine lightning.',  effect: null },
  darkMeteor:     { name: 'Dark Meteor',      dmgMult: 1.6, mpCost: 25, desc: 'Calls down void meteors.',    effect: null },
  warlordStrike:  { name: 'Warlord Strike',   dmgMult: 1.8, mpCost: 30, desc: 'Overwhelming warlord blow!', effect: null },
  angelSlaughter: { name: 'Angel Slaughter',  dmgMult: 2.0, mpCost: 40, desc: 'Apocalyptic holy strike!',   effect: null },
  dividePower:    { name: 'DIVIDE!',          dmgMult: 0.8, mpCost: 20, desc: 'Halves your current power!',  effect: 'halve' },
  albionShot:     { name: 'Albion Shot',      dmgMult: 1.4, mpCost: 18, desc: 'White Dragon energy beam!',  effect: null },
  vanishingDragon:{ name: 'Vanishing Dragon', dmgMult: 2.0, mpCost: 35, desc: 'White dragon breath!',       effect: null },
  halfDimension:  { name: 'Half Dimension',   dmgMult: 0,   mpCost: 50, desc: 'Halves your max HP!',        effect: 'halfMaxHp' },
};

const PLAYER_ACTIONS = [
  {
    id: 'punch',
    name: 'Dragon Punch',
    icon: '👊',
    type: 'attack',
    desc: 'A powerful punch from the gauntlet',
    mpCost: 0,
    dmgMult: 1.0,
    effect: null,
  },
  {
    id: 'boost',
    name: 'BOOST!',
    icon: '⚡',
    type: 'boost',
    desc: 'Ddraig doubles your power! Stacks up.',
    mpCost: 0,
    dmgMult: 0,
    effect: 'boost',
  },
  {
    id: 'dragonShot',
    name: 'Dragon Shot',
    icon: '🔴',
    type: 'attack',
    desc: 'Fire a burst of dragon energy',
    mpCost: 15,
    dmgMult: 1.6,
    effect: null,
  },
  {
    id: 'dressBreak',
    name: 'Dress Break!',
    icon: '💥',
    type: 'special',
    desc: 'Tears off enemy armor, lowering defense',
    mpCost: 20,
    dmgMult: 0.5,
    effect: 'dressBreak',
  },
  {
    id: 'balanceBreaker',
    name: 'Balance Breaker',
    icon: '🐲',
    type: 'special',
    desc: 'Welsh Dragoon! Max power awakened',
    mpCost: 60,
    dmgMult: 4.0,
    effect: 'balanceBreaker',
  },
  {
    id: 'heal',
    name: 'Rias\'s Gift',
    icon: '💖',
    type: 'support',
    desc: 'Recover HP with devil power',
    mpCost: 25,
    dmgMult: 0,
    effect: 'heal',
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
    exp: 0,
    expToNext: 100,
    hp: 160, maxHp: 160,
    mp: 80, maxMp: 80,
    atk: 18, def: 10,
    boostMult: 1,
    boostCount: 0,
    statusEffects: [],
    gold: 0,
  },
  chapters: Array(5).fill(null).map((_, i) => ({ completed: false, unlocked: i === 0 })),
  currentChapter: null,
  enemy: null,
  turnCount: 0,
  playerTurn: true,
  moveIndex: 0,
  pendingResult: null,
  battleOver: false,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pct(val, max) { return clamp((val / max) * 100, 0, 100); }

function expForLevel(lvl) { return Math.floor(100 * Math.pow(1.45, lvl - 1)); }

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

// ── DOM helpers ───────────────────────────────────────────────────────────────

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

// ── Rendering ─────────────────────────────────────────────────────────────────

function renderBattle() {
  const p = state.player;
  const e = state.enemy;
  if (!e) return;

  // Player card
  $('p-hp-bar').style.width = pct(p.hp, p.maxHp) + '%';
  $('p-hp-val').textContent = `${p.hp} / ${p.maxHp}`;
  $('p-mp-bar').style.width = pct(p.mp, p.maxMp) + '%';
  $('p-mp-val').textContent = `${p.mp} / ${p.maxMp}`;
  $('p-exp-bar').style.width = pct(p.exp, p.expToNext) + '%';
  $('p-exp-label').textContent = `EXP ${p.exp}/${p.expToNext}`;
  $('p-level').textContent = `Lv.${p.level}`;
  $('boost-value').textContent = `×${p.boostMult}`;
  if (p.boostMult > 1) {
    $('boost-display').classList.add('sacred-gear-active');
  } else {
    $('boost-display').classList.remove('sacred-gear-active');
  }

  // Enemy card
  $('e-hp-bar').style.width = pct(e.hp, e.maxHp) + '%';
  $('e-hp-val').textContent = `${e.hp} / ${e.maxHp}`;
  $('e-mp-bar').style.width = pct(e.mp, e.maxMp) + '%';
  $('e-mp-val').textContent = `${e.mp} / ${e.maxMp}`;

  renderStatusEffects('p-statuses', p.statusEffects);
  renderStatusEffects('e-statuses', e.statusEffects);

  // Turn indicator
  const tb = $('turn-badge');
  if (state.playerTurn) {
    tb.textContent = 'YOUR TURN';
    tb.className = 'turn-badge turn-player';
  } else {
    tb.textContent = 'ENEMY TURN';
    tb.className = 'turn-badge turn-enemy turn-enemy-thinking';
  }

  // Action buttons
  document.querySelectorAll('.btn-action').forEach(btn => {
    const id = btn.dataset.action;
    const action = PLAYER_ACTIONS.find(a => a.id === id);
    if (!action) return;
    btn.disabled = !state.playerTurn || state.battleOver ||
      p.mp < action.mpCost ||
      (action.id === 'balanceBreaker' && p.boostMult < 4);
  });
}

function renderStatusEffects(containerId, effects) {
  const el = $(containerId);
  if (!el) return;
  el.innerHTML = effects.map(s => {
    const labels = {
      burn: '🔥 Burn',
      regen: '💚 Regen',
      seal: '🔒 Sealed',
      divined: '✨ Divined',
      halved: '➗ Halved',
      dragon: '🐲 Dragon Awakened',
    };
    const classes = {
      burn: 'status-burn', regen: 'status-regen', seal: 'status-seal',
      divined: 'status-divined', halved: 'status-halved', dragon: 'status-dragon',
    };
    return `<span class="status-badge ${classes[s.type] || ''}">${labels[s.type] || s.type}${s.turns > 0 ? ' (' + s.turns + ')' : ''}</span>`;
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
  list.innerHTML = CHAPTERS.map((ch, i) => {
    const cs = state.chapters[i];
    const locked = !cs.unlocked;
    const done = cs.completed;
    return `
      <div class="chapter-card ${locked ? 'locked' : ''} ${done ? 'completed' : ''}"
           onclick="${locked ? '' : `startChapter(${i})`}">
        <div class="chapter-num">${i + 1}</div>
        <div class="chapter-info">
          <div class="chapter-name">${ch.name}</div>
          <div class="chapter-sub">${ch.subtitle}</div>
        </div>
        <div class="chapter-badge">${done ? '✅' : locked ? '🔒' : '⚔️'}</div>
      </div>`;
  }).join('');
}

// ── Combat logic ──────────────────────────────────────────────────────────────

function calcDamage(atk, def, mult, isCrit) {
  const base = Math.max(1, atk - Math.floor(def / 2));
  const dmg = Math.floor(base * mult * (isCrit ? 1.8 : 1) * (0.85 + Math.random() * 0.3));
  return dmg;
}

function addStatus(target, type, turns) {
  const existing = target.statusEffects.find(s => s.type === type);
  if (existing) { existing.turns = Math.max(existing.turns, turns); return; }
  target.statusEffects.push({ type, turns });
}

function removeStatus(target, type) {
  target.statusEffects = target.statusEffects.filter(s => s.type !== type);
}

function processStatuses(target, isPlayer) {
  const toRemove = [];
  target.statusEffects.forEach(s => {
    if (s.type === 'burn') {
      const dmg = isPlayer ? rand(8, 18) : rand(5, 15);
      target.hp = Math.max(0, target.hp - dmg);
      log(`🔥 ${target.name} takes <b>${dmg}</b> burn damage!`, 'log-damage');
      if (isPlayer) shake('player-card');
    }
    if (s.type === 'regen') {
      const heal = Math.floor(target.maxHp * 0.12);
      target.hp = Math.min(target.maxHp, target.hp + heal);
      log(`💚 ${target.name} regenerates <b>${heal}</b> HP!`, 'log-heal');
    }
    s.turns--;
    if (s.turns <= 0) toRemove.push(s.type);
  });
  toRemove.forEach(t => removeStatus(target, t));
}

function playerAction(actionId) {
  if (!state.playerTurn || state.battleOver) return;
  const action = PLAYER_ACTIONS.find(a => a.id === actionId);
  if (!action || state.player.mp < action.mpCost) return;

  state.player.mp -= action.mpCost;
  attackAnim('player-card');

  if (action.effect === 'boost') {
    state.player.boostMult *= 2;
    state.player.boostCount++;
    $('boost-value').classList.remove('boosting');
    void $('boost-value').offsetWidth;
    $('boost-value').classList.add('boosting');
    log(`<b>⚡ BOOST!</b> Power multiplied! Now ×${state.player.boostMult}`, 'log-boost');
    if (state.player.boostMult >= 8) {
      log(`<span class="log-ddraig">Ddraig: "Partner! The power flowing through you is incredible!"</span>`, 'log-ddraig');
    }
    endPlayerTurn();
    return;
  }

  if (action.effect === 'heal') {
    const healAmt = Math.floor(state.player.maxHp * 0.30 + rand(10, 20));
    state.player.hp = Math.min(state.player.maxHp, state.player.hp + healAmt);
    log(`💖 Rias\'s power heals Issei for <b>${healAmt}</b> HP!`, 'log-heal');
    floatDmg('+' + healAmt, 'dmg-heal', $('player-card'));
    endPlayerTurn();
    return;
  }

  if (action.effect === 'dressBreak') {
    const targetDef = state.enemy.def;
    state.enemy.def = Math.max(0, Math.floor(state.enemy.def * 0.5));
    log(`💥 <b>Dress Break!</b> ${state.enemy.name}'s defenses crumble! (DEF ${targetDef} → ${state.enemy.def})`, 'log-player');
    const dmg = calcDamage(state.player.atk, 0, 0.5 * state.player.boostMult, false);
    dealDamageToEnemy(dmg, 'log-player');
    state.player.boostMult = 1;
    endPlayerTurn();
    return;
  }

  if (action.effect === 'balanceBreaker') {
    if (state.player.boostMult < 4) {
      log('You need at least ×4 boost to use Balance Breaker!', 'log-system');
      state.player.mp += action.mpCost;
      return;
    }
    addStatus(state.player, 'dragon', 2);
    const dmg = calcDamage(state.player.atk, state.enemy.def, action.dmgMult * state.player.boostMult, false);
    log(`🐲 <b>BALANCE BREAKER — Welsh Dragoon!!!</b>`, 'log-boost');
    log(`<span class="log-ddraig">Ddraig: "ROOOOAAARRR!!! Let the heavens tremble!!!"</span>`, 'log-ddraig');
    dealDamageToEnemy(dmg, 'log-critical');
    state.player.boostMult = 1;
    endPlayerTurn();
    return;
  }

  // Normal attack
  const isCrit = Math.random() < 0.15;
  const dmg = calcDamage(state.player.atk, state.enemy.def, action.dmgMult * state.player.boostMult, isCrit);
  log(`👊 Issei uses <b>${action.name}</b>!${isCrit ? ' <b class="log-critical">CRITICAL HIT!</b>' : ''}`, 'log-player');
  dealDamageToEnemy(dmg, isCrit ? 'log-critical' : 'log-damage');
  state.player.boostMult = 1;
  endPlayerTurn();
}

function dealDamageToEnemy(dmg, logClass) {
  state.enemy.hp = Math.max(0, state.enemy.hp - dmg);
  log(`💥 Deals <b>${dmg}</b> damage to ${state.enemy.name}!`, logClass);
  floatDmg('-' + dmg, 'dmg-enemy', $('enemy-card'));
  shake('enemy-card');
  renderBattle();
  if (state.enemy.hp <= 0) {
    endBattle(true);
  }
}

function dealDamageToPlayer(dmg, logClass) {
  state.player.hp = Math.max(0, state.player.hp - dmg);
  log(`💔 Issei takes <b>${dmg}</b> damage!`, logClass);
  floatDmg('-' + dmg, 'dmg-player', $('player-card'));
  shake('player-card');
  renderBattle();
  if (state.player.hp <= 0) {
    endBattle(false);
  }
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

  if (!move) { state.playerTurn = true; renderBattle(); return; }

  // Check MP
  if (e.mp < move.mpCost) {
    log(`${e.name} is out of power and rests...`, 'log-system');
    e.mp = Math.min(e.maxMp, e.mp + 20);
    finishEnemyTurn();
    return;
  }
  e.mp -= move.mpCost;
  log(`${e.name} uses <b>${move.name}</b>! — ${move.desc}`, 'log-enemy');

  if (move.effect === 'selfHeal') {
    const heal = Math.floor(e.maxHp * 0.18);
    e.hp = Math.min(e.maxHp, e.hp + heal);
    log(`💚 ${e.name} heals for <b>${heal}</b> HP!`, 'log-heal');
    floatDmg('+' + heal, 'dmg-heal', $('enemy-card'));
    finishEnemyTurn();
    return;
  }

  if (move.effect === 'halve') {
    state.player.boostMult = Math.max(1, Math.floor(state.player.boostMult / 2));
    log(`✂️ <b>DIVIDE!</b> Albion halves Issei's boost power! Now ×${state.player.boostMult}`, 'log-damage');
    addStatus(state.player, 'halved', 1);
  }

  if (move.effect === 'halfMaxHp') {
    state.player.maxHp = Math.max(20, Math.floor(state.player.maxHp / 2));
    state.player.hp = Math.min(state.player.hp, state.player.maxHp);
    log(`😱 Half Dimension! Issei's max HP is halved to <b>${state.player.maxHp}</b>!`, 'log-damage');
  }

  if (move.dmgMult > 0) {
    const isCrit = Math.random() < 0.1;
    const dmg = calcDamage(e.atk, state.player.def, move.dmgMult, isCrit);
    if (isCrit) log(`💀 <b class="log-critical">CRITICAL HIT!</b>`, 'log-critical');
    dealDamageToPlayer(dmg, 'log-damage');
  }

  if (move.effect === 'burn') {
    if (Math.random() < 0.6) {
      addStatus(state.player, 'burn', 2);
      log(`🔥 Issei is afflicted with Burns for 2 turns!`, 'log-damage');
    }
  }

  if (!state.battleOver) finishEnemyTurn();
}

function finishEnemyTurn() {
  processStatuses(state.enemy, false);
  renderBattle();
  if (state.enemy.hp <= 0) { endBattle(true); return; }
  state.turnCount++;
  state.player.mp = Math.min(state.player.maxMp, state.player.mp + 10);
  state.playerTurn = true;
  renderBattle();
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
  state.player.boostCount = 0;
  state.player.statusEffects = [];
  state.player.hp = state.player.maxHp;
  state.player.mp = state.player.maxMp;

  showChapterIntro(idx);
}

function showChapterIntro(idx) {
  const ch = CHAPTERS[idx];
  const e = state.enemy;
  showScreen('story');
  $('story-content').innerHTML = `
    <div class="chapter-intro">
      <div class="intro-chapter-tag">${ch.subtitle}</div>
      <div class="intro-enemy-art">${e.art}</div>
      <div class="intro-enemy-name">${e.name}</div>
      <div class="intro-enemy-title">${e.title}</div>
      <div class="intro-flavor">${ch.intro}</div>
      <div class="story-box" style="font-style:italic; color: #c39bd3; max-width:400px; text-align:center; padding:12px 20px;">
        ${e.flavor}
      </div>
      <button class="btn btn-primary" onclick="enterBattle()">⚔️ Fight!</button>
    </div>
  `;
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
  log(`⚔️ Battle begins! ${state.player.name} vs ${state.enemy.name}!`, 'log-system');
  log(`<span class="log-ddraig">Ddraig: "Don't lose, Partner! Show them the power of the Red Dragon Emperor!"</span>`, 'log-ddraig');
  renderBattle();
}

function endBattle(victory) {
  if (state.battleOver) return;
  state.battleOver = true;
  state.playerTurn = false;

  const ch = CHAPTERS[state.currentChapter];
  const p = state.player;

  if (victory) {
    log(`🏆 <b>${state.enemy.name} is defeated!</b>`, 'log-boost');
    log(`<span class="log-ddraig">Ddraig: "Well done, Partner! That's the power of a Dragon Emperor!"</span>`, 'log-ddraig');

    const expGained = state.enemy.expReward;
    const goldGained = state.enemy.goldReward;
    p.exp += expGained;
    p.gold += goldGained;

    let leveledUp = false;
    let levelsGained = 0;
    while (p.exp >= p.expToNext) {
      p.exp -= p.expToNext;
      p.level++;
      levelsGained++;
      p.expToNext = expForLevel(p.level);
      p.maxHp = Math.floor(160 * Math.pow(1.12, p.level - 1));
      p.maxMp = Math.floor(80 * Math.pow(1.1, p.level - 1));
      p.hp = p.maxHp;
      p.mp = p.maxMp;
      p.atk = Math.floor(18 * Math.pow(1.12, p.level - 1));
      p.def = Math.floor(10 * Math.pow(1.1, p.level - 1));
      leveledUp = true;
    }

    state.chapters[state.currentChapter].completed = true;
    if (state.currentChapter + 1 < CHAPTERS.length) {
      state.chapters[state.currentChapter + 1].unlocked = true;
    }

    state.pendingResult = {
      victory: true,
      dialog: ch.winDialog,
      expGained, goldGained, leveledUp, levelsGained,
    };

    setTimeout(() => showResult(state.pendingResult), 800);
  } else {
    log(`💀 <b>Issei has fallen...</b>`, 'log-damage');
    log(`<span class="log-ddraig">Ddraig: "Don't give up, Partner... survive this..."</span>`, 'log-ddraig');

    state.player.hp = Math.floor(state.player.maxHp * 0.3);
    state.player.mp = Math.floor(state.player.maxMp * 0.5);
    state.player.maxHp = Math.floor(160 * Math.pow(1.12, p.level - 1));
    state.player.statusEffects = [];

    state.pendingResult = { victory: false, dialog: ch.loseDialog };
    setTimeout(() => showResult(state.pendingResult), 800);
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
    const rewards = $('result-rewards');
    rewards.innerHTML = `
      <div class="reward-row"><span class="reward-label">EXP Gained</span><span class="reward-value">+${result.expGained}</span></div>
      <div class="reward-row"><span class="reward-label">Gold Gained</span><span class="reward-value">+${result.goldGained}</span></div>
      ${result.leveledUp ? `<div class="reward-row"><span class="reward-label">Level Up!</span><span class="reward-value" style="color:#f1c40f">Lv.${state.player.level} (+${result.levelsGained})</span></div>` : ''}
      <div class="reward-row"><span class="reward-label">Issei's Level</span><span class="reward-value">${state.player.level}</span></div>
    `;
    $('result-btn-retry').classList.add('hidden');
    const continueBtn = $('result-btn-continue');
    if (state.currentChapter + 1 < CHAPTERS.length) {
      continueBtn.textContent = 'Next Chapter ➜';
    } else {
      continueBtn.textContent = '🏆 Return to Map';
    }
  } else {
    el.className = 'result-defeat';
    $('result-icon').textContent = '💀';
    $('result-title').textContent = 'Defeated!';
    $('result-dialog').textContent = result.dialog;
    $('result-rewards').innerHTML = `
      <div class="reward-row"><span class="reward-label">Survive and grow stronger...</span><span class="reward-value">Try again</span></div>
    `;
    $('result-btn-retry').classList.remove('hidden');
  }
}

function retryChapter() {
  startChapter(state.currentChapter);
}

function continueAfterVictory() {
  const next = state.currentChapter + 1;
  if (next < CHAPTERS.length && state.chapters[next].unlocked) {
    startChapter(next);
  } else {
    showScreen('map');
    renderMap();
  }
}

function goToMap() {
  state.player.statusEffects = [];
  showScreen('map');
  renderMap();
}

function startGame() {
  state.player = {
    name: 'Issei Hyoudou',
    title: 'Red Dragon Emperor',
    art: '🔴',
    level: 1,
    exp: 0,
    expToNext: 100,
    hp: 160, maxHp: 160,
    mp: 80, maxMp: 80,
    atk: 18, def: 10,
    boostMult: 1,
    boostCount: 0,
    statusEffects: [],
    gold: 0,
  };
  state.chapters = Array(5).fill(null).map((_, i) => ({ completed: false, unlocked: i === 0 }));
  showScreen('map');
  renderMap();
}

// expose for onclick handlers
window.playerAction = playerAction;
window.startChapter = startChapter;
window.enterBattle = enterBattle;
window.retryChapter = retryChapter;
window.continueAfterVictory = continueAfterVictory;
window.goToMap = goToMap;
window.startGame = startGame;

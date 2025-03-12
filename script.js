"use strict";

/*===================================
  Hard-coded PCs (Players)
===================================*/
const pcs = [
  { id: 100, name: "Ken", attack: 13, defense: 13, toughness: 6, speed: 8, fortune: 7, woundPoints: 0, isPC: true },
  { id: 101, name: "Oleg", attack: 14, backupAttack: 13, defense: 14, toughness: 7, speed: 7, fortune: 7, woundPoints: 0, isPC: true },
  { id: 102, name: "Bai Zhu", attack: 16, defense: 15, toughness: 5, speed: 6, fortune: 10, woundPoints: 0, isPC: true },
  { id: 103, name: "Shen Dao", attack: 14, defense: 13, toughness: 6, speed: 7, fortune: 8, woundPoints: 0, isPC: true }
];

/*===================================
  NPC Array and ID Counter
===================================*/
let npcs = [];
let npcIdCounter = 200;
function getNextNpcId() {
  return npcIdCounter++;
}

/*===================================
  Global Modal Variables (declared once)
===================================*/
let currentNpcIdModal = null; // For modal panel usage
const dbPanel = document.getElementById('dbPanel');
const dbClose = document.getElementById('dbClose');
const weaponListDB = document.getElementById('weaponListDB');
const schtickListDB = document.getElementById('schtickListDB');

/*===================================
  DOM Elements
===================================*/
const pcList = document.getElementById('pcList');
const npcList = document.getElementById('npcList');

const addEnemyForm = document.getElementById('addEnemyForm');
const enemyNameInput = document.getElementById('enemyName');
const enemyTypeSelect = document.getElementById('enemyType');
const mookCountContainer = document.getElementById('mookCountContainer');
const mookCountInput = document.getElementById('mookCount');

const mookTemplateContainer = document.getElementById('mookTemplateContainer');
const mookTemplateSelect = document.getElementById('mookTemplate');
const featuredTemplateContainer = document.getElementById('featuredTemplateContainer');
const featuredTemplateSelect = document.getElementById('featuredTemplate');

const playerAttackerSelect = document.getElementById('playerAttacker');
const npcTargetSelect = document.getElementById('npcTarget');
const npcAttackerSelect = document.getElementById('npcAttacker');
const playerTargetSelect = document.getElementById('playerTarget');

const playerActionForm = document.getElementById('playerActionForm');
const npcActionForm = document.getElementById('npcActionForm');

const playerRollResultInput = document.getElementById('playerRollResult');
const playerModifierInput = document.getElementById('playerModifier');
const playerWeaponDamageInput = document.getElementById('playerWeaponDamage');

const npcModifierInput = document.getElementById('npcModifier');
const npcWeaponDamageInput = document.getElementById('npcWeaponDamage');
const npcRollDiceButton = document.getElementById('npcRollDiceButton');
const npcRollResultDiv = document.getElementById('npcRollResult');

const logList = document.getElementById('logList');
const exportButton = document.getElementById('exportButton');
const importButton = document.getElementById('importButton');
const importFileInput = document.getElementById('importFileInput');

/*===================================
  Utility Functions
===================================*/
function renderStatRow(label, statValue, id, statKey) {
  return `
    <div class="statRow">
      <span>${label}: <strong id="${statKey}-${id}">${statValue}</strong></span>
      <button data-id="${id}" class="inc${statKey}">+</button>
      <button data-id="${id}" class="dec${statKey}">–</button>
    </div>
  `;
}

function populateFeaturedTemplateDropdown() {
  featuredTemplateSelect.innerHTML = '<option value="" disabled selected>Select Template</option>';
  for (const key in featuredTemplates) {
    if (featuredTemplates.hasOwnProperty(key)) {
      const option = document.createElement('option');
      option.value = key;
      let label = key.replace(/([A-Z])/g, ' $1').trim();
      label = label.charAt(0).toUpperCase() + label.slice(1);
      option.textContent = label;
      featuredTemplateSelect.appendChild(option);
    }
  }
}
populateFeaturedTemplateDropdown();

function populateMookTemplateDropdown() {
  mookTemplateSelect.innerHTML = '<option value="" disabled selected>Select Mook Template</option>';
  for (const key in mookTemplates) {
    if (mookTemplates.hasOwnProperty(key)) {
      const option = document.createElement('option');
      option.value = key;
      let label = key.replace(/([A-Z])/g, ' $1').trim();
      label = label.charAt(0).toUpperCase() + label.slice(1);
      option.textContent = label;
      mookTemplateSelect.appendChild(option);
    }
  }
}
populateMookTemplateDropdown();

/*===================================
  Update Display Functions
===================================*/
function updatePcList() {
  pcList.innerHTML = '';
  pcs.forEach(pc => {
    let cardHTML = `<h3>${pc.name}</h3>`;
    cardHTML += renderStatRow("Attack", pc.attack, pc.id, "Attack");
    if (pc.backupAttack !== undefined) {
      cardHTML += renderStatRow("Backup Attack", pc.backupAttack, pc.id, "BackupAttack");
    }
    cardHTML += renderStatRow("Defense", pc.defense, pc.id, "Defense");
    cardHTML += renderStatRow("Toughness", pc.toughness, pc.id, "Toughness");
    cardHTML += renderStatRow("Speed", pc.speed, pc.id, "Speed");
    cardHTML += renderStatRow("Fortune", pc.fortune, pc.id, "Fortune");
    cardHTML += renderStatRow("Wound Points", pc.woundPoints, pc.id, "Wound");
    const li = document.createElement('li');
    li.className = "combatantCard";
    li.innerHTML = cardHTML;
    pcList.appendChild(li);
  });
  attachPcListeners();
}

function updateNpcList() {
  npcList.innerHTML = '';
  npcs.forEach(npc => {
    let cardHTML = "";
    if (npc.type === "mook") {
      cardHTML += `<h3>${npc.name} (Mook)</h3>`;
      cardHTML += renderStatRow("Attack", npc.attack, npc.id, "Attack");
      cardHTML += renderStatRow("Defense", npc.defense, npc.id, "Defense");
      cardHTML += renderStatRow("Toughness", npc.toughness, npc.id, "Toughness");
      cardHTML += renderStatRow("Speed", npc.speed, npc.id, "Speed");
      cardHTML += renderStatRow("Fortune", npc.fortune || 0, npc.id, "Fortune");
      cardHTML += `<div class="statRow">
                     <span>Mook Count: <strong id="mook-${npc.id}">${npc.count}</strong></span>
                     <button data-id="${npc.id}" class="incMook">+</button>
                     <button data-id="${npc.id}" class="decMook">–</button>
                   </div>`;
    } else {
      cardHTML += `<h3>${npc.name} (${npc.type.charAt(0).toUpperCase() + npc.type.slice(1)})</h3>`;
      cardHTML += renderStatRow("Attack", npc.attack, npc.id, "Attack");
      cardHTML += renderStatRow("Defense", npc.defense, npc.id, "Defense");
      cardHTML += renderStatRow("Toughness", npc.toughness, npc.id, "Toughness");
      cardHTML += renderStatRow("Speed", npc.speed, npc.id, "Speed");
      cardHTML += renderStatRow("Fortune", npc.fortune || 0, npc.id, "Fortune");
      cardHTML += renderStatRow("Wound Points", npc.woundPoints, npc.id, "Wound");
      // Display weapons (showing name and first damage number)
      if (npc.weapons && npc.weapons.length > 0) {
        cardHTML += `<div class="weaponList"><h4>Weapons:</h4><ul>`;
        npc.weapons.forEach(weapon => {
          const damageValue = weapon.damage.split("/")[0];
          cardHTML += `<li><strong>${weapon.name}</strong>: ${damageValue}</li>`;
        });
        cardHTML += `</ul></div>`;
      }
      // Display schticks with only the title bolded
      if (npc.schticks && npc.schticks.length > 0) {
        cardHTML += `<div class="schtickList"><h4>Schticks:</h4><ul>`;
        npc.schticks.forEach(schtick => {
          const parts = schtick.split(':');
          if (parts.length > 1) {
            const title = parts[0].trim();
            const description = parts.slice(1).join(':').trim();
            cardHTML += `<li><strong>${title}</strong>: ${description}</li>`;
          } else {
            cardHTML += `<li><strong>${schtick}</strong></li>`;
          }
        });
        cardHTML += `</ul></div>`;
      }
      // Add a '+' button for database panel
      cardHTML += `<button data-id="${npc.id}" class="addDB">+</button>`;
    }
    cardHTML += `<button data-id="${npc.id}" class="removeEnemy removeBtn">Remove</button>`;
    const li = document.createElement('li');
    li.className = "combatantCard";
    li.innerHTML = cardHTML;
    npcList.appendChild(li);
  });
  attachNpcListeners();
  attachRemoveNpcListeners(); // Added to attach Remove button listeners
}

function updateAttackDropdowns() {
  playerAttackerSelect.innerHTML = '';
  pcs.forEach(pc => {
    const option = document.createElement('option');
    option.value = pc.id;
    option.textContent = pc.name;
    playerAttackerSelect.appendChild(option);
  });
  npcTargetSelect.innerHTML = '';
  npcs.forEach(npc => {
    if (npc.type !== "mook" || npc.count > 0) {
      const option = document.createElement('option');
      option.value = npc.id;
      option.textContent = npc.name;
      npcTargetSelect.appendChild(option);
    }
  });
  npcAttackerSelect.innerHTML = '';
  npcs.forEach(npc => {
    if (npc.type !== "mook" || npc.count > 0) {
      const option = document.createElement('option');
      option.value = npc.id;
      option.textContent = npc.name;
      npcAttackerSelect.appendChild(option);
    }
  });
  playerTargetSelect.innerHTML = '';
  pcs.forEach(pc => {
    const option = document.createElement('option');
    option.value = pc.id;
    option.textContent = pc.name;
    playerTargetSelect.appendChild(option);
  });
}

/*===================================
  Modal Panel for Database Items
===================================*/
function openDBPanel(npcId) {
  currentNpcIdModal = npcId;
  // Populate weapons list
  weaponListDB.innerHTML = '';
  weaponDatabase.forEach(item => {
    const li = document.createElement('li');
    const dmg = item.damage.split("/")[0];
    li.innerHTML = `<strong>${item.name}</strong>: ${dmg}`;
    li.addEventListener('click', () => {
      addWeaponToNpc(item);
      closeDBPanel();
    });
    weaponListDB.appendChild(li);
  });
  // Populate schticks list (bold only the title before the colon)
  schtickListDB.innerHTML = '';
  schtickDatabase.forEach(item => {
    const li = document.createElement('li');
    const parts = item.split(':');
    if (parts.length > 1) {
      const title = parts[0].trim();
      const description = parts.slice(1).join(':').trim();
      li.innerHTML = `<strong>${title}</strong>: ${description}`;
    } else {
      li.innerHTML = `<strong>${item}</strong>`;
    }
    li.addEventListener('click', () => {
      addSchtickToNpc(item);
      closeDBPanel();
    });
    schtickListDB.appendChild(li);
  });
  dbPanel.style.display = "flex";
}

function closeDBPanel() {
  dbPanel.style.display = "none";
  currentNpcIdModal = null;
}

function addWeaponToNpc(weaponItem) {
  const npc = npcs.find(npc => npc.id === currentNpcIdModal);
  if (npc) {
    npc.weapons = npc.weapons || [];
    if (!npc.weapons.some(w => w.name === weaponItem.name)) {
      npc.weapons.push(weaponItem);
      logEvent(`Added weapon "${weaponItem.name}" to ${npc.name}`);
    }
    updateNpcList();
  }
}

function addSchtickToNpc(schtickItem) {
  const npc = npcs.find(npc => npc.id === currentNpcIdModal);
  if (npc) {
    npc.schticks = npc.schticks || [];
    if (!npc.schticks.includes(schtickItem)) {
      npc.schticks.push(schtickItem);
      logEvent(`Added schtick to ${npc.name}: ${schtickItem}`);
    }
    updateNpcList();
  }
}

dbClose.addEventListener('click', closeDBPanel);
window.addEventListener('click', (e) => {
  if (e.target === dbPanel) {
    closeDBPanel();
  }
});

/*===================================
  Event Listeners for PC and NPC Buttons
===================================*/
function attachPcListeners() {
  document.querySelectorAll('.incAttack').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc) { pc.attack++; updatePcList(); logEvent(`Increased ${pc.name}'s Attack to ${pc.attack}`); }
    });
  });
  document.querySelectorAll('.decAttack').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc) { pc.attack--; if(pc.attack < 0) pc.attack = 0; updatePcList(); logEvent(`Decreased ${pc.name}'s Attack to ${pc.attack}`); }
    });
  });
  // (Similar listeners for Backup Attack, Defense, Toughness, Speed, Fortune, and Wound Points)
  document.querySelectorAll('.incBackupAttack').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc && pc.backupAttack !== undefined) { pc.backupAttack++; updatePcList(); logEvent(`Increased ${pc.name}'s Backup Attack to ${pc.backupAttack}`); }
    });
  });
  document.querySelectorAll('.decBackupAttack').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc && pc.backupAttack !== undefined) { pc.backupAttack--; if(pc.backupAttack < 0) pc.backupAttack = 0; updatePcList(); logEvent(`Decreased ${pc.name}'s Backup Attack to ${pc.backupAttack}`); }
    });
  });
  document.querySelectorAll('.incDefense').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc) { pc.defense++; updatePcList(); logEvent(`Increased ${pc.name}'s Defense to ${pc.defense}`); }
    });
  });
  document.querySelectorAll('.decDefense').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc) { pc.defense--; if(pc.defense < 0) pc.defense = 0; updatePcList(); logEvent(`Decreased ${pc.name}'s Defense to ${pc.defense}`); }
    });
  });
  document.querySelectorAll('.incToughness').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc) { pc.toughness++; updatePcList(); logEvent(`Increased ${pc.name}'s Toughness to ${pc.toughness}`); }
    });
  });
  document.querySelectorAll('.decToughness').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc) { pc.toughness--; if(pc.toughness < 0) pc.toughness = 0; updatePcList(); logEvent(`Decreased ${pc.name}'s Toughness to ${pc.toughness}`); }
    });
  });
  document.querySelectorAll('.incSpeed').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc) { pc.speed++; updatePcList(); logEvent(`Increased ${pc.name}'s Speed to ${pc.speed}`); }
    });
  });
  document.querySelectorAll('.decSpeed').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc) { pc.speed--; if(pc.speed < 0) pc.speed = 0; updatePcList(); logEvent(`Decreased ${pc.name}'s Speed to ${pc.speed}`); }
    });
  });
  document.querySelectorAll('.incFortune').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc) { pc.fortune++; updatePcList(); logEvent(`Increased ${pc.name}'s Fortune to ${pc.fortune}`); }
    });
  });
  document.querySelectorAll('.decFortune').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc) { pc.fortune--; if(pc.fortune < 0) pc.fortune = 0; updatePcList(); logEvent(`Decreased ${pc.name}'s Fortune to ${pc.fortune}`); }
    });
  });
  document.querySelectorAll('.incWound').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc) { pc.woundPoints++; updatePcList(); logEvent(`Increased ${pc.name}'s Wound Points to ${pc.woundPoints}`); }
    });
  });
  document.querySelectorAll('.decWound').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const pc = pcs.find(pc => pc.id === id);
      if (pc) { pc.woundPoints--; if(pc.woundPoints < 0) pc.woundPoints = 0; updatePcList(); logEvent(`Decreased ${pc.name}'s Wound Points to ${pc.woundPoints}`); }
    });
  });
}

function attachNpcListeners() {
  // '+' button for database panel
  document.querySelectorAll('.addDB').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      openDBPanel(id);
    });
  });
  document.querySelectorAll('.incAttack').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const npc = npcs.find(npc => npc.id === id);
      if (npc) { npc.attack++; updateNpcList(); logEvent(`Increased ${npc.name}'s Attack to ${npc.attack}`); }
    });
  });
  document.querySelectorAll('.decAttack').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      const npc = npcs.find(npc => npc.id === id);
      if (npc) { npc.attack--; if(npc.attack < 0) npc.attack = 0; updateNpcList(); logEvent(`Decreased ${npc.name}'s Attack to ${npc.attack}`); }
    });
  });
  // (Ensure similar listeners for Defense, Toughness, Speed, Fortune, Wound Points, and Mook Count)
}

// New function to attach Remove button listeners for NPC cards
function attachRemoveNpcListeners() {
  document.querySelectorAll('.removeEnemy').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      npcs = npcs.filter(npc => npc.id !== id);
      updateAttackDropdowns();
      updateNpcList();
      logEvent(`Removed enemy with id ${id}`);
    });
  });
}

/*===================================
  Event Listeners for Enemy Form
===================================*/
enemyTypeSelect.addEventListener('change', (e) => {
  const selected = e.target.value;
  if (selected === "mook") {
    mookCountContainer.style.display = "block";
    mookTemplateContainer.style.display = "block";
    featuredTemplateContainer.style.display = "none";
  } else if (selected === "featured" || selected === "boss" || selected === "uberboss") {
    featuredTemplateContainer.style.display = "block";
    mookCountContainer.style.display = "none";
    mookTemplateContainer.style.display = "none";
  } else {
    mookCountContainer.style.display = "none";
    mookTemplateContainer.style.display = "none";
    featuredTemplateContainer.style.display = "none";
  }
});

addEnemyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = enemyNameInput.value.trim();
  let type = enemyTypeSelect.value;
  let enemy;
  
  if (type === "mook") {
    const templateKey = mookTemplateSelect.value;
    if (!templateKey) {
      alert("Please select a Mook Template.");
      return;
    }
    const template = mookTemplates[templateKey];
    enemy = {
      id: getNextNpcId(),
      name,
      type,
      attack: 8,
      defense: 13,
      toughness: 0,
      speed: 5,
      fortune: 0,
      templateDamage: template.templateDamage
    };
    enemy.count = parseInt(mookCountInput.value, 10) || 1;
  } else if (type === "featured" || type === "boss" || type === "uberboss") {
    const templateKey = featuredTemplateSelect.value;
    if (!templateKey) {
      alert("Please select a Featured Foe Template.");
      return;
    }
    const template = featuredTemplates[templateKey];
    let baseAttack = template.attack;
    let baseDefense = template.defense;
    let baseToughness = template.toughness;
    let baseSpeed = template.speed;
    if (type === "boss") {
      baseAttack += 3;
      baseDefense += 2;
      baseToughness += 2;
      baseSpeed += 1;
    } else if (type === "uberboss") {
      baseAttack += 5;
      baseDefense += 4;
      baseToughness += 3;
      baseSpeed += 2;
    }
    enemy = {
      id: getNextNpcId(),
      name,
      type,
      attack: baseAttack,
      defense: baseDefense,
      toughness: baseToughness,
      speed: baseSpeed,
      fortune: 0,
      woundPoints: 0,
      attackImpair: 0,
      defenseImpair: 0,
      weapons: template.weapons,
      schticks: template.schticks
    };
  } else {
    return;
  }
  
  npcs.push(enemy);
  updateAttackDropdowns();
  updateNpcList();
  addEnemyForm.reset();
  mookCountContainer.style.display = "none";
  mookTemplateContainer.style.display = "none";
  featuredTemplateContainer.style.display = "none";
  logEvent(`Added enemy: ${name} (${type})`);
});

/*===================================
  Attack Actions
===================================*/
playerActionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const attackerId = parseInt(playerAttackerSelect.value, 10);
  const targetId = parseInt(npcTargetSelect.value, 10);
  const attacker = pcs.find(pc => pc.id === attackerId);
  const target = npcs.find(npc => npc.id === targetId);
  if (!attacker || !target) return;
  
  let rollResult = parseInt(playerRollResultInput.value.replace('!', ''), 10);
  const modifier = parseInt(playerModifierInput.value, 10) || 0;
  rollResult += modifier;
  
  let smackdown = rollResult - target.defense;
  if (smackdown < 0) smackdown = 0;
  
  const weaponDamage = parseInt(playerWeaponDamageInput.value, 10) || 0;
  let damage = smackdown + weaponDamage - target.toughness;
  if (damage < 0) damage = 0;
  
  let logMsg = `Player Attack: ${attacker.name} rolled ${rollResult} vs. ${target.name}'s Defense (${target.defense}) = ${smackdown}. `;
  logMsg += `+ Weapon Damage (${weaponDamage}) - Toughness (${target.toughness}) = Damage ${damage}. `;
  
  if (target.type === "mook") {
    if (damage > 0) {
      target.count--;
      if (target.count < 0) target.count = 0;
      logMsg += `Mook hit! ${target.name} count decreased to ${target.count}.`;
    } else {
      logMsg += `No damage; mook count remains ${target.count}.`;
    }
  } else {
    target.woundPoints += damage;
    if (target.type === "featured") {
      if (target.woundPoints >= 30) {
        target.attackImpair = 2;
        target.defenseImpair = 2;
        logMsg += `Impairment -2 applied. `;
      } else if (target.woundPoints >= 25) {
        target.attackImpair = 1;
        target.defenseImpair = 1;
        logMsg += `Impairment -1 applied. `;
      } else {
        target.attackImpair = 0;
        target.defenseImpair = 0;
      }
    } else if (target.type === "boss" || target.type === "uberboss") {
      if (target.woundPoints >= 45) {
        target.attackImpair = 2;
        target.defenseImpair = 2;
        logMsg += `Impairment -2 applied. `;
      } else if (target.woundPoints >= 40) {
        target.attackImpair = 1;
        target.defenseImpair = 1;
        logMsg += `Impairment -1 applied. `;
      } else {
        target.attackImpair = 0;
        target.defenseImpair = 0;
      }
    }
    logMsg += `${target.name} now has ${target.woundPoints} Wound Points.`;
  }
  
  logEvent(logMsg);
  updateNpcList();
  playerActionForm.reset();
  updateAttackDropdowns();
});

npcRollDiceButton.addEventListener('click', () => {
  const attackerId = parseInt(npcAttackerSelect.value, 10);
  const attacker = npcs.find(npc => npc.id === attackerId);
  if (!attacker) {
    alert("No attacking NPC selected!");
    return;
  }
  const modifier = parseInt(npcModifierInput.value, 10) || 0;
  
  const posInitial = rollDie();
  const negInitial = rollDie();
  const boxcars = (posInitial === 6 && negInitial === 6);
  const posTotal = rollExplodingDie(posInitial);
  const negTotal = rollExplodingDie(negInitial);
  const diceOutcome = posTotal - negTotal;
  
  let baseAttack = attacker.attack;
  const finalCheck = baseAttack + diceOutcome + modifier;
  npcRollResultDiv.dataset.finalCheck = finalCheck;
  
  const targetId = parseInt(playerTargetSelect.value, 10);
  const target = pcs.find(pc => pc.id === targetId);
  let finalCheckHTML = `<span>${finalCheck}</span>`;
  if (target) {
    if (finalCheck >= target.defense) {
      finalCheckHTML = `<span class="hitResult">${finalCheck}</span>`;
    } else {
      finalCheckHTML = `<span class="missResult">${finalCheck}</span>`;
    }
  }
  
  let resultText = `Positive Total: ${posTotal} (init: ${posInitial}), Negative Total: ${negTotal} (init: ${negInitial}) → Outcome: ${diceOutcome}. `;
  resultText += `Final Check = ${baseAttack} + ${diceOutcome} + Modifier (${modifier}) = ${finalCheckHTML}`;
  if (boxcars) resultText += " (Boxcars!)";
  npcRollResultDiv.innerHTML = resultText;
  logEvent(`NPC Dice Roll: +die=${posTotal} (init ${posInitial}), -die=${negTotal} (init ${negInitial}), Outcome=${diceOutcome}. Final Check = ${baseAttack} + ${diceOutcome} + ${modifier} = ${finalCheck}${boxcars ? " (Boxcars!)" : ""}`);
});

npcActionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const attackerId = parseInt(npcAttackerSelect.value, 10);
  const targetId = parseInt(playerTargetSelect.value, 10);
  const attacker = npcs.find(npc => npc.id === attackerId);
  const target = pcs.find(pc => pc.id === targetId);
  if (!attacker || !target) return;
  
  let finalCheck = parseInt(npcRollResultDiv.dataset.finalCheck || "0", 10);
  if (isNaN(finalCheck) || finalCheck === 0) {
    alert("Please roll the dice for NPC attack first.");
    return;
  }
  
  let smackdown = finalCheck - target.defense;
  if (smackdown < 0) smackdown = 0;
  
  const weaponDamage = parseInt(npcWeaponDamageInput.value, 10) || 0;
  let damage = smackdown + weaponDamage - target.toughness;
  if (damage < 0) damage = 0;
  
  let logMsg = `NPC Attack: ${attacker.name} (Final Check ${finalCheck}) vs. ${target.name}'s Defense (${target.defense}) = ${smackdown}. `;
  logMsg += `+ Weapon Damage (${weaponDamage}) - Toughness (${target.toughness}) = Damage ${damage}. `;
  
  target.woundPoints += damage;
  logMsg += `${target.name} now has ${target.woundPoints} Wound Points.`;
  
  logEvent(logMsg);
  updatePcList();
  npcActionForm.reset();
  npcRollResultDiv.textContent = "";
  delete npcRollResultDiv.dataset.finalCheck;
  updateAttackDropdowns();
});

/*===================================
  Dice Roller Functions
===================================*/
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}
function rollExplodingDie(initial) {
  let total = initial;
  while (initial === 6) {
    initial = rollDie();
    total += initial;
  }
  return total;
}

/*===================================
  Data Export / Import
===================================*/
exportButton.addEventListener('click', () => {
  const data = { pcs, npcs };
  const dataStr = JSON.stringify(data);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "combatData.json";
  a.click();
  URL.revokeObjectURL(url);
  logEvent("Exported combat data.");
});

importButton.addEventListener('click', () => {
  importFileInput.click();
});

importFileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const importedData = JSON.parse(evt.target.result);
      npcs = importedData.npcs || [];
      updateAttackDropdowns();
      updatePcList();
      updateNpcList();
      logEvent("Imported combat data successfully.");
    } catch (error) {
      alert("Failed to import data: " + error);
    }
  };
  reader.readAsText(file);
});

/*===================================
  Event Log Helper
===================================*/
function logEvent(message) {
  const li = document.createElement('li');
  li.textContent = message;
  logList.appendChild(li);
}

/*===================================
  Dropdown Updates and Initialization
===================================*/
function updateAttackDropdowns() {
  playerAttackerSelect.innerHTML = '';
  pcs.forEach(pc => {
    const option = document.createElement('option');
    option.value = pc.id;
    option.textContent = pc.name;
    playerAttackerSelect.appendChild(option);
  });
  npcTargetSelect.innerHTML = '';
  npcs.forEach(npc => {
    if (npc.type !== "mook" || npc.count > 0) {
      const option = document.createElement('option');
      option.value = npc.id;
      option.textContent = npc.name;
      npcTargetSelect.appendChild(option);
    }
  });
  npcAttackerSelect.innerHTML = '';
  npcs.forEach(npc => {
    if (npc.type !== "mook" || npc.count > 0) {
      const option = document.createElement('option');
      option.value = npc.id;
      option.textContent = npc.name;
      npcAttackerSelect.appendChild(option);
    }
  });
  playerTargetSelect.innerHTML = '';
  pcs.forEach(pc => {
    const option = document.createElement('option');
    option.value = pc.id;
    option.textContent = pc.name;
    playerTargetSelect.appendChild(option);
  });
}

function init() {
  updatePcList();
  updateAttackDropdowns();
}
init();

// Importa os shards direto da pasta assets
import shard5007 from '../../assets/shards/5007.png';
import shard5008 from '../../assets/shards/5008.png';
import shard5010 from '../../assets/shards/5010.png';
import shard5001 from '../../assets/shards/5001.png';
import shard5011 from '../../assets/shards/5011.png';
import shard5013 from '../../assets/shards/5013.png';

let cachedVersion = null;
let runeDataCache = null;
let itemDataCache = null;
const champSpellCache = {};
let summonerSpellsCache = null;

// Busca versão mais recente para campeões, itens, spells, runas etc.
export async function getLatestVersion() {
  if (cachedVersion) return cachedVersion;
  const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
  const versions = await res.json();
  cachedVersion = versions[0];
  return cachedVersion;
}

export async function getChampionIcon(name) {
  const version = await getLatestVersion();
  const cap = name.charAt(0).toUpperCase() + name.slice(1).replace(/[^a-zA-Z]/g, '');
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${cap}.png`;
}

export async function getItemIcon(itemId) {
  const version = await getLatestVersion();
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`;
}

// Ícone da runa pelo ID
export async function getRuneIconById(id) {
  const version = await getLatestVersion();
  if (!runeDataCache) {
    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`);
    runeDataCache = await res.json();
  }

  for (const style of runeDataCache) {
    for (const slot of style.slots) {
      for (const rune of slot.runes) {
        if (rune.id === id) {
          return `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
        }
      }
    }
  }

  return null;
}

// Runas completas
export async function getAllRunesData() {
  const version = await getLatestVersion();
  if (runeDataCache) return runeDataCache;

  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`);
  runeDataCache = await res.json();
  return runeDataCache;
}

// Buscar dados completos dos itens
export async function getAllItemsData() {
  const version = await getLatestVersion();
  if (itemDataCache) return itemDataCache;

  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`);
  const data = await res.json();
  itemDataCache = data.data;
  return itemDataCache;
}

// Buscar ícone de item por nome
export async function getItemIconByName(itemName) {
  const items = await getAllItemsData();
  if (!items) return null;

  // Procurar por nome exato ou similar
  for (const [id, item] of Object.entries(items)) {
    if (item.name.toLowerCase().includes(itemName.toLowerCase())) {
      return getItemIcon(id);
    }
  }
  return null;
}

// Buscar ícone de item por ID numérico
export async function getItemIconByNumericId(numericId) {
  const version = await getLatestVersion();
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${numericId}.png`;
}

// Mapeamento de IDs das runas para IDs do Data Dragon
export const runeIdMapping = {
  // Precision
  'conqueror': 8010,
  'lethaltempo': 8014,
  'presstheattack': 8005,
  'fleetfootwork': 8021,
  
  // Domination
  'electrocute': 8112,
  'darkharvest': 8128,
  'hailofblades': 9923,
  'predator': 8124,
  
  // Sorcery
  'phaserush': 8230,
  'aery': 8214,
  'comet': 8229,
  'unleashed': 8236,
  
  // Resolve
  'aftershock': 8043,
  'guardian': 8021,
  'grasp': 8437,
  'unflinching': 8242,
  
  // Inspiration
  'glacial': 8351,
  'unsealed': 8360,
  'prototype': 8358,
  'firststrike': 8369,
  
  // Slots
  'triumph': 8010,
  'presence': 8005,
  'legendalacrity': 8014,
  'legendtenacity': 8017,
  'coupdegrace': 8016,
  'laststand': 8299,
  
  'cheapshot': 8126,
  'tasteofblood': 8139,
  'suddenimpact': 8143,
  'zombieward': 8136,
  'ghostporo': 8120,
  'eyeball': 8138,
  
  'nullifying': 8010,
  'manaflow': 8005,
  'nimbus': 8014,
  'transcendence': 8017,
  'celerity': 8016,
  'absolute': 8299,
  
  'demolish': 8126,
  'font': 8139,
  'shield': 8143,
  'conditioning': 8136,
  'secondwind': 8120,
  'revitalize': 8138,
  
  'hextech': 8010,
  'magical': 8005,
  'perfect': 8014,
  'future': 8017,
  'minion': 8016,
  'biscuit': 8299,
  
  // Shards
  'adaptive': 5005,
  'attackspeed': 5002,
  'abilityhaste': 5007,
  'armor': 5001,
  'magicresist': 5003,
  'health': 5008
};

// Mapeamento de IDs dos itens para IDs do Data Dragon
export const itemIdMapping = {
  // Starting Items
  'doransring': 1056,
  'doransshield': 1054,
  'doransblade': 1055,
  'corrupting': 2033,
  'clotharmor': 1029,
  'nullmagic': 1033,
  
  // Mythics
  'sunfire': 6664,
  'frostfire': 6662,
  'turbo': 6665,
  'divine': 6632,
  'trinity': 3078,
  'goredrinker': 6630,
  
  // Legendary
  'spiritvisage': 3065,
  'thornmail': 3075,
  'randuins': 3143,
  'force': 3111,
  'deadmans': 3742,
  'gargoyle': 3190,
  'warmogs': 3083,
  'guardian': 3026,
  
  // Boots
  'mercurytreads': 3158,
  'platedsteelcaps': 3047,
  'ionian': 3158,
  'sorcerers': 3020,
  'berserkers': 3006,
  'mobility': 3117
};

// Mapeamento de IDs dos summoner spells para IDs do Data Dragon
export const summonerSpellIdMapping = {
  'flash': 'SummonerFlash',
  'ignite': 'SummonerDot',
  'teleport': 'SummonerTeleport',
  'ghost': 'SummonerHaste',
  'heal': 'SummonerHeal',
  'barrier': 'SummonerBarrier',
  'exhaust': 'SummonerExhaust',
  'cleanse': 'SummonerBoost',
  'smite': 'SummonerSmite'
};

// Buscar ícone de runa usando o mapeamento
export async function getRuneIconByMapping(runeId) {
  const mappedId = runeIdMapping[runeId];
  if (mappedId) {
    return getRuneIconByNumericId(mappedId);
  }
  return null;
}

// Buscar ícone de runa por ID numérico
export async function getRuneIconByNumericId(numericId) {
  const version = await getLatestVersion();
  return `https://ddragon.leagueoflegends.com/cdn/img/${numericId}`;
}

// Buscar ícone de item usando o mapeamento
export async function getItemIconByMapping(itemId) {
  const mappedId = itemIdMapping[itemId];
  if (mappedId) {
    return getItemIconByNumericId(mappedId);
  }
  return null;
}

// Buscar ícone de summoner spell usando o mapeamento
export async function getSummonerSpellIconByMapping(spellId) {
  const mappedId = summonerSpellIdMapping[spellId];
  if (mappedId) {
    const version = await getLatestVersion();
    return `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${mappedId}.png`;
  }
  return null;
}

// Buscar ícone de summoner spell por nome
export async function getSummonerSpellIconByName(spellName) {
  const spells = await getSpellsIcons();
  if (!spells) return null;

  const normalizedName = spellName.toLowerCase().replace(/\s+/g, '');
  
  for (const spell of spells) {
    if (spell.name.toLowerCase().replace(/\s+/g, '').includes(normalizedName)) {
      return spell.icon;
    }
  }
  return null;
}

// Spells de campeões
export async function getChampionSpells(championName) {
  const version = await getLatestVersion();
  if (champSpellCache[championName]) return champSpellCache[championName];

  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${championName}.json`);
  const data = await res.json();
  const spells = data.data[championName].spells;

  const result = spells.map(spell => ({
    id: spell.id,
    icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`
  }));

  champSpellCache[championName] = result;
  return result;
}

// Summoner spells
export async function getSpellsIcons() {
  if (summonerSpellsCache) return summonerSpellsCache;

  const version = await getLatestVersion();
  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`);
  const data = await res.json();

  const spells = Object.values(data.data).map(spell => ({
    id: spell.id,
    name: spell.name,
    description: spell.description,
    icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`
  }));

  summonerSpellsCache = spells;
  return spells;
}

export async function getSummonerSpellsByName(...names) {
  const allSpells = await getSpellsIcons();

  const normalizedNames = names.map(n =>
    n.toLowerCase().replace(/\s+/g, '')
  );

  const resultMap = new Map();

  for (const spell of allSpells) {
    const spellNameNormalized = spell.name.toLowerCase().replace(/\s+/g, '');
    const spellIdNormalized = spell.id.toLowerCase().replace(/\s+/g, '');

    if (
      normalizedNames.includes(spellNameNormalized) ||
      normalizedNames.includes(spellIdNormalized)
    ) {
      resultMap.set(spell.id, spell);
    }
  }

  return Array.from(resultMap.values()).slice(0, 2);
}

// Fragmentos
const shardMap = {
  adaptativeforce: shard5008,
  movespeed: shard5010,
  attackspeed: shard5007,
  healthscaling: shard5001,
  health: shard5011,
  tenacity: shard5013,
  cdr: shard5007,
};

export function getShardIcon(name) {
  const normalized = name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  return shardMap[normalized] || null;
}

// Função para buscar ícone de shard por ID numérico
export async function getShardIconByNumericId(numericId) {
  const version = await getLatestVersion();
  return `https://ddragon.leagueoflegends.com/cdn/img/${numericId}`;
}

// Função para buscar ícone de shard usando mapeamento
export async function getShardIconByMapping(shardId) {
  const shardIdMapping = {
    'adaptive': 5005,
    'attackspeed': 5002,
    'abilityhaste': 5007,
    'armor': 5001,
    'magicresist': 5003,
    'health': 5008
  };
  
  const mappedId = shardIdMapping[shardId];
  if (mappedId) {
    return getShardIconByNumericId(mappedId);
  }
  return null;
}
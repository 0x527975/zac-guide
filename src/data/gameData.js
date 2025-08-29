// Dados completos do League of Legends para o sistema de builds
// Agora usando ícones reais do Data Dragon!

export const runeData = {
  keystones: {
    'Precision': {
      name: 'Precision',
      color: 'from-yellow-500 to-orange-500',
      keystones: [
        { id: 'conqueror', name: 'Conqueror', icon: 'conqueror', description: 'Ganhe força de combate ao lutar contra campeões' },
        { id: 'lethaltempo', name: 'Lethal Tempo', icon: 'lethaltempo', description: 'Ataques consecutivos aumentam velocidade de ataque' },
        { id: 'presstheattack', name: 'Press the Attack', icon: 'presstheattack', description: '3 ataques consecutivos causam dano extra' },
        { id: 'fleetfootwork', name: 'Fleet Footwork', icon: 'fleetfootwork', description: 'Ataques e habilidades curam e dão velocidade' }
      ]
    },
    'Domination': {
      name: 'Domination',
      color: 'from-red-500 to-pink-500',
      keystones: [
        { id: 'electrocute', name: 'Electrocute', icon: 'electrocute', description: '3 ataques/habilidades causam dano extra' },
        { id: 'darkharvest', name: 'Dark Harvest', icon: 'darkharvest', description: 'Dano extra em campeões com pouca vida' },
        { id: 'hailofblades', name: 'Hail of Blades', icon: 'hailofblades', description: 'Velocidade de ataque aumentada no início' },
        { id: 'predator', name: 'Predator', icon: 'predator', description: 'Velocidade aumentada ao atacar campeões' }
      ]
    },
    'Sorcery': {
      name: 'Sorcery',
      color: 'from-blue-500 to-cyan-500',
      keystones: [
        { id: 'phaserush', name: 'Phase Rush', icon: 'phaserush', description: '3 ataques/habilidades dão velocidade' },
        { id: 'aery', name: 'Summon Aery', icon: 'aery', description: 'Ataques e habilidades causam dano extra' },
        { id: 'comet', name: 'Arcane Comet', icon: 'comet', description: 'Habilidades causam dano extra' },
        { id: 'unleashed', name: 'Unleashed', icon: 'unleashed', description: 'Habilidades causam dano em área' }
      ]
    },
    'Resolve': {
      name: 'Resolve',
      color: 'from-green-500 to-emerald-500',
      keystones: [
        { id: 'aftershock', name: 'Aftershock', icon: 'aftershock', description: 'Controle de grupo causa resistência' },
        { id: 'guardian', name: 'Guardian', icon: 'guardian', description: 'Protege aliados próximos' },
        { id: 'grasp', name: 'Grasp of the Undying', icon: 'grasp', description: 'Ataques curam e aumentam vida máxima' },
        { id: 'unflinching', name: 'Unflinching', icon: 'unflinching', description: 'Resistência a controle de grupo' }
      ]
    },
    'Inspiration': {
      name: 'Inspiration',
      color: 'from-purple-500 to-violet-500',
      keystones: [
        { id: 'glacial', name: 'Glacial Augment', icon: 'glacial', description: 'Ataques causam slow' },
        { id: 'unsealed', name: 'Unsealed Spellbook', icon: 'unsealed', description: 'Troque spells de invocador' },
        { id: 'prototype', name: 'Prototype: Omnistone', icon: 'prototype', description: 'Receba runas aleatórias' },
        { id: 'firststrike', name: 'First Strike', icon: 'firststrike', description: 'Dano extra ao atacar primeiro' }
      ]
    }
  },
  
  slots: {
    'Precision': [
      { id: 'triumph', name: 'Triumph', icon: 'triumph', description: 'Abates curam e dão ouro extra' },
      { id: 'presence', name: 'Presence of Mind', icon: 'presence', description: 'Abates restauram energia/mana' },
      { id: 'legendalacrity', name: 'Legend: Alacrity', icon: 'legendalacrity', description: 'Ataques aumentam velocidade de ataque' },
      { id: 'legendtenacity', name: 'Legend: Tenacity', icon: 'legendtenacity', description: 'Reduz duração de controle de grupo' },
      { id: 'coupdegrace', name: 'Coup de Grace', icon: 'coupdegrace', description: 'Dano extra em campeões com pouca vida' },
      { id: 'laststand', name: 'Last Stand', icon: 'laststand', description: 'Dano extra quando com pouca vida' }
    ],
    'Domination': [
      { id: 'cheapshot', name: 'Cheap Shot', icon: 'cheapshot', description: 'Dano extra em campeões controlados' },
      { id: 'tasteofblood', name: 'Taste of Blood', icon: 'tasteofblood', description: 'Ataques curam' },
      { id: 'suddenimpact', name: 'Sudden Impact', icon: 'suddenimpact', description: 'Dano extra após dash/teleporte' },
      { id: 'zombieward', name: 'Zombie Ward', icon: 'zombieward', description: 'Wards destruídas se tornam suas' },
      { id: 'ghostporo', name: 'Ghost Poro', icon: 'ghostporo', description: 'Wards dão visão extra' },
      { id: 'eyeball', name: 'Eyeball Collection', icon: 'eyeball', description: 'Abates dão poder de habilidade' }
    ],
    'Sorcery': [
      { id: 'nullifying', name: 'Nullifying Orb', icon: 'nullifying', description: 'Escudo mágico quando com pouca vida' },
      { id: 'manaflow', name: 'Manaflow Band', icon: 'manaflow', description: 'Habilidades aumentam mana máxima' },
      { id: 'nimbus', name: 'Nimbus Cloak', icon: 'nimbus', description: 'Spells de invocador dão velocidade' },
      { id: 'transcendence', name: 'Transcendence', icon: 'transcendence', description: 'Níveis dão habilidade haste' },
      { id: 'celerity', name: 'Celerity', icon: 'celerity', description: 'Velocidade de movimento aumenta poder' },
      { id: 'absolute', name: 'Absolute Focus', icon: 'absolute', description: 'Poder extra quando com vida alta' }
    ],
    'Resolve': [
      { id: 'demolish', name: 'Demolish', icon: 'demolish', description: 'Dano extra em torres' },
      { id: 'font', name: 'Font of Life', icon: 'font', description: 'Ataques curam aliados' },
      { id: 'shield', name: 'Shield Bash', icon: 'shield', description: 'Escudos causam dano extra' },
      { id: 'conditioning', name: 'Conditioning', icon: 'conditioning', description: 'Resistências aumentam com tempo' },
      { id: 'secondwind', name: 'Second Wind', icon: 'secondwind', description: 'Regeneração quando danificado' },
      { id: 'revitalize', name: 'Revitalize', icon: 'revitalize', description: 'Cura e escudos são mais fortes' }
    ],
    'Inspiration': [
      { id: 'hextech', name: 'Hextech Flashtraption', icon: 'hextech', description: 'Flash com cooldown reduzido' },
      { id: 'magical', name: 'Magical Footwear', icon: 'magical', description: 'Botas gratuitas aos 12 minutos' },
      { id: 'perfect', name: 'Perfect Timing', icon: 'perfect', description: 'Stopwatch gratuito aos 14 minutos' },
      { id: 'future', name: 'Future\'s Market', icon: 'future', description: 'Compre itens com dívida' },
      { id: 'minion', name: 'Minion Dematerializer', icon: 'minion', description: 'Destrua minions para ganhar ouro' },
      { id: 'biscuit', name: 'Biscuit Delivery', icon: 'biscuit', description: 'Biscoitos que curam e dão mana' }
    ]
  },
  
  shards: [
    { id: 'adaptive', name: 'Adaptive Force', icon: 'adaptive', description: 'Poder de habilidade ou dano de ataque' },
    { id: 'attackspeed', name: 'Attack Speed', icon: 'attackspeed', description: 'Velocidade de ataque aumentada' },
    { id: 'abilityhaste', name: 'Ability Haste', icon: 'abilityhaste', description: 'Cooldown de habilidades reduzido' },
    { id: 'armor', name: 'Armor', icon: 'armor', description: 'Resistência física aumentada' },
    { id: 'magicresist', name: 'Magic Resist', icon: 'magicresist', description: 'Resistência mágica aumentada' },
    { id: 'health', name: 'Health', icon: 'health', description: 'Vida máxima aumentada' }
  ]
};

export const itemData = {
  starting: [
    { id: 'doransring', name: 'Doran\'s Ring', icon: 'doransring', cost: 400, stats: '+15 AP, +70 HP, +5 Mana/5s' },
    { id: 'doransshield', name: 'Doran\'s Shield', icon: 'doransshield', cost: 450, stats: '+80 HP, +6 HP/5s' },
    { id: 'doransblade', name: 'Doran\'s Blade', icon: 'doransblade', cost: 450, stats: '+8 AD, +80 HP, +2.5% Omnivamp' },
    { id: 'corrupting', name: 'Corrupting Potion', icon: 'corrupting', cost: 500, stats: 'Cura 125 HP e 75 Mana' },
    { id: 'clotharmor', name: 'Cloth Armor', icon: 'clotharmor', cost: 300, stats: '+15 Armor' },
    { id: 'nullmagic', name: 'Null-Magic Mantle', icon: 'nullmagic', cost: 450, stats: '+25 Magic Resist' }
  ],
  
  mythics: [
    { id: 'sunfire', name: 'Sunfire Aegis', icon: 'sunfire', cost: 3200, stats: '+450 HP, +30 Armor, +30 MR' },
    { id: 'frostfire', name: 'Frostfire Gauntlet', icon: 'frostfire', cost: 3200, stats: '+400 HP, +25 Armor, +25 MR' },
    { id: 'turbo', name: 'Turbo Chemtank', icon: 'turbo', cost: 3200, stats: '+450 HP, +30 Armor, +30 MR' },
    { id: 'divine', name: 'Divine Sunderer', icon: 'divine', cost: 3300, stats: '+400 HP, +35 AD, +20 AH' },
    { id: 'trinity', name: 'Trinity Force', icon: 'trinity', cost: 3333, stats: '+200 HP, +35 AD, +35% AS' },
    { id: 'goredrinker', name: 'Goredrinker', icon: 'goredrinker', cost: 3300, stats: '+450 HP, +45 AD, +20 AH' }
  ],
  
  legendary: [
    { id: 'spiritvisage', name: 'Spirit Visage', icon: 'spiritvisage', cost: 2800, stats: '+450 HP, +40 MR, +100% Base HP Regen' },
    { id: 'thornmail', name: 'Thornmail', icon: 'thornmail', cost: 2700, stats: '+350 HP, +60 Armor' },
    { id: 'randuins', name: 'Randuin\'s Omen', icon: 'randuins', cost: 2700, stats: '+400 HP, +60 Armor' },
    { id: 'force', name: 'Force of Nature', icon: 'force', cost: 2800, stats: '+400 HP, +60 MR' },
    { id: 'deadmans', name: 'Dead Man\'s Plate', icon: 'deadmans', cost: 2800, stats: '+400 HP, +45 Armor' },
    { id: 'gargoyle', name: 'Gargoyle Stoneplate', icon: 'gargoyle', cost: 3200, stats: '+650 HP, +40 Armor, +40 MR' },
    { id: 'warmogs', name: 'Warmog\'s Armor', icon: 'warmogs', cost: 3000, stats: '+800 HP, +200% Base HP Regen' },
    { id: 'guardian', name: 'Guardian Angel', icon: 'guardian', cost: 2800, stats: '+40 AD, +40 Armor' }
  ],
  
  boots: [
    { id: 'mercurytreads', name: 'Mercury Treads', icon: 'mercurytreads', cost: 1100, stats: '+25 MR, +45 MS, Tenacity' },
    { id: 'platedsteelcaps', name: 'Plated Steelcaps', icon: 'platedsteelcaps', cost: 1100, stats: '+25 Armor, +45 MS, Block' },
    { id: 'ionian', name: 'Ionian Boots of Lucidity', icon: 'ionian', cost: 950, stats: '+45 MS, +20 AH, +12 Summoner Spell Haste' },
    { id: 'sorcerers', name: 'Sorcerer\'s Shoes', icon: 'sorcerers', cost: 1100, stats: '+18 Magic Pen, +45 MS' },
    { id: 'berserkers', name: 'Berserker\'s Greaves', icon: 'berserkers', cost: 1100, stats: '+35% AS, +45 MS' },
    { id: 'mobility', name: 'Boots of Mobility', icon: 'mobility', cost: 1000, stats: '+115 MS (out of combat)' }
  ]
};

export const summonerSpellData = [
  { id: 'flash', name: 'Flash', icon: 'flash', description: 'Teleporte curto em direção ao cursor', cooldown: '300s' },
  { id: 'ignite', name: 'Ignite', icon: 'ignite', description: 'Dano verdadeiro ao longo do tempo', cooldown: '180s' },
  { id: 'teleport', name: 'Teleport', icon: 'teleport', description: 'Teleporte para torre ou ward', cooldown: '360s' },
  { id: 'ghost', name: 'Ghost', icon: 'ghost', description: 'Velocidade de movimento aumentada', cooldown: '210s' },
  { id: 'heal', name: 'Heal', icon: 'heal', description: 'Cura e velocidade para você e aliado', cooldown: '240s' },
  { id: 'barrier', name: 'Barrier', icon: 'barrier', description: 'Escudo temporário', cooldown: '180s' },
  { id: 'exhaust', name: 'Exhaust', icon: 'exhaust', description: 'Reduz dano e velocidade do inimigo', cooldown: '210s' },
  { id: 'cleanse', name: 'Cleanse', icon: 'cleanse', description: 'Remove controle de grupo', cooldown: '210s' },
  { id: 'smite', name: 'Smite', icon: 'smite', description: 'Dano verdadeiro a monstros e minions', cooldown: '90s' }
];

export const skillOrderData = {
  q: { name: 'Q - Stretching Strikes', icon: 'q', color: 'from-blue-500 to-blue-600' },
  w: { name: 'W - Unstable Matter', icon: 'w', color: 'from-green-500 to-green-600' },
  e: { name: 'E - Elastic Slingshot', icon: 'e', color: 'from-yellow-500 to-yellow-600' },
  r: { name: 'R - Let\'s Bounce!', icon: 'r', color: 'from-purple-500 to-purple-600' }
};

export const laneData = [
  { id: 'top', name: 'Top', icon: '🗼', color: 'from-red-500 to-red-600', description: 'Lane superior, campeões tanques e lutadores' },
  { id: 'jungle', name: 'Jungle', icon: '🌲', color: 'from-green-500 to-green-600', description: 'Selva, campeões com clear e gank' },
  { id: 'mid', name: 'Mid', icon: '🏛️', color: 'from-blue-500 to-blue-600', description: 'Lane central, campeões mágicos e assassinos' },
  { id: 'support', name: 'Support', icon: '🛡️', color: 'from-purple-500 to-purple-600', description: 'Suporte, campeões de utilidade e proteção' },
  { id: 'bottom', name: 'Bottom', icon: '🏹', color: 'from-yellow-500 to-yellow-600', description: 'Lane inferior, campeões de dano contínuo' }
];

export const difficultyData = [
  { id: 'easy', name: 'Fácil', icon: '🟢', color: 'from-green-500 to-green-600', description: 'Ideal para iniciantes' },
  { id: 'medium', name: 'Médio', icon: '🟡', color: 'from-yellow-500 to-yellow-600', description: 'Requer experiência moderada' },
  { id: 'hard', name: 'Difícil', icon: '🔴', color: 'from-red-500 to-red-600', description: 'Para jogadores experientes' }
];

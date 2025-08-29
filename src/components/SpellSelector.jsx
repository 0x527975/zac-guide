import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillOrderData, summonerSpellData } from '../data/gameData';
import { getSummonerSpellIconByMapping } from '../data/utils/ddragon';

export default function SpellSelector({ spells, summonerSpells, onChange }) {
  const [showTooltip, setShowTooltip] = useState(null);
  const [spellIcons, setSpellIcons] = useState({});

  // Carregar ícones dos summoner spells
  useEffect(() => {
    const loadSpellIcons = async () => {
      const icons = {};
      for (const spell of summonerSpellData) {
        const iconUrl = await getSummonerSpellIconByMapping(spell.icon);
        if (iconUrl) {
          icons[spell.icon] = iconUrl;
        }
      }
      setSpellIcons(icons);
    };

    loadSpellIcons();
  }, []);

  const handleSkillOrderChange = (index) => {
    const newOrder = [...spells.order];
    // Cycle through Q -> W -> E -> R
    const currentSkill = newOrder[index];
    const skillOrder = ['Q', 'W', 'E', 'R'];
    const currentIndex = skillOrder.indexOf(currentSkill);
    newOrder[index] = skillOrder[(currentIndex + 1) % 4];
    
    onChange({
      ...spells,
      order: newOrder
    });
  };

  const handleMaxOrderChange = (index, skill) => {
    const newMaxOrder = [...spells.maxOrder];
    newMaxOrder[index] = skill;
    
    onChange({
      ...spells,
      maxOrder: newMaxOrder
    });
  };

  const handleSummonerSpellChange = (type, spellId) => {
    onChange({
      ...summonerSpells,
      [type]: spellId
    });
  };

  const getSkillIcon = (skill) => {
    return skillOrderData[skill.toLowerCase()]?.icon || '?';
  };

  const getSkillColor = (skill) => {
    return skillOrderData[skill.toLowerCase()]?.color || 'from-gray-500 to-gray-600';
  };

  const getSkillName = (skill) => {
    return skillOrderData[skill.toLowerCase()]?.name || skill;
  };

  const renderSpellIcon = (iconId, fallback = '⚡') => {
    if (spellIcons[iconId]) {
      return (
        <img 
          src={spellIcons[iconId]} 
          alt={iconId}
          className="w-8 h-8 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
      );
    }
    return fallback;
  };

  return (
    <div className="space-y-6">
      {/* Skill Order */}
      <div>
        <h4 className="text-white font-medium mb-3">Ordem de Habilidades (1-18)</h4>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="grid grid-cols-9 gap-1 mb-4">
            {spells.order.map((skill, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSkillOrderChange(index)}
                onMouseEnter={() => setShowTooltip(`skill-${index}`)}
                onMouseLeave={() => setShowTooltip(null)}
                className={`relative w-10 h-10 rounded-lg border transition-all duration-200 ${
                  `bg-gradient-to-r ${getSkillColor(skill)} text-white border-transparent`
                } hover:scale-110 hover:shadow-lg`}
              >
                <span className="text-lg font-bold">{skill}</span>
                
                {/* Tooltip */}
                {showTooltip === `skill-${index}` && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 text-white text-sm max-w-xs z-50"
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">{getSkillIcon(skill)}</div>
                      <div className="font-medium mb-1">Nível {index + 1}</div>
                      <div className="text-gray-300 text-xs">{getSkillName(skill)}</div>
                    </div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
          
          <div className="text-center text-gray-400 text-sm">
            Clique em cada habilidade para alternar entre Q, W, E, R
          </div>
        </div>
      </div>

      {/* Max Order */}
      <div>
        <h4 className="text-white font-medium mb-3">Ordem de Max (Prioridade)</h4>
        <div className="grid grid-cols-4 gap-3">
          {spells.maxOrder.map((skill, index) => (
            <div key={index} className="text-center">
              <div className="text-gray-300 text-sm mb-2">{index + 1}º Max</div>
              <select
                value={skill}
                onChange={(e) => handleMaxOrderChange(index, e.target.value)}
                className="w-full px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-white focus:border-emerald-500 focus:outline-none"
              >
                {['Q', 'W', 'E', 'R'].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              
              {skill && (
                <div className="mt-2 p-2 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`w-8 h-8 bg-gradient-to-r ${getSkillColor(skill)} rounded-lg flex items-center justify-center text-white font-bold`}>
                      {skill}
                    </span>
                    <span className="text-white text-sm">{getSkillName(skill)}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summoner Spells */}
      <div>
        <h4 className="text-white font-medium mb-3">Spells de Invocador</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Primário</label>
            <div className="grid grid-cols-3 gap-2">
              {summonerSpellData.map((spell) => (
                <motion.button
                  key={spell.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSummonerSpellChange('primary', spell.id)}
                  onMouseEnter={() => setShowTooltip(`spell-${spell.id}`)}
                  onMouseLeave={() => setShowTooltip(null)}
                  className={`relative p-3 rounded-lg border transition-all duration-200 ${
                    summonerSpells.primary === spell.id
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black border-transparent'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{renderSpellIcon(spell.icon, '⚡')}</div>
                    <div className="text-xs font-medium">{spell.name}</div>
                  </div>

                  {/* Tooltip */}
                  {showTooltip === `spell-${spell.id}` && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 text-white text-sm max-w-xs z-50"
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">{renderSpellIcon(spell.icon, '⚡')}</div>
                        <div className="font-medium mb-1">{spell.name}</div>
                        <div className="text-gray-300 text-xs mb-2">{spell.description}</div>
                        <div className="text-emerald-400 text-xs">{spell.cooldown}</div>
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Secundário</label>
            <div className="grid grid-cols-3 gap-2">
              {summonerSpellData.map((spell) => (
                <motion.button
                  key={spell.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSummonerSpellChange('secondary', spell.id)}
                  onMouseEnter={() => setShowTooltip(`spell2-${spell.id}`)}
                  onMouseLeave={() => setShowTooltip(null)}
                  className={`relative p-3 rounded-lg border transition-all duration-200 ${
                    summonerSpells.secondary === spell.id
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black border-transparent'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{renderSpellIcon(spell.icon, '⚡')}</div>
                    <div className="text-xs font-medium">{spell.name}</div>
                  </div>

                  {/* Tooltip */}
                  {showTooltip === `spell2-${spell.id}` && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 text-white text-sm max-w-xs z-50"
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">{renderSpellIcon(spell.icon, '⚡')}</div>
                        <div className="font-medium mb-1">{spell.name}</div>
                        <div className="text-gray-300 text-xs mb-2">{spell.description}</div>
                        <div className="text-emerald-400 text-xs">{spell.cooldown}</div>
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spell Summary */}
      <div className="bg-white/5 rounded-xl p-4">
        <h4 className="text-white font-medium mb-3">Resumo das Habilidades</h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skill Order Summary */}
          <div>
            <div className="text-gray-300 text-sm mb-2">Ordem de Habilidades</div>
            <div className="flex flex-wrap gap-1">
              {spells.order.map((skill, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 bg-gradient-to-r ${getSkillColor(skill)} rounded-lg flex items-center justify-center text-white font-bold text-sm`}
                  title={`Nível ${index + 1}: ${getSkillName(skill)}`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Max Order Summary */}
          <div>
            <div className="text-gray-300 text-sm mb-2">Ordem de Max</div>
            <div className="space-y-2">
              {spells.maxOrder.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm w-6">{index + 1}º</span>
                  <div className={`w-8 h-8 bg-gradient-to-r ${getSkillColor(skill)} rounded-lg flex items-center justify-center text-white font-bold`}>
                    {skill}
                  </div>
                  <span className="text-white text-sm">{getSkillName(skill)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summoner Spells Summary */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-gray-300 text-sm mb-2">Spells de Invocador</div>
          <div className="flex gap-3">
            {summonerSpells.primary && (
              <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                <span className="text-lg">
                  {renderSpellIcon(
                    summonerSpellData.find(s => s.id === summonerSpells.primary)?.icon,
                    '⚡'
                  )}
                </span>
                <span className="text-white text-sm">
                  {summonerSpellData.find(s => s.id === summonerSpells.primary)?.name}
                </span>
                <span className="text-emerald-400 text-xs">
                  {summonerSpellData.find(s => s.id === summonerSpells.primary)?.cooldown}
                </span>
              </div>
            )}
            
            {summonerSpells.secondary && (
              <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                <span className="text-lg">
                  {renderSpellIcon(
                    summonerSpellData.find(s => s.id === summonerSpells.secondary)?.icon,
                    '⚡'
                  )}
                </span>
                <span className="text-white text-sm">
                  {summonerSpellData.find(s => s.id === summonerSpells.secondary)?.name}
                </span>
                <span className="text-emerald-400 text-xs">
                  {summonerSpellData.find(s => s.id === summonerSpells.secondary)?.cooldown}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


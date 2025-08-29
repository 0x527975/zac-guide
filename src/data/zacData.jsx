import {
  getItemIcon,
  getChampionIcon,
  getChampionSpells,
  getSummonerSpellsByName,
  getShardIcon
} from './utils/ddragon';

const LOCAL_KEY = "zac_data_v1";

export async function getZacData(forceRefresh = false) {
  if (!forceRefresh) {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) {
      try { return JSON.parse(raw); } catch {}
    }
  }

  // pré-buscar spells de Zac uma vez
  const zacSpells = await getChampionSpells("Zac");

  // função helper para item/rune thumbnails
  const makeShard = async (k, name) => ({ name, icon: await getShardIcon(k) });

  // build data (exemplo reduzido). Adicione mais matchups conforme precisar.
  const data = {
    top: {
      matchups: {
        darius: {
          championName: "Darius",
          championIcon: await getChampionIcon("Darius"),
          difficulty: "3",
          runes: {
            primaryTreeId: 8000,
            primaryRunesSelectedIds: [8010, 9111, 9105, 8299],
            secondaryTreeId: 8400,
            secondaryRunesSelectedIds: [8473, 8453],
            shards: [
              await makeShard("attackspeed", "Velocidade de Ataque"),
              await makeShard("healthscaling", "Armadura"),
              await makeShard("health", "Resistência Mágica")
            ]
          },
          items: [
            { name: "Botas", icon: await getItemIcon(3006) },
            { name: "Sterak", icon: await getItemIcon(3053) },
            { name: "Goredrinker", icon: await getItemIcon(6632) }
          ],
          spells: zacSpells,
          summonerSpells: await getSummonerSpellsByName("Flash", "Ignite"),
          skillOrder: ["Q", "W", "E", "Q"],
          description: "Darius é perigoso early. Tente trocar com E bem posicionado..."
        }
      }
    },
    mid: {
      matchups: {
        zed: {
          championName: "Zed",
          championIcon: await getChampionIcon("Zed"),
          difficulty: "2",
          runes: {
            primaryTreeId: 8100,
            primaryRunesSelectedIds: [8112, 8126, 8138, 8106],
            secondaryTreeId: 8000,
            secondaryRunesSelectedIds: [9111, 8014],
            shards: [
              await makeShard("attackspeed", "Velocidade de Ataque"),
              await makeShard("healthscaling", "Armadura"),
              await makeShard("health", "Resistência Mágica")
            ]
          },
          items: [
            { name: "Youmuu", icon: await getItemIcon(3142) },
            { name: "Duskblade", icon: await getItemIcon(3147) },
            { name: "Edge of Night", icon: await getItemIcon(3814) }
          ],
          spells: zacSpells,
          summonerSpells: await getSummonerSpellsByName("Ignite", "Flash"),
          skillOrder: ["Q", "W", "E", "Q", "Q", "R"],
          description: "Contra Zed, mantenha barreira com W e force trades quando as sombras dele estiverem off."
        }
      }
    }
  };

  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(data)); } catch {}
  return data;
}

export default getZacData;

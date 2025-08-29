import RuneDisplay from "./RuneDisplay";
import ItemsDisplay from "./ItemsDisplay";
import SummonerSpellsDisplay from "./SummonerSpellsDisplay";
import SpellDisplay from "./SpellDisplay";
import ChampionInfo from "./ChampionInfo";
import { Fragment } from "react";

const difficultyMap = {
  1: { label: "Fácil", color: "text-green-400" },
  2: { label: "Médio", color: "text-yellow-400" },
  3: { label: "Difícil", color: "text-orange-400" },
  4: { label: "Impossível", color: "text-red-500" },
}

/**
 * Se receber compareWith (array com ids), você pode buscar os dados correspondentes
 * no parent e exibir lado-a-lado. Aqui, o parent envia compareWith e o matchupData
 * (que é do champion selecionado).
 */
export default function MatchupPanel({ matchupData = null, compareWith = [] }) {
  if (!matchupData) return null;

  const diff = difficultyMap[matchupData.difficulty] || { label: "?", color: "text-gray-100"};

  return (
    <div className="flex flex-col gap-6 p-4">

      {/* Cabeçalho */}
      <section className="bg-zinc-800 border border-emerald-600 rounded-lg shadow p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-emerald-400">
              <img src={matchupData.championIcon} alt={matchupData.championName} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-300">
                {matchupData.championName}
              </h2>
              <div className={`text-xs font-semibold ${diff.color}`}>
                {diff.label}
              </div>
            </div>
          </div>
          <div className="text-sm text-[#A09B8C]">Matchup</div>
        </div>
      </section>

      {/* Runas */}
      <section>
        <div className="bg-zinc-800 border border-emerald-600 rounded-lg shadow p-4">
          <RuneDisplay runes={matchupData.runes} />
        </div>
      </section>

      {/* Itens */}
      <section>
        <div className="bg-zinc-800 border border-emerald-600 rounded-lg shadow p-4">
          <ItemsDisplay items={matchupData.items} />
        </div>
      </section>

      {/* Feitiços */}
      <section className="bg-zinc-800 border border-emerald-600 rounded-lg shadow p-4">
        <SummonerSpellsDisplay summonerSpells={matchupData.summonerSpells} />
      </section>

      {/* Habilidades */}
      <section className="bg-zinc-800 border border-emerald-600 rounded-lg shadow p-4">
        <SpellDisplay spells={matchupData.spells} skillOrder={matchupData.skillOrder} />
      </section>

      {/* Descrição */}
      <section className="bg-zinc-800 border border-emerald-600 rounded-lg shadow p-4 text-center">
        <ChampionInfo
          championName={matchupData.championName}
          description={matchupData.description}
        />
      </section>
    </div>
  );
}

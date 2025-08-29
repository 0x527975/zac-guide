import { useEffect, useState } from "react";
import { getAllRunesData } from "../data/utils/ddragon";

export default function RuneDisplay({ runes }) {
  const [runesData, setRunesData] = useState(null);

  useEffect(() => {
    getAllRunesData()
      .then(data => setRunesData(data))
      .catch(() => {});
  }, []);

  if (!runes || !runesData) return <div className="text-sm text-[#A09B8C]">Carregando runas...</div>;

  const findTree = (id) => runesData.find(t => t.id === id);

  const renderSlots = (treeId, selected) => {
    const tree = findTree(treeId);
    if (!tree) return null;

    return (
      <div>
        <div className="text-center font-semibold text-emerald-300 mb-2">{tree.name}</div>
        {tree.slots.map((slot, i) => (
          <div key={i} className="flex justify-center gap-3 mb-3">
            {slot.runes.map(r => {
              const selectedIds = selected || [];
              // Simplifica a checagem para só comparar id com includes
              const isSelected = selectedIds.includes(r.id);
              return (
                <div
                  key={r.id}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                    isSelected
                      ? "opacity-100 border border-emerald-500"
                      : "opacity-30 grayscale"
                  }`}
                >
                  {/* URL completa, com caminho fixo para garantir a imagem */}
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/img/${r.icon}`}
                    alt={r.name}
                    className="w-12 h-12"
                  />
                  <span className="mt-1 text-sm text-center text-white">{r.name}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h4 className="text-emerald-300 text-lg mb-3">Runas</h4>
      <div>{renderSlots(runes.primaryTreeId, runes.primaryRunesSelectedIds)}</div>
      <div>{renderSlots(runes.secondaryTreeId, runes.secondaryRunesSelectedIds)}</div>
      <div className="mt-4">
        <h5 className="text-emerald-300 text-base mb-2">Fragmentos</h5>
        <div className="flex gap-3 justify-center flex-wrap">
          {runes.shards.map((s, i) => (
            <div key={i} className="flex flex-col items-center p-2">
              <img src={s.icon} alt={s.name} className="w-12 h-12" />
              <span className="mt-1 text-sm text-white">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

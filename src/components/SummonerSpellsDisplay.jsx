export default function SummonerSpellsDisplay({ summonerSpells }) {
  if (!summonerSpells || summonerSpells.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-300 mb-4 text-center">
        Feitiços de Invocador
      </h2> 
      <div className="flex justify-center gap-6 flex-wrap">
        {summonerSpells.map(({ id, name, icon }) => (
          <div
            key={id}
            className="flex flex-col items-center transition hover:scale-105"
          >
            <div className="w-14 h-14 rounded-lg border border-emerald-600 overflow-hidden shadow-md bg-zinc-900 flex items-center justify-center">
              <img
                src={icon}
                alt={name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <span className="mt-1 text-sm text-center text-white">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

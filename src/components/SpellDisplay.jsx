export default function SpellDisplay({ spells, skillOrder }) {
  if (!spells || !skillOrder) return null;

  const labels = ["Q", "W", "E", "R"];

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-emerald-300 mb-4 text-center">
        Habilidades e Ordem de Upgrade
      </h2>

      <div className="flex justify-center gap-6 flex-wrap">
        {spells.map(({ name, icon }, index) => {
          const label = labels[index] || `Skill ${index}`;
          const safeName = name || `Skill - ${label}`;
          return (
            <div
              key={label}
              className="flex flex-col items-center transition hover:scale-105"
            >
              <div className="w-14 h-14 rounded-lg border border-emerald-600 overflow-hidden shadow-md bg-zinc-900 flex items-center justify-center">
                <img
                  src={icon}
                  alt={safeName}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="mt-1 text-sm text-center text-white">{label}</span>
            </div>
          );
        })}
      </div>

      <div className="overflow-x-auto bg-zinc-900 mt-5 p-4 rounded-md text-center text-white font-mono text-lg tracking-widest border border-emerald-600">
        {skillOrder.join(" → ")}
      </div>
    </div>
  );
}

export default function ItemsDisplay({ items }) {
  if (!items || items.length === 0) return <div className="text-sm text-[#A09B8C]">Sem itens recomendados.</div>;
  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-300 mb-4 text-center">
        Itens recomendados
      </h2>
      <div className="flex gap-6 flex-wrap justify-center">
        {items.map(({ name, icon }, index) => (
          <div key={name || index} className="flex flex-col items-center transition hover:scale-105">
            <div className="w-14 h-14 rounded-lg border border-emerald-600 overflow-hidden shadow-md bg-zinc-900 flex items-center justify-center">
              {icon ? <img src={icon} alt={name || `Item ${index+1}`} className="w-full h-full object-contain" /> : <div className="text-xs text-[#A09B8C]">N/A</div>}
            </div>
            <span className="mt-1 text-sm text-white text-center">{name || `Item ${index + 1}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

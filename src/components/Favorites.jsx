import React from "react";

const KEY = "zac_favs_v1";

export function useFavorites() {
  const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
  const parsed = raw ? JSON.parse(raw) : [];
  const [list, setList] = React.useState(parsed);
  React.useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {} }, [list]);
  const toggle = (id) => setList(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const isFav = (id) => list.includes(id);
  return { list, toggle, isFav };
}

export default function Favorites({ favorites, onToggle }) {
  if (!favorites || favorites.length === 0) return null;
  return (
    <div className="p-3 bg-[#0F1923] rounded-lg">
      <h4 className="text-sm font-bold text-emerald-300 mb-2">Favoritos</h4>
      <div className="flex gap-2 flex-wrap">
        {favorites.map(f => (
          <button key={f} onClick={() => onToggle(f)} className="px-3 py-1 bg-[#1c1c1c] rounded text-sm border border-emerald-500">
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

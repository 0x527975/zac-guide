//nao ta sendo usado, tenho q tirar do ChampionDraft e passar pra ca

export default function MatchupSelector({ matchups, selectedMatchup, onSelectMatchup }) {
  return (
    <section
      aria-label="Selecionar campeão inimigo"
      className="max-w-xl mx-auto mb-8 bg-zinc-800 rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-bold text-emerald-300 mb-6 text-center">Escolha o Campeão Inimigo</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {Object.entries(matchups).map(([key, matchup]) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelectMatchup(key)}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition text-white w-32
              ${
                selectedMatchup === key
                  ? "border-emerald-400 bg-zinc-700 shadow-lg"
                  : "border-transparent hover:border-emerald-500 hover:bg-zinc-700"
              } focus:outline-none focus:ring-2 focus:ring-emerald-400`}
            aria-pressed={selectedMatchup === key}
            aria-label={`Selecionar matchup contra ${matchup.championName}`}
          >
            <img
              src={matchup.championIcon}
              alt={matchup.championName}
              className="w-16 h-16 rounded-full object-cover shadow"
              loading="lazy"
              width={64}
              height={64}
            />
            <span className="text-base font-semibold text-center">{matchup.championName}</span>
            {matchup.difficulty && (
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 select-none
                  ${
                    matchup.difficulty === "Fácil"
                      ? "bg-green-600"
                      : matchup.difficulty === "Médio"
                      ? "bg-yellow-600"
                      : matchup.difficulty === "Difícil"
                      ? "bg-red-600"
                      : matchup.difficulty === "Muito Difícil"
                      ? "bg-purple-700"
                      : "bg-gray-600"
                  }`}
                aria-label={`Dificuldade: ${matchup.difficulty}`}
              >
                {matchup.difficulty}
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

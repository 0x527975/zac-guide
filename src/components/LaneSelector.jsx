import midIcon from "../assets/lanes/mid.png";
import topIcon from "../assets/lanes/top.png";
import jungleIcon from "../assets/lanes/jungle.png";
import botIcon from "../assets/lanes/bottom.png";
import supportIcon from "../assets/lanes/support.png";

const laneIcons = {
  mid: midIcon,
  top: topIcon,
  jungle: jungleIcon,
  bot: botIcon,
  support: supportIcon,
};

export default function LaneSelector({ lanes, selectedLane, onSelectLane }) {
  return (
    <div className="flex flex-wrap gap-3 justify-start w-full">
      {lanes.map((lane) => {
        const isSelected = selectedLane === lane;
        return (
          <button
            key={lane}
            type="button"
            onClick={() => onSelectLane(lane)}
            className={`group flex items-center gap-2 px-5 py-2 rounded-xl border text-sm font-bold uppercase tracking-wide transition-all duration-200 shadow-sm
              ${
                isSelected
                  ? "bg-gradient-to-br from-emerald-600 to-emerald-400 text-[#F0E6D2] border-emerald-500 ring-2 ring-emerald-500"
                  : "bg-[#1E2328] border-[#785A28] text-[#C8AA6E] hover:bg-[#2A2E35] hover:border-emerald-500 hover:text-[#F0E6D2]"
              }
            `}
            aria-pressed={isSelected}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center overflow-hidden border
                ${isSelected ? "border-[#F0E6D2]" : "border-[#785A28]"}`}
            >
              <img src={laneIcons[lane]} alt={`${lane} icon`} className="w-5 h-5" />
            </div>
            {lane.charAt(0).toUpperCase() + lane.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

import { useGameStore } from "../store/gameStore";
import GameCell from "./GameCell";

const GameBoard = () => {
  const { cells, markCell, currentPlayer, resetgame, loading } = useGameStore();

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <h1 className="text-lg font-medium">Player:{currentPlayer}</h1>
        <span>{loading ? "Ai Thinking...." : ""}</span>
      </div>
      <div className="grid grid-cols-3 w-fit h-fit">
        {cells.map((value, index) => (
          <GameCell key={index} value={value} onClick={() => markCell(index)} />
        ))}
      </div>
      <div>
        <button
          onClick={resetgame}
          className="mt-4 px-4 py-2 bg-green-500 text-white"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};
export default GameBoard;

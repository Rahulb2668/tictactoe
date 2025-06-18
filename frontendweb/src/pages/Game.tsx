import GameBoard from "../components/GameBoard";
import StatsBoard from "../components/StatsBoard";
import { useGameStore } from "../store/gameStore";

const Game = () => {
  const { currentPlayer, winner, userPlaySymbol, gameStatus, startgame } =
    useGameStore();
  const handlePlayerSelect = async (aiPlay: boolean) => {
    await startgame(aiPlay);
  };

  return (
    <div className="flex flex-col w-full relative">
      {currentPlayer && (
        <div className="grid grid-cols-2 w-full h-full">
          <GameBoard />
          <StatsBoard />
        </div>
      )}
      {!currentPlayer && (
        <div className="flex flex-col gap-6">
          <h1>Please select the first player</h1>
          <div className="flex gap-4">
            <button
              className="border border-gray-600 bg-orange-400 px-4 py-2"
              onClick={() => handlePlayerSelect(false)}
            >
              I will Play
            </button>
            <button
              className="border border-gray-600 bg-orange-950 text-white px-4 py-2"
              onClick={() => handlePlayerSelect(true)}
            >
              Let Computer Play{" "}
            </button>
          </div>
        </div>
      )}

      {gameStatus !== "ongoing" && (
        <div className="w-full items-center text-5xl text-green-600 font-bold">
          {winner
            ? `game over winner is : ${
                winner === userPlaySymbol ? "You" : "AI"
              }`
            : "game is a draw"}
        </div>
      )}
    </div>
  );
};
export default Game;

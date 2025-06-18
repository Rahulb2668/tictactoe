import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

const StatsBoard = () => {
  const { getUserGameStats, userGameStats } = useGameStore();
  useEffect(() => {
    const fetchUserGameStats = async () => {
      await getUserGameStats();
    };
    fetchUserGameStats();
  }, []);

  // console.log("userGameStats", userGameStats);
  return (
    <div>
      <h1>StatsBoard</h1>

      <table className="w-full text-center border-collapse border border-black-500">
        <thead>
          <tr>
            <th>Total Games</th>
            <th>Wins</th>
            <th>Draws</th>
            <th>Losses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userGameStats.totalGames}</td>
            <td>{userGameStats.wins}</td>
            <td>{userGameStats.draws}</td>
            <td>{userGameStats.losses}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default StatsBoard;

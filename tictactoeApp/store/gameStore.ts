import { create } from "zustand";
import { combine } from "zustand/middleware";
import { checkWinner } from "../utils/checkWinner";
import { useAuthStore } from "./authStore";
import axios, { AxiosRequestConfig } from "axios";
import { getAiMove } from "../utils/getAiMove";

type Cell = string | null;
type Player = "X" | "O" | null;
type GameStatus = "ongoing" | "won" | "draw";
const config: AxiosRequestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${useAuthStore.getState().token}`,
  },
};

export const useGameStore = create(
  combine(
    {
      cells: Array<Cell>(9).fill(null),
      currentPlayer: null as Player,
      userPlaySymbol: "X" as Player,
      gameStatus: "ongoing" as GameStatus,
      winner: null as Player,
      loading: false as boolean,
      userGameStats: {
        totalGames: 0,
        wins: 0,
        losses: 0,
        draws: 0,
      },
    },
    (set) => ({
      markCell: async (index: number) => {
        const state = useGameStore.getState();
        if (
          state.cells[index] ||
          state.gameStatus !== "ongoing" ||
          state.currentPlayer !== state.userPlaySymbol ||
          state.loading
        )
          return state;

        const newCells = [...state.cells];
        newCells[index] = state.currentPlayer;

        const winner = checkWinner(newCells);
        const fullBoard = newCells.every((cell) => cell !== null);

        let gameStatus: GameStatus = "ongoing";
        let gameWinner: Player = null;
        let nextPlayer = state.currentPlayer;

        if (winner) {
          gameStatus = "won";
          gameWinner = state.currentPlayer;
          useGameStore.getState().updateUserGameStats("win");
        } else if (fullBoard) {
          gameStatus = "draw";
          useGameStore.getState().updateUserGameStats("draw");
        } else {
          nextPlayer = state.currentPlayer === "X" ? "O" : "X";
        }

        set(() => ({
          cells: newCells,
          winner: gameWinner,
          currentPlayer: nextPlayer,
          gameStatus,
          loading: true,
        }));

        const aiMovePos = await getAiMove();

        const aiPlayer: Player = state.userPlaySymbol === "X" ? "O" : "X";
        const newCellsWithAi = [...newCells];

        newCellsWithAi[aiMovePos.data] = aiPlayer;

        const winnerAI = checkWinner(newCellsWithAi);
        const fullBoardAi = newCellsWithAi.every((cell) => cell !== null);

        if (winnerAI) {
          gameStatus = "won";
          gameWinner = aiPlayer;
          useGameStore.getState().updateUserGameStats("loss");
        } else if (fullBoardAi) {
          gameStatus = "draw";
          useGameStore.getState().updateUserGameStats("draw");
        } else {
          nextPlayer = state.userPlaySymbol!;
        }

        set(() => ({
          cells: newCellsWithAi,
          winner: gameWinner,
          currentPlayer: nextPlayer,
          gameStatus,
          loading: false,
        }));
      },
      resetgame: () => {
        set(() => ({
          cells: Array<Cell>(9).fill(null),
          currentPlayer: null as Player,
          gameStatus: "ongoing" as "ongoing" | "won" | "draw",
          winner: null as Player,
          userPlaySymbol: "X" as Player,
        }));
      },
      setCurrentPlayer: (player: Player) => {
        set(() => ({
          currentPlayer: player,
        }));
      },
      getUserGameStats: async () => {
        const user = useAuthStore.getState().user;
        if (!user) {
          throw new Error("not user");
        }
        const res = await axios.get(
          "http://localhost:5000/api/gamestats",
          config
        );

        if (res.data && res.data.data) {
          set(() => ({
            userGameStats: {
              totalGames: res.data.data.totalGames,
              wins: res.data.data.wins,
              losses: res.data.data.losses,
              draws: res.data.data.draws,
            },
          }));
        }
      },
      updateUserGameStats: async (result: "win" | "loss" | "draw") => {
        const user = useAuthStore.getState().user;
        if (!user) {
          throw new Error("no user found");
        }
        const payload = {
          win: result === "win" ? 1 : 0,
          loss: result === "loss" ? 1 : 0,
          draw: result === "draw" ? 1 : 0,
        };
        const res = await axios.post(
          "http://localhost:5000/api/gamestats",
          { ...payload },
          config
        );

        if (res.data && res.data.data) {
          set(() => ({
            userGameStats: {
              totalGames: res.data.data.totalGames,
              wins: res.data.data.wins,
              losses: res.data.data.losses,
              draws: res.data.data.draws,
            },
          }));
        }
      },
      startgame: async (aiPlay: boolean) => {
        const state = useGameStore.getState();
        set({
          currentPlayer: "X",
          userPlaySymbol: aiPlay ? "O" : "X",
          loading: aiPlay,
        });

        if (aiPlay) {
          const aiMoves = await getAiMove();
          const newCellsWithAi = [...state.cells];
          newCellsWithAi[aiMoves.data] = "X";

          set({
            cells: newCellsWithAi,
            currentPlayer: "O",
            loading: false,
          });
        }
      },
    })
  )
);

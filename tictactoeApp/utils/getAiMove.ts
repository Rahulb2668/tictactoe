import { Cell, Player } from "@/store/gameStore";
import { useAuthStore } from "../store/authStore";
import axios, { AxiosRequestConfig } from "axios";

export const getAiMove = async (
  currentBoard: Array<Cell>,
  currentPlayer: Player
) => {
  const config: AxiosRequestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useAuthStore.getState().token}`,
    },
  };

  try {
    const response = await axios.post(
      "http://192.168.100.47:5000/api/getnextmove",
      {
        currentBoard,
        currentPlayer,
      },
      config
    );

    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

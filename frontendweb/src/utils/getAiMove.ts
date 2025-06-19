import { useAuthStore } from "../store/authStore";
import axios, { AxiosRequestConfig } from "axios";
import { Cell, Player } from "../store/gameStore";

const config: AxiosRequestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${useAuthStore.getState().token}`,
  },
};

export const getAiMove = async (
  currentBoard: Array<Cell>,
  currentPlayer: Player
) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/getnextmove",
      {
        currentBoard,
        currentPlayer,
      },
      config
    );

    console.log("esponse", response.data);
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

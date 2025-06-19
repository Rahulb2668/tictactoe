import { useAuthStore } from "../store/authStore";
import { useGameStore } from "../store/gameStore";
import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${useAuthStore.getState().token}`,
  },
};

export const getAiMove = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/getnextmove",
      {
        currentBoard: useGameStore.getState().cells,
        currentPlayer: useGameStore.getState().currentPlayer,
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

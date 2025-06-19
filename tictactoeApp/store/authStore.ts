import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios, { AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  user: {
    email: string;
    id: string;
  };
  token: string;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  register: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {
        email: "",
        id: "",
      },
      token: "",
      login: async (email: string, password: string) => {
        const config: AxiosRequestConfig = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };

        try {
          const response = await axios.post(
            "http://192.168.100.47:5000/api/auth/login", // Change to your backend URL
            {
              email,
              password,
            },
            config
          );

          console.log("hi", email, password);
          if (response.data && response.data.data.token) {
            set({
              user: {
                email: response.data.data.user.email,
                id: response.data.data.user.id,
              },
              token: response.data.data.token,
            });
          }
          return { success: true, message: "Login successful" };
        } catch (error: any) {
          console.log("error", error);
          return {
            success: false,
            message: error.response?.data?.message || "Login failed",
          };
        }
      },
      register: async (email: string, password: string) => {
        const config: AxiosRequestConfig = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };

        try {
          const response = await axios.post(
            "http://192.168.100.47:5000/api/auth/register", // Change to your backend URL
            {
              email,
              password,
            },
            config
          );

          if (response.data && response.data.data.token) {
            set({
              user: {
                email: response.data.data.user.email,
                id: response.data.data.user.id,
              },
              token: response.data.data.token,
            });
          }
          return { success: true, message: "Registration successful" };
        } catch (error: any) {
          return {
            success: false,
            message: error.response?.data?.message || "Registration failed",
          };
        }
      },
      logout: () => {
        set({
          user: { email: "", id: "" },
          token: "",
        });
      },
      isAuthenticated: () => !!get().token,
    }),
    {
      name: "user-data",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

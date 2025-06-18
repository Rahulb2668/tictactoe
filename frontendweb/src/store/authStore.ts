import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios, { AxiosRequestConfig } from "axios";

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
            "http://localhost:5000/api/auth/login",
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
          return { success: true, message: "Login successful" };
        } catch (error: any) {
          return { success: false, message: error.response.data.message };
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
            "http://localhost:5000/api/auth/register",
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
          return { success: true, message: "Registeration successful" };
        } catch (error: any) {
          return { success: false, message: error.response.data.message };
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
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

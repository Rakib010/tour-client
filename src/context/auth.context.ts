import { createContext } from "react";
import type { TRole, ILogin } from "@/types";

type AuthUser = {
  _id?: string;
  name?: string;
  email?: string;
  role?: TRole | string;
  phone?: string;
  address?: string;
};

type AuthContextState = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  role: TRole | string | null;
  login: (payload: ILogin) => Promise<any>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<any>;
};

const initialState: AuthContextState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  role: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (_payload: ILogin) => {
    throw new Error("AuthContext not initialized");
  },
  logout: async () => {
    throw new Error("AuthContext not initialized");
  },
  refetchUser: async () => {
    throw new Error("AuthContext not initialized");
  },
};

export const AuthContext = createContext<AuthContextState>(initialState);


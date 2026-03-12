import { AuthContext } from "@/context/auth.context";
import {
  authApi,
  useLoginMutation,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import type { ILogin } from "@/types";
import { useState } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  const {
    data: userData,
    isLoading,
    refetch,
  } = useUserInfoQuery(undefined, {
    // user info is used app-wide, keep it relatively fresh
    refetchOnMountOrArgChange: true,
  });

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  // Local override user:
  // - Immediately after a successful login, we already have the user object in the
  //   login response. We store it here so the UI (Navbar, protected routes) can
  //   update instantly without waiting for `/user/me` to finish.
  // - Once `/user/me` responds with data, that data takes priority and becomes
  //   the single source of truth again.
  const [overrideUser, setOverrideUser] = useState<any | null>(null);

  const userFromQuery = (userData as any)?.data ?? null;
  const user = userFromQuery ?? overrideUser;

  const login = async (payload: ILogin) => {
    const res = await loginMutation(payload).unwrap();

    if (res?.success) {
      // The login response already contains the logged-in user's info,
      // so we can optimistically update the AuthContext immediately.
      // Shape from backend:
      // sendResponse -> { success, statusCode, message, data: { accessToken, refreshToken, data: user } }
      const loggedInUser = (res as any)?.data?.data;
      if (loggedInUser) {
        setOverrideUser(loggedInUser);
      }

      // Cookie-only explanation:
      // - Backend sets httpOnly cookies (accessToken, refreshToken) on successful login.
      // - We NEVER store tokens in localStorage/sessionStorage.
      // - To sync the React state with the new auth cookies, we:
      //   1) reset RTK Query cache
      //   2) refetch `/user/me` which uses the cookie for authentication.
      dispatch(authApi.util.resetApiState());
      await refetch();
    }

    return res;
  };

  const logout = async () => {
    try {
      await logoutMutation(undefined).unwrap();
    } finally {
      // After logout, cookies are cleared by the backend. Here we just
      // reset client-side cache and user state so the UI reflects that
      // the user is logged out.
      setOverrideUser(null);
      dispatch(authApi.util.resetApiState());
      await refetch();
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user?.email),
    role: (user?.role as string | null) ?? null,
    login,
    logout,
    refetchUser: refetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


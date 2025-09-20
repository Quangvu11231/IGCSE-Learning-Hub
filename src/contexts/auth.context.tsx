import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authApi } from "../apis/auth.api";
import type { LoginRequestType } from "../payload/request/auth.request";
import type { IUser } from "../payload/response/auth.request";
import { useMessage } from "./message.context";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  initialLoading: boolean;
  error: string | null;
  login: (data: LoginRequestType) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultContext: AuthContextType = {
  user: null,
  loading: false,
  initialLoading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
};
const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { showMessage } = useMessage();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setInitialLoading(true);
        const response = await authApi.me();
        if (response.success) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error loading user from storage:", err);
        setUser(null);
      } finally {
        setInitialLoading(false);
      }
    };
    loadUser();
  }, []);
  const login = useCallback(
    async (data: LoginRequestType) => {
      try {
        setLoading(true);
        setError(null);
        const response = await authApi.login(data);
        if (response.success) {
          // Save user data and token
          setUser(response.data);
          showMessage("success", response.message || "Login success");
        } else {
          showMessage("error", response.message || "Login failed");
        }
      } catch (err: any) {
        showMessage("error", err.message || "Failed to login");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [showMessage]
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setUser(null);
      showMessage("success", "Logout success");
    } catch (err: any) {
      setError(err.message || "Failed to logout");
      showMessage("error", err.message || "Failed to logout");
    } finally {
      setLoading(false);
    }
  }, [showMessage]);
  const value = {
    user,
    loading,
    initialLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

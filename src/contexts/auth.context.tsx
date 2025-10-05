import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authApi } from "../apis/login.api";
import type { LoginRequestType } from "../payload/request/auth.request";
import type { IUser } from "../payload/response/auth.request";
import { useMessage } from "./message.context";
import { useNavigate } from "react-router-dom";
import { HttpStatusCode } from "../constant/http-status-code";


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
  login: async () => { },
  logout: async () => { },
};


const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setInitialLoading(true);
        const token = localStorage.getItem("token");
        const userID = localStorage.getItem("userID");

        // Nếu chưa login thì không cần gọi API
        if (!token || !userID) {
          setUser(null);
          return;
        }

        // Gọi API profile
        const profileRes = await authApi.getProfile(userID);
        if (profileRes) {
          setUser(profileRes);
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

        if (response.statusCode === HttpStatusCode.OK) {
          //lưu token và usedID
          const token = response.data.token;
          const userID = response.data.userID;

          localStorage.setItem("token", token);
          localStorage.setItem("userID", userID);

          // Gọi profile API
          const profileRes = await authApi.getProfile(userID);
          console.log(">>>>>Profile data: ", profileRes);

          if (profileRes) {
            setUser(profileRes);
            showMessage("success", response.message || "Login success");
            navigate("/");
          } else {
            showMessage("error", "Cannot load profile");
          }


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
    [showMessage, navigate]
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      //xóa token và userID
      localStorage.removeItem("token");
      localStorage.removeItem("userID");

      //xóa user state
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

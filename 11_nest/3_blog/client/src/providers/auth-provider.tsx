import { createContext, FC, ReactNode, useContext, useState } from "react";
import { LoginValues, RegisterValues, User } from "../types";
import { authService } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AuthContextType {
  loading: boolean;
  user: User | null;
  register: (values: RegisterValues) => Promise<void>;
  login: (values: LoginValues) => Promise<void>;
  logout: () => Promise<void>;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context Provider
const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const register = async (values: RegisterValues) => {
    try {
      await authService.register(values);
      toast.success("Hesabınız başarıyla oluşturuldu. Giriş yapınız.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message || "Bir hata oluştu");
    }
  };

  const login = async (values: LoginValues) => {
    try {
      const { user, access } = await authService.login(values);

      setUser(user);
      setAccessToken(access);
      navigate("/");
      toast.success("Giriş yapıldı");
    } catch (error: any) {
      toast.error(error.response.data.message || "Bir hata oluştu");
    }
  };

  const logout = async () => {
    console.log("logout");
  };

  const value: AuthContextType = {
    loading,
    user,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Context Consumer
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export default AuthProvider;

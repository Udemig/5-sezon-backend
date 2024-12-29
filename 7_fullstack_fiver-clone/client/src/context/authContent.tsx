import { createContext, useContext, useEffect, useState } from "react";
import { IFormUser, ILoginUser, IUser } from "../types";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ContextType = {
  user: IUser | null;
  isLoading: boolean;
  register: (user: IFormUser) => void;
  login: (user: ILoginUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<ContextType>({
  user: null,
  isLoading: true,
  register: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  // her sayfa yenilediğinde eleimizdeki token ile api'dan kullanıc verilierni iste
  useEffect(() => {
    // eğer token yoksa çalışmasın
    const token = localStorage.getItem("token") || document.cookie;

    if (!token) return setIsLoading(false);

    setIsLoading(true);

    api
      .get("/auth/profile")
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        localStorage.removeItem("token");
        toast.info("Oturumunuzun süresi doldu. Tekrardan giriş yapın");
      })
      .finally(() => setIsLoading(false));
  }, []);

  // kaydol
  const register = (user: IFormUser) => {
    api
      .post("/auth/register", user, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.info("Hesabınız oluşturuldu. Giriş Yapabilirsiniz");
        navigate("/login");
      })
      .catch((err) => toast.error(err.response?.data?.message));
  };

  // giriş yap
  const login = (user: ILoginUser) => {
    setIsLoading(true);

    api
      .post("/auth/login", user)
      .then((res) => {
        // kullanıcı state'inin güncelle
        setUser(res.data.user);

        // tokeni local'e kaydet
        localStorage.setItem("token", res.data.token);

        // bildirim
        toast.success("Oturumunuz açıldı");

        // yönlendir
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  // çıkış yap
  const logout = () => {
    api
      .post("/auth/logout")
      .then(() => {
        setUser(null);
        localStorage.removeItem("token");
        toast.info("Oturmunuz kapandı");
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// contexte aboneliğimizi kolaylaştırıcak hook
export const useAuth = () => {
  return useContext(AuthContext);
};

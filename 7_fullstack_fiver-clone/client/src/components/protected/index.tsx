import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContent";
import Loader from "../loader";

const Protected = () => {
  // kullanıcı verilerini al
  const { user, isLoading } = useAuth();

  // kullanıcı verisi yüklenene kadar loader bas
  if (isLoading) return <Loader designs="my-20 size-10" />;

  // kullanıcı hesabı satıcı değilse anasayfaya yönlendir
  if (!user?.isSeller) return <Navigate to="/" replace />;

  // kullanıcı hesabı satıcıysa sayfayı göster
  return <Outlet />;
};

export default Protected;

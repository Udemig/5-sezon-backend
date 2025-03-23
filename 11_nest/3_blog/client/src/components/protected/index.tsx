import { FC } from "react";
import { useAuth } from "../../providers/auth-provider";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../loader";

const Protected: FC = () => {
  // auth provider'dan user ve loading bilgilerini al
  const { user, loading } = useAuth();

  // loading true ise loader göster
  if (loading || user === undefined) {
    return <Loader />;
  }

  // user yoksa ana sayfasınsayfaya yönlendir
  if (user === null) {
    return <Navigate to="/" />;
  }

  // user varsa protected sayfasını göster
  return <Outlet />;
};

export default Protected;

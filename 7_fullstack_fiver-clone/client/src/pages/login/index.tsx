import { FormEvent } from "react";
import Input from "../../components/input";
import { Link } from "react-router-dom";
import { ILoginUser } from "../../types";
import { useAuth } from "../../context/authContent";

const Login = () => {
  const { login } = useAuth();

  // form gönderilince
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const user = Object.fromEntries(formData.entries());

    login(user as unknown as ILoginUser);
  };

  return (
    <div className="pt-24 max-w-[500px] mx-auto sm:min-w-[400px] max-sm:w-full">
      <h1 className="title mb-10">Hesabınıza Giriş Yapın</h1>

      <form onSubmit={handleSubmit}>
        <Input label="İsim" name="username" required />
        <Input label="Şifre" name="password" required />

        <button className="form-button">Giriş Yap</button>
      </form>

      <p className="mt-5 text-gray-500">
        Hesabınız yok mu?{" "}
        <Link to="/register" className="ms-1 text-blue-500">
          Kaydol
        </Link>
      </p>
    </div>
  );
};

export default Login;

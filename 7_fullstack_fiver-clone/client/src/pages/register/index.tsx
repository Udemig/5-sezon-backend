import { FormEvent, useContext, useState } from "react";
import Input from "../../components/input";
import Toggle from "../../components/input/toggle";
import { Link } from "react-router-dom";
import { IFormUser } from "../../types";
import { useAuth } from "../../context/authContent";

const Register = () => {
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const { register } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // bir formdata örneği oluştur
    const formData = new FormData(e.target as HTMLFormElement);

    // bütün inputlardaki verileri nesne haline getir
    const newUser = Object.fromEntries(formData.entries());

    // satıcı hesabı bilgisini nesne içerisine kaydet
    (newUser as unknown as IFormUser).isSeller = isSeller;

    // api'a kaydolma isteği at
    register(newUser as unknown as IFormUser);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 md:gap-10 md:pt-24"
      >
        <div>
          <h1 className="title">Yeni Hesap Oluştur</h1>

          <Input label="İsim" required={true} name="username" />
          <Input label="Email" required={true} name="email" type="email" />
          <Input label="Fotoğraf" required={true} name="photo" type="file" />
          <Input label="Ülke" required={true} name="country" />
          <Input label="Şifre" required={true} name="password" />
        </div>

        <div>
          <h1 className="title">Satıcı Olmak İstiyorum</h1>

          <Toggle setIsSeller={setIsSeller} />

          <Input
            label="Telefon"
            type="number"
            name="phone"
            disabled={!isSeller}
            required={isSeller}
          />
          <Input
            label="Açıklama"
            type="textarea"
            name="desc"
            disabled={!isSeller}
            required={isSeller}
          />

          <button type="submit" className="form-button">
            Kaydol
          </button>
          <p className="mt-5 text-gray-500">
            Hesabınız var mı?
            <Link className="ms-3 text-blue-500" to="/login">
              Giriş Yap
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;

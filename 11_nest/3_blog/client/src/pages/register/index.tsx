import { FC } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input";
import { Form, Formik } from "formik";
import { registerInitialValues } from "../../utils/constants";
import { registerSchema } from "../../utils/schema";
import { RegisterValues } from "../../types";
import { useAuth } from "../../providers/auth-provider";

const Register: FC = () => {
  const { register } = useAuth();

  const handleSubmit = (values: RegisterValues) => {
    register(values);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-WHİTE">
          Yeni Hesap Oluştur
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={registerInitialValues}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}
        >
          <Form className="space-y-8">
            <Input label="Kullanıcı Adınız" name="username" type="text" />
            <Input label="Email Adresiniz" name="email" type="email" />
            <Input label="Şifreniz" name="password" type="text" />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-55 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-yellow-60 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Kaydol
              </button>
            </div>
          </Form>
        </Formik>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Hesabın var mı?{" "}
          <Link
            to="/login"
            className="font-semibold text-yellow-55 hover:text-yellow-60 ps-2"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

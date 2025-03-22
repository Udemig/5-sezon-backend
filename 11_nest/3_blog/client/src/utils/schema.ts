import * as Yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerSchema = Yup.object().shape({
  username: Yup.string().required("Kullanıcı adı zorunludur"),
  email: Yup.string()
    .email("Geçersiz email adresi")
    .required("Email zorunludur"),
  password: Yup.string()
    .required("Şifre zorunludur")
    .matches(passwordRegex, "Şifre yeterince güçlü değil"),
});

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Kullanıcı adı zorunludur"),
  password: Yup.string().required("Şifre zorunludur"),
});

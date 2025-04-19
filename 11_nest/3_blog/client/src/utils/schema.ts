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

export const blogSchema = Yup.object().shape({
  title: Yup.string()
    .required("Başlık zorunludur")
    .min(3, "Başlık en az 3 karakter olmalıdır"),
  content: Yup.string()
    .required("İçerik zorunludur")
    .min(10, "İçerik en az 10 karakter olmalıdır"),
});

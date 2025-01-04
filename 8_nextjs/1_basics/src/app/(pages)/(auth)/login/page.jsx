import { delay } from "@/app/utils/delay";

const Login = async () => {
  // 2 sn api isteğine cevap beklediğimizi düşünelim
  await delay();

  // arından api'dan hata dönsün
  // throw new Error("Hakkınız Kalmadı");

  return <div className="page">Giriş Yap</div>;
};

export default Login;

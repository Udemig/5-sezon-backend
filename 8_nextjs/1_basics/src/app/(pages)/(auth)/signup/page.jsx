import { delay } from "@/app/utils/delay";

const Signup = async () => {
  await delay(3000);

  // arından api'dan hata dönsün
  // throw new Error("Server'dan Kaynaklı Hata");

  return <div className="page">Kaydolma</div>;
};

export default Signup;

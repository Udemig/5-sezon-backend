import Link from "next/link";
import { FC } from "react";
import { IoIosCheckmarkCircle as Checkmark } from "react-icons/io";

const Success: FC = () => {
  return (
    <div className="h-screen">
      <div className="h-[50%] bg-green-500 text-white grid place-items-center">
        <div className="flex flex-col items-center gap-10">
          <Checkmark className="text-[70px]" />

          <p className="font-semibold text-4xl text-center">
            Ödeme Başarılı Oldu
          </p>
        </div>
      </div>

      <div className="h-[50%] p-10 mt-10 text-center text-black">
        <p className="text-lg">
          Aracınızı nasıl teslim alacağınıza dair yakında bir mail alıcaksınız
        </p>

        <p className="mt-5 mb-10 text-zinc-600">
          Lütfen mailinizi kontrol edin
        </p>

        <Link
          className="border shadow py-2 px-5 rounded-lg text-lg hover:shadow-lg"
          href="/orders"
        >
          Siparişlerim
        </Link>

        <br />
        <br />
        <br />

        <Link
          className="border shadow py-2 px-5 rounded-lg text-lg hover:shadow-lg"
          href="/"
        >
          Anasayfa
        </Link>
      </div>
    </div>
  );
};

export default Success;

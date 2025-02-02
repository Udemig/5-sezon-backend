import Link from "next/link";
import { FC } from "react";
import { MdCancel } from "react-icons/md";

const Cancel: FC = () => {
  return (
    <div className="h-screen">
      <div className="h-[50%] bg-red-500 text-white grid place-items-center">
        <div className="flex flex-col items-center gap-10">
          <MdCancel className="text-[70px]" />

          <p className="font-semibold text-4xl text-center">
            Malesef, Ödeme Başarısız Oldu
          </p>
        </div>
      </div>

      <div className="h-[50%] p-10 mt-10 text-center text-black">
        <p className="text-lg mb-10">
          Anasayfaya dönüp tekrar deneyebilirsiniz
        </p>

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

export default Cancel;

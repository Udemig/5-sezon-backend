"use client";

import { data } from "@/app/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();

  const item = data.find((i) => i.id === id);

  const close = () => {
    // 1 sayfa geriye
    router.back();

    // 1 sayfa ileriye
    // router.forward();

    // belirli bir sayfaya yönlendir
    // router.push("/");

    // sayfayı tekrar renderlar
    // router.refresh();
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm grid place-items-center">
      <div className="bg-white rounded-md px-10 pb-10 text-black text-5xl flex flex-col gap-5 w-4/5  md:w-2/3 h-4/5 overflow-auto">
        <div className="flex justify-between my-5 text-lg">
          <button onClick={close} className="btn">
            X
          </button>

          <button onClick={refresh} className="btn">
            ?
          </button>
        </div>

        <Image
          src={item.src}
          alt={item.name}
          className="aspect-square max-h-[400px] object-cover rounded-md"
        />

        <h2>{item.name}</h2>

        <div className="my-2">
          <h3 className="text-lg">Fotoğrafçı</h3>
          <span className="text-2xl font-semibold">{item.photographer}</span>
        </div>

        <div className="my-2">
          <h3 className="text-lg">Lokasyon</h3>
          <span className="text-2xl font-semibold">{item.location}</span>
        </div>
      </div>
    </div>
  );
};

export default Page;

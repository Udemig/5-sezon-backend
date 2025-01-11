import { data } from "@/app/utils/constants";
import Image from "next/image";
import Link from "next/link";

const Gallery = () => {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-center text-3xl font-bold mb-10">
        Dünyanın 7 Harikası
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {data.map((item) => (
          <Link href={`/gallery/${item.id}`} key={item.id}>
            <Image
              src={item.src}
              alt={item.name}
              className="w-full aspect-square object-cover rounded-md"
              quality={20}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

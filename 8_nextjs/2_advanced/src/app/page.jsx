import Image from "next/image";
import nature from "./assets/nature.jpg";

const Home = () => {
  const url =
    "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg";

  return (
    <div className="p-10 text-2xl font-semibold flex flex-col gap-20">
      <div>
        <h1>Local Resim (İndirdiğimiz)</h1>

        <Image
          src={nature}
          quality={88}
          width={3000}
          height={400}
          alt="doğa manzarası"
          placeholder="blur"
          priority
        />
      </div>

      <div>
        <h1>Remote Resim (Url ile)</h1>

        <Image src={url} width={500} height={200} alt="okaynus manzarası" />
      </div>

      <div>
        <h1>Remote Resim (Tam Genişlik)</h1>

        <div className="relative h-[250px] w-full">
          <Image src={url} fill alt="okaynus manzarası" />
        </div>
      </div>
    </div>
  );
};

export default Home;

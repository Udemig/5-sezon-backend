const Hero: React.FC = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-5">
      <div className="bg-circle bg-no-repeat bg-cover p-6 rounded-lg">
        <h1 className="text-3xl font-semibold">
          Araç Kiralama için <br /> En İyi Platform
        </h1>

        <p className="my-3">
          Güvenli ve güvenilir bir şekilde araç kiralama yapmanın kolaylığı.
          Tabii ki düşük bir fiyata.
        </p>

        <button className="bg-basic-blue py-2 px-3 rounded-md hover:brightness-90 transition">
          Araç Kirala
        </button>

        <div className="flex justify-center">
          <img src="/car-1.png" alt="car" />
        </div>
      </div>

      <div className="bg-triangle bg-no-repeat bg-cover p-6 max-lg:hidden rounded-lg">
        <h1 className="text-3xl font-semibold w-3/4">
          Düşük fiyata <br /> araba kirala
        </h1>

        <p className="my-3">
          Ucuz araç kiralama hizmetleri ile güvenli ve konforlu olanaklar
          sunmak.
        </p>

        <button className="bg-[#54A6FF] py-2 px-3 rounded-md hover:brightness-90 transition">
          Araç Kirala
        </button>

        <div className="flex justify-center">
          <img src="/car-2.png" alt="car" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

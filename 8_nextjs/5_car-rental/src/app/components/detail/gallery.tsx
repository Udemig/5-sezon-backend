import { FC } from "react";
import { ICar } from "@/app/api/models/Car";
import Image from "next/image";
import generateImage from "@/app/utils/generateImage";

interface Props {
  car: ICar;
}

const Gallery: FC<Props> = ({ car }) => {
  return (
    <div className="grid">
      <div className="bg-triangle bg-center bg-cover rounded-lg p-4 text-white">
        <h1 className="text-3xl font-semibold">
          En iyi tasarıma ve hızlanmaya sahip spor otomobil
        </h1>

        <p className="text-gray-200 mt-2">
          Sürüş sırasında güvenlik ve konfor fütüristik ve zarif spor araba
        </p>

        <div className="relative h-[250px]">
          <Image
            className="object-contain"
            src={generateImage(car.make, car.model)}
            alt={car.model}
            unoptimized
            fill
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 h-[150px]">
        <div className="relative">
          <Image
            className="object-contain rounded-md"
            src={generateImage(car.make, car.model, "sur2", "1")}
            alt={car.model}
            unoptimized
            fill
          />
        </div>

        <div className="relative">
          <Image
            className="object-contain rounded-md"
            src={generateImage(car.make, car.model, "sur3", "4")}
            alt={car.model}
            unoptimized
            fill
          />
        </div>
        <div className="relative">
          <Image
            className="object-contain rounded-md"
            src={generateImage(car.make, car.model, "sur2", "3")}
            alt={car.model}
            unoptimized
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;

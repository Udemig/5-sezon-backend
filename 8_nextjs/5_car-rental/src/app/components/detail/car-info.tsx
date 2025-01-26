import { ICar } from "@/app/api/models/Car";
import { FC } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import RentButton from "./rent-button";

interface Props {
  car: ICar;
}

const CarInfo: FC<Props> = ({ car }) => {
  const arr = [
    {
      title: "Araç Tipi",
      value: car.type,
    },
    {
      title: "Kapasite",
      value: car.capacity,
    },
    {
      title: "Şanzıman",
      value: car.transmission,
    },
    {
      title: "Yakıt",
      value: car.fuelType,
    },
    {
      title: "Renk",
      value: car.color,
    },
    {
      title: "Çekiş",
      value: car.drive,
    },
    {
      title: "Yıl",
      value: car.year,
    },
    {
      title: "Yakıt Kapasite",
      value: car.gasoline || "?",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-5 flex flex-col justify-between">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl">
            {car.make} {car.model}
          </h1>

          <FaHeart className="text-red-500 text-xl" />
        </div>

        <div className="flex gap-2 my-3 items-center">
          {new Array(5).fill("").map((i, key) => (
            <FaStar className={key < 4 ? "text-yellow-500" : "text-zinc-400"} />
          ))}

          <span className="text-zinc-400  text-sm ms-3">440+ yorum</span>
        </div>

        <p className="leading-8 tracking-wide text-lg text-zinc-700 my-14 text-[20px]">
          {car.description}
        </p>

        <div className="grid grid-cols-2 gap-5">
          {arr.map(({ title, value }) => (
            <p className="flex justify-between">
              <span className="text-gray-400">{title}</span>
              <span className="text-zinc-800">{value}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-14">
        <p>
          <span className="text-2xl font-semibold">{car.price}₺ /</span>
          <span className="ms-1 text-zinc-400">gün</span>
        </p>

        <RentButton car={car} />
      </div>
    </div>
  );
};

export default CarInfo;

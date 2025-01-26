"use client";

import { ICar } from "@/app/api/models/Car";
import { FC } from "react";

type Props = {
  car: ICar;
};

const RentButton: FC<Props> = () => {
  // TODO KİRALAMA İÇİN İSTEK AT
  const handleRent = () => {};

  return (
    <button
      onClick={handleRent}
      className="bg-basic-blue py-2 px-6 text-white rounded-md hover:brightness-90 transition"
    >
      Şimdi Kirala
    </button>
  );
};

export default RentButton;

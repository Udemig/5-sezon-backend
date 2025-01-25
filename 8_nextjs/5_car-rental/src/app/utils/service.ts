import { ICar } from "../api/models/Car";

type getCarsRes = Promise<{ cars: ICar[] }>;

export const getCars = async (): getCarsRes => {
  const res = await fetch("http://localhost:3001/api/cars");

  if (!res) {
    throw new Error("Araç verileri alınamadı");
  }

  return res.json();
};

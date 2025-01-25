import { NextResponse as Res } from "next/server";
import connectMongo from "@/app/api/utils/connectMongo";
import Car from "@/app/api/models/Car";

export async function GET() {
  try {
    await connectMongo();

    const cars = await Car.find();

    return Res.json({ cars });
  } catch (error) {
    return Res.json({ message: "Araç verileri alınamadı" }, { status: 500 });
  }
}

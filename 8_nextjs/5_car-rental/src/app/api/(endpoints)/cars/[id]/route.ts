import { NextResponse as Res } from "next/server";
import connectMongo from "@/app/api/utils/connectMongo";
import Car from "@/app/api/models/Car";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Params) {
  try {
    await connectMongo();

    const car = await Car.findById((await params).id);

    if (!car) {
      return Res.json({ message: "Aranan araç bulunamadı" }, { status: 404 });
    }

    return Res.json({ car });
  } catch (error) {
    return Res.json({ message: "Araç verileri alınamadı" }, { status: 500 });
  }
}

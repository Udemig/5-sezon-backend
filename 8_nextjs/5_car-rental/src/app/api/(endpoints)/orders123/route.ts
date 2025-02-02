import { NextResponse } from "next/server";
import Order from "../../models/Order";
import connectMongo from "../../utils/connectMongo";

export async function GET() {
  try {
    await connectMongo();

    const orders = Order.find().populate("product");

    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json(
      { message: "Siparişler alınamadı" },
      { status: 500 }
    );
  }
}

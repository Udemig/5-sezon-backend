import connectMongo from "@/app/utils/connect-mongo";
import { NextResponse } from "next/server";
import Ticket from "../models/Ticket";

export async function GET() {
  try {
    // mongodb'ye bağlan
    await connectMongo();

    // bütün ticket'ları al
    const tickets = await Ticket.find();

    // client'a cevap döndür
    return NextResponse.json({
      message: "Ticket verileri alındı",
      tickets,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Ticket oluşturulurken bir hata oluştu",
        error: e,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // mongodb'e bağlan
    await connectMongo();

    // isteğin body kısmındaki veriyi al
    const body = await req.json();

    // veritbanına yeni ticket'ı kaydet
    const newTicket = await Ticket.create(body);

    // client'a cevap döndür
    return NextResponse.json(
      { message: "Ticket oluşturuldu", ticket: newTicket },
      { status: 201 }
    );
  } catch (error) {
    // client'a hatayı döndür
    return NextResponse.json(
      { message: "Ticket oluşturma başarısız", error },
      { status: 400 }
    );
  }
}

import connectMongo from "@/app/utils/connect-mongo";
import { NextResponse } from "next/server";
import Ticket from "../../models/Ticket";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectMongo();

    await Ticket.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: "Ticket başarıyla silindi",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Silme işlemi başarısız" },
      { status: 400 }
    );
  }
}

// id'si bilinen ticket'ı döndür
export async function GET(req: Request, { params }: Params) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // veritabanından id'si bilenen elemanı al
    const ticket = await Ticket.findById(params.id);

    // eleman bulunamazsa hata fırlat
    if (!ticket) {
      return NextResponse.json(
        { message: "Ardadığınız ticket bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Ticket verisi başarıyla alındı",
      ticket,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Ticket verisi alınırken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// id'si ve güncel bilgileri bilenen elemanı güncelle
export async function PUT(req: Request, { params }: Params) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // isteğin body'sinde gelen veriye eriş
    const body = await req.json();

    // veritabanındaki ticket'ı güncelle
    const updated = await Ticket.findByIdAndUpdate(params.id, body);

    return NextResponse.json({
      message: "Ticket verisi başarıyla güncellendi",
      ticket: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Ticket verisi güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

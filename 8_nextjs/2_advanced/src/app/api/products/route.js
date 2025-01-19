import { NextResponse } from "next/server";

export function GET(req) {
  return NextResponse.json({
    text: "Ürün verileri başarıyla alındı",
  });
}

export function POST(req) {
  return NextResponse.json({
    text: "Ürün başarıyla oluşturuldu",
  });
}

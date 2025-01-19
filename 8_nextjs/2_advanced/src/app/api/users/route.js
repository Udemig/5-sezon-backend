import { NextResponse } from "next/server";
import { users } from "../data";

export function GET(req) {
  return NextResponse.json({
    text: "Kullanıcı verileri başarıyla alındı",
    results: users.length,
    users: users,
  });
}

export function POST(req) {
  return NextResponse.json({
    text: "Kullanıcı hesabı başarıyla oluşturuldu",
  });
}

export function PATCH(req) {
  return NextResponse.json({
    text: "Kullanıcı hesabı başarıyla oluşturuldu",
  });
}

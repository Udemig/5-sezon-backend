import { NextResponse as Res } from "next/server";
import { users } from "../../data/index";
import { cookies, headers } from "next/headers";

export const revalidate = 60;

export async function GET(req, { params }) {
  const par = await params;
  const found = users.find((i) => i.id == par.id);

  if (!found) {
    return Res.json({ text: "Aradığınız kullanıcı bulunamadı" });
  }

  return Res.json({
    text: "Kullanıcı verisi alındı",
    user: found,
  });
}

export async function DELETE(req, { params }) {
  const par = await params;
  const found = users.find((i) => i.id == par.id);

  if (!found) {
    return Res.json({ text: "Aradığınız kullanıcı bulunamadı" });
  }

  return Res.json({
    text: "Kullanıcı hesabı silindi",
    users: users.filter((i) => i.id != par.id),
  });
}

export async function PUT(req) {
  // çerezlere erişme - v1
  const cookies = await cookies();
  const lang = cookies.get("language");

  // headerlara erişme - v1
  const headers = await headers();
  const jwt_key = headers.get("authorization");

  return Res.json({
    text: "Kullanıcı hesabı güncellendi",
  });
}
export async function PATCH(req) {
  // çerezlere erişme - v2
  const token = req.cookies.get("languages");

  // headerlara erişme - v2
  const headers = new Headers(req.headers);
  const jwt_key = headers.get("authorization");

  return Res.json({
    text: "Kullanıcı hesabı güncellendi",
  });
}

export async function OPTIONS(req) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  return Res.json({
    text: "Kullanıcı hesabı güncellendi",
    query: query,
  });
}

export async function POST(req) {
  // isteğin body bölümünde gelen verilere bu şekilde erişiyoruz
  const body = await req.json();

  return Res.json(
    {
      text: "Kullanıcı hesabı oluşturuldu",
      newUser: body,
    },
    // status ve headers döndürme
    { status: 201, headers: { "Access-Control-Allow-Origin": "*" } }
  );
}

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import error from "../utils/error.ts";

type ExtendedPayload = { id: string; isSeller: boolean } & JwtPayload;

// client tarafından çerezler / header'la gelen jwt tokeninin geçerliliğini kontrol edicez ve eğer geçersizse hata gönder geçerliyse kullanıcı bilgilerini req nesnesi içine kaydet
const protect = (req: Request, res: Response, next: NextFunction) => {
  //1) çerezler / header'la gelen tokene eriş
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  //2) token yoksa hata ver
  if (!token) return next(error(403, "Yetkiniz yok (Token bulunamadı)"));

  //3) token geçerli mi kontrol
  jwt.verify(token, process.env.JWT_KEY as string, (err: any, payload: any) => {
    //4) token geçersiz ise hata gönder
    if (err) return next(error(403, "Tokeniniz geçersiz veya süresi dolmuş"));

    //5) geçerliyse req nesnesi içerisine kullanıcı bilgilerini ekle
    req.userId = (payload as ExtendedPayload).id;
    req.isSeller = (payload as ExtendedPayload).isSeller;
  });

  //6) sonraki adıma devam et
  next();
};

export default protect;

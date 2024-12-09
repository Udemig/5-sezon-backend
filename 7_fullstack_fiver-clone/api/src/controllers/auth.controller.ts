import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/user.model.ts";
import jwt from "jsonwebtoken";
import error from "../utils/error.ts";
import catchAsync from "../utils/catchAsync.ts";

// ------ Kaydol -------- Yeni Hesap Oluştur -------------
export const register = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // sişfreyi saltla ve hashle
  const hashedPass: string = bcrypt.hashSync(req.body.password, 12);

  // kullanıcıyı veritbanına kaydet
  const newUser: IUser = await User.create({
    ...req.body,
    password: hashedPass,
  });

  // password'ı client'a gönderme
  const { password, ...userWithoutPass } = newUser;

  // client'a cevap gönder
  res.status(200).json({ message: "Hesabınız oluşturuldu", data: userWithoutPass });
});

// ------ Giriş Yap ---- Mevcut Hesaba Giriş -------------
export const login = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // ismine göre kullanıcyı ara
  const user: IUser | null = await User.findOne({ username: req.body.username });

  // kullanıcı bulunamazsa hata gönder
  if (!user) return next(error(404, "Girdiğiniz bilgiler yanlış"));

  // veritbanındaki hashlenmiş şifre ile isteğin body'sinden gelen normal şifreyi karşılaştir
  const isCorrect = bcrypt.compareSync(req.body.password, user.password);

  // şifreler aynı değilse hata gönder
  if (!isCorrect) return next(error(404, "Girdiğiniz bilgiler yanlış"));

  // şifre doğruysa jwt tokeni oluştur
  const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, process.env.JWT_KEY as string, {
    expiresIn: process.env.JWT_DURATION as string,
  });

  // şifre alanını kaldır
  const { password, ...userWithoutPass } = user;

  // token'i client'a gönder
  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      expires: new Date(Date.now() + 14 * 24 * 3600 * 1000),
    })
    .status(200)
    .json({ message: "Hesaba giriş yapıldı", token, user: userWithoutPass });
});

// ------ Çıkış Yap ---- Oturumu Kapat -------------
export const logout = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.clearCookie("token").status(200).json({ message: "Hesaptan çıkış yapıldı" });
});

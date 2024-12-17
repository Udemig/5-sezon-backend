import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/user.model.ts";
import jwt from "jsonwebtoken";
import error from "../utils/error.ts";
import catchAsync from "../utils/catchAsync.ts";
import upload from "../utils/cloudinary.ts";

// ------ Kaydol -------- Yeni Hesap Oluştur -------------
export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // sişfreyi saltla ve hashle
    const hashedPass: string = bcrypt.hashSync(req.body.password, 12);

    // fotoğrafı buluta yükle
    const image = await upload(req.file?.path as string, next);

    // buluta yüklenin fotoğrafın url'ini mongodbye kaydedilecek olan verinin içerisine ekle
    req.body.photo = image.secure_url;

    // kullanıcıyı veritbanına kaydet
    const newUser: IUser = await User.create({
      ...req.body,
      password: hashedPass,
    });

    // password'ı client'a gönderme
    const { password, ...userWithoutPass } = newUser;

    // client'a cevap gönder
    res
      .status(200)
      .json({ message: "Hesabınız oluşturuldu", data: userWithoutPass });
  }
);

// ------ Giriş Yap ---- Mevcut Hesaba Giriş -------------
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // ismine göre kullanıcyı ara
    const user: IUser | null = await User.findOne({
      username: req.body.username,
    });

    // kullanıcı bulunamazsa hata gönder
    if (!user) return next(error(404, "Girdiğiniz bilgiler yanlış"));

    // veritbanındaki hashlenmiş şifre ile isteğin body'sinden gelen normal şifreyi karşılaştir
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    // şifreler aynı değilse hata gönder
    if (!isCorrect) return next(error(404, "Girdiğiniz bilgiler yanlış"));

    // şifre doğruysa jwt tokeni oluştur
    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY as string,
      {
        expiresIn: process.env.JWT_DURATION as string,
      }
    );

    // şifre alanını kaldır
    user.password = "";

    // token'i client'a gönder
    res
      .cookie("token", token, {
        httpOnly: false,
        sameSite: "lax",
        expires: new Date(Date.now() + 14 * 24 * 3600 * 1000),
      })
      .status(200)
      .json({ message: "Hesaba giriş yapıldı", token, user: user });
  }
);

// ------ Çıkış Yap ---- Oturumu Kapat -------------
export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Hesaptan çıkış yapıldı" });
  }
);

// ------ Profil Bilgilerini Al -----------------
export const profile = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // req nesnesi içerisindeki kullanıcı id'sine karşılık gelen kullanıcının verilerini al
    const user = await User.findById(req.userId);

    if (!user) return next(error(404, "Kullanıcı bulunamadı"));

    user.password = "";

    res.status(200).json({ message: "Profil bilgileri alındı", user });
  }
);

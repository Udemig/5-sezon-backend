import { v2 as cloudinary } from "cloudinary";
import { NextFunction } from "express";
import error from "./error.ts";

cloudinary.config({
  cloud_name: "dlpvepgfc",
  api_key: "598354248259345",
  api_secret: "5qStVIWILaQ_rKd1T8sCODEKwCU",
});

const upload = async (
  file_path: string,
  next: NextFunction,
  folder: string = "avatars",
  type: "image" | "video" | "raw" | "auto" | undefined = "image"
) => {
  return await cloudinary.uploader.upload(
    file_path,
    {
      folder,
      resource_type: type,
    },
    (err) => {
      if (err) return next(error(400, "Fotoğraf yüklenemedi"));
    }
  );
};

export default upload;

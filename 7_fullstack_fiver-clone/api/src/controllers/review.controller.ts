import { NextFunction, Request, Response } from "express";

export const getAllReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "İşlem Başarılı" });
};

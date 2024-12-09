// bir fonksiyonu parametre olarak alır
// fonksiyonu çalıştırır
// hata olursa hata mw'ne yönlendir

import { NextFunction, Request, Response } from "express";

type FunctionType = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchAsync = (fn: FunctionType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;

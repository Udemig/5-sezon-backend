import * as express from "express";

type ExtendedHeaders = { authorization?: string } & Headers;

declare global {
  namespace Express {
    interface Request {
      headers: ExtendedHeaders;
      cookies: { token?: string };
      userId?: string;
      isSeller?: boolean;
    }
  }
}

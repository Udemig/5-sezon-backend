import express, { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controller.ts";
import upload from "../utils/multer.ts";
import protect from "../middleware/protect.ts";

// 1) router oluşturma
const router: Router = express.Router();

// 2) yolları belirle
router.route("/register").post(upload.single("photo"), register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(protect, profile);

// 3) router'ı app'e tanıtmak için export et
export default router;

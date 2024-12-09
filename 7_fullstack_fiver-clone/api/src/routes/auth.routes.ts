import express, { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

// 1) router oluşturma
const router: Router = express.Router();

// 2) yolları belirle
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

// 3) router'ı app'e tanıtmak için export et
export default router;

import express, { Router } from "express";

// 1) router oluşturma
const router: Router = express.Router();

// 2) yolları belirle
router.route("/").get();
router.route("/:id").get();

// 3) router'ı app'e tanıtmak için export et
export default router;

import express, { Router } from "express";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getGig,
} from "../controllers/gig.controller.ts";
import protect from "../middleware/protect.ts";
import upload from "../utils/multer.ts";

// 1) router oluşturma
const router: Router = express.Router();

// 2) yolları belirle
router
  .route("/")
  .get(getAllGigs)
  .post(
    protect,
    upload.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 6 },
    ]),
    createGig
  );

router.route("/:id").get(getGig).delete(protect, deleteGig);

// 3) router'ı app'e tanıtmak için export et
export default router;

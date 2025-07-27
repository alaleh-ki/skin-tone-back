import { Router } from "express";
import { recommendJewelryController } from "../controllers/jewelryController";

const router = Router();

router.post("/recommend", recommendJewelryController);

export default router;

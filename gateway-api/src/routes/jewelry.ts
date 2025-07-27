import { Router } from "express";
import { recommendJewelryProxy } from "../controllers/jewelryController";

const router = Router();

router.post("/recommend", recommendJewelryProxy);

export default router;

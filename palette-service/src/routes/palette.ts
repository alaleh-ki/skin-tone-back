import { Router } from "express";
import { recommendPalette } from "../controllers/paletteController";

const router = Router();

router.post("/recommend", recommendPalette);

export default router; 
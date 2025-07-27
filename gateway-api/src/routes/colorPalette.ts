import { Router } from "express";
import { analyzeColorPaletteProxy } from "../controllers/colorPaletteController";

const router = Router();

router.post("/recommend", analyzeColorPaletteProxy);

export default router;

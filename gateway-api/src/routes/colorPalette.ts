import { Router } from "express";
import { recommendColorPaletteProxy } from "../controllers/colorPaletteController";

const router = Router();

router.post("/recommend", recommendColorPaletteProxy);

export default router;

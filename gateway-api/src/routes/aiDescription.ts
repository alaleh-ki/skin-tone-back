import { Router } from "express";
import { describePaletteProxy } from "../controllers/aiDescriptionController";

const router = Router();

    router.post("/describe", describePaletteProxy);

export default router;

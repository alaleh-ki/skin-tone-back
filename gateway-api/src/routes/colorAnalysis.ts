import { Router } from "express";
import { colorAnalysisProxy } from "../controllers/colorAnalysisController";

const router = Router();

router.post("/analyze", colorAnalysisProxy);

export default router;

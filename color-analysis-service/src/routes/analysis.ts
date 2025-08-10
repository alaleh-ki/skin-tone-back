import { Router } from "express";
import { analyze } from "../controllers/analysisController";

const router = Router();

router.post("/analyze", analyze);

export default router;


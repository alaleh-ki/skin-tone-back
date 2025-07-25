import { Router } from "express";
import { analyzeSkinAndHairProxy } from "../controllers/skinToneController";

const router = Router();

router.post("/analyze", analyzeSkinAndHairProxy);

export default router;

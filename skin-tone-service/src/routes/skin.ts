import { Router } from "express";
import { analyzeSkinAndHair } from "../controllers/skinController";

const router = Router();

router.post("/analyze", analyzeSkinAndHair);

export default router;

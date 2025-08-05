import express from "express";
import aiController from "../controllers/aiController";

const router = express.Router();
router.post("/describe", aiController.describePalette);

export default router;

import express from "express";
import aiController from "../controllers/aiController";

const router = express.Router();
router.post("/describe", aiController.describeImage);

export default router;

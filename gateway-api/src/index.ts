import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import colorAnalysisRoutes from "./routes/colorAnalysis";
import colorPaletteRoutes from "./routes/colorPalette";
import aiDescriptionRoutes from "./routes/aiDescription";
import { swaggerSpec } from "./config/swagger";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()) : ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/color-analysis", colorAnalysisRoutes);
app.use("/color-palette", colorPaletteRoutes);
app.use("/ai-description", aiDescriptionRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Gateway API running on port ${PORT}`);
});

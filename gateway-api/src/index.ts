import express from "express";
import swaggerUi from "swagger-ui-express";
import colorAnalysisRoutes from "./routes/colorAnalysis";
import colorPaletteRoutes from "./routes/colorPalette";
import aiDescriptionRoutes from "./routes/aiDescription";
import { swaggerSpec } from "./config/swagger";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();
app.use(express.json());

app.use("/color-analysis", colorAnalysisRoutes);
app.use("/color-palette", colorPaletteRoutes);
app.use("/ai-description", aiDescriptionRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Gateway API running on port ${PORT}`);
});

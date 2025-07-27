import express from "express";
import skinToneRoutes from "./routes/skinTone";
import colorPaletteRoutes from "./routes/colorPalette";
import jewelryRoutes from "./routes/jewelry";

const app = express();
app.use(express.json());

app.use("/skin-tone", skinToneRoutes);
app.use("/color-palette", colorPaletteRoutes);
app.use("/jewelry", jewelryRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Gateway API running on port ${PORT}`);
});

import express from "express";
import paletteRoutes from "./routes/palette";
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(express.json());

app.use("/", paletteRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    app.listen(PORT, () => console.log(`✅ Palette Service running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server due to DB connection error");
    process.exit(1);
  }
}

startServer();
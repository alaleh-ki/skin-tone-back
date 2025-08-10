import express from "express";
import analysisRoutes from "./routes/analysis";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();
app.use(express.json());

app.use("/", analysisRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    app.listen(PORT, () => console.log(`✅ Color analysis service running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server");
    process.exit(1);
  }
}

startServer();


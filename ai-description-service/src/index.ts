import express from "express";
import dotenv from "dotenv";
import aiRoutes from './routes/ai'
import { connectDB } from "./config/db";

dotenv.config({ quiet: true });

const app = express();
app.use(express.json());
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`✅ AI service running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server due to DB connection error");
    process.exit(1);
  }
}

startServer();

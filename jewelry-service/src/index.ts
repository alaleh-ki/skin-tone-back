import express from "express";
import jewelryRoutes from "./routes/jewelry";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();
app.use(express.json());

app.use("/", jewelryRoutes);

const PORT = process.env.PORT || 5004;

async function startServer() {
  try {
    app.listen(PORT, () => console.log(`✅ Jewelry Service running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server due to DB connection error");
    process.exit(1);
  }
}

startServer();

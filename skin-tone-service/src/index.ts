import express from "express";
import skinRoutes from "./routes/skin";
import dotenv from "dotenv";

dotenv.config({ quiet: true });


const app = express();
app.use(express.json());

app.use("/", skinRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    app.listen(PORT, () => console.log(`✅ Skin tone service running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server due to DB connection error");
    process.exit(1);
  }
}

startServer();

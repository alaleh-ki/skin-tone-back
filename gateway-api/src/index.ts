import express from "express";
import skinToneRoutes from "./routes/skinTone";

const app = express();
app.use(express.json());

app.use("/skin-tone", skinToneRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Gateway API running on port ${PORT}`);
});

import mongoose from "mongoose";

export const connectDB = async () => {
  const mode = process.env.APP_MODE || "dev";
  const MONGODB_URI = mode === "docker" ? process.env.MONGODB_URI_DOCKER : process.env.MONGODB_URI_DEV;
  if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not set for the current mode");
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

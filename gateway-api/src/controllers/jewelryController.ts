import { Request, Response } from "express";
import axios from "axios";

const jewelry_SERVICE_URL = process.env.jewelry_SERVICE_URL || "http://jewelry-service:5004/recommend";

export const recommendJewelryProxy = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(jewelry_SERVICE_URL, req.body);
    res.json(response.data);
  } catch (error: any) {
    console.error("Error calling jewelry_SERVICE-service:", error.message);
    res.status(500).json({ error: "Failed to analyze skin and hair color" });
  }
};

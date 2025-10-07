import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const mode = process.env.APP_MODE || "dev";
const AI_DESCRIPTION_SERVICE_URL = mode === "docker" ? process.env.AI_DESCRIPTION_SERVICE_URL_DOCKER : process.env.AI_DESCRIPTION_SERVICE_URL_DEV;

export const describePalette = async (body: any) => {
  const response = await axios.post(AI_DESCRIPTION_SERVICE_URL!, body);
  return response.data;
};

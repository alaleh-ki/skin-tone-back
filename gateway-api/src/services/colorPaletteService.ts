import axios from "axios";

const mode = process.env.APP_MODE || "dev";
const COLOR_PALETTE_SERVICE_URL = mode === "docker" ? process.env.COLOR_PALETTE_SERVICE_URL_DOCKER : process.env.COLOR_PALETTE_SERVICE_URL_DEV;

export const recommendColorPalette = async (body: any) => {
  const response = await axios.post(COLOR_PALETTE_SERVICE_URL!, body);
  return response.data;
};


import { Response } from "express";

export function sendStandardResponse(res: Response, data: any, statusCode: number = 200) {
  res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    data,
  });
}


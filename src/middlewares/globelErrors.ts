import { Request, Response, NextFunction } from "express";
interface CustomError extends Error {
  stausCode?: number;
  message: string;
}

export const globelErrors = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error.stausCode) {
    return res.status(error.stausCode).json(error.message);
  }
  if (error.name === "CastError") {
    return res.status(400).json({ message: "invalid iD format" });
  }
  if (error.name === "TokenExpiredError") {
    return res.status(400).json({
      message: "unauthorized: your token has expired plss Login again",
    });
  }
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Unauthorized: token invalid." });
  }
  console.log("unhandled error:", error);
  return res.status(500).json({ message: error });
};

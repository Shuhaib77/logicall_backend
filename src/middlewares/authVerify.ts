import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

// Extend Express Request to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization header:", authHeader); // Debugging header

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token is required" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
  console.log("Extracted Token:", token);

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      console.log("Token verification failed:", error);
      return res.status(401).json({ message: "Unauthorized token" });
    }

    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  });
};

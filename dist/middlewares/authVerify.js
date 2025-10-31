"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Authorization header:", authHeader); // Debugging header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Token is required" });
    }
    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    console.log("Extracted Token:", token);
    jsonwebtoken_1.default.verify(token, secretKey, (error, decoded) => {
        if (error) {
            console.log("Token verification failed:", error);
            return res.status(401).json({ message: "Unauthorized token" });
        }
        console.log("Decoded token:", decoded);
        req.user = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoute from "../router/auth/authRoute";
import moviesRoute from "../router/nonauth/movies/moviesRoute";
import moviesTypeRoute from "../router/nonauth/movies/moviesTypeRoute";

export const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoute);
app.use("/api", moviesRoute);
app.use("/api", moviesTypeRoute);

export default app;

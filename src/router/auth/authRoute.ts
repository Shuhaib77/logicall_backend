import express from "express";

import tryCatch from "../../middlewares/tryCatch";
import { login, register } from "../../controller/auth/auth";

const authRoute = express.Router();
authRoute.post("/register", tryCatch(register));
authRoute.post("/login", tryCatch(login));

export default authRoute;

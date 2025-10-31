"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tryCatch_1 = __importDefault(require("../../middlewares/tryCatch"));
const auth_1 = require("../../controller/auth/auth");
const authRoute = express_1.default.Router();
authRoute.post("/register", (0, tryCatch_1.default)(auth_1.register));
authRoute.post("/login", (0, tryCatch_1.default)(auth_1.login));
exports.default = authRoute;

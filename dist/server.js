"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app/app"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const port = process.env.PORT || 6006;
app_1.default.listen(port, async () => {
    console.log(`server running http://localhost:${port}`);
    try {
        await db_1.pool.query("SELECT 1");
        console.log("mys ql connection successfull");
    }
    catch (error) {
        console.log("failed", error);
    }
});

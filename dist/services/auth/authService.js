"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.registerService = void 0;
const app_1 = require("../../app/app");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY || "your_secret_key";
const registerService = async (payload) => {
    const { name, email, password } = payload;
    const checkUser = await app_1.prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (checkUser) {
        throw new Error("User all redy exists");
    }
    const hashPassword = await bcrypt_1.default.hash(password, 10);
    const newUser = await app_1.prisma.user.create({
        data: {
            name: name,
            password: hashPassword,
            email: email,
        },
    });
    return newUser;
};
exports.registerService = registerService;
const loginService = async (payload) => {
    const { email, password } = payload;
    const user = await app_1.prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!user) {
        throw new Error("User not exists plss register ");
    }
    const checkpass = bcrypt_1.default.compare(password, user.password);
    if (!checkpass) {
        throw new Error("Invalid login passowrd");
    }
    const payLoad = {
        email: user.email,
        id: user.id,
        name: user.name,
    };
    const token = jsonwebtoken_1.default.sign(payLoad, secretKey, { expiresIn: "1h" });
    return { user, token };
};
exports.loginService = loginService;

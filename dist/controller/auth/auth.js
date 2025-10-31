"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authService_1 = require("../../services/auth/authService");
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new Error("All fields are requird");
    }
    const payload = {
        name,
        email,
        password,
    };
    const data = await (0, authService_1.registerService)(payload);
    res
        .status(201)
        .json({ message: `${name} your registration is successfull`, user: data });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("All fields are requird");
    }
    const payload = {
        email,
        password,
    };
    const data = await (0, authService_1.loginService)(payload);
    const { token, user } = data;
    res
        .status(200)
        .json({ message: "Login successfull", user: user, token: token });
};
exports.login = login;

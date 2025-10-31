import { Request, Response } from "express";
import { loginService, registerService } from "../../services/auth/authService";

//register
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new Error("All fields are requird");
  }

  const payload = {
    name,
    email,
    password,
  };
  const data = await registerService(payload);

  res
    .status(201)
    .json({ message: `${name} your registration is successfull`, user: data });
};

//login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("All fields are requird");
  }

  const payload = {
    email,
    password,
  };
  const data = await loginService(payload);

  const { token, user } = data;

  res
    .status(200)
    .json({ message: "Login successfull", user: user, token: token });
};

import { prisma } from "../../app/app";
import {
  loginPayload,
  registerPayload,
} from "../../interface/auth/authInterface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY || "your_secret_key";

//register service
export const registerService = async (payload: registerPayload) => {
  const { name, email, password } = payload;
  const checkUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (checkUser) {
    throw new Error("User all redy exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: name,
      password: hashPassword,
      email: email,
    },
  });

  return newUser;
};

//login service
export const loginService = async (payload: loginPayload) => {
  const { email, password } = payload;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new Error("User not exists plss register ");
  }

  const checkpass = bcrypt.compare(password, user.password);
  if (!checkpass) {
    throw new Error("Invalid login passowrd");
  }
  const payLoad = {
    email: user.email,
    id: user.id,
    name: user.name,
  };
  const token = jwt.sign(payLoad, secretKey, { expiresIn: "1h" });

  return { user, token };
};

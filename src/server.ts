import { log } from "console";
import app from "./app/app";
import dotenv from "dotenv";
import { pool } from "./config/db";

dotenv.config();

const port = process.env.PORT || 6006;


app.listen(port, async () => {
  console.log(`server running http://localhost:${port}`);
  try {
    await pool.query("SELECT 1");
    console.log("mys ql connection successfull");
  } catch (error) {
    console.log("failed", error);
  }
});

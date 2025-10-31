import { Request, Response } from "express";
import { addMoviesTypeService, getMoviesTypeService } from "../../../services/nonauth/movies/moviesTypeService";

//add show type
export const addMoviesType = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  console.log(name, description);

  if (!name || !description) {
    console.log("Name fields are requird");
  }
  const payLoad = {
    name,
    description,
  };
  const data = await addMoviesTypeService(payLoad);
  res
    .status(201)
    .json({ message: "New show type added successfully", data: data });
};

//add show type
export const getMoviesType = async (req: Request, res: Response) => {
  const data = await getMoviesTypeService();
  res
    .status(201)
    .json({ message: "New show type added successfully", data: data });
};

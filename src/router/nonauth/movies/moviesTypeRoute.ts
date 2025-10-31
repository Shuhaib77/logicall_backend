import express from "express";
import tryCatch from "../../../middlewares/tryCatch";
import { addMoviesType, getMoviesType } from "../../../controller/nonauth/movies/movieType";


const moviesTypeRoute = express.Router();
moviesTypeRoute.post("/movies-types", tryCatch(addMoviesType));
moviesTypeRoute.get("/movies-types", tryCatch(getMoviesType));

export default moviesTypeRoute;

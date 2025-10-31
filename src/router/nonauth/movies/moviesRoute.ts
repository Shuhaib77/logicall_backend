import express from "express";

import tryCatch from "../../../middlewares/tryCatch";
import { login, register } from "../../../controller/auth/auth";
import {
  addMovies,
  deleteMovies,
  editMovies,
  getFavMovie,

  getFvaMovieById,
} from "../../../controller/nonauth/movies/movies";

const moviesRoute = express.Router();
moviesRoute.post("/movies/:user_id/:type_id", tryCatch(addMovies));
moviesRoute.get("/movies/:user_id/:page/:limit", tryCatch(getFavMovie));
moviesRoute.get("/movies/:user_id/:page/:limit/:type_id", tryCatch(getFavMovie));
moviesRoute.get("/movies/:user_id/:show_id", tryCatch(getFvaMovieById));
moviesRoute.put("/movies/:user_id/:show_id", tryCatch(editMovies));
moviesRoute.delete("/movies/:user_id/:show_id", tryCatch(deleteMovies));

export default moviesRoute;

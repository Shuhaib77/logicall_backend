import { Request, Response } from "express";
import {
  addMoviesService,
  deleteMoviesService,
  editMoviesService,
  getFaveMoviesByCatogeryService,
  getFaveMoviesBySearchService,
  getFavMoviesByIdService,
  getFavMoviesService,
} from "../../../services/nonauth/movies/moviesService";

//add favmovies
export const addMovies = async (req: Request, res: Response) => {
  const { title, budget, director, location, duration, year, time } = req.body;
  const { type_id, user_id } = req.params;
  console.log(type_id, user_id);

  if (
    !title ||
    !type_id ||
    !budget ||
    !director ||
    !location ||
    !duration ||
    !user_id ||
    !year ||
    !time
  ) {
    throw new Error("All fields are Requird");
  }

  const payLoad = {
    title,
    type_id: Number(type_id),
    budget: Number(budget),
    director,
    location,
    duration,
    user_id: Number(user_id),
    year: Number(year),
    time,
  };

  const data = await addMoviesService(payLoad);

  res.status(201).json({ message: "Entry added successfully", movies: data });
};

//edit favmovies
export const editMovies = async (req: Request, res: Response) => {
  const { title, budget, director, location, duration, year, time, type_id } =
    req.body;
  const { user_id, show_id } = req.params;
  console.log(show_id);

  if (!show_id) {
    console.log("show not found");
  }
  if (!user_id) {
    console.log("user not found");
  }

  console.log(title, budget, director, location, duration, year, time, type_id);

  const payLoad = {
    title,
    type_id: Number(type_id),
    budget,
    director,
    location,
    duration,
    user_id: Number(user_id),
    year,
    time,
    show_id: Number(show_id),
  };

  console.log(type_id, user_id, show_id, "pp");

  const data = await editMoviesService(payLoad);

  res.status(201).json({ message: "Entry updated successfully", movies: data });
};

//get movies
export const getFavMovie = async (req: Request, res: Response) => {
  const { user_id, page = 1, limit = 10, type_id } = req.params;
  console.log(user_id, page, limit, type_id);
  const { search_in } = req.query;

  if (!user_id) {
    throw new Error("User not found");
  }

  if (search_in) {
    const payLoad = {
      search_in: String(search_in),
      user_id: Number(user_id),
      page: Number(page),
      limit: Number(limit),
    };
    const data = await getFaveMoviesBySearchService(payLoad);
    const { shows, toatalCount } = data;
    res.status(200).json({
      message: "serach data founded",
      data: shows,
      count: toatalCount,
    });
  }
  if (type_id) {
    const payLoad = {
      user_id: Number(user_id),
      page: Number(page),
      limit: Number(limit),
      type_id: Number(type_id),
    };

    const data = await getFaveMoviesByCatogeryService(payLoad);
    const { shows, toatalCount } = data;
    res.status(200).json({
      message: "catogery data founded",
      data: shows,
      count: toatalCount,
    });
  }

  const payLoad = {
    user_id: Number(user_id),
    page: Number(page),
    limit: Number(limit),
  };
  const data = await getFavMoviesService(payLoad);
  const { shows, totalCount } = data;
  res
    .status(200)
    .json({ message: " all data founded", data: shows, count: totalCount });
};

//get moviesById
export const getFvaMovieById = async (req: Request, res: Response) => {
  const { user_id, show_id } = req.params;
  console.log(user_id, show_id, "lll");

  if (!user_id || !show_id) {
    throw new Error("User not found");
  }
  const payLoad = {
    user_id: Number(user_id),
    show_id: Number(show_id),
  };

  const data = await getFavMoviesByIdService(payLoad);
  res.status(200).json({ message: "data founded", data: data });
};

//delete movies

export const deleteMovies = async (req: Request, res: Response) => {
  const { user_id, show_id } = req.params;
  const payLoad = {
    user_id: Number(user_id),
    show_id: Number(show_id),
  };

  const data = await deleteMoviesService(payLoad);
  res.status(200).json({
    message: "Movie delted Sucess fully",
    data: data,
  });
};

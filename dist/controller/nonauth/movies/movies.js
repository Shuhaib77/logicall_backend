"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovies = exports.getFvaMovieById = exports.getFavMovie = exports.editMovies = exports.addMovies = void 0;
const moviesService_1 = require("../../../services/nonauth/movies/moviesService");
//add favmovies
const addMovies = async (req, res) => {
    const { title, budget, director, location, duration, year, time } = req.body;
    const { type_id, user_id } = req.params;
    console.log(type_id, user_id);
    if (!title ||
        !type_id ||
        !budget ||
        !director ||
        !location ||
        !duration ||
        !user_id ||
        !year ||
        !time) {
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
    const data = await (0, moviesService_1.addMoviesService)(payLoad);
    res.status(201).json({ message: "Entry added successfully", movies: data });
};
exports.addMovies = addMovies;
//edit favmovies
const editMovies = async (req, res) => {
    const { title, budget, director, location, duration, year, time, type_id } = req.body;
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
    const data = await (0, moviesService_1.editMoviesService)(payLoad);
    res.status(201).json({ message: "Entry updated successfully", movies: data });
};
exports.editMovies = editMovies;
//get movies
const getFavMovie = async (req, res) => {
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
        const data = await (0, moviesService_1.getFaveMoviesBySearchService)(payLoad);
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
        const data = await (0, moviesService_1.getFaveMoviesByCatogeryService)(payLoad);
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
    const data = await (0, moviesService_1.getFavMoviesService)(payLoad);
    const { shows, totalCount } = data;
    res
        .status(200)
        .json({ message: " all data founded", data: shows, count: totalCount });
};
exports.getFavMovie = getFavMovie;
//get moviesById
const getFvaMovieById = async (req, res) => {
    const { user_id, show_id } = req.params;
    console.log(user_id, show_id, "lll");
    if (!user_id || !show_id) {
        throw new Error("User not found");
    }
    const payLoad = {
        user_id: Number(user_id),
        show_id: Number(show_id),
    };
    const data = await (0, moviesService_1.getFavMoviesByIdService)(payLoad);
    res.status(200).json({ message: "data founded", data: data });
};
exports.getFvaMovieById = getFvaMovieById;
//delete movies
const deleteMovies = async (req, res) => {
    const { user_id, show_id } = req.params;
    const payLoad = {
        user_id: Number(user_id),
        show_id: Number(show_id),
    };
    const data = await (0, moviesService_1.deleteMoviesService)(payLoad);
    res.status(200).json({
        message: "Movie delted Sucess fully",
        data: data,
    });
};
exports.deleteMovies = deleteMovies;

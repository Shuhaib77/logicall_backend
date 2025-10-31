"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesType = exports.addMoviesType = void 0;
const moviesTypeService_1 = require("../../../services/nonauth/movies/moviesTypeService");
//add show type
const addMoviesType = async (req, res) => {
    const { name, description } = req.body;
    console.log(name, description);
    if (!name || !description) {
        console.log("Name fields are requird");
    }
    const payLoad = {
        name,
        description,
    };
    const data = await (0, moviesTypeService_1.addMoviesTypeService)(payLoad);
    res
        .status(201)
        .json({ message: "New show type added successfully", data: data });
};
exports.addMoviesType = addMoviesType;
//add show type
const getMoviesType = async (req, res) => {
    const data = await (0, moviesTypeService_1.getMoviesTypeService)();
    res
        .status(201)
        .json({ message: "New show type added successfully", data: data });
};
exports.getMoviesType = getMoviesType;

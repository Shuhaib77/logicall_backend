"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tryCatch_1 = __importDefault(require("../../../middlewares/tryCatch"));
const movies_1 = require("../../../controller/nonauth/movies/movies");
const moviesRoute = express_1.default.Router();
moviesRoute.post("/movies/:user_id/:type_id", (0, tryCatch_1.default)(movies_1.addMovies));
moviesRoute.get("/movies/:user_id/:page/:limit", (0, tryCatch_1.default)(movies_1.getFavMovie));
moviesRoute.get("/movies/:user_id/:page/:limit/:type_id", (0, tryCatch_1.default)(movies_1.getFavMovie));
moviesRoute.get("/movies/:user_id/:show_id", (0, tryCatch_1.default)(movies_1.getFvaMovieById));
moviesRoute.put("/movies/:user_id/:show_id", (0, tryCatch_1.default)(movies_1.editMovies));
moviesRoute.delete("/movies/:user_id/:show_id", (0, tryCatch_1.default)(movies_1.deleteMovies));
exports.default = moviesRoute;

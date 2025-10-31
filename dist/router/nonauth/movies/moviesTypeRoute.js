"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tryCatch_1 = __importDefault(require("../../../middlewares/tryCatch"));
const movieType_1 = require("../../../controller/nonauth/movies/movieType");
const moviesTypeRoute = express_1.default.Router();
moviesTypeRoute.post("/movies-types", (0, tryCatch_1.default)(movieType_1.addMoviesType));
moviesTypeRoute.get("/movies-types", (0, tryCatch_1.default)(movieType_1.getMoviesType));
exports.default = moviesTypeRoute;

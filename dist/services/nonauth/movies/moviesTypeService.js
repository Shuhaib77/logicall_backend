"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesTypeService = exports.addMoviesTypeService = void 0;
const app_1 = require("../../../app/app");
//add fav movies
const addMoviesTypeService = async (payload) => {
    const { name, description } = payload;
    const checkMovieType = await app_1.prisma.moviesCatogery.findUnique({
        where: {
            name: name,
        },
    });
    if (checkMovieType) {
        throw new Error("Movie Type allredy exist");
    }
    const newType = await app_1.prisma.moviesCatogery.create({
        data: {
            ...payload,
        },
    });
    return newType;
};
exports.addMoviesTypeService = addMoviesTypeService;
const getMoviesTypeService = async () => {
    const catogeries = await app_1.prisma.moviesCatogery.findMany();
    return catogeries;
};
exports.getMoviesTypeService = getMoviesTypeService;
// export const getMoviesTypeService = async (payload:getMoviesTypeIdPyload) => {
//   const catogeries = await prisma.moviesCatogery.findMany();
//   return catogeries;
// };

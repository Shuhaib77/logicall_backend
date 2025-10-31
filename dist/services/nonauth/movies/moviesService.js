"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMoviesService = exports.getFavMoviesByIdService = exports.getFaveMoviesBySearchService = exports.getFaveMoviesByCatogeryService = exports.getFavMoviesService = exports.editMoviesService = exports.addMoviesService = void 0;
const app_1 = require("../../../app/app");
//add fav movies
const addMoviesService = async (payload) => {
    const { title, user_id, type_id, time } = payload;
    const user = await app_1.prisma.user.findUnique({
        where: {
            id: user_id,
        },
    });
    if (!user) {
        throw new Error("user not found");
    }
    console.log(user);
    const checkMovie = await app_1.prisma.favShows.findFirst({
        where: {
            user_id: user_id,
            title: title,
        },
    });
    console.log(checkMovie);
    if (checkMovie) {
        throw new Error("Movie allredy exist in your Fav list");
    }
    console.log(payload);
    const newEntry = await app_1.prisma.favShows.create({
        data: {
            ...payload,
            time: new Date(time),
        },
    });
    console.log(newEntry);
    return newEntry;
};
exports.addMoviesService = addMoviesService;
//edit fav movies
const editMoviesService = async (payload) => {
    const { type_id, user_id, show_id, ...updateFields } = payload;
    const user = await app_1.prisma.user.findUnique({ where: { id: user_id } });
    if (!user)
        throw new Error("user not found");
    const show = await app_1.prisma.favShows.findFirst({
        where: {
            id: Number(show_id),
            user_id: Number(user_id),
        },
    });
    if (!show)
        throw new Error("Entry not found");
    const updatedEntry = await app_1.prisma.favShows.update({
        where: { id: Number(show_id) },
        data: {
            ...updateFields,
            type_id: Number(type_id),
        },
    });
    return updatedEntry;
};
exports.editMoviesService = editMoviesService;
//get data by
const getFavMoviesService = async (payLoad) => {
    const { user_id, page, limit } = payLoad;
    const skip = (page - 1) * limit;
    const user = await app_1.prisma.user.findUnique({
        where: {
            id: user_id,
        },
    });
    if (!user) {
        throw new Error("user not found");
    }
    const shows = await app_1.prisma.favShows.findMany({
        where: {
            user_id: user.id,
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            catogery: true,
        },
    });
    const totalCount = await app_1.prisma.favShows.count({
        where: {
            user_id: user.id,
        },
    });
    if (shows?.length === 0) {
        throw new Error("No data found");
    }
    return { shows, totalCount };
};
exports.getFavMoviesService = getFavMoviesService;
//get data by  Type
const getFaveMoviesByCatogeryService = async (payLoad) => {
    const { user_id, type_id, page, limit } = payLoad;
    const user = await app_1.prisma.user.findUnique({
        where: {
            id: user_id,
        },
    });
    if (!user) {
        throw new Error("user not found");
    }
    const catogery = await app_1.prisma.moviesCatogery.findUnique({
        where: {
            id: type_id,
        },
    });
    if (!catogery) {
        throw new Error("Catogery  not found");
    }
    const shows = await app_1.prisma.favShows.findMany({
        where: {
            user_id: user.id,
            type_id: type_id,
        },
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            catogery: true,
        },
    });
    if (shows.length === 0) {
        throw new Error("no data found");
    }
    const toatalCount = await app_1.prisma.favShows.count({
        where: {
            user_id: user.id,
            type_id: type_id,
        },
    });
    return { shows, toatalCount };
};
exports.getFaveMoviesByCatogeryService = getFaveMoviesByCatogeryService;
//get data by search
const getFaveMoviesBySearchService = async (payLoad) => {
    const { user_id, search_in, page, limit } = payLoad;
    const user = await app_1.prisma.user.findUnique({
        where: {
            id: user_id,
        },
    });
    if (!user) {
        throw new Error("user not found");
    }
    const skip = (page - 1) * limit;
    const shows = await app_1.prisma.favShows.findMany({
        where: {
            user_id: user.id,
            OR: [{ title: { contains: search_in } }],
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            catogery: true,
        },
    });
    if (shows.length === 0) {
        throw new Error("no data found");
    }
    const toatalCount = await app_1.prisma.favShows.count({
        where: {
            user_id: user.id,
            OR: [{ title: { contains: search_in } }],
        },
    });
    return { shows, toatalCount };
};
exports.getFaveMoviesBySearchService = getFaveMoviesBySearchService;
//getDataById
const getFavMoviesByIdService = async (payLoad) => {
    const { user_id, show_id } = payLoad;
    console.log(user_id, show_id, "ooo");
    const user = await app_1.prisma.user.findUnique({
        where: {
            id: user_id,
        },
    });
    console.log(user);
    if (!user) {
        throw new Error("user not found");
    }
    const show = await app_1.prisma.favShows.findUnique({
        where: {
            id: show_id,
            user_id: user.id,
        },
        include: {
            user: true,
            // catogery: true,
        },
    });
    if (!show) {
        throw new Error("No data found");
    }
    return show;
};
exports.getFavMoviesByIdService = getFavMoviesByIdService;
//delete movie serbvice
const deleteMoviesService = async (payLoad) => {
    const { user_id, show_id } = payLoad;
    console.log(user_id, show_id, "ooo");
    const user = await app_1.prisma.user.findUnique({
        where: {
            id: user_id,
        },
    });
    console.log(user);
    if (!user) {
        throw new Error("user not found");
    }
    const deletedShow = await app_1.prisma.favShows.delete({
        where: {
            id: show_id,
            user_id: user.id,
        },
    });
    if (!deletedShow) {
        throw new Error("No data found");
    }
    return deletedShow;
};
exports.deleteMoviesService = deleteMoviesService;

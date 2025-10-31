import { prisma } from "../../../app/app";
import {
  editMoviesPayload,
  getShowsById,
  getShowsPayload,
  getShowsSearchPayload,
  getShowsTypePayload,
  moviesPayload,
} from "../../../interface/nonauth/movies/moviesInterface";

//add fav movies
export const addMoviesService = async (payload: moviesPayload) => {
  const { title, user_id, type_id, time } = payload;
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!user) {
    throw new Error("user not found");
  }
  console.log(user);

  const checkMovie = await prisma.favShows.findFirst({
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

  const newEntry = await prisma.favShows.create({
    data: {
      ...payload,
      time: new Date(time),
    },
  });
  console.log(newEntry);

  return newEntry;
};

//edit fav movies
export const editMoviesService = async (payload: editMoviesPayload) => {
  const { type_id, user_id, show_id, ...updateFields } = payload;
  const user = await prisma.user.findUnique({ where: { id: user_id } });
  if (!user) throw new Error("user not found");
  const show = await prisma.favShows.findFirst({
    where: {
      id: Number(show_id),
      user_id: Number(user_id),
    },
  });
  if (!show) throw new Error("Entry not found");
  const updatedEntry = await prisma.favShows.update({
    where: { id: Number(show_id) },
    data: {
      ...updateFields,
      type_id: Number(type_id),
    },
  });
  return updatedEntry;
};

//get data by
export const getFavMoviesService = async (payLoad: getShowsPayload) => {
  const { user_id, page, limit } = payLoad;
  const skip = (page - 1) * limit;
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!user) {
    throw new Error("user not found");
  }

  const shows = await prisma.favShows.findMany({
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

  const totalCount = await prisma.favShows.count({
    where: {
      user_id: user.id,
    },
  });

  if (shows?.length === 0) {
    throw new Error("No data found");
  }

  return { shows, totalCount };
};

//get data by  Type
export const getFaveMoviesByCatogeryService = async (
  payLoad: getShowsTypePayload
) => {
  const { user_id, type_id, page, limit } = payLoad;

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!user) {
    throw new Error("user not found");
  }

  const catogery = await prisma.moviesCatogery.findUnique({
    where: {
      id: type_id,
    },
  });
  if (!catogery) {
    throw new Error("Catogery  not found");
  }
  const shows = await prisma.favShows.findMany({
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
  const toatalCount = await prisma.favShows.count({
    where: {
      user_id: user.id,
      type_id: type_id,
    },
  });

  return { shows, toatalCount };
};

//get data by search
export const getFaveMoviesBySearchService = async (
  payLoad: getShowsSearchPayload
) => {
  const { user_id, search_in, page, limit } = payLoad;
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!user) {
    throw new Error("user not found");
  }
  const skip = (page - 1) * limit;

  const shows = await prisma.favShows.findMany({
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

  const toatalCount = await prisma.favShows.count({
    where: {
      user_id: user.id,
      OR: [{ title: { contains: search_in } }],
    },
  });

  return { shows, toatalCount };
};

//getDataById
export const getFavMoviesByIdService = async (payLoad: getShowsById) => {
  const { user_id, show_id } = payLoad;
  console.log(user_id, show_id, "ooo");
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  console.log(user);

  if (!user) {
    throw new Error("user not found");
  }

  const show = await prisma.favShows.findUnique({
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

//delete movie serbvice

export const deleteMoviesService = async (payLoad: getShowsById) => {
  const { user_id, show_id } = payLoad;
  console.log(user_id, show_id, "ooo");
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  console.log(user);
  if (!user) {
    throw new Error("user not found");
  }
  const deletedShow = await prisma.favShows.delete({
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

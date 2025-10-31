import { prisma } from "../../../app/app";
import { addshowtype } from "../../../interface/nonauth/movies/moviesTypeInterface";

//add fav movies
export const addMoviesTypeService = async (payload: addshowtype) => {
  const { name, description } = payload;

  const checkMovieType = await prisma.moviesCatogery.findUnique({
    where: {
      name: name,
    },
  });
  if (checkMovieType) {
    throw new Error("Movie Type allredy exist");
  }
  const newType = await prisma.moviesCatogery.create({
    data: {
      ...payload,
    },
  });

  return newType;
};

export const getMoviesTypeService = async () => {
  const catogeries = await prisma.moviesCatogery.findMany();
  return catogeries;
};



// export const getMoviesTypeService = async (payload:getMoviesTypeIdPyload) => {
//   const catogeries = await prisma.moviesCatogery.findMany();
//   return catogeries;
// };
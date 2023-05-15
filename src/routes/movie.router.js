const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMovieActors,
  setMovieDirector,
  setMovieGenres,
} = require("../controllers/movie.controllers");
const express = require("express");

const movieRouter = express.Router();

movieRouter.route("/").get(getAll).post(create);

movieRouter.route("/:id").get(getOne).delete(remove).put(update);

movieRouter.route("/:id/genres").post(setMovieGenres);

movieRouter.route("/:id/actors").post(setMovieActors);

movieRouter.route("/:id/directors").post(setMovieDirector);

module.exports = movieRouter;

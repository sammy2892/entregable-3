const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Genre.belongsToMany(Movie, { through: "genreMovies" });
Movie.belongsToMany(Genre, { through: "genreMovies" });

Actor.belongsToMany(Movie, { through: "actorMovies" });
Movie.belongsToMany(Actor, { through: "actorMovies" });

Director.belongsToMany(Movie, { through: "directorMovies" });
Movie.belongsToMany(Director, { through: "directorMovies" });

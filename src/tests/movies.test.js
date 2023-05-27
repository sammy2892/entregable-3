const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

let movieId;

test("POST /movies", async () => {
  const movie = {
    name: "La guerra de los mundos",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxEL8fgmIbr7_9862ySvHEpXN4UM33ETBPCaL40GVkq6TfZUbA",
    synopsis:
      "La guerra de los mundos (War of the Worlds en inglés) es una película de ciencia ficción y suspense dirigida por Steven Spielberg y protagonizada por Tom ...",
    releaseYear: 2005,
  };
  const res = await request(app).post("/movies").send(movie);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /movies/:id", async () => {
  const movieUpdate = {
    name: "La guerra de los mundos 2",
  };
  const res = await request(app).put(`/movies/${movieId}`).send(movieUpdate);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movieUpdate.name);
});

// test setting the actors to the movie

test("POST /movies/:id/actors", async () => {
  const actor = await Actor.create({
    firstName: "Denzel 2",
    lastName: "Washingtong",
    nationality: "American",
    image:
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/01/23/16744920354601.jpg",
    birthday: "1965-02-23",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

// test setting the directors to the movie

test("POST /movies/:id/directors", async () => {
  const director = await Director.create({
    firstName: "Steven 2",
    lastName: "Spielberg",
    nationality: "American",
    image: "https://flxt.tmsimg.com/assets/1672_v9_ba.jpg",
    birthday: "1965-02-23",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

// test setting the genres to the movie

test("POST /movies/:id/genres", async () => {
  const genre = await Genre.create({
    name: "Romance",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
});

test("DELETE /movies/:id", async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
});

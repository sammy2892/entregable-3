const request = require("supertest");
const app = require("../app");
require("../models");

let genreId;

test("POST /genres", async () => {
  const genre = {
    name: "Comedy",
  };
  const res = await request(app).post("/genres").send(genre);
  genreId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /genres", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /genres/:id", async () => {
  const genreUpdate = {
    name: "Thriller",
  };
  const res = await request(app).put(`/genres/${genreId}`).send(genreUpdate);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genreUpdate.name);
});

test("DELETE /genres/:id", async () => {
  const res = await request(app).delete(`/genres/${genreId}`);
  expect(res.status).toBe(204);
});

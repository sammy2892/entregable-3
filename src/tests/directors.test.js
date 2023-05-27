const request = require("supertest");
const app = require("../app");
require("../models");

let directorId;

test("POST /actor", async () => {
  const actor = {
    firstName: "Steven",
    lastName: "Spielberg",
    nationality: "American",
    image: "https://flxt.tmsimg.com/assets/1672_v9_ba.jpg",
    birthday: "1965-02-23",
  };
  const res = await request(app).post("/actors").send(actor);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /actors", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /actors/:id", async () => {
  const directorUpdate = {
    firstName: "Steven Update",
  };
  const res = await request(app)
    .put(`/actors/${directorId}`)
    .send(directorUpdate);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(directorUpdate.name);
});

test("DELETE /actors/:id", async () => {
  const res = await request(app).delete(`/actors/${directorId}`);
  expect(res.status).toBe(204);
});

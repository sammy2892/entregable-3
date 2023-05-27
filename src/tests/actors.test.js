const request = require("supertest");
const app = require("../app");
require("../models");

let actorsId;

test("POST /actor", async () => {
  const actor = {
    firstName: "Denzel",
    lastName: "Washingtong",
    nationality: "American",
    image:
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/01/23/16744920354601.jpg",
    birthday: "1965-02-23",
  };
  const res = await request(app).post("/actors").send(actor);
  actorsId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /actors", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /actors/:id", async () => {
  const actorUpdate = {
    firstName: "Denzel Update",
  };
  const res = await request(app).put(`/actors/${actorsId}`).send(actorUpdate);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(actorUpdate.name);
});

test("DELETE /actors/:id", async () => {
  const res = await request(app).delete(`/actors/${actorsId}`);
  expect(res.status).toBe(204);
});

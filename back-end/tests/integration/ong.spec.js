const request = require("supertest");
const connection = require("../../src/database/connection");
const app = require("../../src/app");
describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  afterAll(async () => {
    await connection.destroy();
  });
  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "Teste20",
        email: "email@email.com",
        whatsapp: "84987573913",
        city: "Natal",
        uf: "RN"
      });
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});

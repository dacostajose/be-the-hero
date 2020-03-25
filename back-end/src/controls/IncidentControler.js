const connection = require("../database/connection");

module.exports = {
  async list(request, response) {
    const { page = 1 } = request.query;
    const [count] = await connection("incidents").count();
    console.log(count);
    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]);

    response.header("X-Total-Count", count["count(*)"]);
    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;
    const result = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });
    const id = result[0];
    return response.json({ id });
  },
  async delete(request, response) {
    const { id } = request.params;
    let ong_id = request.headers.authorization;
    const incidents = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();
    console.log(ong_id);
    if (incidents.ong_id !== ong_id) {
      return response.status(401).json({ error: "Operation not permited" });
    }
    await connection("incidents")
      .where("id", id)
      .delete();
    return response.status(204).send();
  }
};

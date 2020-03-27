const connection = require("../database/connection");
const generateUniqueID = require("../utils/generateUniqueId");

module.exports = {
  async list(request, response) {
    const ongs = await connection("ongs").select("*");
    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = generateUniqueID("HEX");
    await connection("ongs").insert({ name, email, whatsapp, city, uf, id });
    return response.json({
      id
    });
  }
};

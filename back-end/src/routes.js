const express = require("express");
const OngControler = require("./controls/OngControler");
const IncidentControler = require("./controls/IncidentControler");
const ProfileControler = require("./controls/ProfileController");
const SessionControler = require("./controls/SessionControler");

const routes = express.Router();

routes.post("/session", SessionControler.create);

routes.get("/ongs", OngControler.list);
routes.post("/ongs", OngControler.create);

routes.get("/profile", ProfileControler.list);

routes.get("/incidents", IncidentControler.list);
routes.post("/incidents", IncidentControler.create);
routes.delete("/incidents/:id", IncidentControler.delete);

module.exports = routes;

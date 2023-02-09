const { Router } = require("express");
const { getLaunches } = require("./launches.controller");
const launchesRouter = Router();

launchesRouter.get("/", getLaunches);

module.exports = launchesRouter;

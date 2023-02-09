const { Router } = require("express");
const { httpGetLaunches } = require("./launches.controller");
const launchesRouter = Router();

launchesRouter.get("/", httpGetLaunches);

module.exports = launchesRouter;

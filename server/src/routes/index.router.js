const { Router } = require("express");
const launchesRouter = require("./launches/launches.router");
const planetsRouter = require("./planets/planets.router");
const rootRouter = Router();

rootRouter.use("/planets", planetsRouter);
rootRouter.use("/launches", launchesRouter);

module.exports = rootRouter;

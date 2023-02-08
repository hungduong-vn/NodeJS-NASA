const { Router } = require("express");
const planetsRouter = require("./planets/planets.router");
const rootRouter = Router();

rootRouter.use("/planets", planetsRouter);

module.exports = rootRouter;

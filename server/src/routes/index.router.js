const { Router } = require("express");
const api = require("./api");
const rootRouter = Router();

rootRouter.use("/v1", api);

module.exports = rootRouter;

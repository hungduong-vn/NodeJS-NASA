const http = require("http");
const app = require("./app");
require("dotenv").config();
const { loadLaunchData } = require("./models/launches.model");
const { loadPlanetsData } = require("./models/planets.model");
const { mongoConnect } = require("./utils/mongo");
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
  loadPlanetsData();
  loadLaunchData();
}
startServer();

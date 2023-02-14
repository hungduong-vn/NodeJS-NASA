const http = require("http");
const app = require("./app");
// const { APP_PORT } = require('./configs/index.configs');
const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-api:awNiZQF1iRPY0fAr@nasacluster.95jk7ne.mongodb.net/?retryWrites=true&w=majority";

const PORT = 8080;

const server = http.createServer(app);

await mongoose.connect(MONGO_URL);
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

const http = require("http");
const app = require("./app");
// const { APP_PORT } = require('./configs/index.configs');
const mongoose = require("mongoose");
require('dotenv').config();

console.log(process.env.MONGO_URL);

const MONGO_URL = process.env.MONGO_URL;
const PORT = 8080;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}
startServer();

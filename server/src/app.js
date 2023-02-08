const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index.router");
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json());

app.use("/api", rootRouter);

module.exports = app;

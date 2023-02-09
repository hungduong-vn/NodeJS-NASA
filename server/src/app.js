const express = require("express");
const path = require("path");
const cors = require("cors");
const rootRouter = require("./routes/index.router");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", rootRouter);
app.get("/", (req, res) => {
  console.log('home')
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;

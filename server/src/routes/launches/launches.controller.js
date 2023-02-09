const { launches } = require("../../models/launches.model");

function getLaunches(req, res) {
  console.log("launches");
  res.status(200).json(Array.from(launches.values()));
}

module.exports = { getLaunches };

const { getAllLaunches } = require("../../models/launches.model");

function httpGetLaunches(req, res) {
  console.log("launches");
  res.status(200).json(getAllLaunches());
}

module.exports = { httpGetLaunches };

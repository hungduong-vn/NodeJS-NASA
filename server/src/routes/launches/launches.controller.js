const {
  getAllLaunches,
  addLaunch,
  abortLaunch,
} = require("../../models/launches.model");

function httpGetLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpPostLaunch(req, res) {
  const launch = req.body;
  for (let i in launch) {
    if (!launch[i]) {
      return res.status(400).json({
        error: `Missing required value for ${i}`,
      });
    }
  }
  launch.launchDate = new Date(launch.launchDate);
  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({
      error: "Invalid Date!",
    });
  }
  addLaunch(launch);
  return res.status(201).json(launch);
}

function httpDeleteLaunch(req, res) {
  const id = +req.params.id;
  try {
    abortLaunch(id);
    return res.status(200).json({ message: `Aborted Launch ${id}` });
  } catch (error) {
    return res.status(404).json({ error: "Launch not found!" });
  }
}

module.exports = { httpGetLaunches, httpPostLaunch, httpDeleteLaunch };

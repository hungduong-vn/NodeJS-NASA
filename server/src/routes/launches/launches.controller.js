const {
  getAllLaunches,
  addLaunch,
  abortLaunch,
  checkLaunchExist,
} = require("../../models/launches.model");
const { getPagination } = require("../../utils/query");

async function httpGetLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  return res.status(200).json(await getAllLaunches(limit, skip));
}

async function httpPostLaunch(req, res) {
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
  await addLaunch(launch);
  return res.status(201).json(launch);
}

async function httpDeleteLaunch(req, res) {
  const id = +req.params.id;
  const isLaunchExisted = await checkLaunchExist(id);
  if (isLaunchExisted) {
    const aborted = await abortLaunch(id);
    return aborted
      ? res.status(200).json({ message: `Aborted Launch ${id}` })
      : res.status(500).json({ error: `Launch ${id} not aborted!` });
  } else {
    return res.status(404).json({ error: "Launch not found!" });
  }
}

module.exports = { httpGetLaunches, httpPostLaunch, httpDeleteLaunch };

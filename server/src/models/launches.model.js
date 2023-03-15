const launchesDB = require("./launches.mongo");
const axios = require("axios");
const planets = require("./planets.mongo");

// const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100; 

// launches.set(launch.flightNumber, launch);

async function getAllLaunches(limit, skip) {
  return await launchesDB
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function getLatestFlightNumber() {
  // SORT ASC (default) based on "flightNumber" -> DESC ~ "-flightNumber"
  const latestLaunch = await launchesDB.findOne({}).sort("-flightNumber");
  return latestLaunch ? latestLaunch.flightNumber : DEFAULT_FLIGHT_NUMBER;
}

async function saveLaunch(launch) {
  await launchesDB.updateOne({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
  });
}

async function populateLaunches() {
  const response = await axios.post(SPACE_X_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        { path: "rocket", select: { name: 1 } },
        { path: "payloads", select: { customers: 1 } },
      ],
    },
  });
  if (response.status !== 200) {
    console.log("Problem populating launches!");
    throw new Error("Launch data download failed");
  }
  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const { payloads } = launchDoc;
    const customers = payloads.flatMap((payload) => payload.customers);
    const launch = {
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      rocket: launchDoc.rocket.name,
      launchDate: launchDoc.date_local,
      upcoming: launchDoc.upcoming,
      success: launchDoc.success,
      customers,
    };
    // console.log({ launch });
    await saveLaunch(launch);
  }
}

const SPACE_X_URL = "https://api.spacexdata.com/v4/launches/query";
async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("Launch data already existed");
    return;
  } else {
    await populateLaunches();
  }
}

async function addLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });
  if (!planet) {
    throw new Error("No matching planets found!");
  }
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = {
    ...launch,
    customers: ["Hung", "NASA"],
    upcoming: true,
    success: true,
    flightNumber: newFlightNumber,
  };
  await saveLaunch(newLaunch);
}

async function findLaunch(filter) {
  return await launchesDB.findOne(filter);
}

async function checkLaunchExist(launchId) {
  return !!(await findLaunch({ flightNumber: launchId }));
}

async function abortLaunch(launchId) {
  const aborted = await launchesDB.updateOne(
    { flightNumber: launchId },
    { upcoming: false, success: false }
  );
  return aborted.modifiedCount === 1;
}

module.exports = {
  loadLaunchData,
  getAllLaunches,
  addLaunch,
  abortLaunch,
  checkLaunchExist,
};

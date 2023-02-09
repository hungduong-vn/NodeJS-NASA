const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["Hung", "NASA"],
  flightNumber: latestFlightNumber,
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => Array.from(launches.values());

const addLaunch = (launch) => {
  latestFlightNumber++;
  launches.set(latestFlightNumber, {
    ...launch,
    customers: ["Hung", "NASA"],
    flightNumber: latestFlightNumber,
    upcoming: true,
    success: true,
  });
};

const abortLaunch = (launchId) => {
  const launch = launches.get(launchId);
  console.log({ launchId });
  if (launch) {
    launch.upcoming = false;
    launch.success = false;
    return;
  }
  throw new Error("Launch not found!");
};

module.exports = { getAllLaunches, addLaunch, abortLaunch };

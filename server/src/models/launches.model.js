const launches = new Map();

const launch = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["Hung", "NASA"],
  flightNumber: 100,
  upcoming: true,
  success: true,
};

launches.set(launch.flightId, launch);

module.exports = { launches };

const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

const planets = require("./planets.mongo");

const isHabitable = (planet) => {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    planet.koi_insol < 1.11 &&
    planet.koi_insol > 0.36 &&
    planet.koi_prad < 1.6
  );
};

const defaultPath = path.join(__dirname, "..", "..", "data", "kepler_data.csv");
// column:true -> 1 row ~ 1 js object
const loadPlanetsData = (
  path = defaultPath,
  parseConfig = { comment: "#", columns: true }
) =>
  new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(parse(parseConfig)) // readable.pipe(writable)
      .on("data", async (chunk) => {
        if (isHabitable(chunk)) {
          // Upsert: Insert (1st arg) if not exist, Other -> Update (2nd arg)
          savePlanet(chunk);
        }
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", () => {
        resolve();
      });
  });

const getAllPlanets = async () => {
  return await planets.find({});
};

const savePlanet = async (planet) => {
  try {
    await planets.updateOne(
      { keplerName: planet.kepler_name },
      { keplerName: planet.kepler_name },
      { upsert: true }
    );
  } catch (error) {
    console.error(`Failed to save planet ${error}`);
  }
};

module.exports = { loadPlanetsData, getAllPlanets };

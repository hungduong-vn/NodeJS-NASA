const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

const isHabitable = (planet) => {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    planet.koi_insol < 1.11 &&
    planet.koi_insol > 0.36 &&
    planet.koi_prad < 1.6
  );
};

// column:true -> 1 row ~ 1 js object
const defaultPath = path.join(__dirname, "..", "..", "data", "kepler_data.csv");
const loadPlanetsData = (
  path = defaultPath,
  parseConfig = { comment: "#", columns: true }
) =>
  new Promise((resolve, reject) => {
    const result = [];
    fs.createReadStream(path)
      .pipe(parse(parseConfig)) // readable.pipe(writable)
      .on("data", (chunk) => {
        if (isHabitable(chunk)) {
          result.push(chunk);
        }
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", () => {
        // console.log(`${result.length} habitable planet(s) found`);
        // console.log(result.map(planet => planet.kepler_name));
        resolve(result);
      });
  });

module.exports = { loadPlanetsData };

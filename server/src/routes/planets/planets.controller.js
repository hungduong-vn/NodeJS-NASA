const { loadPlanetsData } = require("../../models/planets.model");

async function httpGetAllPlanets(req, res) {
  const planets = await loadPlanetsData();
  // console.log(planets);
  console.log('getAllPlanets');
  res.status(200).json(planets);
}

module.exports = { httpGetAllPlanets };

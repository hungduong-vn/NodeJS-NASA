// const API_URL = "http://localhost:8080/api/v1";

const API_URL = "api/v1"; // Same origin as the Backend -> Omit host & port

async function httpGetPlanets() {
  const path = `${API_URL}/planets`;
  const response = await fetch(path);
  return response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const launches = await response.json();
  return launches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  try {
    return fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try {
    return fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch (err) {
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };

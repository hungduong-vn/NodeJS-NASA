const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../utils/mongo");

// create test environment for nested test
describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  // Jest auto closed connection -> No need to disconnect manually
  // afterAll(async () => {
  //   await mongoDisconnect();
  // });
  describe("Test GET /launches", () => {
    test("should respond with 200 success", async () => {
      const response = await request(app)
        .get("/api/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      // console.log({response});
    });
  });
  describe("Test POST /launches", () => {
    const testLaunch = {
      mission: "Lunar Quest X",
      rocket: "Thiên Long 13M",
      target: "Kepler-186 f",
      launchDate: "03/12/2050",
    };
    const makeReq = (data, statusCode = 201) =>
      request(app)
        .post("/api/v1/launches")
        .send(data)
        .expect("Content-Type", /json/)
        .expect(statusCode);
    let response;
    test("should respond with 201 success", async () => {
      response = await makeReq(testLaunch);

      const { launchDate, ...launchWithoutDate } = testLaunch;
      expect(response.body).toMatchObject(launchWithoutDate);

      const reqDate = new Date(launchDate).valueOf();
      const resDate = new Date(response.body.launchDate).valueOf();
      expect(reqDate).toBe(resDate);
    });
    test("should catch null fields", async () => {
      for (let key in Object.keys(testLaunch)) {
        response = await makeReq({ ...testLaunch, [key]: "" }, 400);
        expect(response.body).toStrictEqual({
          error: `Missing required value for ${key}`,
        });
      }
    });
    test("should catch invalid Dates", async () => {
      const launchInvalidDate = { ...testLaunch, launchDate: "Hello World" };
      response = await makeReq(launchInvalidDate, 400);
      expect(response.body).toStrictEqual({
        error: `Invalid Date!`,
      });
    });
  });
});

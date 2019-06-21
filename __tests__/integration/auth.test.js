const { MongoClient } = require("mongodb");
const config = require("../../env.json")[process.env.NODE_ENV];
const encryptService = require("../../src/services/encrypt-service");
const request = require("supertest");
const app = require("../../src/app");

describe("Authentication", () => {
  let connection, db;

  beforeAll(async () => {
    console.log(process.env.NODE_ENV);
    connection = await MongoClient.connect(config.mongo_db, {
      useNewUrlParser: true
    });

    db = await connection.db(process.env.DATABASE_NAME);
    const Users = db.collection("users");
    await Users.insertOne({
      email: "bromatheuscruz@gmail.com",
      password: encryptService.encrypt("123456")
    });
  });

  it("Should be authenticate the user with valid credentials", async () => {
    const response = await request(app)
      .post("/api/rest/auth/login")
      .send({
        email: "bromatheuscruz@gmail.com",
        password: "123456"
      });

    expect(response.status).toBe(200);
  });

  it("Should not be authenticate the user with invalid credentials", async () => {
    const response = await request(app)
      .post("/api/rest/auth/login")
      .send({
        email: "bromatheuscruz@gmail.com",
        password: "1234567"
      });

    expect(response.status).toBe(401);
  });

  it("Should be return a JWT Token when receive valid credentials", async () => {
    const response = await request(app)
      .post("/api/rest/auth/login")
      .send({
        email: "bromatheuscruz@gmail.com",
        password: "123456"
      });

    expect(response.body.data.token).toBeDefined();
  });

  it("Should be return a User with id and email when receive valid credentials", async () => {
    const response = await request(app)
      .post("/api/rest/auth/login")
      .send({
        email: "bromatheuscruz@gmail.com",
        password: "123456"
      });

    expect(response.body.data.user.email).toBe("bromatheuscruz@gmail.com");
    expect(response.body.data.user.id).toBeDefined();
  });

  afterAll(async () => {
    await db.dropCollection("users");
    await connection.dbclose();
    await db.close();
  });
});

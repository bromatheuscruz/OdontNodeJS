const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const encryptService = require("../../src/services/encrypt-service");

const app = function lazyApp() {
  return require("../../src/app");
};

const mockUser = {
  email: "bromatheuscruz@gmail.com",
  password: "123456"
};

const User = require("../../src/db/schemas/user-schema");

describe("Authentication Suite", () => {
  let mongoServer;
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    process.env.MONGO_DB_URI = await mongoServer.getUri();

    mongoose
      .connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
      })
      .then(mongo =>
        mongo.model("User").create({
          email: mockUser.email,
          password: encryptService.encrypt(mockUser.password)
        })
      );
  });

  afterAll(async done => {
    await User.remove();
    await mongoose.disconnect(done);
    await mongoServer.stop();
  });

  it("Should authenticate with valid credentials", async () => {
    const response = await request(app())
      .post("/api/rest/auth/login")
      .send(mockUser);

    expect(response.status).toBe(200);
  });

  it("Should return a JWT token and user when receive valid Credentials", async () => {
    const response = await request(app())
      .post("/api/rest/auth/login")
      .send(mockUser);

    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.user.email).toBeDefined();
    expect(response.body.data.user.id).toBeDefined();
  });

  it("Should return error 401 when authentication failed", async () => {
    const response = await request(app())
      .post("/api/rest/auth/login")
      .send({ email: mockUser.email, password: "wrongpassword" });

    expect(response.body.success).toBe(false);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthenticated");
  });

  it("Should be create an user for authenticate with valid info", async () => {
    const response = await request(app())
      .post("/api/rest/users")
      .send({
        email: "iocruzz@outlook.com",
        password: "@@@123@@@"
      });

    expect(response.status).toBe(201);
  });

  it("Should not be created an user (valid email, not valid password min is 6)", async () => {
    const response = await request(app())
      .post("/api/rest/users")
      .send({
        email: "myotheremail@outlook.com",
        password: "12345"
      });

    expect(response.status).toBe(403);
    expect(response.body.errors.length).toBe(1);
    expect(response.body.errors[0].message).toBe(
      "Password must contain at least six characters"
    );
  });

  it("Should not be create an user with invalid email", async () => {
    const response = await request(app())
      .post("/api/rest/users")
      .send({
        email: "bromatheuscruz",
        password: "12345678"
      });

    expect(response.status).toBe(403);
    expect(response.body.errors.length).toBe(1);
    expect(response.body.errors[0].message).toBe("Invalid email");
  });

  it("Should be return all erros when email and password are invalids", async () => {
    const response = await request(app())
      .post("/api/rest/users")
      .send({
        email: "",
        password: ""
      });

    expect(response.body.errors.length).toBe(4);
    expect(response.status).toBe(403);
  });
});

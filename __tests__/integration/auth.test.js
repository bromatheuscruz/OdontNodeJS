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
});

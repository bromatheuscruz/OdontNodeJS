const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const app = function lazyLoad() {
  return require("../../src/app");
};

const Pacient = require("../../src/db/schemas/pacient-schema");
const mockCorrectPacient = {
  name: "Matheus Henrique Penultimonome Ultimonome",
  momName: "Agostina da Silva Peniltimonome Ultimonome"
};
describe("Create Pacient Suite", async () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    process.env.MONGO_DB_URI = await mongoServer.getUri();
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  afterEach(async () => {
    await Pacient.remove({});
  });

  afterAll(async done => {
    await mongoose.disconnect(done);
    await mongoServer.stop();
  });

  it("Should be create a Pacient with valid informations", async () => {});
});

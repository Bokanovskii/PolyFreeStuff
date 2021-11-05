const mongoose = require("mongoose");
const ListingSchema = require("./models/listing");
const backend = require("./backend_with_db");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let listingModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  listingModel = conn.model("Listing", ListingSchema);

  backend.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

// beforeEach(async () => {
//   let dummyUser = {
//     name: "Chuck Norris",
//     job: "Highlander",
//   };
//   let result = new userModel(dummyUser);
//   await result.save();
// });

afterEach(async () => {
  await listingModel.deleteMany();
});

// test("Fetching all users", async () => {
//   const users = await userServices.getUsers();
//   expect(users).toBeDefined();
//   expect(users.length).toBeGreaterThan(0);
// });

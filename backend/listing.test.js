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

beforeEach(async () => {
  let newUser = {
    name: "Chuck Norris",
    email: "chuck@calpoly.edu",
  };
});

afterEach(async () => {
  await listingModel.deleteMany();
});

test("Sign up user", async () => {
  let dummyEmail = "chuck@calpoly.edu";
  const noUser = await userModel.find({ email: dummyEmail });
  expect(noUser.length).toEqual(0);

  const newUser = await createNewUser(dummyEmail);
  const basicUser = {
    name: "New User",
    email: dummyEmail,
    image: "",
    listings: [],
  };
  expect(newUser).toEqual(basicUser);
});

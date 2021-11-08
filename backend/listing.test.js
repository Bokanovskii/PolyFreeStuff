const mongoose = require("mongoose");
const ListingSchema = require("./models/listing");
const UserSchema = require("./models/user");
const { setConnection, createNewUser } = require("./user-services");
const { addListing, deleteListing } = require("./listing-services");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { test, expect } = require("@jest/globals");

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
  userModel = conn.model("User", UserSchema);

  setConnection(conn);
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
  await userModel.deleteMany();
});

test("Add listing (requires addUser)", async () => {
  let email = "chuck@calpoly.edu";
  let newUser = await createNewUser(email);
  let newListing = {
    name: "axe",
    seller: newUser._id,
    is_available: true,
  };
  expect(await addListing(newListing)).toBeTruthy();
  let users = await userModel.find();
  expect(users.length).toEqual(1);
  expect(users[0]["listings"].length).toEqual(1);
  expect(users[0]["listings"][0]).toEqual(newListing._id);
});

test("Delete listing (requires addUser and addListing)", async () => {
  let email = "chuck@calpoly.edu";
  let newUser = await createNewUser(email);
  let newListing = {
    name: "axe",
    seller: newUser._id,
    is_available: true,
  };
  expect(await addListing(newListing)).toBeTruthy();
  let users = await userModel.find();
  expect(users.length).toEqual(1);
  expect(users[0]["listings"].length).toEqual(1);

  expect(await deleteListing(newListing._id)).toBeTruthy();
  users = await userModel.find();
  expect(users.length).toEqual(1);
  expect(users[0]["listings"].length).toEqual(0);
});

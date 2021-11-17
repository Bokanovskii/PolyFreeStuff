const mongoose = require("mongoose");
const ListingSchema = require("./models/listing");
const UserSchema = require("./models/user");
const {
  addUser,
  createNewUser,
  deleteUser,
  setConnection,
  getConnection,
} = require("./user-services");
const { addListing } = require("./listing-services");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { expect } = require("@jest/globals");

let mongoServer;
let conn;
let userModel;

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

afterEach(async () => {
  await userModel.deleteMany();
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
    _id: newUser["_id"],
  };
  expect(newUser).toEqual(basicUser);
});

test("Delete User (requires addUser)", async () => {
  let dummyEmail = "chuck@calpoly.edu";
  const newUser = await createNewUser(dummyEmail);
  let dbUser = await userModel.find({ email: dummyEmail });
  expect(dbUser.length).toEqual(1);
  expect(await deleteUser(newUser._id)).toBeTruthy();
  dbUser = await userModel.find({ email: dummyEmail });
  expect(dbUser.length).toEqual(0);
});

test("Delete User with listing (requires addUser, addListing, deleteListing)", async () => {
  let dummyEmail = "chuck@calpoly.edu";
  const newUser = await createNewUser(dummyEmail);
  let users = await userModel.find({ email: dummyEmail });
  expect(users.length).toEqual(1);

  let newListing = {
    name: "axe",
    seller: newUser._id,
    is_available: true,
  };
  expect(await addListing(newListing)).toBeTruthy();
  users = await userModel.find();
  expect(users.length).toEqual(1);
  expect(users[0]["listings"].length).toEqual(1);
  expect(users[0]["listings"][0]).toEqual(newListing._id);
  let listings = await listingModel.find();
  expect(listings.length).toEqual(1);

  expect(await deleteUser(newUser._id)).toBeTruthy();
  users = await userModel.find({ email: dummyEmail });
  expect(users.length).toEqual(0);
  listings = await listingModel.find();
  expect(listings.length).toEqual(0);
});

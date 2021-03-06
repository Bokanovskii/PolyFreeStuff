const mongoose = require("mongoose");
const ListingSchema = require("./models/listing");
const UserSchema = require("./models/user");
const {
  setConnection,
  createNewUser,
  updateUserById,
} = require("./user-services");
const {
  addListing,
  deleteListing,
  getListingsFromQuery,
  getListingById,
  getSellerDataWithinListing,
  getListingsForUser,
} = require("./listing-services");
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
  let email = "chuck@calpoly.edu";
  newUser = await createNewUser(email);
  newListing = {
    name: "axe",
    seller: newUser._id,
    is_available: true,
    categories: ["hardware", "tools"],
  };
  newListing_2 = {
    name: "bike",
    seller: newUser._id,
    is_available: true,
    categories: ["exercise", "hardware"],
  };
  newListing_3 = {
    name: "fridge kelvinator",
    seller: newUser._id,
    is_available: true,
    categories: ["hardware", "tools", "furniture"],
  };
  newListing_4 = {
    name: "couch",
    seller: newUser._id,
    is_available: true,
    categories: ["furniture", "cloth"],
  };
});

afterEach(async () => {
  await listingModel.deleteMany();
  await userModel.deleteMany();
});

test("Add listing (requires addUser)", async () => {
  expect(await addListing(newListing)).toBeTruthy();
  let users = await userModel.find();
  expect(users.length).toEqual(1);
  expect(users[0]["listings"].length).toEqual(1);
  expect(users[0]["listings"][0]).toEqual(newListing._id);

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(1);
});

test("Add listing bad", async () => {
  let badListing = {
    name: "haha",
  };
  expect(await addListing(badListing)).toBeFalsy();
});

test("Delete listing (requires addUser and addListing)", async () => {
  expect(await addListing(newListing)).toBeTruthy();
  let users = await userModel.find();
  expect(users.length).toEqual(1);
  expect(users[0]["listings"].length).toEqual(1);

  expect(await deleteListing(newListing._id)).toBeTruthy();
  users = await userModel.find();
  expect(users.length).toEqual(1);
  expect(users[0]["listings"].length).toEqual(0);

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(0);
});

test("Delete listing bad", async () => {
  expect(await addListing(newListing)).toBeTruthy();
  let users = await userModel.find();
  expect(users.length).toEqual(1);

  expect(await deleteListing("haha")).toBeFalsy();
});

test("Get category filtered and date (not specified) listings (requires addUser and addListing)", async () => {
  expect(await addListing(newListing_4)).toBeTruthy();
  expect(await addListing(newListing_3)).toBeTruthy();
  expect(await addListing(newListing_2)).toBeTruthy();
  expect(await addListing(newListing)).toBeTruthy();

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(4);

  let params = { categories: ["hardware"] };
  const filteredListings = await getListingsFromQuery(params);
  expect(filteredListings.length).toEqual(3);

  expect(filteredListings[0]["name"]).toEqual(newListing["name"]);
  expect(filteredListings[1]["name"]).toEqual(newListing_2["name"]);
  expect(filteredListings[2]["name"]).toEqual(newListing_3["name"]);
});

test("Get listing by id", async () => {
  expect(await addListing(newListing)).toBeTruthy();
  const retListing = await getListingById(newListing._id);
  expect(retListing._id).toEqual(newListing._id);
});

test("Get Seller data within listing", async () => {
  expect(await addListing(newListing)).toBeTruthy();
  newListing = await getSellerDataWithinListing(newListing);
  expect(newListing["seller"]["email"]).toEqual(newUser["email"]);
});

test("Get listings for user", async () => {
  expect(await addListing(newListing_4)).toBeTruthy();
  expect(await addListing(newListing_3)).toBeTruthy();
  expect(await addListing(newListing)).toBeTruthy();
  expect(await addListing(newListing_2)).toBeTruthy();

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(4);

  let userListings = await getListingsForUser(newUser._id, { getUser: "true" });
  expect(userListings.length).toEqual(4);
});

test("Sorted get category filtered and dated (not specified) listings (requires addUser and addListing)", async () => {
  expect(await addListing(newListing_4)).toBeTruthy();
  expect(await addListing(newListing_3)).toBeTruthy();
  expect(await addListing(newListing)).toBeTruthy();
  expect(await addListing(newListing_2)).toBeTruthy();

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(4);

  let params = { categories: ["hardware"] };
  const filteredListings = await getListingsFromQuery(params);
  expect(filteredListings.length).toEqual(3);

  expect(filteredListings[0]["name"]).toEqual(newListing_2["name"]);
  expect(filteredListings[1]["name"]).toEqual(newListing["name"]);
  expect(filteredListings[2]["name"]).toEqual(newListing_3["name"]);
});

test("Sorted get category and dated (specified) listings (requires addUser and addListing)", async () => {
  expect(await addListing(newListing_3)).toBeTruthy();
  expect(await addListing(newListing_2)).toBeTruthy();
  expect(await addListing(newListing)).toBeTruthy();

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(3);

  let params = {
    categories: ["hardware"],
    orderBy: "creation_date",
  };
  const filteredListings = await getListingsFromQuery(params);
  expect(filteredListings.length).toEqual(3);

  expect(filteredListings[0]["name"]).toEqual(newListing["name"]);
  expect(filteredListings[1]["name"]).toEqual(newListing_2["name"]);
  expect(filteredListings[2]["name"]).toEqual(newListing_3["name"]);
});

test("Sorted get named listings (requires addUser and addListing)", async () => {
  expect(await addListing(newListing_3)).toBeTruthy();
  expect(await addListing(newListing)).toBeTruthy();
  expect(await addListing(newListing_2)).toBeTruthy();

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(3);

  let params = {
    orderBy: "name",
  };
  const filteredListings = await getListingsFromQuery(params);
  expect(filteredListings.length).toEqual(3);

  expect(filteredListings[0]["name"]).toEqual(newListing["name"]);
  expect(filteredListings[1]["name"]).toEqual(newListing_2["name"]);
  expect(filteredListings[2]["name"]).toEqual(newListing_3["name"]);
});

test("Get listings sliced (requires addUser and addListing)", async () => {
  expect(await addListing(newListing_3)).toBeTruthy();
  expect(await addListing(newListing_2)).toBeTruthy();
  expect(await addListing(newListing)).toBeTruthy();

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(3);

  let params = {
    start: 0,
    end: 2,
  };
  const filteredListings = await getListingsFromQuery(params);
  expect(filteredListings.length).toEqual(2);

  expect(filteredListings[0]["name"]).toEqual(newListing["name"]);
  expect(filteredListings[1]["name"]).toEqual(newListing_2["name"]);
});

test("Get listings sliced past tot index (requires addUser and addListing)", async () => {
  expect(await addListing(newListing_3)).toBeTruthy();
  expect(await addListing(newListing_2)).toBeTruthy();
  expect(await addListing(newListing)).toBeTruthy();

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(3);

  let params = {
    start: 0,
    end: 10,
  };
  const filteredListings = await getListingsFromQuery(params);
  expect(filteredListings.length).toEqual(3);

  expect(filteredListings[0]["name"]).toEqual(newListing["name"]);
  expect(filteredListings[1]["name"]).toEqual(newListing_2["name"]);
  expect(filteredListings[2]["name"]).toEqual(newListing_3["name"]);
});

test("Get listing with multi-level category filtering (requires addUser and addListing)", async () => {
  expect(await addListing(newListing_4)).toBeTruthy();
  expect(await addListing(newListing_3)).toBeTruthy();
  expect(await addListing(newListing_2)).toBeTruthy();
  expect(await addListing(newListing)).toBeTruthy();

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(4);

  let params = {
    start: 0,
    end: 10,
    categories: ["hardware", "tools"],
  };
  const filteredListings = await getListingsFromQuery(params);
  expect(filteredListings.length).toEqual(2);

  expect(filteredListings[0]["name"]).toEqual(newListing["name"]);
  expect(filteredListings[1]["name"]).toEqual(newListing_3["name"]);
});

test("Get listing based on full search query: name (requires addUser and addListing)", async () => {
  expect(await addListing(newListing_4)).toBeTruthy();
  expect(await addListing(newListing_3)).toBeTruthy();
  expect(await addListing(newListing_2)).toBeTruthy();
  expect(await addListing(newListing)).toBeTruthy();

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(4);

  let params = {
    search: "axe",
  };
  const filteredListings = await getListingsFromQuery(params);
  expect(filteredListings.length).toEqual(1);

  expect(filteredListings[0]["name"]).toEqual(newListing["name"]);
});

test("Get listing based on full search query: category (requires addUser and addListing)", async () => {
  expect(await addListing(newListing_4)).toBeTruthy();
  expect(await addListing(newListing_3)).toBeTruthy();
  expect(await addListing(newListing_2)).toBeTruthy();
  expect(await addListing(newListing)).toBeTruthy();

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(4);

  let params = {
    search: "hardware",
  };
  const filteredListings = await getListingsFromQuery(params);
  expect(filteredListings.length).toEqual(3);

  expect(filteredListings[0]["name"]).toEqual(newListing["name"]);
  expect(filteredListings[1]["name"]).toEqual(newListing_2["name"]);
  expect(filteredListings[2]["name"]).toEqual(newListing_3["name"]);
});

test("Get listing based on partial search query: name (requires addUser and addListing)", async () => {
  expect(await addListing(newListing_4)).toBeTruthy();
  expect(await addListing(newListing_3)).toBeTruthy();
  expect(await addListing(newListing_2)).toBeTruthy();
  expect(await addListing(newListing)).toBeTruthy();

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(4);

  let params = {
    search: "fridge",
  };
  const filteredListings = await getListingsFromQuery(params);
  expect(filteredListings.length).toEqual(1);

  expect(filteredListings[0]["name"]).toEqual(newListing_3["name"]);
});

test("Get listing based on pre-stemmed search query: name (requires addUser and addListing)", async () => {
  expect(await addListing(newListing_4)).toBeTruthy();
  expect(await addListing(newListing_3)).toBeTruthy();
  expect(await addListing(newListing_2)).toBeTruthy();
  expect(await addListing(newListing)).toBeTruthy();

  const listings_from_db = await listingModel.find();
  expect(listings_from_db.length).toEqual(4);

  let params = {
    search: "fridges",
  };
  const filteredListings = await getListingsFromQuery(params);
  expect(filteredListings.length).toEqual(1);

  expect(filteredListings[0]["name"]).toEqual(newListing_3["name"]);
});

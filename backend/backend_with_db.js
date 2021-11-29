const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  createNewUser,
  deleteUser,
  getUserFromEmail,
  getConnection,
  getAllUsers,
  getUserById,
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
const process = require("process");

const userSchema = require("./models/user");
const listingSchema = require("./models/listing");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));


app.get("/", async (req, res) => {
  res.status(201).send("hello PolyGold user");
});

// user login endpoint
app.get("/login/:email", async (req, res) => {
  const email = req.params["email"];
  const user = await getUserFromEmail(email);
  // if no user is found length will be 0
  if (user.length === 0) {
    const newUser = await createNewUser(email);
    // internal server error
    if (newUser == null) res.status(500).send(null);
    else res.status(201).send(newUser); // created
  } else {
    res.status(201).send(user[0]); // found
  }
});

// Get all users
app.get("/users", async (req, res) => {
  const users_from_db = await getAllUsers();
  res.status(201).send({ users_list: users_from_db });
});

// user profile edit endpoint
app.post("/replace_user", async (req, res) => {
  const user = req.body;

  if (await updateUserById(user, user._id)) res.status(200).send(user);
  else res.status(404).send(null);
});

// Get user by their database id
app.get("/user/:id", async (req, res) => {
  const id = req.params["id"];
  const userFromDb = await getUserById(id);
  if (userFromDb.length === 0) res.status(404).send("User id not found");
  else res.status(201).send(userFromDb);
});

// user profile delete endpoint
app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // Deletes a user and all their listings
    const result = await deleteUser(id);
    if (result) {
      res.status(202).send();
    } else {
      res.status(404).send("User id not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

// Create a listing endpoint
app.post("/listing", async (req, res) => {
  const listing = req.body;
  if (await addListing(listing)) res.status(201).send(listing);
  else res.status(500).send(null);
});

// Get a listing by its database id
app.get("/listing/:id", async (req, res) => {
  const id = req.params["id"];
  const listingFromDb = await getListingById(id);
  if (listingFromDb.length === 0)
    res.status(404).send("Could not find listing.");
  // Always return the user as their JSON
  await getSellerDataWithinListing(listingFromDb);

  res.status(201).send({ listingFromDb });
});

// Get all listings
app.get("/listings", async (req, res) => {
  // if orderBy not provided, by default order by creation_date
  // {'start': 1, 'end': 4, 'orderBy': 'name', 'categories': [''], 'search': '', 'getUser': 'true'}
  const listingsFromDb = await getListingsFromQuery(req.query);
  if ("getUser" in req.query && req.query["getUser"] === "true") {
    for (var i = 0; i < listingsFromDb.length; i++) {
      listingsFromDb[i] = await getSellerDataWithinListing(listingsFromDb[i]);
    }
  }
  // if no listings matched the query then listingsFromDb.length === 0
  res.status(201).send({ listing_list: listingsFromDb });
});

app.get("/num_listings", async (req, res) => {
  const listingModel = getConnection().model("Listing", ListingSchema);
  let allListings = await listingModel.find();
  res.status(201).send({ numListings: allListings.length });
});

app.get("/listings_from_user/:id", async (req, res) => {
  const id = req.params["id"];
  // sorted by creation_date (newest first) and gets seller data within listing if query getUser === 'true'
  const listings = await getListingsForUser(id, req.query);
  if (listings === null) res.status(404).send(null);
  res.status(201).send({ listing_list: listings });
});

// Delete a listing by its database id
app.delete("/listing/:id", async (req, res) => {
  const id = req.params["id"];
  if (await deleteListing(id)) res.status(201).send();
  else res.status(500).send();
});

// Delete all users and lisitings from database
app.delete("/reset_db", async (req, res) => {
  const userModel = getConnection().model("User", userSchema);
  const listingModel = getConnection().model("Listing", listingSchema);
  await listingModel.deleteMany();
  await userModel.deleteMany();
  res.status(201).send();
});

const port_real = process.env.PORT || port;
app.listen(port_real, () => {
  console.log("REST API is listening at " + port_real);
});

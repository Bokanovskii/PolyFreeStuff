const express = require("express");
const cors = require("cors");
const { createNewUser, deleteUser, getConnection } = require("./user-services");
const {
  addListing,
  deleteListing,
  filterAndOrder,
} = require("./listing-services");
const process = require("process");

const UserSchema = require("./models/user");
const ListingSchema = require("./models/listing");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(201).send("hello PolyGold user");
});

// user login endpoint
app.get("/login/:email", async (req, res) => {
  const userModel = getConnection().model("User", UserSchema);
  const email = req.params["email"];
  const user = await userModel.find({ email: email });

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
  const userModel = getConnection().model("User", UserSchema);
  const users_from_db = await userModel.find();
  res.status(201).send({ users_list: users_from_db });
});

// user profile edit endpoint
app.post("/replace_user", async (req, res) => {
  const userModel = getConnection().model("User", UserSchema);
  const user = req.body;
  if (await userModel.findByIdAndUpdate(user._id, user))
    res.status(200).send(user);
  else res.status(404).send(null);
});

// Get user by their database id
app.get("/user/:id", async (req, res) => {
  const userModel = getConnection().model("User", UserSchema);
  const id = req.params["id"];
  const user_from_db = await userModel.findById(id);
  res.status(201).send(user_from_db);
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
  const listingModel = getConnection().model("Listing", ListingSchema);
  const id = req.params["id"];
  const listing_from_db = await listingModel.findById(id);
  res.status(201).send({ listing_from_db });
});

// Get all listings
app.get("/listings", async (req, res) => {
  // if orderBy not provided, by default order by creation_date
  //{'start': 1, 'end': 10, 'orderBy': 'creation_date', 'categories': ['']}
  const listingModel = getConnection().model("Listing", ListingSchema);
  let listings_from_db = await filterAndOrder(listingModel, req.body);
  res.status(201).send({ listing_list: listings_from_db });
});

// Delete a listing by its database id
app.delete("/listing/:id", async (req, res) => {
  const id = req.params["id"];
  if (await deleteListing(id)) res.status(201).send();
  else res.status(500).send();
});

// Delete all users and lisitings from database
app.delete("/reset_db", async (req, res) => {
  const userModel = getConnection().model("User", UserSchema);
  const listingModel = getConnection().model("Listing", ListingSchema);
  await listingModel.deleteMany();
  await userModel.deleteMany();
  res.status(201).send();
});

const port_real = process.env.PORT || port;
app.listen(port_real, () => {
  console.log("REST API is listening at " + port_real);
});

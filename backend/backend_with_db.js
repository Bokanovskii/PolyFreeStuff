const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const userModel = require("./models/user");
const listingModel = require("./models/listing");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/free_stuff", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

//dummy function
app.get("/", async (req, res) => {
  //res.send('Hello World!');
  const users_from_db = await userModel.find();
  res.send({ users_list: users_from_db });
});

// user login endpoint
app.get("/login/:email", async (req, res) => {
  const email = req.params["email"];
  const user = await userModel.find({ email: email });

  if (user.length === 0) {
    const newUser = await createNewUser(email);
    // internal server error
    if (newUser == null) res.status(500).send(null);
    else res.status(201).send(newUser); // created
  } else {
    res.status(302).send(user[0]); // found
  }
});

//Dummy function
app.post("/test_add_user", async (req, res) => {
  const user = req.body;
  if (await addUser(user)) res.status(201).send(user);
  else res.status(500).send(user);
});

// Dummy function
app.post("/test_add_listing", async (req, res) => {
  const listing = req.body;
  // General format:
  // {'name': 'listing #', 'description': 'haha', 'seller': user['_id'], 'is_available': true, 'creation_date': Date.now()}
  if (await add_listing(listing)) res.status(201).send(listing);
  else res.status(500).send(listing);
});

async function createNewUser(email) {
  const basicUser = {
    name: "New User",
    email: email,
    image: "",
    listings: [],
  };
  // if correctly placed in the database, return the created usr
  //    will have a '_id' variable appended as part of the addUser call
  if (await addUser(basicUser)) {
    return basicUser;
  } else return null;
}

// Basic implementation for this (may need more work)
async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    let added_user = await userToAdd.save();
    user["_id"] = added_user._id;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Basic implementation for this (may need more work)
async function add_listing(listing) {
  try {
    // add listing to the database
    const ListingToAdd = new listingModel(listing);
    let added_listing = await ListingToAdd.save();
    listing["_id"] = added_listing._id;
    // Update the user with the listing
    const user = await userMode.findById(listing["seller"]);
    user["listings"] += added_listing._id;
    await userModel.findByIdAndUpdate(user["_id"], user);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

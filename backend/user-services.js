const mongoose = require("mongoose");
const dotenv = require("dotenv");
const process = require("process");
dotenv.config();
const userSchema = require("./models/user");

let conn;

function setConnection(newConn) {
  return (conn = newConn);
}

function getConnection() {
  if (!conn) {
    if (process.argv.includes("--prod")) {
      conn = mongoose.createConnection(
        "mongodb+srv://" +
          process.env.MONGO_USER +
          ":" +
          process.env.MONGO_PWD +
          "@polygold.uvj73.mongodb.net/" +
          process.env.MONGO_DB +
          "?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
    } else {
      conn = mongoose.createConnection("mongodb://localhost:27017/PolyGold", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  }
  return conn;
}

async function createNewUser(email) {
  const basicUser = {
    name: "New User",
    email: email,
    image: "",
    listings: [],
  };
  // if correctly placed in the database, return the created user
  //    will have an '_id' variable appended as part of the addUser call
  if (await addUser(basicUser)) {
    return basicUser;
  } else return null;
}

async function addUser(user) {
  const userModel = getConnection().model("User", userSchema);
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

async function getUserFromEmail(email) {
  const userModel = getConnection().model("User", userSchema);
  return await userModel.find({ email: email });
}

async function getAllUsers() {
  const userModel = getConnection().model("User", userSchema);
  return await userModel.find();
}

async function updateUserById(user, id) {
  const userModel = getConnection().model("User", userSchema);
  return await userModel.findByIdAndUpdate(id, user);
}

async function getUserById(id) {
  const userModel = getConnection().model("User", userSchema);
  return await userModel.findById(id);
}

async function deleteUser(id) {
  const { deleteListing } = require("./listing-services");
  const userModel = getConnection().model("User", userSchema);
  try {
    const user_from_db = await userModel.findById(id);
    for (let i = 0; i < user_from_db["listings"].length; i++) {
      await deleteListing(user_from_db["listings"][i]);
    }
    await userModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.createNewUser = createNewUser;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
exports.setConnection = setConnection;
exports.getConnection = getConnection;
exports.getUserFromEmail = getUserFromEmail;
exports.getAllUsers = getAllUsers;
exports.updateUserById = updateUserById;
exports.getUserById = getUserById;

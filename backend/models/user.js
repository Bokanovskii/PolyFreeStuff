const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
      type: String,
      required: true,
      trim: true,
  },
  Image: {
    type: String,
    required: false,
    trim: true,
  },
  Listings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing"
  }]
}, {collection : 'users_list'});

const User = mongoose.model("User", UserSchema);

module.exports = User;
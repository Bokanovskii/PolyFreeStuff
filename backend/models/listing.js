const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: False,
    trim: true,
  },
  pickup_location: {
      type: String,
      required: False,
      trim: true,
  },
  Image: {
    type: String,
    required: False,
    trim: true,
  },
  Seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
  },
  Buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
  },
  is_available: {
      type: Boolean,
      required: true,
  },
  creation_date: {
      type: Date,
      required: true,
  }
}, {collection : 'Listings'});

const Listing = mongoose.model("Listing", UserSchema);

module.exports = Listing;
const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  pickup_location: {
      type: String,
      required: false,
      trim: true,
  },
  Image: {
    type: String,
    required: false,
    trim: true,
  },
  Seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
  },
  Buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
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

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
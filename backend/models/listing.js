const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
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
    image: {
      type: String,
      required: false,
      trim: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    is_available: {
      type: Boolean,
      required: true,
    },
    creation_date: {
      type: Date,
      required: true,
    },
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { collection: "Listings" }
);

module.exports = ListingSchema;

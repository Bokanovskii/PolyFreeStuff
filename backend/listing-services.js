const userSchema = require("./models/user");
const listingSchema = require("./models/listing");
const { getConnection } = require("./user-services");

async function addListing(listing) {
  const userModel = getConnection().model("User", userSchema);
  const listingModel = getConnection().model("Listing", listingSchema);
  try {
    listing["creation_date"] = new Date();
    // add listing to the database
    const ListingToAdd = new listingModel(listing);
    let added_listing = await ListingToAdd.save();
    listing["_id"] = added_listing._id;
    // Update the user with the listing
    const user = await userModel.findById(listing["seller"]);
    user["listings"].push(added_listing._id);
    await userModel.findByIdAndUpdate(user["_id"], user);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteListing(id) {
  const userModel = getConnection().model("User", userSchema);
  const listingModel = getConnection().model("Listing", listingSchema);
  try {
    // delete listing from the database
    const deleted_listing = await listingModel.findById(id);
    if (deleted_listing === null) return false;
    await listingModel.findByIdAndDelete(id);
    // Update the user with the deleted listing
    const user = await userModel.findById(deleted_listing["seller"]);
    user["listings"].remove(id);
    await userModel.findByIdAndUpdate(user["_id"], user);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.addListing = addListing;
exports.deleteListing = deleteListing;

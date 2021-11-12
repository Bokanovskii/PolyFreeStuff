const userSchema = require("./models/user");
const listingSchema = require("./models/listing");
const { getConnection } = require("./user-services");

async function filterAndOrder(listingModel, params) {
  // params is of the form: {'start': 1, 'end': 10, 'orderBy': 'creation_date', 'categories': []}
  var filteredListings;
  if ("categories" in params) {
    let categoryGroup = [];
    for (let i = 0; i < params["categories"].length; i++) {
      categoryGroup.push({ categories: params["categories"][i] });
    }
    filteredListings = await listingModel.find({ $and: categoryGroup });
  } else {
    filteredListings = await listingModel.find();
  }
  // Only set up to filter by name (a first) or default creation_date (newest first)
  if ("orderBy" in params && params["orderBy"] === "name") {
    filteredListings.sort((first, second) => {
      return first["name"].localeCompare(second["name"]);
    });
  } else {
    // always sort by creation_date (newest first) if no other key specified
    filteredListings.sort((first, second) => {
      if (second["creation_date"] < first["creation_date"]) return -1;
      else return 1;
    });
  }
  if (!("start" in params) || !("end" in params)) return filteredListings;
  return filteredListings.slice(params["start"], params["end"]);
}

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
exports.filterAndOrder = filterAndOrder;
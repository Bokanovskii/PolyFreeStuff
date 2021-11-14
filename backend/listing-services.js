const userSchema = require("./models/user");
const listingSchema = require("./models/listing");
const { getConnection } = require("./user-services");
const axios = require("axios");

async function postImageUpload(image){
  //ImgBB API key, should probably be in .env file.
  const key = '25100b3a4a3a900c836d0022e56febaf'
  try{
    console.log("Image: " + image);
    await axios.post("https://api.imgbb.com/1/upload", {
      key: key,
      image: image
    }).then(
        (response) => {
          if(response.status === 201){
            console.log("Success");
          }
        }
    )
  }
  catch(e){
    console.log("---Error");
    console.log(e);
  }

}

async function addListing(listing) {
  const userModel = getConnection().model("User", userSchema);
  const listingModel = getConnection().model("Listing", listingSchema);
  try {
    let image = listing["image"];
    console.log("Add listing image: "+image);
    await postImageUpload(image);
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

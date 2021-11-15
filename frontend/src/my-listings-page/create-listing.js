import axios from "axios";
import settings from "../settings";
import { useState } from "react";
import { categories } from "../categories";
import Catlist from "./category-checkboxes";

function CreateListing(props) {
  // const [listingErr, setListingErr] = useState(false);
  const [imageUpload, setImageUpload] = useState({
    file: require("../no-image-icon-15.png").default,
  });
  const [selectedCats, setSelectedCats] = useState(
    new Array(categories.length).fill(false)
  );

  async function createListing(
    name,
    description,
    seller,
    image,
    location,
    cats
  ) {
    await axios
      .post(settings.URLBase.concat("/listing"), {
        name: name,
        description: description,
        seller: seller,
        pickup_location: location,
        categories: cats,
        is_available: true,
        ...(image !== "" && { image: image }),
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("Successfully Posted");
          props.setValidCreateListing(true);
        } /*else {
          setListingErr(true);
        }*/
      })
      .catch((e) => alert(`${e}\nPlease fill out all required fields.`));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let name = e.target.name.value;
    let description = e.target.description.value;
    let seller = props.userData["_id"];
    let image = e.target.image.value;
    let location = e.target.location.value;
    let cats = categories
      .filter((cat, index) => selectedCats[index])
      .map((cat) => cat.value);
    await createListing(name, description, seller, image, location, cats);
  }

  const handleFileUpload = (event) => {
    try {
      setImageUpload({
        file: URL.createObjectURL(event.target.files[0]),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="create-listings">
      <h1>Create New Listing</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div id="seller-view-page" className="usr-page">
          <div id="seller-view-left">
            <label>
              Item name:
              <input type="text" name="name" placeholder="Item" />
            </label>
            <label>
              Item description:
              <textarea name="description" placeholder="Description"></textarea>
            </label>
            <label>
              Planned location of transaction:
              <input
                type="text"
                name="location"
                placeholder="On-campus location"
              />
            </label>
            <label>
              Categories:
              <Catlist
                selectedCats={selectedCats}
                setSelectedCats={setSelectedCats}
                categories={categories}
              />
            </label>
          </div>
          <div id="item-image-browse" className="file-area btn">
            <img id="item-img" alt="preview" src={imageUpload.file}></img>
            <div id="item-img-txt">
              <span className="material-icons">upload</span>
              <span>Click to upload image</span>
            </div>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <input type="submit" id="item-submit-input" />
        </div>
      </form>
    </div>
  );
}

export default CreateListing;

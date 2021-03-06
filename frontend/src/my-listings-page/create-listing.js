import axios from "axios";
import settings from "../settings";
import { useState } from "react";
import { categories } from "../categories";
import Catlist from "./category-checkboxes";

function CreateListing(props) {
  const [imageBase64, setImageBase64] = useState("");
  const [imageUpload, setImageUpload] = useState({
    file: require("../no-image-icon-15.png").default,
  });
  const [selectedCats, setSelectedCats] = useState(
    new Array(categories.length).fill(false)
  );

  function getBase64(file){

    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload= () => {
      let data = reader.result;
      let splitBase64 = data.split(",");
      let base64 = splitBase64[1];
      setImageBase64(base64);
    }
  }

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
          props.setValidCreateListing(true);
        }
      })
      .catch((e) => alert(`${e}\nPlease fill out all required fields.`));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let name = e.target.name.value;
    let description = e.target.description.value;
    let seller = props.userData["_id"];
    let image = imageBase64;
    let location = e.target.location.value;
    let cats = categories
      .filter((cat, index) => selectedCats[index])
      .map((cat) => cat.value);
    await createListing(name, description, seller, image, location, cats);
  }

  const handleFileUpload = (event) => {
    try {
      let file = event.target.files[0]
      setImageUpload({
        file: URL.createObjectURL(file),
      });
      getBase64(file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="create-listings" className="usr-page">
      <h1>Create New Listing</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div id="seller-view-page">
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

import axios from "axios";
import settings from "../settings";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { categories } from "../categories";
import Catlist from "./category-checkboxes";

function CreateListing(props) {
  const [listingErr, setListingErr] = useState(false);
  const [imageUpload, setImageUpload] = useState({
    file: require("../no-image-icon-15.png").default,
  });
  const [selectedCats, setSelectedCats] = useState(
    new Array(categories.length).fill(false)
  );
  let history = useHistory();

  async function createListing(
    name,
    description,
    seller /*, image, location, cats */
  ) {
    await axios
      .post(settings.URLBase.concat("/listing"), {
        name: name,
        description: description,
        seller: seller,
        // image: image,
        // location: location,
        // cats: cats,
        is_available: true,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("Successfully Posted");
          props.setValidCreateListing(true);
        } else {
          setListingErr(true);
        }
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let name = e.target.name.value;
    let description = e.target.description.value;
    let seller = props.userData["_id"];
    let image = e.target.image.value; // add to post request
    let location = e.target.location.value; // add to post request
    let cats = JSON.stringify(
      categories // add to post request
        .filter((cat, index) => selectedCats[index])
        .map((cat) => cat.value)
    );
    await createListing(name, description, seller /*, image, location, cats */);
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

  // return (
  //   <div id="create-listings">
  //     <form onSubmit={(e) => handleSubmit(e)}>
  //       <label>Product Name: </label>
  //       <input
  //         type={"text"}
  //         id={"listing-name"}
  //         name={"name"}
  //         placeholder="Used Couch!"
  //       />
  //       <label>Product Description: </label>
  //       <input
  //         type={"text"}
  //         id={"listing-description"}
  //         name={"description"}
  //         placeholder={"This is a used couch, here for free!!!"}
  //       />
  //       <label>Pickup Location: </label>
  //       <input
  //         type={"text"}
  //         id={"listing-location"}
  //         name={"location"}
  //         placeholder={"Yakitutu"}
  //       />
  //       <div>
  //         {() => {
  //           if (listingErr) {
  //             return <p>Listing Error</p>;
  //           }
  //         }}
  //       </div>
  //       <button type={"submit"} id={"listing-btn"}>
  //         Create Listing
  //       </button>
  //     </form>
  //   </div>
  // );

  return (
    <div id="create-listings">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div id="seller-view-page">
          <div id="seller-view-left">
            <label>Item name:</label>
            <input type="text" name="name" placeholder="Item" />
            <label>Item description:</label>
            <textarea name="description" placeholder="Description"></textarea>
            <label>Planned location of transaction:</label>
            <input
              type="text"
              name="location"
              placeholder="On-campus location"
            />
            <label>Categories:</label>
            <Catlist
              selectedCats={selectedCats}
              setSelectedCats={setSelectedCats}
              categories={categories}
            />
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
              onChange={
                (e) => handleFileUpload(e)
                /*(document.getElementById("item-img").src =
                  window.URL.createObjectURL(this.files[0]))*/
              }
            />
          </div>
          <input type="submit" id="item-submit-input" />
        </div>
      </form>
    </div>
  );
}

export default CreateListing;

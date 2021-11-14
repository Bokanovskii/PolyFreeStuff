import axios from "axios";
import settings from "../settings";
import {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { categories } from "../categories";
import Catlist from "./category-checkboxes";

function CreateListing(props) {
  const [listingErr, setListingErr] = useState(false);
  const [imageBase64, setImageBase64] = useState("")
  const [imageUpload, setImageUpload] = useState({
    file: require("../no-image-icon-15.png").default,
  });
  const [imgURL, setImgURL] = useState("");
  const [selectedCats, setSelectedCats] = useState(
    new Array(categories.length).fill(false)
  );
  let history = useHistory();

  async function createListing(
    name,
    description,
    seller,
    image //location, cats
  ) {
    //console.log(imageUpload);
    try{
      await axios
          .post(settings.URLBase.concat("/listing"), {
            name: name,
            description: description,
            seller: seller,
            image: image,
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
    catch (e) {
      alert(e)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("Image base 64: "+imageBase64)

    let name = e.target.name.value;
    let description = e.target.description.value;
    let seller = props.userData["_id"];
    let image = imageBase64;
    let location = e.target.location.value; // add to post request
    let cats = JSON.stringify(
      categories // add to post request
        .filter((cat, index) => selectedCats[index])
        .map((cat) => cat.value)
    );
    await createListing(name, description, seller, image/* location, cats */);
  }

  const handleFileUpload = (event) => {
    try {

      let file = event.target.files[0];
      getBase64(file)
      setImageUpload({
        file: URL.createObjectURL(file),
      });
    } catch (error) {
      console.log(error);
    }
  };

  function getBase64(file){

      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload= () => {
        let base64 = reader.result;
        let splitBase64 = base64.split(",");
        let base64WoSlash = splitBase64[1].slice(1);
        console.log(base64WoSlash)
        //console.log(splitBase64)
        //setImageBase64(base64WoSlash);
        setImageBase64("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      }
  }

  return (
    <div id="create-listings">
      <h1>Create New Listing</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div id="seller-view-page" className="usr-page">
          <div id="seller-view-left">
            <label>Item name:
              <input type="text" name="name" placeholder="Item" />
            </label>
            <label>Item description:
              <textarea name="description" placeholder="Description"></textarea>
            </label>
            <label>Planned location of transaction:
              <input
                type="text"
                name="location"
                placeholder="On-campus location"
              />
            </label>
            <label>Categories:
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

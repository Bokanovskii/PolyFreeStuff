import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import settings from "../settings";
import { categories } from "../categories";
import moment from "moment";

function SingleListing(props) {
  const location = useLocation();
  let listing_id = location.pathname.split("/").at(-1);

  function checkDefaultImage(image) {
    if (image === "https://www.freeiconspng.com/uploads/no-image-icon-15.png") {
      return image;
    } else {
      return "data:image/png;base64," + image;
    }
  }

  useEffect(() => {
    async function getListing(listingId) {
      await axios
        .get(settings.URLBase.concat("/listing/").concat(listingId))
        .then((response) => {
          let status = response.status;
          if (status === 201) {
            props.setListing(response.data.listingFromDb);
          }
        })
        .catch((error) => {
          window.alert(error.toString());
        });
    }

    async function getSeller() {
      await axios
        .get(settings.URLBase.concat("/users?id=").concat(props.listing.seller))
        .then((response) => {
          let status = response.status;
          if (status === 201) {
            props.setSeller(response.data.users_list[0]);
            //seller = response.data.users_list[0];
            //console.log(seller);
          }
        })
        .catch((error) => {
          window.alert(error.toString());
        });
    }
    getSeller();
    getListing(listing_id);
  }, [listing_id, props]);

  return (
    <div id="listing-page" className="usr-page">
      <h1>Listing</h1>
      {/* <label key={listing.name}>Name: {listing.name}</label> */}
      <center>
        <h2>{props.listing.name}</h2>
        <h3>{moment(props.listing.creation_date).format("LL")}</h3>
        <div id="listing-page-grid">
          <img src={checkDefaultImage(props.listing.image)} alt=""></img>
          <div id="listing-page-description">{props.listing.description}</div>
          <div id="listing-page-location">
            <b>Pickup Location:</b> <i>{props.listing.pickup_location}</i>
            <br />
            <b>Contact the Seller:</b>{" "}
            <i>
              {props.seller === undefined ? "Not listed." : props.seller.email}
            </i>
          </div>
          {/* <div id="listing-page-seller">
          </div> */}
          <div id="listing-page-cats">
            {Object.keys(props.listing).length === 0 ? (
              <div></div>
            ) : (
              props.listing.categories.map((catValue, index) => {
                return (
                  <span key={index}>
                    {categories.find((cat) => cat.value === catValue).text}
                  </span>
                );
              })
            )}
          </div>
        </div>
      </center>
    </div>
  );
}

export default SingleListing;

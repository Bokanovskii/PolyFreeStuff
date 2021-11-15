import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import settings from "../settings";
import { categories } from "../categories";
import moment from "moment";

function MyListingsListing(props) {
  const [listing, setListing] = useState({});

  const location = useLocation();
  let listing_id = location.pathname.split("/").at(-1);

  useEffect(() => {
    async function getListing(listingId) {
      await axios
        .get(settings.URLBase.concat("/listing/").concat(listingId))
        .then((response) => {
          let status = response.status;
          if (status === 201) {
            setListing(response.data.listingFromDb);
          }
        })
        .catch((error) => {
          window.alert(error.toString());
        });
    }
    console.log(listing_id);
    getListing(listing_id);
  }, [listing_id]);

  async function deleteListing(listingId) {
    await axios
      .delete(settings.URLBase.concat("/listing/").concat(listingId))
      .then((response) => {
        let status = response.status;
        if (status === 201) {
          console.log("Deleted: " + listingId);
          props.setSucDelete(true);
        }
      })
      .catch((error) => {
        window.alert(error.toString());
      });
  }

  async function handleClick(e, listingId) {
    e.preventDefault();
    await deleteListing(listingId);
    console.log("Clicked");
  }

  return (
    <div id="listing-page" className="usr-page">
      <h1>Listing</h1>
      {/* <label key={listing.name}>Name: {listing.name}</label> */}
      <center>
        <h2>{listing.name}</h2>
        <h3>{moment(listing.creation_date).format("LL")}</h3>
      </center>
      <div id="listing-page-grid">
        <img src={listing.image} alt=""></img>
        <div id="listing-page-description">{listing.description}</div>
        <div id="listing-page-location">
          Pickup Location: {listing.pickup_location}
        </div>
        <div id="listing-page-cats">
          {Object.keys(listing).length === 0 ? (
            <div></div>
          ) : (
            listing.categories.map((catValue, index) => {
              return (
                <span key={index}>
                  {categories.find((cat) => cat.value === catValue).text}
                </span>
              );
            })
          )}
        </div>
      </div>
      <button
        onClick={async (e) => {
          await handleClick(e, listing._id);
        }}
      >
        DELETE
      </button>
    </div>
  );
}

export default MyListingsListing;

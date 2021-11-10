import React, { useEffect, useState } from "react";
import CreateListing from "./create-listing";
import { Link } from "react-router-dom";
import axios from "axios";
import settings from "../settings";

function MyListings(props) {
  const [listings, setListings] = useState([]);

  let listingsIds;
  let listingsObjs = [];

  async function getUserListingIds(userId) {
    await axios
      .get(settings.URLBase.concat("/user/").concat(userId))
      .then((response) => {
        let status = response.status;
        if (status === 201) {
          listingsIds = response.data.listings;
          //console.log(listingsIds);
          //console.log("Listings Idss: "+ listingsIds);
        }
      })
      .catch((error) => {
        window.alert(error.toString());
      });
  }

  async function appendListing(listingId) {
    await axios
      .get(settings.URLBase.concat("/listing/").concat(listingId))
      .then((response) => {
        let status = response.status;
        if (status === 201) {
          //console.log(response.data.listing_from_db);
          listingsObjs.push(response.data.listing_from_db);
        }
      })
      .catch((error) => {
        window.alert(error.toString());
      });
  }

  async function populateListingObjs() {
    await getUserListingIds(props.userData._id);
    for (let i = 0; i < listingsIds.length; i++) {
      await appendListing(listingsIds[i]);
      //console.log("Listing Id: "+listingsIds[i]);
    }
    setListings(listingsObjs);
    //console.log("Listing Objects: "+listingsObjs);
  }

  async function deleteListing(listingId){
      await axios
          .delete(settings.URLBase.concat("/listing/").concat(listingId))
          .then((response) => {
              let status = response.status;
              if (status === 201) {
                  setListings(listings.filter(listing => listing._id === listingId))
              }
          })
          .catch((error) => {
              window.alert(error.toString());
          });
  }

  function handleClick(e, listingId){
      e.preventDefault();
      deleteListing(listingId)
      console.log("Clicked");
  }

  useEffect(() => {
    populateListingObjs();
    console.log("Listings: " + listings.length)
  }, []);

  return (
    <div id="my-listings-page" className="usr-page">
      <h1>My Listings</h1>
      <div>
        {(listings.length > 0)  ? listings.map((listing) => (
          <div>
            <label>Name: </label>
            <div>{listing.name}</div>
            <label>Description: </label>
            <div>{listing.description}</div>
            <label>Is Available: </label>
            <div>{listing.is_available.toString()}</div>
            <button onClick={(e) => {
                handleClick(e, listing._id);
            }}>DELETE</button>
            <br />
          </div>
        )) : (<div></div>)}
      </div>
      <Link to={"/create-listing"}>
        <button>Create New Listing</button>
      </Link>
    </div>
  );
}

export default MyListings;

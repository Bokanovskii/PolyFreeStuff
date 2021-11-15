import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import settings from "../settings";
import ListingGrid from "../listings/listing-grid";

function MyListings(props) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function getUserListings() {
      await axios
        .get(
          settings.URLBase.concat("/listings_from_user/").concat(
            `${props.userData._id}?getUser=${true}`
          )
        )
        .then((response) => {
          let status = response.status;
          if (status === 201) {
            setListings(response.data.listing_list);
          }
        })
        .catch((error) => {
          window.alert(error.toString());
        });
    }
    getUserListings();
  }, [props.userData._id]);

  return (
    <div id="my-listings-page" className="usr-page">
      <h1>My Listings</h1>
      <Link to={"/create-listing"}>
        <button id="create-listing-add">
          <span className="material-icons">add</span>
          Create New Listing
        </button>
      </Link>
      <ListingGrid items={listings} itemPath="/my-listings/listing/:itemID" />
    </div>
  );
}

export default MyListings;

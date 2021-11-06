import React, { useState } from "react";
import CreateListing from "./create-listing";
import { Link } from "react-router-dom";
import axios from "axios";
import settings from "../settings";

function MyListings(props) {
  const [listings, setListings] = useState([]);

  /*
    async function getUserListingIds(userId){
        await axios
            .get(settings.URLBase.concat("/users/").concat(userId))
            .then((response))
    }*/

  return (
    <div>
      <div id="my-listings-page">MY LISTINGS PAGE</div>
      <Link to={"/create-listing"}>Create New Listing</Link>
    </div>
  );
}

export default MyListings;

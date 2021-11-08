import React, { useState } from "react";
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
    <div id="my-listings-page" className="usr-page">
      <h1>My Listings</h1>
      <Link to={"/create-listing"}><button>Create New Listing</button></Link>
    </div>
  );
}

export default MyListings;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import settings from "../settings";
import ListingGrid from "../listings/listing-grid";

function MyListings(props) {
  const [listings, setListings] = useState([]);

    async function getUserListings() {
        await axios
            .get(settings.URLBase.concat("/listings_from_user/").concat(props.userData._id))
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

  useEffect(async () => {
      await getUserListings()
  }, []);

  return (
    <div id="my-listings-page" className="usr-page">
      <h1>My Listings</h1>
      <ListingGrid items={listings} itemPath="/my-listings/listing/:itemID" />
      <Link to={"/create-listing"}>
        <button>Create New Listing</button>
      </Link>
    </div>
  );
}

export default MyListings;

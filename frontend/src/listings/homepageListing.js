import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import settings from "../settings";

function HomePageListing() {
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

  return (
    <div>
      <p>Listing</p>
      <label key={listing.name}>Name: {listing.name}</label>
    </div>
  );
}

export default HomePageListing;

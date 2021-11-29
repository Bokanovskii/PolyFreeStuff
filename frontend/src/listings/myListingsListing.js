import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import settings from "../settings";
import { categories } from "../categories";
import moment from "moment";
import SingleListing from "./singleListing";

function MyListingsListing(props) {
  const [listing, setListing] = useState({});

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
      <div>
        <SingleListing
        setListing={setListing}
        listing={listing}
        />
        <button
            id="delete"
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

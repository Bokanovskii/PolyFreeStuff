import axios from "axios";
import React, { useState } from "react";
import settings from "../settings";
import SingleListing from "./singleListing";

function MyListingsListing(props) {
  const [listing, setListing] = useState({});
  const [seller, setSeller] = useState({});

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
        setSeller={setSeller}
        seller={seller}
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

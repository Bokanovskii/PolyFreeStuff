import React, { useState } from "react";
import SingleListing from "./singleListing";

function HomePageListing() {
  const [listing, setListing] = useState({});

  return (
    <div>
      <p>Listing</p>
        <SingleListing
        setListing={setListing}
        listing={listing}
        />
    </div>
  );
}

export default HomePageListing;

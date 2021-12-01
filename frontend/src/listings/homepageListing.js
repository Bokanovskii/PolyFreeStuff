import React, { useState } from "react";
import SingleListing from "./singleListing";

function HomePageListing() {
  const [listing, setListing] = useState({});
  const [seller, setSeller] = useState({});

  return (
    <div>
      <p>Listing</p>
      <SingleListing
        setListing={setListing}
        listing={listing}
        setSeller={setSeller}
        seller={seller}
      />
    </div>
  );
}

export default HomePageListing;

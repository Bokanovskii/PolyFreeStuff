import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import settings from "../settings";
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

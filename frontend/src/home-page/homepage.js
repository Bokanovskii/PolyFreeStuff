import React, { useEffect, useState } from "react";
import axios from "axios";
import settings from "../settings";
import ListingGrid from "../listings/listing-grid";
import {useHistory} from "react-router-dom";

function Homepage(props) {
  const [listings, setListings] = useState([]);
  const queryString = require("query-string");
  let history = useHistory();

  async function getAllListings(searchValue) {
      console.log("Calling: ".concat(`/listings?getUser=${true}&${searchValue?("search="+searchValue):("")}`))
    await axios
      .get(settings.URLBase.concat(`/listings?getUser=${true}&${searchValue?("search="+searchValue):("")}`))
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

  useEffect(() => {
      const parsed = queryString.parse(history.location.search)
    getAllListings(parsed.search);
  }, []);

  return (
    <div>
      <div id="homepage" className="usr-page">
        <h1>Homepage</h1>
        <ListingGrid
          items={listings}
          itemPath={"/homepage/listing/:itemID"}
          max="20"
        />
      </div>
    </div>
  );
}

export default Homepage;

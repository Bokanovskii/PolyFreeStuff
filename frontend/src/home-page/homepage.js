import React, { useEffect, useState } from "react";
import axios from "axios";
import settings from "../settings";
import ListingGrid from "../listings/listing-grid";

function Homepage(props) {
  const [listings, setListings] = useState([]);

  async function getAllListings() {
      console.log(props.searchValue)
      console.log("Calling: ".concat(`/listings?getUser=${true}${props.searchValue?("search="+props.searchValue):("")}`))
    await axios
      .get(settings.URLBase.concat(`/listings?getUser=${true}${props.searchValue?("search="+props.searchValue):("")}`))
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
    getAllListings();
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

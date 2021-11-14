import React, {useEffect, useState} from "react";
import axios from "axios";
import settings from "../settings";
import ListingGrid from "../listings/listing-grid";

function Homepage() {

  const [listings, setListings] = useState([]);

  async function getAllListings() {
    await axios
        .get(settings.URLBase.concat("/listings"))
        .then((response) => {
          let status = response.status;
          if (status === 201) {
            setListings(response.data.listing_list);
            //console.log("Response Data: "+ response.data.listing_list);
          }
        })
        .catch((error) => {
          window.alert(error.toString());
        });
  }

  useEffect(() => {
    getAllListings();
  }, []);

  /*
  return (<div>
      <div id="homepage">HOMEPAGE</div>
      <br/>

      <div>
          {(listings.length > 0)  ? listings.map((listing, index) => (
              <div>
                  <label>Name: </label>
                  <div key={listing.name.concat(index)}>{listing.name}</div>
                  <label>Description: </label>
                  <div key={listing.description.concat(index)}>{listing.description}</div>
                  <label>Is Available: </label>
                  <div key={listing.is_available.toString().concat(index)}>{listing.is_available.toString()}</div>
                  <br />
              </div>
          )) : (<div></div>)}
      </div>
  </div>);*/

    return (<div>
        <div id="homepage">HOMEPAGE</div>
        <br/>
        <ListingGrid items={listings} itemPath={"/item/:itemID"}/>
    </div>);

}


export default Homepage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import settings from "../settings";
import ListingGrid from "../listings/listing-grid";

function Homepage() {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const pageSize = 10;

  function prevPage() {
    if (page > 0) setPage(page - 1);
  }

  function nextPage() {
    if (page < numPages) setPage(page + 1);
  }

  useEffect(() => {
    async function getAllListings() {
      setNumPages(5);
      await axios
        .get(
          settings.URLBase.concat(
            `/listings?getUser=${true}&start=${page * pageSize}&end=${
              (page + 1) * pageSize
            }`
          )
        )
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
    getAllListings();
  }, [numPages, page]);

  return (
    <div>
      <div id="homepage" className="usr-page">
        <h1>Homepage</h1>
        <ListingGrid
          items={listings}
          itemPath={"/homepage/listing/:itemID"}
          max="20"
        />
        <div id="pagination">
          <button onClick={() => prevPage()}>
            <span className="material-icons">arrow_back_ios_new</span>Prev
          </button>
          <button onClick={() => nextPage()}>
            <span className="material-icons">arrow_forward_ios_new</span>Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import settings from "../settings";
import ListingGrid from "../listings/listing-grid";
import {useHistory} from "react-router-dom";
import {categories} from "../categories";

function Homepage(props) {
  const [listings, setListings] = useState([]);
  const queryString = require("query-string");
  let history = useHistory();

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
    function getSelectedCats(){
      const parsed = queryString.parse(history.location.search);
      let cats = [];
      let catValues=[];
      for(const query in parsed){
        if(query.includes("-cat")){
          cats.push(query);
        }
      }
      for(const cat in categories){
        if(cats.includes(categories[cat].name)){
          catValues.push(categories[cat].value);
        }
      }
      return catValues;
    }

    function assembleCatReq(catValues){
      let retStr = "";
      if(catValues.length > 0){
        for(const cat in catValues){
         retStr += `&categories[]=${catValues[cat]}`;
        }
      }
      return retStr;
    }

    function getOrderByName(){
      const parsed = queryString.parse(history.location.search);
      if(parsed.name){
        return true;
      }
    }

    async function getAllListings(searchValue, catValues, filterByName) {
      setNumPages(5);
      await axios
        .get(
          settings.URLBase.concat(
            `/listings?getUser=${true}&start=${page * pageSize}&end=${
              (page + 1) * pageSize
            }&${searchValue?("search="+searchValue):("")}${assembleCatReq(catValues)}${filterByName?("&orderBy=name"):("")}`
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
    const parsed = queryString.parse(history.location.search)
    getAllListings(parsed.search, getSelectedCats(), getOrderByName());
  }, [numPages, page, history.location.search, queryString]);

  return (
    <div>
      <div id="homepage" className="usr-page">
        <h1>Homepage</h1>
        <ListingGrid
          items={listings}
          itemPath={"/homepage/listing/:itemID"}
          max="20"
          filterByName={props.filterByName}
        />
        <div id="pagination">
          <button onClick={() => prevPage()} disabled={page <= 0}>
            <span className="material-icons">arrow_back_ios</span>
            Prev
          </button>
          <button onClick={() => nextPage()} disabled={page >= numPages}>
            Next
            <span className="material-icons">arrow_forward_ios</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

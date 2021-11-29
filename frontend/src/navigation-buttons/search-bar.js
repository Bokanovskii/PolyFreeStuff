import React, { useState } from "react";
import { categories } from "../categories";
import Catlist, { Catbox } from "../my-listings-page/category-checkboxes";

function SearchBar() {
  const [filterByName, setFilterByName] = useState(false);
  const [selectedCats, setSelectedCats] = useState(
    new Array(categories.length).fill(false)
  );
  return (
    <div id="search-area">
      <div id="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div id="search-drop" tabIndex="0">
        <label tabIndex="0">
          Filters:&nbsp;
          <div id="cat-select">
            <Catbox
              name={`name`}
              text={`Name`}
              value={`name`}
              id={`filter-name`}
              eval={() => {
                return filterByName;
              }}
              handleOnChange={() => {
                setFilterByName(!filterByName);
              }}
            />
            <Catbox
              name={`date`}
              text={`Date`}
              value={`date`}
              id={`filter-date`}
              eval={() => {
                return !filterByName;
              }}
              handleOnChange={() => {
                setFilterByName(!filterByName);
              }}
            />
          </div>
        </label>
        <label tabIndex="0">
          Categories:&nbsp;
          <Catlist
            selectedCats={selectedCats}
            setSelectedCats={setSelectedCats}
            categories={categories}
          />
        </label>
        <br />
        <input type="submit" value="Search" />
      </div>
    </div>
  );
}

export default SearchBar;

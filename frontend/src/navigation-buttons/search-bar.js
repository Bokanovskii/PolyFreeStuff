import React from "react";
import { categories } from "../categories";
import Catbox from "../my-listings-page/category-checkboxes";

function SearchBar() {
  return (
    <div id="search-area">
      <div id="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div id="search-drop" tabIndex="0">
        <label tabIndex="0">
          Filters:&nbsp;
          {/* need to use Catbox instead of manual HTML for these 2 .checkbox-container labels */}
          <label className="checkbox-container" tabIndex="0">
            <input
              type="checkbox"
              name="name"
              value="name"
              checked={false}
              onChange={() => {
                return;
              }}
            />
            <div className="checkbox" tabIndex="0">
              Name
            </div>
          </label>
          <label className="checkbox-container" tabIndex="0">
            <input
              type="checkbox"
              name="date"
              value="date"
              checked={false}
              onChange={() => {
                return;
              }}
            />
            <div className="checkbox" tabIndex="0">
              Date
            </div>
          </label>
        </label>
        <label tabIndex="0">
          Categories:&nbsp;
          {/*categories.map(({ name, value, text }, index) => {
            return (
              <Catbox
                key={index}
                id={index}
                name={name}
                value={value}
                text={text}
                selectedCats={props.selectedCats}
                handleOnChange={handleOnChange}
              />
            );
          })*/}
        </label>
      </div>
    </div>
  );
}

export default SearchBar;

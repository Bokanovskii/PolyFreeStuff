import React, { useEffect, useState } from "react";
import CreateListing from "./create-listing";
import { Link } from "react-router-dom";
import axios from "axios";
import settings from "../settings";
import { categories } from "../categories";

/*
 ** props: {itemName, itemUser, itemImageURL, itemCats, itemID}
 */
function GridItem(props) {
  return (
    <a href={`/my-listings/item/${props.itemID}`} className="listing-grid-item">
      <img src={props.itemImageURL} alt="" />
      <span className="listing-grid-item-name">{props.itemName}</span>
      <span className="listing-grid-item-user">{props.itemUser}</span>
      <div className="listing-grid-item-cats">
        {props.itemCats.map((catValue, index) => {
          return (
            <span key={index}>
              {categories.find((cat) => cat.value === catValue).text}
            </span>
          );
        })}
      </div>
    </a>
  );
}

function ListingGrid(props) {
  return (
    <div id="listing-grid" className="usr-page">
      {props.items.map(
        ({ itemName, itemUser, itemImageURL, itemCats, itemID }, index) => {
          return (
            <GridItem
              key={index}
              itemName={itemName}
              itemUser={itemUser}
              itemImageURL={itemImageURL}
              itemCats={itemCats}
              itemID={itemID}
            />
          );
        }
      )}
    </div>
  );
}

export default ListingGrid;

import React from "react";
import { categories } from "../categories";

/*
 ** props: {itemName, itemUser, itemDate, itemImageURL, itemCats, itemID, itemPath}
 ** itemPath example:         '/my-listings/item/:itemID' (':itemID' is required in the string)
 ** full joined path example: '/my-listings/item/ae0dfoih87jkb6erh9' (:itemID is replaced with the actual id)
 */
function GridItem(props) {
  return (
    <a
      href={props.itemPath.replace(":itemID", props.itemID)}
      className="listing-grid-item"
    >
      <span className="listing-grid-item-name">{props.itemName}</span>
      <img src={props.itemImageURL} alt="" />
      <span className="listing-grid-item-user">{props.itemUser}</span>
      <span className="listing-grid-item-date">{props.itemDate}</span>
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
        ({ name, image, seller, creation_date, categories, _id }, index) => {
          return (
            <GridItem
              key={index}
              itemName={name}
              itemUser={seller}
              itemDate={creation_date}
              itemImageURL={image}
              itemCats={categories}
              itemID={_id}
              itemPath={props.itemPath}
            />
          );
        }
      )}
    </div>
  );
}

export default ListingGrid;

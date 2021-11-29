import React from "react";
import { categories } from "../categories";
import moment from "moment";

/*
 ** props: {itemName, itemUser, itemDate, itemImageURL, itemCats, itemID, itemPath}
 ** itemPath example:         '/my-listings/item/:itemID' (':itemID' is required in the string)
 ** full joined path example: '/my-listings/item/ae0dfoih87jkb6erh9' (:itemID is replaced with the actual id)
 */

function GridItem(props) {
  function checkDefaultImage(image) {
    if (image === "https://www.freeiconspng.com/uploads/no-image-icon-15.png") {
      return image;
    } else {
      return "data:image/png;base64," + image;
    }
  }

  return (
    <a
      href={props.itemPath.replace(":itemID", props.itemID)}
      className="listing-grid-item"
    >
      <span className="listing-grid-item-name">{props.itemName}</span>
      <span className="listing-grid-item-date">
        {moment(props.itemDate).format("LL")}
      </span>
      <img src={checkDefaultImage(props.itemImageURL)} alt="" />
      <div className="listing-grid-item-cats">
        {props.itemCats.map((catValue, index) => {
          return (
            <span key={index}>
              {categories.find((cat) => cat.value === catValue).text}
            </span>
          );
        })}
      </div>
      <span className="listing-grid-item-user">
        <img
          className="listing-grid-user-icon"
          src={`https://avatars.dicebear.com/api/initials/${props.itemUser}.svg`}
          alt="avatar"
        />
        {props.itemUser}
      </span>
    </a>
  );
}

function ListingGrid(props) {
  return (
    <div>
      <div id="listing-grid">
        {props.items.map(
          ({ name, image, seller, creation_date, categories, _id }, index) => {
            return (
              <GridItem
                key={index}
                itemName={name}
                itemUser={seller.name}
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
    </div>
  );
}

export default ListingGrid;

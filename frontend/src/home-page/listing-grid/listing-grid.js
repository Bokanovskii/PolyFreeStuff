import React from "react";
import Listing from "./buyer-listing";

var width = 5;

function Grid(props) {
  return (
    <table id="grid-table">
      {[...Array(width)].map((value, index) => (
        <Grid_tr tr_id={index} listings={props.listings} />
      ))}
      <Grid_tr />
    </table>
  );
}

function Grid_tr(props) {
  return (
    <tr>
      {[...Array(props.num_td)].map((value, index) => (
        <Listing listing={props.listings[props.tr_id * width + index]} />
      ))}
    </tr>
  );
}

export default Grid;

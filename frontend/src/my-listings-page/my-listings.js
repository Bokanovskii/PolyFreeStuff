import React from 'react';
import CreateListing from "./create-listing";
import {Link} from "react-router-dom";

function MyListings() {
    return (
        <div>
            <div id="my-listings-page">MY LISTINGS PAGE</div>
            <Link to={"/create-listing"}>Create New Listing</Link>
        </div>
    );
}

export default MyListings;
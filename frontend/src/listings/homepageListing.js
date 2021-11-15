import axios from 'axios';
import React, {useEffect, useState} from "react";
import {Redirect, useHistory, useLocation} from "react-router-dom";
import settings from "../settings";

function HomePageListing(){
    const [listing, setListing] = useState({})

    const location = useLocation();
    let listing_id = location.pathname.split("/").at(-1);

    useEffect(async () => {
        console.log(listing_id)
        await getListing(listing_id);
    }, [])

    async function getListing(listingId){
        await axios
            .get(settings.URLBase.concat("/listing/").concat(listingId))
            .then((response) => {
                let status = response.status;
                if(status === 201){
                    setListing(response.data.listingFromDb);
                }
            })
            .catch((error) => {
                window.alert(error.toString());
            })
    }

    return(
        <div>
            <p>Listing</p>
            <label key={listing.name}>Name: {listing.name}</label>
        </div>
    )
}

export default HomePageListing;
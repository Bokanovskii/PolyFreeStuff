import axios from 'axios';
import React, {useEffect, useState} from "react";
import {Redirect, useHistory, useLocation} from "react-router-dom";
import settings from "../settings";

function MyListingsListing(props){
    const [listing, setListing] = useState({})

    const history = useHistory();

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

    async function deleteListing(listingId) {
        await axios
            .delete(settings.URLBase.concat("/listing/").concat(listingId))
            .then((response) => {
                let status = response.status;
                if (status === 201) {
                    console.log("Deleted: "+listingId);
                    props.setSucDelete(true);
                }
            })
            .catch((error) => {
                window.alert(error.toString());
            });
    }

    async function handleClick(e, listingId) {
        e.preventDefault();
        await deleteListing(listingId);
        console.log("Clicked");
    }

    return(
        <div>
            <p>Listing</p>
            <label key={listing.name}>Name: {listing.name}</label>
            <br/>
            <button onClick={async (e) => {
                await handleClick(e, listing._id)
            }}>DELETE</button>
        </div>
    )
}

export default MyListingsListing;
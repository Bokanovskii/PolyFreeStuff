import axios from "axios";
import settings from "../settings";
import {useState} from "react";
import {useHistory} from "react-router-dom";

function CreateListing(props) {

    const [listingErr, setListingErr] = useState(false);
    let history = useHistory();

    async function createListing(name, description, seller){
        await axios
            .post(settings.URLBase.concat("/listing"), {
                "name": name,
                "description": description,
                "seller": seller,
                "is_available": true
            })
            .then((response) => {
                if(response.status === 201){
                    history.push("/my-listings")
                } else {
                    setListingErr(true);
                }
            });
    }

    async function handleSubmit(e){
        e.preventDefault();
        let name = e.target.name.value;
        let description = e.target.description.value;
        let seller = props.userData['_id'];
        await createListing(name, description, seller);

    }

    return(
        <div id="create-listings">
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Product Name: </label>
                <input
                    type={"text"}
                    id={"listing-name"}
                    name={"name"}
                    placeholder="Used Couch!"
                />
                <label>Product Description: </label>
                <input
                    type={"text"}
                    id={"listing-description"}
                    name={"description"}
                    placeholder={"This is a used couch, here for free!!!"}
                />
                <label>Pickup Location: </label>
                <input
                    type={"text"}
                    id={"listing-location"}
                    name={"location"}
                    placeholder={"Yakitutu"}
                />
                <div>{() => {if (listingErr){return(<p>Listing Error</p>)}}}</div>
                <button type={"submit"} id={"listing-btn"}>
                    Create Listing
                </button>
            </form>
        </div>
    )
}

export default CreateListing;
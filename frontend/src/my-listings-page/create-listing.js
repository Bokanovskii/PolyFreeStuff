import axios from "axios";

function CreateListing() {

    function createListing(){
    }

    function handleSubmit(e){
        e.preventDefault();

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
                <button type={"submit"} id={"listing-btn"}>
                    Create Listing
                </button>
            </form>
        </div>
    )
}

export default CreateListing;
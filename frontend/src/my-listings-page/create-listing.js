function CreateListings() {

    function handleSubmit(e){

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
                <button type={"submit"} id={"listing-btn"}>
                    Create Listing
                </button>
            </form>
        </div>
    )
}

export default CreateListings;
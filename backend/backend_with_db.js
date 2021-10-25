const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const userModel = require("./models/user");
const listingModel = require('./models/listing');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

mongoose.connect(
    'mongodb://localhost:27017/free_stuff',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).catch(error => console.log(error));

app.get('/', async (req, res) => {
    //res.send('Hello World!');
    const users_from_db = await userModel.find();
    res.send({users_list: users_from_db});
    
});

app.post('/test_add_user', async (req, res) => {
    const user = req.body;
    if (await add_user(user))
        res.status(201).send(user)
    else
        res.status(500).send(user)
});

app.post('/test_add_listing', async (req, res) => {
    const listing = req.body;
    // General format:
    // let listing = {'name': 'listing #', 'description': 'haha', 'Seller': user['_id'], 'is_available': true, 'creation_date': Date.now()}
    if (await add_listing(listing))
        res.status(201).send(listing)
    else
        res.status(500).send(listing)
});

async function add_user(user){
    try{
        const userToAdd = new userModel(user);
        let added_user = await userToAdd.save();
        user['_id'] = added_user._id;
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }   
}

async function add_listing(listing){
    try{
        // add listing to the database
        const ListingToAdd = new listingModel(listing);
        let added_listing = await ListingToAdd.save();
        listing['_id'] = added_listing._id;
        // Update the user with the listing
        const user = await userMode.findById(listing['Seller'])
        user['Listings'] += added_listing._id
        await userModel.findByIdAndUpdate(user['_id'], user);
        return true;
    }catch(error) {
        console.log(error);
        return false;
    }   
}
 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
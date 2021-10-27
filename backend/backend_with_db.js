const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const userModel = require("./models/user");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

mongoose.connect(
    'mongodb+srv://polyfreestuff:csc307@cluster0.odqfk.mongodb.net/Cluster0?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ).catch(error => console.log(error));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

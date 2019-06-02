const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const user = require('./routes/User');
require('dotenv').config();
const path = require("path")

const app = express();

app.use(express.static(path.join(__dirname, "client", "build")));

let port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on PORT ${port}`));

mongoose.connect(`mongodb+srv://User:UserPassword@cryptousers-xcwxm.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser:true})
    .then(()=> console.log("Connected to MongoDB Atlas!"))
    .catch((err)=> console.log("Error", err))

app.use(helmet());
app.use(express.json());

app.use('/user', user);
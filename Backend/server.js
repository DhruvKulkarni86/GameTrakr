const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const dbURL = process.env.dbURL;

var options = {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbURL, options, (err) => {
    if (err) console.log(err);
});

mongoose.connection.on('connected', () => {
    console.log('connected');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: false} ));

app.use('/', require('./routes/route1'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`));
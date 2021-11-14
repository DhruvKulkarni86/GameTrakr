const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        fname: String,
        lname: String,
        password: String,
        email: String,
        wishlist: [{slug: String, gameID: Number, steamID: Number}]
    }
,{collection : 'UserInformation'});

const User = mongoose.model("UserInformation", userSchema);

module.exports = User;
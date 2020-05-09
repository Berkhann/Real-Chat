const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId:{
        type:String,
        unique:true
    },
    name:String,
    surName,
    profilePhotoUrl:String
});

module.exports = mongoose.Schem('users',userSchema);
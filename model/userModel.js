const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    Username : {type:String, required:true},
    Avatar : {type:String, required:true},
    Email : {type:String, required:true},
    Password : {type:String, required:true},

})

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel
const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({

    username : {type:String, required:true},
    title : {type:String, required:true},
    content : {type:String, required:true},
    category : {type:String, required:true},
    date : {type:Date, default: Date.now},
    likes : {type:Number, required:true},
    comments : [{username:{type:String}, content:{type:String}}],
    userId : {type:String, required:true}

})

const BlogModel = mongoose.model("blog", BlogSchema)

module.exports = BlogModel
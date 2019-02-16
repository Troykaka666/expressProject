var mongoose = require("mongoose");
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    //create a comment attribute
    // create a reference to retrive date from the comment base on the ID
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
})

module.exports = mongoose.model("Campground", campgroundSchema);
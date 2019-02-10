var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
    
//connection to mongoose db
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//     name: "Georgia State University",
//     image: "/images/gsulogo.png",
//     description: "GSU" 
//     },
//     function(err, campground) {
//         if(err){
//             console.log(err);
//         }else{
//             console.log("New campgrounds: ");
//             console.log(campground);
//         }
// });


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
//tell express to search all the files in public folder
app.use(express.static("public"));


app.get("/", function(req, res){
    //open the ejs file with the name "landing"
    res.render("landing");
});


// camgrounds default array
// var campgrounds = [
//     {name: "Georgia State University", image: "/images/gsulogo.png"},
//     {name: "Kennesaw State University", image: "/images/New-KSU-logo.jpg"},
//     {name: "University of Georgia", image: "/images/ugalogo.jpg"}
// ]


app.get("/campgrounds", function(req, res){
    //open campgrounds page and pass the variable campgrounds
    // res.render("campgrounds", {campgrounds: campgrounds});
    
    //Get all campgrounds from DB   
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else{  
            //pssing result that from the DB to campgrounds page
            res.render("index", {campgrounds: allcampgrounds})
        }
    })
});

//taking post request where form action refers to campgrounds
app.post("/campgrounds", function(req, res){
    //get data from user and add it to campground around
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description: desc};
    // campgrounds.push(newCampground);

    //create a new campground and save it to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //refreash and go the the referred page
            res.redirect("/campgrounds");     
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
     //find the campground with specific ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           res.render("show", {campground: foundCampground});
       }
    });
});














app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Server is listening!"); 
});


var express = require("express"),
app = express(),
bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
//tell express to search all the files in public folder
app.use(express.static("public"));


app.get("/", function(req, res){
    //open the ejs file with the name "landing"
    res.render("landing");
});


//camgrounds default array
var campgrounds = [
    {name: "Georgia State University", image: "/images/gsulogo.png"},
    {name: "Kennesaw State University", image: "/images/New-KSU-logo.jpg"},
    {name: "University of Georgia", image: "/images/ugalogo.jpg"}
]

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

//taking post request where form action refers to campgrounds
app.post("/campgrounds", function(req, res){
    //get data from user and add it to campground around
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);

    //refreash and go the the referred page
    res.redirect("/campgrounds");
});
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Server is listening!"); 
});


var express = require("express"),
    router =express.Router(),
    Campground = require("../models/campground");


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

router.get("/", function(req, res){
    //open campgrounds page and pass the variable campgrounds
    // res.render("campgrounds", {campgrounds: campgrounds});
    
    //Get all campgrounds from DB   
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else{  
            //pssing result that from the DB to campgrounds page
            res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
        }
    })
});

//taking post request where form action refers to campgrounds
router.post("/", isLoggedIn, function(req, res){
    //get data from user and add it to campground around
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    // campgrounds.push(newCampground);
var newCampground = {name: name, image: image, description: desc, author:author}
    //create a new campground and save it to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //refreash and go the the referred page
            res.redirect("campgrounds/");     
        }
    });
});

router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});


// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
     //find the campground with specific ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           res.render("campgrounds/show", {campground: foundCampground});
       }
    }
    );
});

//EDIT CAMPGROUND ROUTE

router.get("/:id/edit", checkCampgroundownership, function(req, res) {
    //is userlogged in?
           Campground.findById(req.params.id, function(err, foundCampground){
                res.render("campgrounds/edit", {campground: foundCampground});
          });
});


//UPDATE CAMPGROUND ROUTE
router.put("/:id", checkCampgroundownership, function(req, res){
    //find and update the correct campground
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    } );
    //redirect to the showpage
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", checkCampgroundownership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds");
       }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundownership(req, res, next){
    if(req.isAuthenticated()){
       Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("back");
        }else{
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            }else{
                res.redirect("back");
            }
        }
    });
    }else{
        res.redirect("back");
    }
}

module.exports = router;
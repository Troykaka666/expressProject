
 
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Georgia State University", 
        image: "/images/gsulogo.png",
        description: "Purchase your own mid range quality phone which is a true value and then enjoy a lower monthly plan of your choice! I am on a yearly rate with MINT Mobile for next to nothing and everything is running smooth! I am so happy with this HONOR 8X and I upgraded from an already super phone the HUAWEI MATE SE so I am definitely sold on this brand's quality and overall value for your money! This phone is super responsive and will not let you down when it comes to speed and overall performance from the KIRIN 710 Chipset. I urge people who enjoy a larger screen or a Phablet as I call them to go for this phone hands down! Great 6.5 inch screen will blow you away! Huawei and other Chinese companies are really giving the consumer very much to ponder when it comes to bang for your buck! I needed a Dual Sim phone so this one is just crazy! 2 Sims and and 400 GB expansion support!! I was not paid to write this review I just know this phone is hands down the best phone under $300.",
        author:{
            id : "5c6ccf55a8ac39112e7aa4bc",
            username: "Troy"
        }
    },
    {
        name: "Kennesaw State University", 
        image: "/images/New-KSU-logo.jpg", 
        description: "KSU",
        author:{
            id : "5c6ccf55a8ac39112e7aa4bc",
            username: "Troy"
        }
    },
    {
             name: "University of Georgia", 
        image: "/images/ugalogo.jpg", 
        description: "UGA",
        author:{
            id : "5c6ccf55a8ac39112e7aa4bc",
            username: "Troy"
        }
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.deleteMany({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.deleteMany({}, function(err) {
            if (err){
                console.log(err);
            }
            console.log("removed comments!");
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author:{
                                    id : "588c2e092403d111454fff76",
                                    username: "Jack"
                                }
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        })
    }); 
    //add a few comments
}
 
module.exports = seedDB;
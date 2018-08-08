//thsi pg is used to direct the user whenever they click on a link, the router will
//understand based on the info in this file what pg to deliver
var path = require("path");

//using module exports to bring the data from here into other files
//based on user url, i want to sent them to different pgs, ie. the survey
module.exports = function (app) {

    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });


    //use .use for home pg, want users sent to home pg, if they are usiing app _ havent already defined ur/
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    });
   
}    
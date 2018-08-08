//script for express from: https://www.npmjs.com/package/express and https://www.npmjs.com/package/body-parser
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//create var called PORT, this PORT will take whatever port is defined by the deplyoment site like Heroku or 8080 so
//this will work on our localhost + we wont have to reconfig whenever we deply it live
var PORT = process.env.PORT || 8085
 
// create application/json parser
//var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
 
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

//want to require api routes first because thats where we're pulling our data to display inside our html pages
require("./app/routing/apiRoutes.js")(app);
//incl html routes in this server file + the app we are passing into specific function we want to use Express
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT : " + PORT);
})
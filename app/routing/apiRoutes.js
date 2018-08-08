var friends = require('../data/friends.js');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        console.log(req);
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {

        //create an object that has name+photo, + a property called friendDifference
        //friendDifference used to track difff btw their answers
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        //we take result of the users survey POST + parse it
        var userData = req.body;
        console.log(userData);
        var userScores = userData.scores;

        //will calculate the diff btw the user's scores + scores of each user in db
        var totalDifference = 0;

        //loop thr all the friend possibilities in the db, nested loop
        for (var i = 0; i < friends.length; i++) {

            console.log(friends[i].name);
            totalDifference = 0;

            //loop thr all the scores of each friend
            for (var j = 0; j < friends[i].scores[j]; j++) {

                //cal the diff btw the scores+sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                //if the sum of diff < then the diff of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    //reset the bestMatch to be the new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

    //finally save the user's data to the db, has to 2 happen after the check so
    // dont return the user as the users best friend
    friends.push(userData);

    //return json w/the user's bestMatch wh/will be used by the html
    res.json(bestMatch);
    });
    
}
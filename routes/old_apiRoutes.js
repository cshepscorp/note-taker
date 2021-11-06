const router = require('express').Router();

const fs = require('fs');

//const { getAndRenderNotes, getNotes } = require('../public/assets/js/index');
//const path = require('path');

// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.
// route that the front-end can request data from
/* the get() method requires two arguments. 
1. a string that describes the route the client will have to fetch from. 
2. a callback function that will execute every time that route is accessed with a GET request. */

router.get('/notes', (req, res) => {
    //console.log(notes);
    fs.readFile("./db/db.json", (err, data) => {
        let savedNotes = JSON.parse(data);
        res.json(savedNotes);
        savedNotesString = JSON.stringify(savedNotes);
        console.log(savedNotesString + 'note was parsed in get method');
    });
  });

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
// this is just another method of the app object that allows us to create routes
// POST requests differ from GET requests in that they represent the action of a client requesting the server to accept data rather than vice versa
router.post('api/notes', (req, res) => { // used to be app.post
    // With POST requests, we can package up data, typically as an object, and send it to the server
    // req.body property is where we can access that data on the server side and do something with it
    // req.body is where our incoming content will be
    let existingNotes = (fs.readFileSync("./db/db.json", "utf-8"));
    let newNote = req.body;
    existingNotes.push(newNote);
    // fs.readFile('./db/db.json', (err, data) => {
    //     savedNotes = JSON.parse(data);
    //     fs.writeFile('./db/db.json', JSON.stringify(savedNotes), err => {
    //         if (err) {
    //             return console.log(err);
    //         }
    //         console.log('something was successful in post method');
    //     });
    // });
    //res.json(existingNotes); 
    console.log(' is notes file updated in post method');
});


module.exports = router;
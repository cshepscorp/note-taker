const router = require('express').Router();
const fs = require('fs');

//const { getAndRenderNotes, getNotes } = require('../public/assets/js/index');
// const path = require('path');

// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.
// route that the front-end can request data from
/* the get() method requires two arguments. 
1. a string that describes the route the client will have to fetch from. 
2. a callback function that will execute every time that route is accessed with a GET request. */

router.get('/api/notes', (req, res) => {
    //console.log(notes);
    fs.readFile("./db/db.json", (err, data) => {
        let savedNotes = JSON.parse(data);
        res.json(savedNotes);
        savedNotesString = JSON.stringify(savedNotes);
        console.log(savedNotesString + 'note was parsed in get method');
    });
  });
  
  /* POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
  */
  router.post('/api/notes', (req, res) => { // used to be app.post
    // With POST requests, we can package up data, typically as an object, and send it to the server
    // req.body property is where we can access that data on the server side and do something with it
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
      let newNote = req.body;
      let uniqueID = (savedNotes.length).toString();
      newNote.id = uniqueID;
      savedNotes.push(newNote);
  
      fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
      console.log("Note saved to db.json. Content: ", newNote);
      res.json(savedNotes);
  });
  


module.exports = router;
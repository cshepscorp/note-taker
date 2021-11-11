const router = require('express').Router();
const fs = require('fs');
// generate unique id for notes
const { v4 : uuidv4 } = require('uuid');

// GET /api/notes should read the db.json file and .
// route that the front-end can request data from
router.get('/notes', (req, res) => {
    // read the db.json file
    fs.readFile("./db/db.json", (err, data) => {
        let savedNotes = JSON.parse(data);
        // return all saved notes as JSON
        res.json(savedNotes);
        // a string that describes the route the client will have to fetch from. 
        savedNotesString = JSON.stringify(savedNotes);
        // console.log(savedNotesString + 'note was parsed in GET method');
    });
});

// With POST requests, we can package up data, typically as an object, and send it to the server
router.post('/notes', (req, res) => {
    
      // read all notes from the db.json file
      let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
      // req.body property is where we can access that data on the server side and do something with it
      let newNote = req.body; // create new note by pulling in new data via req.body
      let uniqueID = uuidv4(); // automatically generate new unique id
      newNote.id = uniqueID; // add that unique id to the record of the note
      savedNotes.push(newNote); // add new note to list of notes
      
      fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
      // console.log("Note saved to db.json. Content: ", newNote); // is this working?
      // return the new note to the client
      res.json(savedNotes);
});

/* DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.*/
router.delete('/notes/:id', (req, res) => {
  // read all notes from the db.json file
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  // save new array that's used savedNotes and filtered out the note with the unique id we want to delete
  let newSavedNotes = savedNotes.filter(note => note.id !== req.params.id );
  // re-write the json file to update db
  fs.writeFileSync("./db/db.json", JSON.stringify(newSavedNotes));
  // send results back to browser
  res.json(newSavedNotes);
  // console.log('removed note with the id of: ' + req.params.id); // is this working?
});

module.exports = router;
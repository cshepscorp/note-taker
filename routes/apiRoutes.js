const router = require('express').Router();
const fs = require('fs');

//const { getAndRenderNotes, getNotes } = require('../public/assets/js/index');
// const path = require('path');

// GET /api/notes should read the db.json file and return all saved notes as JSON.
// route that the front-end can request data from
/* the get() method requires two arguments. 
1. a string that describes the route the client will have to fetch from. 
2. a callback function that will execute every time that route is accessed with a GET request. */

router.get('/notes', (req, res) => {

    fs.readFile("./db/db.json", (err, data) => {
        let savedNotes = JSON.parse(data);
        res.json(savedNotes);
        savedNotesString = JSON.stringify(savedNotes);
        console.log(savedNotesString + 'note was parsed in GET method');
    });
});
  
/* POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
*/
router.post('/notes', (req, res) => { // used to be app.post
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
// delete a note
// const deleteNote = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
/* DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.*/
router.delete('/notes/:id', (req, res) => {
  // read all notes from the db.json file
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  //let noteToDelete = req.body.id;
  let newSavedNotes = savedNotes.filter(note => note.id !== req.params.id );
  fs.writeFileSync("./db/db.json", JSON.stringify(newSavedNotes));
  res.json(newSavedNotes);
  console.log('removed note with the id of: ' + req.params.id)
});


module.exports = router;
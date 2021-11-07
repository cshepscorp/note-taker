// the function of this file is to start the server 💡

//const fs = require('fs');
//const path = require('path'); // path provides utilities for working with file and directory paths
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express(); // instantiate the server
const fs = require('fs');
// generates unique user ID
// const ShortUniqueId = require('short-unique-id');
// const uid = new ShortUniqueId();
// const { notes } = require('./db/db.json');
// const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

/* app.use() method. This is a method executed by our Express.js server that mounts a function to the server that our requests will pass through before getting to the intended endpoint. The functions we can mount to our server are referred to as middleware. */
/* In order for our server to accept incoming data the way we need it to, we need to tell our Express.js app to intercept our POST request before it gets to the callback function. At that point, the data will be run through a couple of functions to take the raw data transferred over HTTP and convert it to a JSON object. */
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
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
app.post('/api/notes', (req, res) => { // used to be app.post
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

// Any time a client navigates to <ourhost>/api, the app will use the router we set up in apiRoutes. If / is the endpoint, then the router will serve back our HTML routes.
//app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

/*
Now we just need to use one method to make our server listen. We're going to chain the listen() method onto our server to do it
*/
app.listen(PORT, () => { // PORT value matches up with const PORT we set at start of file determined by Heroku
    console.log(`API server now on port ${PORT}!`);
  });
const fs = require("fs");
const path = require("path");

// this function accepts the POST route's req.body value and the array we want to add the data to
function createNewNote(body, notesArray) {
    // console.log(body);
    // when we POST a new animal, we'll add it to the imported animals array from the animals.json file
    const note = body;
    // We'll have to not only use .push() to save the new data in this local server.js copy of our animal data (referenced in const animal required above), but we'll also have to import and use the fs library to write that data to animals.json.
    notesArray.push(note);

    // fs.writeFileSync() method is the synchronous version of fs.writeFile() and doesn't require a callback function;
    // we use path.join() to join the value of __dirname, which represents the directory of the file we execute the code in, with the path to the animals.json file
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'), // we are one directory below data folder
        // The null argument means we don't want to edit any of our existing data
        // 2 indicates we want to create white space between our values to make it more readable
        JSON.stringify({ note: notesArray }, null, 2) 
        
    );
    
    // return finished code to post route for response
    return note;
}

  // we have to export these now for use elsewhere
  module.exports = {
    createNewNote,
  };
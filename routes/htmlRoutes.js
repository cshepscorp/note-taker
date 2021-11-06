const router = require('express').Router();
const path = require('path');

// The following HTML routes should be created:

// GET /notes should return the notes.html file.
// a route that has the term api in it will deal in transference of JSON data,
// a more normal-looking endpoint such as /animals should serve an HTML page
router.get('/notes', (req, res) => { // used to be app.get
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/', (req, res) => { 
    // we use sendFile when sending an HTML page to browser
    // __dirname, which represents the directory of the file we execute the code in '/'
    // with the path of where to find the index.html file
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// GET * should return the index.html file.
// in case a user requests a non-existent path
// * is a wildcard, meaning any route that wasn't previously defined will fall
// under this request and will receive the homepage as the response
// in order of routes, * should always come last!!!!
router.get('*', (req, res) => { // used to be app.get
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
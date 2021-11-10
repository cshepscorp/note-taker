const express = require('express'); // import express
const router = express.Router(); // import router so we can route from anywhere

router.use(require('./apiRoutes'));
router.use(require('./htmlRoutes'));

module.exports = router;
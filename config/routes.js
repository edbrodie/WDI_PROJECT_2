const express = require('express');
const router  = express.Router();

// A home route
router.get('/', (req, res) => res.render('homepage'));

// RESTful routes
// All URLS should contain the PLURAL... don't chose octopus or people or something silly.

// INDEX

// NEW

// SHOW

// CREATE

// EDIT

// UPDATE

// DELETE


module.exports = router;

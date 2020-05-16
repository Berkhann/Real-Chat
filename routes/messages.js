const express = require('express');
const router = express.Router();


//lib

const Messages = require('../src/lib/Messages');

router.get('/list', function(req, res, next) {
  Messages.list('@Room:OPmBv-z-O',messages=>{
    res.json(messages)
  })
});

module.exports = router;

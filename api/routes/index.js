var express = require('express');
var router = express.Router();

var ctrlAssociations = require('../controllers/associations.controllers.js');

router
  .route('/associations')
  .get(ctrlAssociations.getAllAssociations);

module.exports = router;

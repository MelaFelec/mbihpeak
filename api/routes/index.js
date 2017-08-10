var express = require('express');
var router = express.Router();

var ctrlAssociations = require('../controllers/associations.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlTours = require('../controllers/tours.controllers.js');
var ctrlReservations = require('../controllers/reservations.controllers.js');

//Association routes
router
  .route('/associations')
  .get(ctrlAssociations.getAllAssociations)
  .post(ctrlAssociations.addOneAssociation);

router
  .route('/association/:id')
  .get(ctrlAssociations.getOneAssociation);

//User routes
router
  .route('/user/register')
  .post(ctrlUsers.addOneUser);

router
  .route('/user/:id')
  .get(ctrlUsers.getOneUser);

  router
    .route('/user/login')
    .get(ctrlUsers.login);

//Tour routes
router
  .route('/tours')
  .get(ctrlTours.getAllTours)
  .post(ctrlTours.addOneTour);

router
  .route('/tour/:id')
  .get(ctrlTours.getOneTour);

//Reservation routes
router
  .route('/reservations')
  .post(ctrlReservations.addOneReservation);

router
  .route('/reservation/:id')
  .get(ctrlReservations.getOneReservation);


module.exports = router;

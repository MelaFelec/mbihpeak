var express = require('express');
var router = express.Router();

var ctrlAssociations = require('../controllers/associations.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlTours = require('../controllers/tours.controllers.js');
var ctrlReservations = require('../controllers/reservations.controllers.js');
var ctrlStates = require('../controllers/states.controllers.js');
var ctrlCities = require('../controllers/cities.controllers.js');
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
  .post(ctrlUsers.login);

router
  .route('/users')
  .get(ctrlUsers.getAllUsers);

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

//State routes
router
  .route('/states')
  .get(ctrlStates.getAllStates);

router
  .route('/state/:id')
  .get(ctrlStates.getOneState);

//City routes
router
  .route('/cities')
  .get(ctrlCities.getAllCities);

router
  .route('/city/:id')
  .get(ctrlCities.getOneCity);

module.exports = router;

var express = require('express');
var router = express.Router();

var ctrlAssociations = require('../controllers/associations.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlTours = require('../controllers/tours.controllers.js');
var ctrlReservations = require('../controllers/reservations.controllers.js');
var ctrlStates = require('../controllers/states.controllers.js');
var ctrlCities = require('../controllers/cities.controllers.js');
var ctrlMountains = require('../controllers/mountains.controllers.js');
//Association routes
router
  .route('/associations')
  .get(ctrlAssociations.getAllAssociations)
  .post(ctrlAssociations.addOneAssociation);

router
  .route('/tourForAssoc')
  .post(ctrlAssociations.addTourForAssoc);

router
  .route('/tenassociations')
  .get(ctrlAssociations.getTopTen);

router
  .route('/association/:id')
  .get(ctrlAssociations.getOneAssociation);

router
  .route('/updateAssociation/:id')
  .put(ctrlAssociations.updateAssociation);

router
  .route('/deleteAssociation/:id')
  .delete(ctrlAssociations.deleteAssociation);

router
  .route('/association/login')
  .post(ctrlAssociations.login);

router
  .route('/deleteTourForAssoc')
  .post(ctrlAssociations.deleteTourForAssoc);



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

router
  .route('/getUsersByIds')
  .post(ctrlUsers.getUsersByIds);

//Tour routes
router
  .route('/tours')
  .get(ctrlTours.getAllTours)
  .post(ctrlTours.addOneTour);

router
  .route('/editPlaces')
  .post(ctrlTours.editPlaces);

router
  .route('/editPlacesInc')
  .post(ctrlTours.editPlacesInc);

router
  .route('/toursForAssoc')
  .post(ctrlTours.getToursForAssociation);


router
  .route('/tour/:id')
  .get(ctrlTours.getOneTour);

router
  .route('/updateTour/:id')
  .put(ctrlTours.updateTour);

router
  .route('/deleteTour/:id')
  .delete(ctrlTours.deleteTour);

//Reservation routes
router
  .route('/reservations')
  .post(ctrlReservations.addOneReservation);

router
  .route('/reservation/:id')
  .get(ctrlReservations.getOneReservation);

router
  .route('/deleteReservation/:id')
  .delete(ctrlReservations.deleteReservation);

router
  .route('/reservationForUserTour')
  .post(ctrlReservations.getReservationForUserTour);

router
  .route('/reservationsByTourId/:id')
  .get(ctrlReservations.reservationsByTourId);

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

//Mountain routes
router
  .route('/mountains')
  .get(ctrlMountains.getAllMountains);

module.exports = router;

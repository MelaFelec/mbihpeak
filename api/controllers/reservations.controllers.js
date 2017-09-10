var mongoose = require('mongoose');
var Reservation = mongoose.model('Reservation');

module.exports.getOneReservation = function(req, res){
  var id = req.params.id;

  console.log(id);

  Reservation
  .findById(id)
  .exec(function(err, doc){
    var response = {
      status : 200,
      message : doc
    };
    if(err){
      console.log('Error finding reservation');
      response.status = 500;
      response.message = err;
    } else if (!doc) {
      console.log('Reservation id not found in db', id);
      response.status = 404;
      response.message = {
        "message" : "Reservation id not found" + id
      };
    }
    res
    .status(response.status)
    .json(response.message);
  });
};
  module.exports.addOneReservation = function(req, res) {
  console.log("POST new reservation");

  Reservation
    .create({
      tour_id : req.body.tour_id,
      user_id : req.body.user_id,
      date_of_reservation : Date.now(),
      number_of_reservations : parseInt(req.body.number_of_reservations),
      payed : false
    }, function(err, association) {
      if (err) {
        console.log("Error creating reservation");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Reservation created!", association);
        res
          .status(201)
          .json(association);
      }
    });
};

module.exports.deleteReservation = function(req, res) {
  var res_id = req.params.id;

  Reservation.findOneAndRemove({_id: res_id}, function(err) {
    if(err){
      res
        .status(400)
        .json(err);
      }
      res
        .status(201)
        .json();
  });
};

module.exports.getReservationForUserTour = function(req, res){

  Reservation
    .findOne({tour_id : req.body.tour_id, user_id: req.body.user_id}, function(err, doc){
      var response = {
        status : 200,
        message : doc
      };
      if(err){
        console.log('Error finding reservation');
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        console.log('Reservation not found in db');
        response.status = 404;
        response.message = {
          "message" : "Reservation not found"
        };
      }
      console.log(response.message);
      res
      .status(response.status)
      .json(response.message);
    });
}

module.exports.reservationsByTourId = function(req,res){
  var tour_id = req.params.id;

  Reservation
  .find({tour_id : tour_id})
  .exec(function(err, doc){
    var response = {
      status : 200,
      message : doc
    };
    if(err){
      console.log('Error finding tours');
      response.status = 500;
      response.message = err;
    } else if (!doc) {
      console.log('Tour not found in db');
      response.status = 404;
      response.message = {
        "message" : "Tour not found"
      };
    }
    console.log(response.message);
    res
    .status(response.status)
    .json(response.message);
  });
}

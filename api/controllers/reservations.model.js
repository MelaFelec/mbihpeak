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

  module.exports.addOneReservation = function(req, res) {
  console.log("POST new reservation");

  Reservation
    .create({
      tour_id : req.body.tour_id,
      user_id : req.body.user_id,
      date_of_reservation : req.body.date_of_reservation,
      number_of_reservations : parseInt(req.body.number_of_reservations),
      payed : req.body.payed
    }, function(err, association) {
      if (err) {
        console.log("Error creating association");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Association created!", association);
        res
          .status(201)
          .json(association);
      }
    });
};

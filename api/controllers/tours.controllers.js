var mongoose = require('mongoose');
var Tour = mongoose.model('Tour');

module.exports.getAllTours = function(req, res){
  console.log(req.query);

  Tour
    .find()
    .exec(function(err, tours){
      console.log(err);
      console.log(tours);
      if(err){
        console.log("Error finding tours");
        res.status(500).json(err);
      } else{
        console.log("Found tours ", tours.length);
        res.json(tours);
      }
    });
};

module.exports.getOneTour = function(req, res){
  var id = req.params.id;

  console.log(id);

  Tour
  .findById(id)
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
      console.log('Tour id not found in db', id);
      response.status = 404;
      response.message = {
        "message" : "Tour id not found" + id
      };
    }
    res
    .status(response.status)
    .json(response.message);
  });

};

module.exports.addOneTour = function(req, res) {
  console.log("POST new tour");

  Tour
    .create({
      name : req.body.name,
      description : req.body.description,
      start_date : req.body.start_date,
      end_date : req.body.end_date,
      end_reservation_date : req.body.end_reservation_date,
      tour_status : req.body.tour_status,
      number_of_available_places : parseInt(req.body.number_of_available_places,10),
      price : parseFloat(req.body.price),
      mountain_id : req.body.mountain_id
    }, function(err, tour) {
      if (err) {
        console.log("Error creating tour");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Tour created!", tour);
        res
          .status(201)
          .json(tour);
      }
    });
};

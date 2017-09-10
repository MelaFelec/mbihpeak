var mongoose = require('mongoose');
var Tour = mongoose.model('Tour');

module.exports.getAllTours = function(req, res){
  console.log(req.query);

  Tour
    .find()
    .exec(function(err, tours){
      console.log(err);
      console.log(tours);
      if(err || tours == null){
        console.log("Error finding tours");
        res.status(500).json(err);
      } else{
        console.log("Found tours ", tours.length);
        res.json(tours);
      }
    });
};

module.exports.getToursForAssociation = function(req, res){
  var ids = [];
  for(var i=0; i<req.body.length; i++){
    ids[i] = mongoose.Types.ObjectId(req.body[i].tour_id);
  }
  Tour
    .find({_id : {
      $in: ids}})
    .exec(function(err, tours){
      console.log(err);
      console.log(tours);
      if(err){
        console.log("Error finding tours");
        res.status(500).json(err);
      } else if (!tours) {
        console.log('Tours not found in db');
        response.status = 404;
        response.message = {
          "message" : "Tours not found"
        };
      }
      else{
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
  console.log(req.body);

  Tour
    .create({
      name : req.body.name,
      description : req.body.description,
      start_date : req.body.start_date,
      end_date : req.body.end_date,
      end_reservation_date : req.body.end_reservation_date,
      tour_status : 'A',
      number_of_available_places : parseInt(req.body.number_of_available_places,10),
      price : parseFloat(req.body.price),
      mountain_id : req.body.mountain_id
    }, function(err, tour) {
      if (err || tour == null) {
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

module.exports.deleteTour = function(req, res){
  var id = req.params.id;

  Tour
  .findOneAndRemove({_id: id}, function(err) {
    if(err){
      res
        .status(400)
        .json(err);
      }else {
        res
          .status(204)
          .json();
      }
  });
};

module.exports.updateTour = function(req, res) {
  var id = req.params.id;

  console.log('GET tour_id', id);

  Tour
    .findById(id)
    .exec(function(err, tour) {
      if (err) {
        console.log("Error finding tour");
        res
          .status(500)
          .json(err);
          return;
      } else if(!tour) {
        console.log("Tour id not found in database", id);
        res
          .status(404)
          .lson({
            "message" : "Tour ID not found " + id
          });
          return;
      }

      tour.name = req.body.name;
      tour.description = req.body.description;
      tour.start_date = req.body.start_date;
      tour.end_date = req.body.end_date;
      tour.end_reservation_date = req.body.end_reservation_date;
      tour.number_of_available_places = parseInt(req.body.number_of_available_places, 10);
      tour.price = parseFloat(req.body.price);
      tour.status = 'A';
      tour.mountain_id = req.body.mountain_id;

      tour
        .save(function(err, tourUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json(tourUpdated);
          }
        });
    });
};

module.exports.editPlaces = function(req,res){
  console.log('tour_id ' + req.body.tour_id);
  console.log('number ' + req.body.number);
  Tour
    .findById(req.body.tour_id)
    .exec(function(err, tour) {
      if (err) {
        console.log("Error finding tour");
        res
          .status(500)
          .json(err);
          return;
      } else if(!tour) {
        console.log("tour not found in database");
        res
          .status(404)
          .lson({
            "message" : "tourID not found "
          });
          return;
      }

      tour.number_of_available_places = tour.number_of_available_places - parseInt(req.body.number);
      console.log(tour.number_of_available_places);

      tour
        .save(function(err, tourUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json(tourUpdated);
          }
        });
    });
}

module.exports.editPlacesInc = function(req,res){
  console.log('tour_id ' + req.body.tour_id);
  console.log('number ' + req.body.number);
  Tour
    .findById(req.body.tour_id)
    .exec(function(err, tour) {
      if (err) {
        console.log("Error finding tour");
        res
          .status(500)
          .json(err);
          return;
      } else if(!tour) {
        console.log("tour not found in database");
        res
          .status(404)
          .lson({
            "message" : "tourID not found "
          });
          return;
      }

      tour.number_of_available_places = tour.number_of_available_places + parseInt(req.body.number);
      console.log(tour.number_of_available_places);

      tour
        .save(function(err, tourUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json(tourUpdated);
          }
        });
    });
}

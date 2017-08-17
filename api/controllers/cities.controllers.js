var mongoose = require('mongoose');
var City = mongoose.model('City');

module.exports.getAllCities = function(req, res){
  console.log(req.query);

  City
    .find()
    .exec(function(err, cities){
      console.log(err);
      //console.log(cities);
      if(err){
        console.log("Error finding cities");
        res.status(500).json(err);
      } else{
        res.json(cities);
      }
    });
};

module.exports.getOneCity = function(req, res) {
  var id = req.params.id;

  console.log(id);

  City
  .findById(id)
  .exec(function(err, doc){
    var response = {
      status : 200,
      message : doc
    };
    if(err){
      console.log("Error finding cities");
      response.status = 500;
      response.message = err;
    } else if (!doc) {
      console.log("City id not found in db", id);
      response.status = 404;
      response.message = {
        "message" : "City id not found" + id
      };
    }
    res
    .status(response.status)
    .json(response.message);
  });
};

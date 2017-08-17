var mongoose = require('mongoose');
var Association = mongoose.model('Association');

module.exports.getAllAssociations = function(req, res){
  console.log(req.query);

  Association
    .find()
    .exec(function(err, associations){
      console.log(err);
      console.log(associations);
      if(err){
        console.log("Error finding associations");
        res.status(500).json(err);
      } else{
        console.log("Found associations ", associations.length);
        res.json(associations);
      }
    });
};

module.exports.getOneAssociation = function(req, res) {
  var id = req.params.id;

  console.log(id);

  Association
  .findById(id)
  .exec(function(err, doc){
    var response = {
      status : 200,
      message : doc
    };
    if(err){
      console.log("Error finding associations");
      response.status = 500;
      response.message = err;
    } else if (!doc) {
      console.log("Association id not found in db", id);
      response.status = 404;
      response.message = {
        "message" : "Association id not found" + id
      };
    }
    res
    .status(response.status)
    .json(response.message);
  });
};

module.exports.addOneAssociation = function(req, res) {
  console.log("POST new association");

  Association
    .create({
      name : req.body.name,
      description : req.body.description,
      city_id : req.body.city_id,
      address : req.body.address,
      phone_number : req.body.phone_number,
      email : req.body.email,
      username : req.body.username,
      password : req.body.password,
      tour_id : req.body.tour_id
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

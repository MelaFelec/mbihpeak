var mongoose = require('mongoose');
var State = mongoose.model('State');

module.exports.getAllStates = function(req, res){
  console.log(req.query);

  State
    .find()
    .exec(function(err, states){
      console.log(err);
      console.log(states);
      if(err){
        console.log("Error finding states");
        res.status(500).json(err);
      } else{
        res.json(states);
      }
    });
};

module.exports.getOneState = function(req, res) {
  var id = req.params.id;

  console.log(id);

  State
  .findById(id)
  .exec(function(err, doc){
    var response = {
      status : 200,
      message : doc
    };
    if(err){
      console.log("Error finding states");
      response.status = 500;
      response.message = err;
    } else if (!doc) {
      console.log("State id not found in db", id);
      response.status = 404;
      response.message = {
        "message" : "State id not found" + id
      };
    }
    res
    .status(response.status)
    .json(response.message);
  });
};

var mongoose = require('mongoose');
var Mountain = mongoose.model('Mountain');

module.exports.getAllMountains = function(req, res){
  console.log('UZMI planine');

  Mountain
    .find()
    .exec(function(err, mountains){
      console.log(err);
      if(err){
        console.log("Error finding mountains");
        res.status(500).json(err);
      } else{
        res.status(201).json(mountains);
      }
    });
};

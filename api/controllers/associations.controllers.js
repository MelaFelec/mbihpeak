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

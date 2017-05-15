var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.getOneUser = function(req, res){
  var id = req.params.id;

  console.log(id);

  User
  .findById(id)
  .exec(function(err, doc){
    var response = {
      status : 200,
      message : doc
    };
    if(err){
      console.log('Error finding user');
      response.status = 500;
      response.message = err;
    } else if (!doc) {
      console.log('User id not found in db', id);
      response.status = 404;
      response.message = {
        "message" : "User id not found" + id
      };
    }
    res
    .status(response.status)
    .json(response.message);
  });

module.exports.addOneUser = function(req, res) {
  console.log("POST new user");

  User
    .create({
      fullname : req.body.name,
      state : req.body.state,
      city : req.body.city,
      address : req.body.address,
      phone_number : req.body.phone_number,
      email : req.body.email,
      username : req.body.username,
      password : req.body.password
    }, function(err, user) {
      if (err) {
        console.log("Error creating user");
        res
          .status(400)
          .json(err);
      } else {
        console.log("User created!", user);
        res
          .status(201)
          .json(user);
      }
    });
};

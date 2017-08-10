var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

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
};

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
      password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
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

module.exports.login = function(req, res) {
  console.log('logging in user');
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    username:username
  }).exec(function(err,user){
    if (err) {
      res
        .status(400)
        .json(err);
    } else {
      if(bcrypt.compareSync(password, user.password)){
        console.log("User created!", user);
        var token = jwt.sign({username: user.username}, 's3cr3t', {expiresIn: 3600});
        res.status(201).json(success: true, token: token);
      } else{
        res.status(401).json('Unauthorized');
      }
    }
  });
};

module.exports.authenticate = function(req, res, next){
  var headerExists = req.headers.authorization;
  if(headerExists){
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 's3cr3t',function(error, decoded){
      if(error){
      console.log(error);
      res.status(401).json('Unauthorized');
    } else{
      req.user = decoded.username;
      next();
    }
  });
  } else{
  res.status(403).json('No token provided');
  }
};

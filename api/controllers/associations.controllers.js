var mongoose = require('mongoose');
var Association = mongoose.model('Association');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.getAllAssociations = function(req, res){
  console.log(req.query);

  Association
    .find()
    .exec(function(err, associations){
      console.log(err);
      console.log(associations);
      if(err || associations == null){
        console.log("Error finding associations");
        res.status(500).json(err);
      } else{
        console.log("Found associations ", associations.length);
        res.json(associations);
      }
    });
};

module.exports.getTopTen = function(req, res){
  console.log(req.query);

  Association
    .find()
    .limit(10)
    .exec(function(err, associations){
      console.log(err);
      console.log(associations);
      if(err || associations == null){
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

      try{
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 's3cr3t',function(error, decoded){
          if(error){
            console.log(error);
          } else{
            response.message.password = decoded.password;

            res
            .status(response.status)
            .json(response.message);
          }
        });
      } catch(err){
        console.log('No token provided');
      }
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
      password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
      tour_id : req.body.tour_id
    }, function(err, association) {
      if (err || association == null) {
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

module.exports.updateAssociation = function(req, res) {
  var id = req.params.id;

  console.log('GET tour_id', id);

  Association
    .findById(id)
    .exec(function(err, assoc) {
      if (err) {
        console.log("Error finding association");
        res
          .status(500)
          .json(err);
          return;
      } else if(!assoc) {
        console.log("Association id not found in database", id);
        res
          .status(404)
          .lson({
            "message" : "Association ID not found " + id
          });
          return;
      }

      assoc.name = req.body.name;
      assoc.description = req.body.description;
      assoc.city_id = req.body.city_id;
      assoc.address = req.body.address;
      assoc.phone_number = req.body.phone_number;
      assoc.email = req.body.email;
      assoc.username = req.body.username;
      assoc.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

      assoc
        .save(function(err, assocUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json(assocUpdated);
          }
        });
    });
};

module.exports.deleteAssociation = function(req, res) {
  var id = req.params.id;

  Association
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

module.exports.deleteTourForAssoc = function(req, res){
  Association.findOneAndUpdate({_id: req.body.assoc_id}, {$pull: {tour_id: req.body.tour_id}})
  .exec(function(err){
    if(err){
      res.status(404).json();
    }
    res.status(201).json();
  });
}

module.exports.login = function(req, res) {
  console.log('logging in assoc');
  var username = req.body.username;
  var password = req.body.password;

  Association.findOne({
    username:username
  }).exec(function(err, assoc){
    if (err || assoc==null) {
      res
        .status(400)
        .json({success: false, msg: 'No data found'});
    } else {
      if(bcrypt.compareSync(password, assoc.password)){
        console.log("Association created!", assoc);
        var token = jwt.sign({username: assoc.username, password: password}, 's3cr3t', {expiresIn: 3600});
        res.status(201).json({success: true, token: token, user: assoc});
      } else{
        res.status(401).json('Unauthorized');
      }
    }
  });
};

module.exports.addTourForAssoc = function(req, res) {
  Association.findOneAndUpdate({_id: req.body.assoc_id}, {$push: {tour_id: req.body.tour_id}})
  .exec(function(err, assoc){
    if(err){
      res.status(404).json();
    }
    res.status(201).json(assoc);
  });
}

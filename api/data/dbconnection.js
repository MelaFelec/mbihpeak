var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://mbihpeak.com:Xp7Mshgwnrrt@80.65.165.60:2721/mbihpeak?authSource=admin';
var _connection = null;

var open = function() {
  MongoClient.connect(dburl, function(err, db){
    if(err){
      console.log("DB connection failed");
      return;
    }
    _connection = db;
    console.log("DB connection open", db);
  });
};

var get = function(){
  return _connection;
};

module.exports = {
  open : open,
  get : get
};

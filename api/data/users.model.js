var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  _id : {
    type : Schema.Types.ObjectId
  },
  fullname : {
    type : String,
    required : true
  },
  state : {
    type : String,
    required : true
  },
  city : {
    type : String,
    required : true
  },
  address : {
    type : String,
    required : true
  },
  phone_number : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  }
});

mongoose.model('User', userSchema, 'users');

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  fullname : {
    type : String,
    required : true
  },
  city_id : {
    type : mongoose.Schema.Types.ObjectId, ref: 'City',
    required : false
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
  },
  status : {
    type : String,
    default : "user"
  }
});

mongoose.model('User', userSchema, 'users');

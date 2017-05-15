var mongoose = require('mongoose');

var associationSchema = new mongoose.Schema({
  _id : {
    type : mongoose.Schema.Types.ObjectId
  },
  name : {
    type : String,
    required : true
  },
  description : {
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
  },
  tour_id : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Tour',
    required : true
  }
});

mongoose.model('Association', associationSchema, 'associations');

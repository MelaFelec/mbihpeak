var mongoose = require('mongoose');

var associationSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  city_id : {
    type : mongoose.Schema.Types.ObjectId, ref: 'City',
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
    required : true,
    unique: true
  },
  username : {
    type : String,
    required : true,
    unique: true
  },
  password : {
    type : String,
    required : true
  },
  tour_id : {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tour'}],
    required : false
  },
  status: {
    type: String,
    default : "assoc"
  }
});

mongoose.model('Association', associationSchema, 'associations');

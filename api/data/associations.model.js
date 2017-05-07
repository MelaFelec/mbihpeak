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
  state : {
    type : String,
    required : true
  },
  city : {
    type : String,
    required : true
  }
});

mongoose.model('Association', associationSchema, 'associations');

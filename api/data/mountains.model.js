var mongoose = require('mongoose');

var mountainSchema = new mongoose.Schema({
  _id : {
    type : mongoose.Schema.Types.ObjectId
  },
  name : {
    type : String,
    required : true
  },
  city : {
    type : String,
    required : true
  },
  state : {
    type : String,
    required : true
  }
});

mongoose.model('Mountain', mountainSchema, 'mountains');

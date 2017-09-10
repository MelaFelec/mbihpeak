var mongoose = require('mongoose');

var mountainSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  }
});

mongoose.model('Mountain', mountainSchema, 'mountains');

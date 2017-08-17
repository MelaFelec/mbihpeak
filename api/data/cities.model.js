var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
  _id : {
    type : mongoose.Schema.Types.ObjectId
  },
  name : {
    type : String,
    required: true
  },
  state_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'State',
    required : true
  }
});

mongoose.model('City', citySchema, 'cities');

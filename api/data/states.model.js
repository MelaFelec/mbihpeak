var mongoose = require('mongoose');

var stateSchema = new mongoose.Schema({
  _id : {
    type : mongoose.Schema.Types.ObjectId
  },
  name : {
    type : String,
    required: true
  }
});

mongoose.model('State', stateSchema, 'states');

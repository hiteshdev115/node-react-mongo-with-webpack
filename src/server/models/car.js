var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var carSchema = new Schema({
    make: String,
    model: String,
    year: Number,
    seller:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
  });
  
  var Car = mongoose.model('car', carSchema);

// make this available to our users in our Node applications
module.exports = Car;
// grab the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contactusSchema = new Schema({
  customername: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

contactusSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
      this.created_at = currentDate;
    next();
  });
  
// the schema is useless so far
// we need to create a model using it
var contactus = mongoose.model('contactus', contactusSchema);

// make this available to our users in our Node applications
module.exports = contactus;
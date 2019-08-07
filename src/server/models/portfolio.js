// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
  servicesname: { type: String, required: true, unique: true },
  title: String,
  description: String,
  author: { type: String, required: true },
  image: String,
  isActive: Boolean,
  created_at: Date,
  updated_at: Date
});

portfolioSchema.pre('save', function(next) {
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
var portfolio = mongoose.model('portfolio', portfolioSchema);

// make this available to our users in our Node applications
module.exports = portfolio;
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogcategorySchema = new Schema({
  categoryname: { type: String, required: true, unique: true },
  isActive: Boolean,
  created_at: Date,
  updated_at: Date
});

blogcategorySchema.pre('save', function(next) {
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
var blogcategory = mongoose.model('blogcategory', blogcategorySchema);

// make this available to our users in our Node applications
module.exports = blogcategory;
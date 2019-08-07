// grab the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var seoSchema = new Schema({
  pageTitle: { type: String, required: true, unique: true },
  pageUrl: String,
  metaTitle: String,
  metaDescription: String,
  metaImageUrl: String,
  follow:{ type: String, default: 'follow' },
  index:{ type: String, default: 'index' },
  created_at: Date,
  updated_at: Date
});

seoSchema.pre('save', function(next) {
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
var seo = mongoose.model('seo', seoSchema);

// make this available to our users in our Node applications
module.exports = seo;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({ 
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  category: String,
  description: String,
  projectimage: String,
  isActive: Boolean,
  pageTitle: { type: String },
  metaTitle: String,
  metaDescription: String,
  follow:{ type: String, default: 'follow' },
  index:{ type: String, default: 'index' },
  created_at: Date,
  updated_at: Date
});

projectSchema.pre('save', function(next) {
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
var project = mongoose.model('project', projectSchema);

// make this available to our users in our Node applications
module.exports = project;
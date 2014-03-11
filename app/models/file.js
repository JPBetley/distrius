// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  slug_service = require('../services/slug_service');

var FileSchema = new Schema({
    slug: { type: String, default: slug_service.generate_slug() },
    name: String,
    url: String,
    ipaddress: String,
    hostname: String
});

FileSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('File', FileSchema);

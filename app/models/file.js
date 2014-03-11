// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FileSchema = new Schema({
    slug: String,
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

// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FileSchema = new Schema({
    name: String,
    url: String
});

FileSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('File', FileSchema);

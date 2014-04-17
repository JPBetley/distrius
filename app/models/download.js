// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DownloadSchema = new Schema({
    slug: String,
    file_name: String,
    file_url: String,
    download_date: Date,
    ipaddress: String,
    uses_remaining: Number
});

DownloadSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Download', DownloadSchema);

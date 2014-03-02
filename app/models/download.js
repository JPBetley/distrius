// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DownloadSchema = new Schema({
    url: String,
    file_url: String,
    download_date: Date
});

DownloadSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Download', DownloadSchema);

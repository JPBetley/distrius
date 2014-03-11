// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  slug_service = require('../services/slug_service');

var DownloadSchema = new Schema({
    slug: { type: String, default: slug_service.generate_slug() },
    file_name: String,
    file_url: String,
    download_date: Date,
    ipaddress: String,
    hostname: String
});

DownloadSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Download', DownloadSchema);

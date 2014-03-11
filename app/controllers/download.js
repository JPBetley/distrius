var mongoose = require('mongoose'),
    Download = mongoose.model('Download');

exports.download = function(req, res) {
    var slug = req.params.slug;
    Download.findOne({ 'slug': slug }, function (err, download) {
        download.ipaddress = req.ip;
        download.hostname = req.host;
        download.download_date = Date.now();
        download.save(function (saveErr) {});

        res.download(download.file_url, download.file_name, function (downloadErr) {

        });
    });
};

var mongoose = require('mongoose'),
    http = require('http'),
    request = require('request'),
    Download = mongoose.model('Download'),
    File = mongoose.model('File'),
    slug_service = require('../services/slug_service');

exports.download = function(req, res) {
    var slug = req.params.slug;
    Download.findOne({ 'slug': slug }, function (err, download) {
        console.log(download.download_date);
        if (download.uses_remaining !== 0) {
            download.ipaddress = req.ip;
            download.hostname = req.host;
            download.uses_remaining = download.uses_remaining - 1;
            download.download_date = Date.now();
            download.save(function (saveErr) {
                if (saveErr) {
                    console.log(saveErr);
                    return res.render('404');
                }
            });

            res.attachment(download.file_name);
            request.get(download.file_url).pipe(res);

        } else { 
            res.render('download/used', {});
        }
    });
};

exports.create = function(req, res) {
    var file_id = req.body.file_id
        uses = req.body.uses;
    File.findById(file_id, function(findErr, file) {
        Download.create({
            file_url: file.url,
            file_name: file.name,
            slug: slug_service.generate_slug(),
            uses_remaining: uses 
        }, function(createErr, download) {
            res.json({ slug: download.slug });
        });
    });
};


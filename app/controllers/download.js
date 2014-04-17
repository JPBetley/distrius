var mongoose = require('mongoose'),
    http = require('http'),
    request = require('request'),
    Download = mongoose.model('Download'),
    File = mongoose.model('File'),
    slug_service = require('../services/slug_service');

exports.download = function(req, res) {
    var slug = req.params.slug;
    Download.findOne({ 'slug': slug }, function (err, download) {
        if (req.xhr) {
            _ajaxDownload(req, res, download, err);
        } else {
            _download(req, res, download, err);
        }
        
    });
};

var _streamDownload = function(req, res, download, callback) {
    download.ipaddress = req.ip;
    download.hostname = req.host;
    download.uses_remaining = download.uses_remaining - 1;
    download.download_date = Date.now();
    download.save(callback);

    res.attachment(download.file_name);
    request.get(download.file_url).pipe(res);
};

var _download = function(req, res, download, err) {
    if (err) {
        console.log(err);
        return res.render('404');
    }

    if (download.uses_remaining !== 0) {
        _streamDownload(req, res, download, function (saveErr) {
            if (saveErr) {
                console.log(saveErr);
                return res.render('500');
            }
        }); 
    } else { 
        res.render('download/used', {});
    }
    
};

var _ajaxDownload = function(req, res, download, err) {
    if (err) {
        console.log(err);
        res.status('404')
        return res.send({ error: "Download not found" });
    }

    if (download.uses_remaining !== 0) {
        _streamDownload(req, res, download, function (saveErr) {
            if (saveErr) {
                console.log(saveErr);
                res.status(500);
                return res.send({ error: "Download failed." });
            }
        }); 
    } else { 
        res.status(500);
        return res.send({ error: "No downloads remaining." });
    }
};

exports.index = function(req, res) {
    res.render('download/index');
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


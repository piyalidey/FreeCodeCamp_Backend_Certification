var mongodb = require('mongodb');
var shortid = require('shortid');
var validUrl = require('valid-url');
var express = require('express');
var config = require('../config');
var mLab = 'mongodb://' + config.db.host + '/' + config.db.name;
var MongoClient = mongodb.MongoClient

// removes underscores and dashes from possible characterlist
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

var app = express();

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// given a URL, create a shortcode and enter into the database
app.get('/new/:url(*)', function (req, res, next) {
  MongoClient.connect(mLab, function(err,db) {
    if(err) {
        console.log("Unable to connect to the server", err);
    } else {
        console.log("Successsfully connected to the server");

        var collection = db.collection('links');
        var params = req.params.url;
        var local = req.get('host'); + "/";
        // function that imports a link to the db and returns shortLink
       var newLink = function (db, callback) {
            collection.findOne({ "url": params }, { short: 1, _id: 0 }, function (err, doc) {
                if (doc != null) {
                    res.json({ original_url: params, short_url: local + doc.short });
            } else {
                if (validUrl.isUri(params)) {
                     // if URL is valid, do this
                    var shortCode = shortid.generate();
                    var newUrl = { url: params, short: shortCode };
                    collection.insert([newUrl]);
                    res.json({ original_url: params, short_url: local + shortCode });
                } else {
                    // if URL is invalid, do this
                    res.json({ error: "Wrong url format, make sure you have a valid protocol and real site." });
                }
            }
        });
      };
        newLink(db, function () {
            db.close();
        });
    }  
  });
});

// given a shortcode, do the exact reverse
app.get('/:short', function (req, res, next) {
  MongoClient.connect(mLab, function (err, db) {
    if (err) {
      console.log("Unable to connect to server", err);
    } else {
      console.log("Connected to server")
 
      var collection = db.collection('links');
      var params = req.params.short;
 
      var findLink = function (db, callback) {
        collection.findOne({ "short": params}, {url: 1, _id: 0}, function (err,doc){
            if (doc != null) {
                res.redirect(doc.url);
            } else {
                res.json({error: "No Link has been found"});
            }
        })  
      };
 
      findLink(db, function () {
        db.close();
      });
 
    };
  });
});

// Listening
app.listen(process.env.PORT || 3000, function(){
    console.log("URL Shortener server just started");
});
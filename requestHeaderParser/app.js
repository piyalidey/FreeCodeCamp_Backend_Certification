"use stricts";

var express = require('express');
var app = express();

// ROUTES
app.get('/', function(req,res){
    // return homepage that has instructions
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/api/whoami', function(req,res){
    var ipAddress;
  // Amazon EC2 / Heroku workaround to get real client IP
    var forwardedIpsStr = req.header('x-forwarded-for'); 
    if (forwardedIpsStr) {
        // 'x-forwarded-for' header may return multiple IP addresses in
        // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
        // the first one
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
        }
        if (!ipAddress) {
        // Ensure getting client IP address still works in
        // development environment
        ipAddress = req.connection.remoteAddress;
    }
    var info = {
        "ipaddress" : ipAddress,
        "language" :  req.headers["accept-language"].split(",")[0],
        "software":   req.headers["user-agent"].split("(")[1].split(")")[0]
    };
    //console.log(JSON.stringify(info) + "/n");

    res.set('Content-Type', 'application/json');
    res.json(info);
});


// Listen to the port
app.listen (process.env.PORT || 3000, function() {
    console.log ("Request Header Parser microservice server has started..")
})

var moment = require("moment");
var path = require('path');
var bodyParser = require('body-parser');
var express = require("express");
var app = express(); 

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/', function(req, res) {
  var fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName);
});  

// configure app to use bodyParser(). This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/:timestamp', function(req, res){
    var time = req.params.timestamp;
    var unix = null;
    var humanReadable = null;

    // Check for initial unix time
    if (+time >= 0) {
        unix = +time;
        humanReadable = unixTohuman(unix);
    } 
        
    // Check for initial natural time
    if (isNaN(+time) && moment(time, "MMMM D, YYYY").isValid()) {
        unix = humanToUnix(time);
        humanReadable = unixTohuman(unix);
    }
        
    var timeObj = { "unix": unix, "humanReadable": humanReadable };
        res.send(JSON.stringify(timeObj));


function unixTohuman(time) {
    // Convert unix timestamp to natural date
    return moment.unix(unix).format("MMMM D, YYYY");
}

function humanToUnix(time) {
    // Conver from natural date to unix timestamp
    return moment(time, "MMMM D, YYYY").format("X");
}

});
// Listening
app.listen(process.env.PORT || 3000, function(){
    console.log("timestamp server has just started");
})
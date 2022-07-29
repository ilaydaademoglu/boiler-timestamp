// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment =  require ('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function(req,res){
  res.json({utc:new Date(), //curent time utc
  unix: Math.floor(Date.now())});
});

app.get("/api/:date?", function(req,res){
  let date_string= req.params.date;
  let date;
  
  if (parseInt(date_string) < 10000) {
    date = new Date(date_string);
  }
  // Create a js date if it is passed in unix format
  else {
    date = new Date(parseInt(date_string)); // Set the date in variable
  }

  // Handles if date input is invalid
  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  // Handles if date is valid
  else {
    res.json({
      unix: date.valueOf(), // Passes the date in a unix timestamp format
      utc: date.toUTCString(), // toUTCString is the format the freeCodeCamp test needs to pass
    });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

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
  res.json({utc:  new Date().toUTCString(), //curent time utc
  unix: Math.floor(Date.now() / 1000)});
})

app.get("/api/:date?", function(req,res){
  let date= req.params.date;
  if(date.includes('-')){
  const dateParsed = new Date(Date.parse(date));
    if(!dateParsed.getTime()){
      res.json({ error : "Invalid Date" });
  }
  else{
    res.json({unix: Math.floor(dateParsed / 1000),
    utc: dateParsed.toUTCString()});
  }
  }
  else{
    let dateTime = new Date(Math.floor(date / 1000) * 1000).toUTCString();
    var valid = (new Date(dateTime)).getTime() > 0;
    if(valid){
      res.json({
        unix: date,
        utc: dateTime,
      })
    }
    else{
      res.json({ error : "Invalid Date" });
    }
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

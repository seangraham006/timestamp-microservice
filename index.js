// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr))
}

function isValidUnixTimestamp(value) {
  // Convert the value to a number
  const timestamp = Number(value);

  // Check if it is a valid number and corresponds to a valid date
  return !isNaN(timestamp) && new Date(timestamp).getTime() > 0;
}

function unixToDate(unixValue) {
  // Convert the Unix timestamp to a Date object
  return (new Date(Number(unixValue))).toUTCString();
}

app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;
  if (isDateValid(dateInput)) {
    let date = new Date(dateInput);
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  } else if (isValidUnixTimestamp(dateInput)) {
    let date = unixToDate(dateInput);
    res.json({unix: parseInt(dateInput), utc: date});
  } else if (!dateInput || dateInput.trim() === '') {
    let currentDate = new Date()
    res.json({unix: currentDate.getTime(), utc: currentDate.toUTCString()})
  } else {
    res.json({ error : "Invalid Date" })
  }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

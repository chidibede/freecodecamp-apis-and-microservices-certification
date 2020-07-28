// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
var moment = require("moment");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint with timestamp parameter...
app.get("/api/timestamp/:date_string", function (req, res) {
  let date_string = req.params.date_string;
  if (moment(date_string, "YYYY-MM-DD", true).isValid()) {
    let dateObj = new Date(date_string);
    let unix_date = parseInt(dateObj.getTime().toFixed(0));
    let utc_date = dateObj.toUTCString();
    res.json({ unix: unix_date, utc: utc_date });
  } else if (moment(date_string, "YYYY-MM-D", true).isValid()) {
    let dateObj = new Date(date_string);
    let unix_date = parseInt(dateObj.getTime().toFixed(0));
    let utc_date = dateObj.toUTCString();
    res.json({ unix: unix_date, utc: utc_date });
  } else if (parseInt(date_string) > 0) {
    let unix_date = parseInt(date_string);
    let dateObj = new Date(unix_date);
    let utc_date = dateObj.toUTCString();
    res.json({ unix: unix_date, utc: utc_date });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// API endpoint Incase no parameter is passed
app.get("/api/timestamp", (req, res) => {
  dateObj = new Date();
  let utc_date = dateObj.toUTCString();
  // let unix_date_to_utc = parseInt((dateObj.getTime() / 1000).toFixed(0));
  let unix_date = parseInt(dateObj.getTime().toFixed(0));
  res.json({
    unix: unix_date,
    utc: utc_date,
  });
});

// listen for requests :)
let env_port = process.env.PORT;
var listener = app.listen(env_port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

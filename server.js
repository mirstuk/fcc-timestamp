// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/timestamp/:date?", function (req, res) {
  if (!req.params.date) {
    const now = new Date();
    res.json({
      "unix": now.getTime(),
      "utc": now.toUTCString()
    });
  } else {
    let date;
    if (req.params.date.includes('-')) {
      date = new Date(Date.parse(req.params.date));
    } else {
      date = new Date(+req.params.date);
    }
    // const date = new Date(Date.UTC(req.params.date));
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

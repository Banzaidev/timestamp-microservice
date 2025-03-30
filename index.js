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
app.get("/",  (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api',(req,res)=>{
  const dateUnix = Date.now()
  const dateUtc = new Date(dateUnix).toUTCString()
  res.json({unix: dateUnix, utc: dateUtc})
})

app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date //unix or YYYY-MM-DD 
  const unixTimeZero = Date.parse("1970-01-01T00:00:00Z");
  const dateParamInt = parseInt(dateParam)
  //if dateParam is nan, it means that it's a string which is a invalid date
  if(Number.isNaN(dateParamInt)){
    res.json({ error : "Invalid Date" })
  }
  else{
    const date = new Date(dateParam) //create Date obj
    const isDateAUnix = isNaN(Date.parse(date)) //true if unix is input
    switch (isDateAUnix) {
      case true:
        const utcDateForUnix = new Date(dateParam - unixTimeZero).toUTCString()
        res.json({unix: dateParamInt, utc: utcDateForUnix})
        break;
      case false:
        res.json({unix: Date.parse(date), utc:date.toUTCString() })
        break;
    }

  }
  
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

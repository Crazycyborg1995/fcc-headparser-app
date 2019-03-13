var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/user', (req, res) => {
  let ipaddress = req.ip;
  if (/^\:/.test(ipaddress)) {
    ipaddress = ipaddress.split(':')[3];
  }
  let language = req.headers['accept-language'].split(',')[0];
  let software = req.headers['user-agent'].match(/\((.+?)\)/)[1];
  console.log(ipaddress, software);
  // res.send({ ipaddress, language, software });
  res.status(200).json({ ipaddress, language, software });
});
app.listen(port, () => {
  console.log(`Server started on port : ${port}`);
});

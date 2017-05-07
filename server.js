// adapted from http://nodejs.org/api/synopsis.html

http  = require("http")
cfenv = require("cfenv")

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());

var logger = require('morgan');
var cors = require('cors');
app.use(logger('dev'));
app.use(cors());


var un;
var ps;
var len;
var resp;
var cl;


var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

console.log("Working!!");



app.post('/test', function(request, response){
  console.log("trigerred");

console.log(request.body);      // your JSON
//var jsonp = JSON.parse(request);
resp = encrypt(request.body.str);


console.log("going to send: "+resp);
  response.json(resp);   // echo the result back
});




// get environmental information for this app
appEnv   = cfenv.getAppEnv()
instance = appEnv.app.instance_index || 0



// start the server on the calculated port and host


var server = app.listen(appEnv.port, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

//-----------------------------------------------

// Part of https://github.com/chris-rock/node-crypto-examples

// Nodejs encryption with CTR

http  = require("http")
cfenv = require("cfenv")

var express = require('express');
var app = express();

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
 



app.get('/', function (req,res) {
  var hw = encrypt("hello world")
// outputs hello world
console.log(decrypt(hw)); 
  res.send(hw);
});


// get environmental information for this app
appEnv   = cfenv.getAppEnv()
instance = appEnv.app.instance_index || 0



// start the server on the calculated port and host


var server = app.listen(appEnv.port, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
  var hw = encrypt("hello world")
// outputs hello world
console.log(decrypt(hw));
})

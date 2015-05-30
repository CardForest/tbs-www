var express = require('express');
var http = require('http');

var app = express();

app.use(express.static(__dirname + '/../deployProd'));
app.use('/bower_components', express.static(__dirname + '/../client/bower_components'));


var server = http.createServer(app);
server.listen(9001, function() {
  // TODO verify dev development + live
  var request = require('request');
  request('http://localhost:9000/__browser_sync__?method=reload', function errorIgnorer() {});
});

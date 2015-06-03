var express = require('express');
var http = require('http');

var app = express();

app.use(express.static(__dirname + '/../' + (process.env.DEPLOY_DIR || 'deployDev')));
app.use('/bower_components', express.static(__dirname + '/../client/bower_components'));


var server = http.createServer(app);
server.listen(process.env.PORT || 9000, function() {
  // TODO verify dev development + live
  if (process.env.LIVE) {
    var request = require('request');
    request('http://localhost:' + process.env.LIVE_PORT + '/__browser_sync__?method=reload', function errorIgnorer() {});
  }
});

var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var opn = require('opn');

var apirouter = require('./apirouter.js');

var PUBLIC_DIR = path.join(__dirname, 'public');
var PORT = 8080;
var app = express();

// connect to the database
mongoose.connect('mongodb://localhost/cryptodb');
var db = mongoose.connection;
db.on('error', function(err) {
	console.error('db connection error: ' + err);
});
db.once('open', function() {
	console.log('connected to mongo db');
  opn('http://localhost:'+PORT);
});

// serve files in public folder
app.use(express.static(PUBLIC_DIR));

// connect api routes
app.use('/api', apirouter);

// send index.html
app.get('*', function(req, res) {
	res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});


app.listen(PORT);
console.log('server started on port ' + PORT);
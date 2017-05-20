var path = require('path');
var express = require('express');
var mongoose = require('mongoose');

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
});

// serve files in public folder
app.use(express.static(PUBLIC_DIR));

// send index.html
app.get('*', function(req, res) {
	res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

var api = require('./api.js');
app.get('/api/coins', api.listCoins);
app.get('/api/coin/:coinName', api.findOneCoin);
app.get('/api/coin/:coinName/:date', api.findCoinValByDate);

app.post('/api/addCoin', api.addCoin);
app.post('/api/addCoinValue/:coinName', api.addCoinValue);

app.listen(PORT);
console.log('server started on port ' + PORT);
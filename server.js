var path = require('path');
var express = require('express');

var PUBLIC_DIR = path.join(__dirname, 'public');
var PORT = 8080;
var app = express();

// serve files in public folder
app.use(express.static(PUBLIC_DIR));

// send index.html
app.get('*', function(req, res) {
	res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT);
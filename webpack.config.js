var path = require('path');

var PUBLIC_DIR = path.join(__dirname, 'public');
var CLIENT_DIR = path.join(__dirname, 'src');

var config = {
	context: CLIENT_DIR,
	entry: './index.js',
	output: {
		path: PUBLIC_DIR,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};

module.exports = config;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var valueSchema = new Schema({
	date: { type: Date, default: (new Date().getTime()) },
	USDvalue: Number
});

valueSchema.pre('save', function(next) {
	var currentDate = new Date();
	date = currentDate;
	next();
});

var coinSchema = new Schema({
	name: String,
	values: [valueSchema]
});

var CoinModel = mongoose.model('Coin', coinSchema);
module.exports = CoinModel;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dateTimeFormat = require('../helpers/formatters.js').dateTimeFormat;

var historySchema = new Schema({
  'btc-e': valueSchema,
  coincap: valueSchema,
  datetime: { type: string, format: dateTimeFormat(new Date()) },
  poloniex: valueSchema,
});

var valueSchema = new Schema({
  'btc_dash': String,
  'btc_eth': String,
  'btc_ltc': String,
  'usd_btc': { type: String, required: true },
  'usd_dash': String,
  'usd_eth': String,
  'usd_ltc': String
});

historySchema.pre('save', function(next) {
  var currentDate = new Date();
  date = dateTimeFormat(currentDate);
  next();
});

var coinSchema = new Schema({
  name: String,
  values: [valueSchema]
});

var HistoryModel = mongoose.model('History', HistorySchema);
module.exports = HistoryModel;
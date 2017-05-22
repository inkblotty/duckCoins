var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dateTimeFormat = require('../helpers/formatters.js').dateTimeFormat;

var historySchema = new Schema({
  'btc-e': {
    'usd_btc': { type: String, required: true },
  },
  coincap: {
    'btc_dash': String,
    'btc_eth': String,
    'btc_ltc': String,
    'usd_btc': { type: String, required: true },
    'usd_dash': String,
    'usd_eth': String,
    'usd_ltc': String
  },
  date: { type: String, default: dateTimeFormat(new Date()) },
  poloniex: {
    'btc_dash': String,
    'btc_eth': String,
    'btc_ltc': String,
    'usd_btc': { type: String, required: true },
    'usd_dash': String,
    'usd_eth': String,
    'usd_ltc': String
  },
  highLows: {
    btc_highest: Array,
    btc_lowest: Array,
    dash_highest: Array,
    dash_lowest: Array,
    eth_highest: Array,
    eth_lowest: Array,
    ltc_highest: Array,
    ltc_lowest: Array
  }
});

// historySchema.pre('save', function(next) {
//   var currentDate = new Date();
//   date = dateTimeFormat(currentDate);
//   next();
// });

var HistoryModel = mongoose.model('History', historySchema);
module.exports = HistoryModel;
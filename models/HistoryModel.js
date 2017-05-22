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
});

// historySchema.pre('save', function(next) {
//   var currentDate = new Date();
//   date = dateTimeFormat(currentDate);
//   next();
// });

var HistoryModel = mongoose.model('History', historySchema);
module.exports = HistoryModel;
/* API controller */
var History = require('./models/HistoryModel.js');

// post method
exports.addTime = function(req, res) {
  new History({
    date: req.body.date,
    'btc-e': req.body['btc-e'],
    coincap: req.body.coincap,
    poloniex: req.body.poloniex
  }).save();
};

// get method
exports.listHistory = function(req, res) {
  History.find(function(err, times) {
    res.send(times);
  });
};

// get method
exports.findOneTime = function(req, res) {
  History.findOne({ date: req.params.dateTime }, function(error, time) {
   res.send(time);
  });
};
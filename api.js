/* API controller */
var History = require('./models/HistoryModel.js');

// post method
exports.addTime = function(req, res) {
  var newHistory = new History({
    date: req.body.date,
    'btc-e': req.body['btc-e'],
    coincap: req.body.coincap,
    poloniex: req.body.poloniex
  });

  newHistory.save()
    .then(() => {
      res.send('new data saved');
    });
};

// internal add only
exports.addTimeInternal = function(data, callback) {
  var newHistory = new History({
    date: data.date,
    'btc-e': data['btc-e'],
    coincap: data.coincap,
    poloniex: data.poloniex
  });

  return newHistory;
};

// get method
exports.listHistory = function(req, res) {
  History.find(function(err, times) {
    res.send(times);
  });
};

// get just the dates in history
exports.listHistoryDates = function(req, res) {
  History.find(function(err, times) {
    res.send(times.map(function(time) { return time.date; }));
  });
};

// get method
exports.findOneTime = function(req, res) {
  History.findOne({ date: req.params.dateTime }, function(error, time) {
   res.send(time);
  });
};

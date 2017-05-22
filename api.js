/* API controller */
var rp = require('request-promise');

var History = require('./models/HistoryModel.js');
var dateTimeFormat = require('./helpers/formatters.js').dateTimeFormat;

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

exports.deleteAll = function(req, res) {
  History.remove({}, function(err) {
    res.send('end');
  });
};

// internal add only
var addTimeInternal = function(data, callback) {
  var newHistory = new History({
    date: data.date,
    'btc-e': data['btc-e'],
    coincap: data.coincap,
    poloniex: data.poloniex,
    highLows: data.highLows
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

// external route to call all apis
// not very DRY :(
exports.callExternalAPIs = function(req, res, next) {
  var currentCoins = {
    'date': dateTimeFormat(new Date()),
    'btc-e' : {},
    'poloniex': {},
    'coincap': {},
    highLows: {
      'btc_highest':  [null, ''],
      'btc_lowest':   [null, ''],
      'dash_highest': [null, ''],
      'dash_lowest':  [null, ''],
      'eth_highest':  [null, ''],
      'eth_lowest':   [null, ''],
      'ltc_highest':  [null, ''],
      'ltc_lowest':   [null, '']
    }
  };

  function processCoinCap(response, coin) {
    var data = JSON.parse(response);
    var val = data.price[data.price.length-1][1];
    currentCoins.coincap['usd_'+coin] = val;
    if (!currentCoins.highLows[coin+'_highest'][0] || (currentCoins.highLows[coin+'_highest'][0] < val)) {
      currentCoins.highLows[coin+'_highest'] = [val, 'coincap'];
    }
    if (!currentCoins.highLows[coin+'_lowest'][0] || (currentCoins.highLows[coin+'_lowest'][0] > val)) {
      currentCoins.highLows[coin+'_lowest'] = [val, 'coincap'];
    }
  }

  // call btc-e
  var p1 = rp({ uri: 'https://btc-e.com/api/3/ticker/btc_usd' })
    .then((response) => {
      var data = JSON.parse(response);
      var val = data['btc_usd'].last;
      currentCoins['btc-e']['usd_btc'] = val;
      if (!currentCoins.highLows['btc_highest'][0] || (currentCoins.highLows['btc_highest'][0] < val)) {
        currentCoins.highLows['btc_highest'] = [val, 'btc-e'];
      }
      if (!currentCoins.highLows['btc_lowest'][0] || (currentCoins.highLows['btc_lowest'][0] > val)) {
        currentCoins.highLows['btc_lowest'] = [val, 'btc-e'];
      }
    });

  // call poloniex
  var p2 = rp({ uri: 'https://poloniex.com/public?command=returnTicker'})
    .then((response) => {
      var data = JSON.parse(response);
      var vals = {
        btc: parseFloat(data['USDT_BTC'].last),
        dash: parseFloat(data['USDT_DASH'].last),
        eth: parseFloat(data['USDT_ETH'].last),
        ltc: parseFloat(data['USDT_LTC'].last)
      };

      currentCoins['poloniex']['usd_btc'] = vals.btc;
      currentCoins['poloniex']['usd_dash'] = vals.dash;
      currentCoins['poloniex']['usd_eth'] = vals.eth;
      currentCoins['poloniex']['usd_ltc'] = vals.ltc;

      Object.keys(vals).forEach(function(category) {
        if (!currentCoins.highLows[category+'_highest'] || (currentCoins.highLows[category+'_highest'][0] > vals[category])) {
          currentCoins.highLows[category+'_highest'] = [vals[category], 'poloniex'];
        }
        if (!currentCoins.highLows[category+'_lowest'][0] || (currentCoins.highLows[category+'_lowest'][0] < vals[category])) {
          currentCoins.highLows[category+'_lowest'] = [vals[category], 'poloniex'];
        }
      });
    });

  // calls to coincap
  var p3 = rp({ uri: 'http://www.coincap.io/history/1day/BTC'})
    .then((response) => {
      processCoinCap(response, 'btc');
    });

  var p4 = rp({ uri: 'http://www.coincap.io/history/1day/ETH'})
    .then((response) => {
      processCoinCap(response, 'eth');
    });

  var p5 = rp({ uri: 'http://www.coincap.io/history/1day/DASH'})
    .then((response) => {
      processCoinCap(response, 'dash');
    });

  var p6 = rp({ uri: 'http://www.coincap.io/history/1day/LTC'})
    .then((response) => {
      processCoinCap(response, 'ltc');
    });

  var promiseList = [p1, p2, p3, p4, p5, p6];

  Promise.all(promiseList)
    .then(() => {
      addTimeInternal(currentCoins)
        .save()
        .then(() => {
          res.send(currentCoins);
        });
    });
};

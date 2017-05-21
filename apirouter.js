var express = require('express');
var router = express.Router();
var rp = require('request-promise');

var api = require('./api.js');

// database routes
router.get('/', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h3>'+'Available routes:'+'</h3>'+'<br>');
  res.write('Db Routes:'+'<br>');
  res.write('/history'+'<br>');
  res.write('/history/:dateTime'+'<br>');
  res.write('/addTime'+'<br>');
  res.write('<br>'+'External Routes:'+'<br>');
  res.write('/today'+'<br>');
  res.end('<br>'+':)')
});
router.get('/history', api.listHistory);
router.get('/history/:dateTime', api.findOneTime);
router.post('/addTime', api.addTime);

// returns latest rates from btc-e, poloniex, and coincap
// not very DRY :(
router.get('/latest', function(req, res, next) {
  var info = {
    currentCoins: {
      'btc-e' : {},
      'poloniex': {},
      'coincap': {}
    },
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
  }; // grabbing bitcoin, ethereum, litecoin, and dash

  function processCoinCap(response, coin) {
    var data = JSON.parse(response);
    var val = data.price[data.price.length-1][1];
    info.currentCoins.coincap['usd_'+coin] = val;
    if (!info.highLows[coin+'_highest'][0] || (info.highLows[coin+'_highest'][0] < val)) {
      info.highLows[coin+'_highest'] = [val, 'coincap'];
    }
    if (!info.highLows[coin+'_lowest'][0] || (info.highLows[coin+'_lowest'][0] > val)) {
      info.highLows[coin+'_lowest'] = [val, 'coincap'];
    }
  }

  // call btc-e
  var p1 = rp({ uri: 'https://btc-e.com/api/3/ticker/btc_usd' })
    .then((response) => {
      var data = JSON.parse(response);
      var val = data['btc_usd'].last;
      info.currentCoins['btc-e']['usd_btc'] = val;
      if (!info.highLows['btc_highest'][0] || (info.highLows['btc_highest'][0] < val)) {
        info.highLows['btc_highest'] = [val, 'btc-e'];
      }
      if (!info.highLows['btc_lowest'][0] || (info.highLows['btc_lowest'][0] > val)) {
        info.highLows['btc_lowest'] = [val, 'btc-e'];
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

      info.currentCoins['poloniex']['usd_btc'] = vals.btc;
      info.currentCoins['poloniex']['usd_dash'] = vals.dash;
      info.currentCoins['poloniex']['usd_eth'] = vals.eth;
      info.currentCoins['poloniex']['usd_ltc'] = vals.ltc;

      Object.keys(vals).forEach(function(category) {
        if (!info.highLows[category+'_highest'] || (info.highLows[category+'_highest'][0] > vals[category])) {
          info.highLows[category+'_highest'] = [vals[category], 'poloniex'];
        }
        if (!info.highLows[category+'_lowest'][0] || (info.highLows[category+'_lowest'][0] < vals[category])) {
          info.highLows[category+'_lowest'] = [vals[category], 'poloniex'];
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
      res.send(info);
    });
});

module.exports = router;
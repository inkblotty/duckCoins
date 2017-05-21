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
  res.write('/btc-e/today'+'<br>');
  res.end('<br>'+':)')
});
router.get('/history', api.listHistory);
router.get('/history/:dateTime', api.findOneTime);
router.post('/addTime', api.addTime);

// external routes
// returns latest rates from btc-e, poloniex, and coincap
router.get('/latest', function(req, res, next) {
  var currentCoins = {
    'btc-e' : {},
    'poloniex': {},
    'coincap': {}
  }; // grabbing bitcoin, ethereum, litecoin, and dash

  // call btc-e
  var p1 = rp({ uri: 'https://btc-e.com/api/3/ticker/btc_usd' })
    .then((response) => {
      var data = JSON.parse(response);
      currentCoins['btc-e']['usd_btc'] = data['btc_usd'].last;
    });

  // call poloniex
  var p2 = rp({ uri: 'https://poloniex.com/public?command=returnTicker'})
    .then((response) => {
      var data = JSON.parse(response);
      currentCoins['poloniex']['usd_btc'] = data['USDT_BTC'].last;
      currentCoins['poloniex']['btc_dash'] = data['BTC_DASH'].last;
      currentCoins['poloniex']['usd_dash'] = data['USDT_DASH'].last;
      currentCoins['poloniex']['btc_eth'] = data['BTC_ETH'].last;
      currentCoins['poloniex']['usd_eth'] = data['USDT_ETH'].last;
      currentCoins['poloniex']['btc_ltc'] = data['BTC_LTC'].last;
      currentCoins['poloniex']['usd_ltc'] = data['USDT_LTC'].last;
    });

  // calls to coincap
  var p3 = rp({ uri: 'http://www.coincap.io/history/1day/BTC'})
    .then((response) => {
      var data = JSON.parse(response);
      currentCoins.coincap['usd_btc'] = data.price[data.price.length-1][1];
    });

  var p4 = rp({ uri: 'http://www.coincap.io/history/1day/ETH'})
    .then((response) => {
      var data = JSON.parse(response);
      currentCoins.coincap['usd_eth'] = data.price[data.price.length-1][1];
    });

  var p5 = rp({ uri: 'http://www.coincap.io/history/1day/DASH'})
    .then((response) => {
      var data = JSON.parse(response);
      currentCoins.coincap['usd_dash'] = data.price[data.price.length-1][1];
    });

  var p6 = rp({ uri: 'http://www.coincap.io/history/1day/LTC'})
    .then((response) => {
      var data = JSON.parse(response);
      currentCoins.coincap['usd_ltc'] = data.price[data.price.length-1][1];
    });

  var promiseList = [p1, p2, p3, p4, p5, p6];

  Promise.all(promiseList)
    .then(() => {
      res.send(currentCoins);
    });
});

router.get('/btc-e/today', function(req, res, next) {
  rp({ uri: 'https://btc-e.com/api/3/ticker/btc_usd'})
    .then((response) => {
      res.send(response);
    });
});

module.exports = router;
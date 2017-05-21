var express = require('express');
var router = express.Router();
var rp = require('request-promise');

var api = require('./api.js');

// database routes
router.get('/', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h3>'+'Available routes:'+'</h3>'+'<br>');
  res.write('Db Routes:'+'<br>');
  res.write('/coins'+'<br>');
  res.write('/coin/:coinName'+'<br>');
  res.write('/coin/:coinName/:date'+'<br>');
  res.write('/addCoin'+'<br>');
  res.write('/addCoinValue/:coinName'+'<br>');
  res.write('<br>'+'External Routes:'+'<br>');
  res.write('/today'+'<br>');
  res.write('/btc-e/today'+'<br>');
  res.end('<br>'+':)')
});
router.get('/coins', api.listCoins);
router.get('/coin/:coinName', api.findOneCoin);
router.get('/coin/:coinName/:date', api.findCoinValByDate);

router.post('/addCoin', api.addCoin);
router.post('/addCoinValue/:coinName', api.addCoinValue);

// https://github.com/CoinCapDev/CoinCap.io

// returns today's values in usd
// first pings db to see if coins have values for today
// then pings individual apis to fill in missing data
router.get('/today', function(req, res, next) {
  var currentCoins = {
    'btc' : {},
    'ethereum': {},
    'litecoin': {},
    'dash': {}
  };

  var p1 = rp({ uri: 'https://btc-e.com/api/3/ticker/btc_usd' })
    .then((response) => {
      var data = JSON.parse(response);
      currentCoins.btc = data['btc_usd'];
    });

  var p2 = rp({ uri: 'https://btc-e.com/api/3/ticker/btc_usd'})
    .then((response) => {
      var data = JSON.parse(response);
      currentCoins.btc = data['btc_usd'];
    });

  var promiseList = [];
  // if database doesn't have today's data, add p1, p2, etc.
  promiseList.push(p1);
  promiseList.push(p2);

  Promise.all(promiseList)
    .then(() => {
      res.send(currentCoins);
    });
});

// external routes
router.get('/btc-e/today', function(req, res, next) {
  rp({ uri: 'https://btc-e.com/api/3/ticker/btc_usd'})
    .then((response) => {
      res.send(response);
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var request = require('request');

var api = require('./api.js');

// database routes
router.get('/coins', api.listCoins);
router.get('/coin/:coinName', api.findOneCoin);
router.get('/coin/:coinName/:date', api.findCoinValByDate);

router.post('/addCoin', api.addCoin);
router.post('/addCoinValue/:coinName', api.addCoinValue);

// external routes
router.get('/btc-e/today', function(req, res, next) {
  request({
    uri: 'https://btc-e.com/api/3/ticker/btc_usd',
  }).pipe(res);
});

module.exports = router;
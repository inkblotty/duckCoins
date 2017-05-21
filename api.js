/* API controller */
var Coin = require('./models/CoinModel.js');

// post method
exports.addCoin = function(req, res, internal) {
  new Coin({
   name: req.body.coinName,
   values: [
     {
      USDvalue: req.body.todayValue
     }
   ]
  }).save();
};

// post method
exports.addCoinValue = function(req, res, internal) {
  Coin.findOneAndUpdate({ name: req.params.coinName }, function(error, coin) {
    coin.values.push(req.body.newCoinVal);
    if (!internal) {
      res.send(coin);
    } else {
      return coin;
    }
  });
};

// get method
exports.listCoins = function(req, res, internal) {
  Coin.find(function(err, coins) {
    if (!internal) {
      res.send(coins);
    } else {
      return coins;
    }
  });
};

// get method
exports.findOneCoin = function(req, res) {
  Coin.findOne({ name: req.params.coinName }, function(error, coin) {
   res.send(coin);
  });
};

// get method
exports.findCoinValByDate = function(req, res) {
  Coin.findOne({ name: req.params.coinName }, function(error, coin) {
   var reqDate = new Date(req.params.date).getTime();
   var values = coin.values.filter(function(val) {
     var valDate = new Date(val.date).getTime();
     return valDate === reqDate;
   });
   res.send(values);
  });
};
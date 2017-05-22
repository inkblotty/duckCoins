var express = require('express');
var router = express.Router();

var api = require('./api.js');

// database routes
router.get('/', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h3>'+'Available routes:'+'</h3>'+'<br>');
  res.write('Db Routes:'+'<br>');
  res.write('/history'+'<br>');
  res.write('/history/:dateTime'+'<br>');
  res.write('/dates'+'<br>');
  res.write('/addTime'+'<br>');
  res.write('<br>'+'External Routes:'+'<br>');
  res.write('/today'+'<br>');
  res.end('<br>'+':)')
});
router.get('/history', api.listHistory);
router.get('/dates', api.listHistoryDates);
router.get('/history/:dateTime', api.findOneTime);
router.post('/addTime', api.addTime);

// returns latest rates from btc-e, poloniex, and coincap
router.get('/latest', api.callExternalAPIs);

module.exports = router;
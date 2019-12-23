var express = require('express');
var router = express.Router();
var controller = require('../controller/usagestats.controller');
/* GET home page. */
router.get('/getData', function(req, res, next) {
  res.send('respond with a is true');
});


router.post('/api/saveStatistic', controller.UsageStatsBGPost);

router.get('/getDataUsage', controller.getDataFromApi);

module.exports = router;
var express = require('express');
var router = express.Router();
var db_1 = require('../queries/queries_group_1');
var db_2 = require('../queries/queries_group_2');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/group_1', db_1.getAllData);
router.get('/api/group_1/:sensor_name',db_1.getDataWithType);
router.post('/api/group_1/post', db_1.createData);
router.put('/api/group_1/update/:id', db_1.updateData);

module.exports = router;
